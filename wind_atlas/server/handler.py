import sys, base64, json, traceback, hashlib
from os import path, curdir, sep, remove, listdir, urandom

class Handler:

    responded = False

    def __init__(self, request, debug):
        # Security settings
        self.__hash = {"rounds": 1000, "saltlength": 32}
        # Are we debugging
        self._debug = debug
        self._headers = {"Content-Type": "text/html;charset=utf-8"}
        self._body = []
        self._config = {}
        self._access = {"mode": None, "allow": False, "master": False}
        self._authenticated = False
        self._exception = False
        self._user = {"name": None, "id": None, "password": None}
        # Set the request
        self.request = request
        # Call the according HTTP method
        if request["method"] in ("GET", "POST", "DELETE", "PUT"):
            try:
                # Get the context
                self.context = self._getContext()
                # Set headers
                self._buildHeaders()
                # Proceed with request if no exception occured
                if self._exception == False:
                    getattr(self, "_" + request["method"])()
            except:
                self._handleException(None, exception = sys.exc_info())
        # Send response to client
        self._respond()

    @classmethod
    def handleRequest(self, request, **kwargs):
        h = Handler(request, kwargs["debug"] if kwargs.has_key("debug") else False)

    @classmethod
    def log(self, *args):
        self.responded = True
        if len(args) > 0:
            print("Content-Type: text/html;charset=utf-8\n")
            print("<h1>DEBUG Output</h1>")
            for d in args:
                print("<p>%s</p>" % d)
        sys.exit()

    def _buffer(self, *args):
        for output in args:
            self._body.append(str(output))

    def _flush(self):
        self._body = []

    def _getContext(self):
        # Get any search queries
        query = {}
        for q in self.request["query"].split("&"):
            q = q.split("=")
            if len(q) > 1 and q[1] != "":
                query[q[0]] = self._sanitize(q[1])
        # Get requested resource
        requestpath = self.request["rootfolder"] + sep + "data" + self.request["path"][4:].rsplit(sep, 1)[0]
        r = self._sanitize(self.request["path"].rsplit(sep, 1)[1])
        # Now check if we use a python script, a json file or a sqlite database as data backend for this resource
        if path.isfile(requestpath + ".py"):
            # Check that path is always a child folder
            if path.commonprefix((self.request["rootfolder"] + sep + "data", path.abspath(requestpath))) == self.request["rootfolder"] + sep + "data":
                return {
                        "path": requestpath,
                        "database": None,
                        "datafile": None,
                        "datascript": requestpath + ".py",
                        "type": requestpath.rsplit(sep, 1)[1],
                        "resource": r if len(r) > 0 else None,
                        "query": query
                        }
            else:
                return False
        elif path.isfile(requestpath + ".json") or path.isfile(path.join(requestpath, r + ".json")):
            # Check that path is always a child folder
            if path.commonprefix((self.request["rootfolder"] + sep + "data", path.abspath(requestpath))) == self.request["rootfolder"] + sep + "data":
                return {
                        "path": requestpath,
                        "database": None,
                        "datafile": requestpath + ".json" if path.isfile(requestpath + ".json") else path.join(requestpath, r + ".json"),
                        "datascript": None,
                        "type": requestpath.rsplit(sep, 1)[1],
                        "resource": r if len(r) > 0 else None,
                        "query": query
                        }
            else:
                return False
        elif path.isfile(requestpath + ".sqlite") or path.isfile(requestpath + ".config"):
            # Check that path is always a child folder
            if path.commonprefix((self.request["rootfolder"] + sep + "data", path.abspath(requestpath))) == self.request["rootfolder"] + sep + "data":
                return {
                        "path": requestpath,
                        "database": requestpath + ".sqlite",
                        "datafile": None,
                        "datascript": None,
                        "type": requestpath.rsplit(sep, 1)[1],
                        "resource": r if len(r) > 0 else None,
                        "query": query
                        }
            else:
                return False
        else:
            if path.isdir(requestpath):
                return {
                        "path": requestpath,
                        "database": None,
                        "datafile": None,
                        "datascript": None,
                        "type": requestpath.rsplit(sep, 1)[1],
                        "resource": r if len(r) > 0 else None,
                        "query": query
                        }
            else:
                return False

    def _getParameter(self, parameter):
        for p in self.request["query"].split("&"):
            p = p.split("=")
            if p[0] == parameter:
                return p[1]
        return None

    def _sanitize(self, userinput):
        # TODO: Check for SQL injections
        return userinput

    def _saltPassword(self, password, **kwargs):
        # Salt
        if len(kwargs) > 0 and kwargs.has_key("salt"):
            salt = kwargs["salt"]
        else:
            salt = ''.join(map(lambda x:'./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[ord(x) % 64], urandom(self.__hash["saltlength"])))
        # Rounds
        if len(kwargs) > 0 and kwargs.has_key("rounds"):
            rounds = kwargs["rounds"]
        else:
            rounds = self.__hash["rounds"]
        # Hash password
        for r in range(0, rounds):
            password = hashlib.sha512("%s%s" % (salt, password)).hexdigest()
        return "$%s$%s$%s" % (rounds, salt, password)

    def _respond(self):
        if self.responded is not True:
            try:
                # Output headers
                head = []
                for h in self._headers:
                    head.append("%s: %s" % (h, self._headers[h].strip()))
                # According  to RFC2616, header lines should end with "\r\n"
                print "\r\n".join(head)
                print("\r")
                # Output body
                print("".join(self._body))
                self.responded = True
            except Error, e:
                self.responded = True
                self._handleException(e)
        sys.exit()

    def _readDataRequest(self, *request):
        jsondata = json.loads(request[0] if len(request) > 0 else self.request["content"])
        fields = self._resourceFields()
        data = {}
        # Hash any password of a new user object
        if self.context["type"] == "users" and self.request["method"] == "POST":
            jsondata["password"] = self._saltPassword(jsondata["password"])
        # Update the password hash of any user object if changed
        if self.context["type"] == "users" and self.request["method"] == "PUT":
            if jsondata["password"] == "":
                # Set the old password (Get it from database first)
                user = self._connectDatabase("data/app/users.sqlite").select("users", "password", "user=\"%s\"" % str(jsondata["user"]))
                jsondata["password"] = user[0]["password"]
            else:
                # Salt the new password
                jsondata["password"] = self._saltPassword(jsondata["password"])
        # Remove the authenticated flag from he user (Should always be FALSE in the database)
        if self.context["type"] == "users" and self.request["method"] in ("PUT", "POST"):
            jsondata["session"]["authenticated"] = False
        # Remove the fields that get stored in the database separately
        for f in fields:
            if jsondata.has_key(f):
                data[f] = jsondata[f]
                del jsondata[f]
        # Handle the rest of the data as one object
        data["object"] = unicode(json.dumps(jsondata))
        return data

    def _createDataResponse(self, data, **kwargs):
        data = [] if data is None else data if isinstance(data, (list, tuple)) else [data]
        results = []
        fields = self._resourceFields()
        for item in data:
            r = {}
            # Transfer the database object string into a dictionary and copy its values
            if item.has_key("object"):
                item["object"] = json.loads(item["object"])
                for i in item["object"]:
                    r[i] = item["object"][i]
            # Copy the database fields into our result
            for f in fields:
                if(item.has_key(f)):
                    # Add db fields if they are not user passwords
                    if f == "password" and self.context["type"] == "users":
                        r[f] = ""
                    else:
                        r[f] = item[f]
            # Manipulate the session for the active user! This indicates if a user is authenticated by the system (Logged in) or not
            if self.context["type"] == "users" and item.has_key("user") and item["user"] == self._user["name"]:
                r["session"]["authenticated"] = True
            elif self.context["type"] == "users" and item.has_key("user") and item["user"] != self._user["name"]:
                r["session"]["authenticated"] = False
            results.append(r)
        response = {
                    "success": ("%s" % (kwargs.get("success") if kwargs.has_key("success") else True)).lower(),
                    "message": (kwargs.get("message") if kwargs.has_key("message") else ""),
                    kwargs.get("root") or "data": results,
                    "total": len(results)
                   }
        return json.dumps(response)

    def _buildApiResponse(self):
        apis = []
        if path.exists(self.context["path"]):
            for f in listdir(self.context["path"]):
                fullp = path.join(self.context["path"], f)
                p = path.join(self.request["path"], f)
                if path.isfile(fullp) and ".config" in f:
                    apis.append(p.replace(".config", "").replace(sep, "/"))
                elif path.isfile(fullp) and ".json" in f:
                    apis.append(p.replace(".json", "").replace(sep, "/"))
                elif path.isdir(fullp) and not f.startswith("."):
                    apis.append(p.replace(sep, "/"))
                else:
                    pass
        if "application/json" in self.request["contenttype"]:
            self._headers["Content-Type"] = "application/json"
            obj = {}
            obj[self.context["type"]] = []
            for p in apis:
                item = {
                       "item": p.rsplit("/").pop(),
                       "".join(self.context["type"].rsplit("s", 1)[0:-1]): p.rsplit("/").pop(),
                       "path": p
                       }
                obj[self.context["type"]].append(item)
            self._buffer(json.dumps(obj))
        elif "application/xml" in self.request["contenttype"]:
            self._headers["Content-Type"] = "application/xml"
            self._buffer("<?xml version=\"1.0\" encoding=\"UTF-8\"?><api>")
            for p in apis:
                self._buffer("<resource xmlns:xlink=\"%s\">%s</resource>" % (p, p.split("/")[-1]))
            self._buffer("</api>")
        else:
            self._headers["Content-Type"] = "text/html"
            self._buffer("<html><head></head><body><ul><li><a href=\"..\">..</a></li>")
            for p in apis:
                self._buffer("<li><a href=\"%s/\">%s/</a> (%s)</li>" % (p, p.split("/")[-1], ", ".join(self._config["methods"] if self._config.has_key("methods") else ["-"])))
            self._buffer("</ul></body></html>")

    def _handleException(self, code, **kwargs):
        # Set exception flag
        self._exception = True
        # Define possible errors
        if code == 400:
            self._headers["Status"] = "400 Bad Request"
        elif code == 401:
            self._headers["Status"] = "401 Unauthorized"
        elif code == 403:
            self._headers["Status"] = "403 %s" % (kwargs["message"] if kwargs.has_key("message") else "Forbidden")
            self._headers["X-Auth-Error"] = self._headers["Status"]
        elif code == 404:
            self._headers["Status"] = "404 Not Found"
        elif code == 405:
            self._headers["Status"] = "405 Method Not Allowed"
            if self._debug and kwargs and kwargs.has_key("methods"):
                self._headers["Allow"] = ", ".join(kwargs["methods"])
        else:
            self._headers["Status"] = "500 Internal Server Error"
        if "application/json" in self.request["contenttype"]:
            self._buffer(self._createDataResponse(None, success = False, message = self._headers["Status"][4:]))
        else:
            self._buffer("<h1>%s</h1>" % self._headers["Status"])
        # Add more details to error
        if code == 404 and not ("application/json" in self.request["contenttype"] or "application/xml" in self.request["contenttype"]):
            self._buffer("<p><b>Does not exist:</b> %s?%s</p>" % (self.request["path"], self.request["query"]))
        # Output exception details
        if self._debug and kwargs and kwargs.has_key("exception") and code not in (403, 404, 405):
            self._buffer("<p><b>%s Error:</b> %s</p>" % (kwargs["exception"][0], kwargs["exception"][1]))
        # Output error explanation
        if self._debug and kwargs and kwargs.has_key("reason") and code not in (403, 404, 405):
            self._buffer("<p><b>Error:</b> %s</p>" % kwargs["reason"])
        # Output traceback
        if self._debug and code not in (400, 403, 404, 405):
            trace = traceback.format_exc().split("File")
            self._buffer("<p><b>%s</b><ul>" % trace[0])
            for t in trace[1:]:
                self._buffer("<li>%s</li>" % t)
            self._buffer("</ul></p>")
        self._respond()

    def _callHandlerScript(self):
        try:
            datapath, script = self.context["path"].rsplit(sep, 1)
            result = ""
            # Append the scripts folder to current PythonPath, import script and remove the path again
            sys.path.append(datapath)
            exec("import %s" % script)
            sys.path.remove(datapath)
            # Execute the function
            exec("result = %s.%s(self)" % (script, self.request["method"]))
            if type(result) is str:
                return result
            else:
                return self._createDataResponse(result if result else [])
        except:
            self._handleException(500, exception = sys.exc_info())

    def _buildHeaders(self,):
        if self.context is not False:
            try:
                result = 0
                if (self.context["database"] or self.context["datafile"] or self.context["datascript"]) and path.exists(self.context["path"] + ".config") or path.exists(self.context["path"] + sep + self.context["type"] + ".config"):
                    # Read resource configuration and act according to the resource settings
                    self._config = json.load(open(self.context["path"] + ".config"))
                    # Check if method is allowed on this source
                    if self.request["method"] in self._config["methods"]:
                        method = self.request["method"]
                        # Check if we need to authenticate
                        auth = self._config["auth"][method].split(":")
                        self._access["mode"] = auth[0]
                        for a in auth[1:]:
                            if a.split("=")[0] == "allow":
                                self._access["allow"] = a.split("=")[1].split(",")
                            if a.split("=")[0] == "master":
                                self._access["master"] = a.split("=")[1].split(",")
                        # Authenticate because access is restricted
                        if self._access["mode"] == "required":
                            # Authenticate with a restriction of allowed users
                            if self._access["allow"]:
                                result = self._authenticate(self._access["allow"])
                            # Authenticate normally (All users allowed)
                            else:
                                result = self._authenticate()
                            # Handle the authentification result
                            if result is not 200:
                                # Ask the user to authenticate
                                if result == 401:
                                    self._headers["Status"] = "401 Unauthorized"
                                    self._headers["WWW-Authenticate"] = "Basic realm=\"%s/%s\"" % (self.request["server"], "api")
                                # Show a login failed message (Forbidden)
                                if result == 403:
                                    self._handleException(403)
                                # Show a login failed message (Forbidden) + the reason is Inactivity
                                if result == "INACTIVE":
                                    self._handleException(403, message = "Account Inactive")
                        # Authenticate because we only want to have "self._user" populated with user info
                        if self._access["mode"] in ["optional", "public", "none"]:
                            self._authenticate()
                    # Respond with a "Method not allowed" exception
                    else:
                        self._handleException(405, methods = self._config["methods"])
                # 
                if result and result == 401:
                    self._buffer("<h1>%s</h1>" % self._headers["Status"])
                    self._respond()
            except Exception:
                self._handleException(500, exception = sys.exc_info())

        else:
            self._handleException(404)

    def _authenticate(self, *args):
        try:
            if self.request["authorization"] == None:
                raise Exception()
            elif type(self.request["authorization"]) is str and "Basic" in self.request["authorization"]:
                # Get the credential from HTTP authorization header
                credentials = base64.decodestring(self.request["authorization"].split(" ")[1]).split(":")
                # Validate the credentials
                if len(args) > 0 and credentials[0] not in args[0]:
                    return 403
                else:
                    if self._connectDatabase("data/app/users.sqlite").count("users", False) == 0:
                        if credentials[0] == "admin" and credentials[1] == "password":
                            self._user["name"] = "admin"
                            self._authenticated = True
                            return 200
                    else:
                        user = self._connectDatabase("data/app/users.sqlite").select("users", "id,user,password,object", "user=\"%s\"" % str(credentials[0]))
                        if len(user) > 0 and user[0].has_key("object"):
                            object = json.loads(user[0]["object"])
                            if object["active"] == False:
                                return "INACTIVE"
                            # Create password hash
                            dbpassword = user[0]["password"].split("$")
                            if self._saltPassword(str(credentials[1]), rounds = int(dbpassword[1]), salt = dbpassword[2]) == user[0]["password"]:
                                self._user["name"] = user[0]["user"]
                                self._user["password"] = user[0]["password"]
                                self._user["id"] = user[0]["id"]
                                self._authenticated = True
                                return 200
                raise Exception()
            else:
                raise Exception()
        except:
            if self.request["authdialog"] == "False":
                return 403
            else:
                return 401

    def _connectDatabase(self, *args):
        import sqlite
        if len(args) > 0:
            database = path.join(self.request["rootfolder"], args[0]).replace("/", sep)
        else:
            database = False
        db = sqlite.db(database if database and path.exists(database) else self.context["database"])
        if not db.exists():
            fields = [
                       {"field":"owner", "type":"INTEGER", "index":True},
                       {"field":"name", "index":True},
                       {"field":"acl", "index":False},
                       {"field":"object", "index":False}
                    ]
            if self._config.has_key("fields"):
                fields.extend(self._config["fields"])
            db.setup([{
                       "table":self.context["type"],
                       "auto":True,
                       "fields":fields
                       }])
        return db

    def _resourceFields(self):
        fields = ["id", "name"]
        if self._config.has_key("fields"):
            for f in self._config["fields"]:
                fields.append(f["field"])
        return fields

    def _GET(self):
        if self.context["database"]:
            db = self._connectDatabase()
            # Restrict data by ownership, Check if current user is a master of this resource - if not restrict access by ownership & acl
            if self._access["mode"] == "required":
                if self._access["master"] and self._user["name"] in self._access["master"]:
                    owner = ""
                else:
                    owner = "(owner ISNULL OR acl IS NOT NULL)" if not self._authenticated else "(owner=%s OR owner ISNULL OR acl IS NOT NULL)" % self._user["id"]
                    if self.context["type"] != "users" and self.context["resource"] and str(self.context["resource"]) != str(self._user["id"]):
                        self._handleException(403)
            elif self._access["mode"] == "optional":
                if self._access["master"] and self._user["name"] in self._access["master"]:
                    owner = ""
                else:
                    owner = "(owner ISNULL OR acl IS NOT NULL OR owner=%s)" % (self._user["id"] if self._user["id"] is not None else "NULL")
            else:
                owner = ""
            # Build search from query
            search = []
            for q in self.context["query"]:
                if q in self._resourceFields():
                    search.append("%s=\"%s\"" % (q, self.context["query"][q]))
            if len(owner) > 0:
                search.append(owner)
            # Fetch data from database
            if self.context["resource"]:
                key = "user" if self.context["type"] == "users" else "id"
                data = db.select(self.context["type"], "*", ("%s%s%s=%s" if str(self.context["resource"]).isdigit() else "%s%s%s=\"%s\"") % (owner, " AND " if len(owner) > 0 else "", key, self.context["resource"]))
            else:
                data = db.select(self.context["type"], "*", "%s" % (" AND ".join(search)))
            self._buffer(self._createDataResponse(data))
        elif self.context["datafile"]:
            f = open(self.context["datafile"], "rb")
            data = f.read()
            f.close()
            self._buffer(data)
        elif self.context["datascript"]:
            self._buffer(self._callHandlerScript())
        else:
            self._buildApiResponse()

    def _PUT(self):
        if self.context["database"] and self.context["resource"]:
            db = self._connectDatabase()
            post = self._readDataRequest()
            # Restrict data by ownership, Check if current user is a master of this resource - if not restrict access by ownership & acl if access is required
            if self._access["mode"] == "required":
                if self._access["master"] and self._user["name"] in self._access["master"]:
                    owner = ""
                else:
                    owner = "owner ISNULL OR acl IS NOT NULL" if not self._authenticated else "(owner=%s)" % self._user["id"]
            elif self._access["mode"] == "optional":
                if self._access["master"] and self._user["name"] in self._access["master"]:
                    owner = ""
                else:
                    owner = "owner ISNULL OR acl IS NOT NULL OR owner=%s" % self._user["id"] if self._user["id"] is not None else "NULL"
            else:
                owner = ""
            # See if there is a resource in the database and see if we can accesss it
            data = db.select(self.context["type"], "*", "%s%sid=\"%s\"" % (owner, " AND " if len(owner) > 0 else "", self.context["resource"]))
            # Update the resource or respond with Forbidden
            if len(data) > 0:
                db.update(self.context["type"], post, "\"id\"=%s" % (self.context["resource"]))
                self._buffer(self._createDataResponse(post))
            else:
                self._handleException(403)
        elif self.context["datafile"]:
            pass
        elif self.context["datascript"]:
            self._buffer(self._callHandlerScript())
        else:
            self._handleException(400, reason = "No resource specified")

    def _POST(self):
        if self.context["database"]:
            db = self._connectDatabase()
            post = self._readDataRequest()
            # Remove any ID we get (Database will set its own)
            if post.has_key("id"): del post["id"]
            # Set the owner
            post["owner"] = self._user["id"]
            # Write new entry to datbase
            try:
                id = db.write(self.context["type"], post)
            except:
                self._handleException(400, reason = "Corrupted input or resource already exists")
            # Read the ID (from the DB) which we removed before from the item
            post["id"] = id
            # Special case: If we add new user we need to set the owner properly
            if self.context["type"] == "users":
                post["owner"] = id
                db.update(self.context["type"], {"owner":id}, "\"id\"=%s" % id)
            self._buffer(self._createDataResponse(post))
        elif self.context["datafile"]:
            pass
        elif self.context["datascript"]:
            self._buffer(self._callHandlerScript())
        else:
            self._handleException(405)

    def _DELETE(self):
        if self.context["database"] and self.context["resource"]:
            db = self._connectDatabase()
            # Restrict data by ownership, Check if current user is a master of this resource - if not restrict access by ownership & acl if access is required
            if self._access["mode"] == "required":
                if self._access["master"] and self._user["name"] in self._access["master"]:
                    owner = ""
                else:
                    owner = "owner ISNULL OR acl IS NOT NULL" if not self._authenticated else "(owner=%s)" % self._user["id"]
            elif self._access["mode"] == "optional":
                if self._access["master"] and self._user["name"] in self._access["master"]:
                    owner = ""
                else:
                    owner = "owner ISNULL OR acl IS NOT NULL OR owner=%s" % self._user["id"] if self._user["id"] is not None else "NULL"
            else:
                owner = ""
            # See if there is a resource in the database and see if we can accesss it
            data = db.select(self.context["type"], "*", "%s%sid=\"%s\"" % (owner, " AND " if len(owner) > 0 else "", self.context["resource"]))
            # Delete the resource or respond with Forbidden
            if len(data) > 0:
                db.delete(self.context["type"], "\"id\"=%s" % (self.context["resource"]))
                self._buffer(self._createDataResponse(data))
            else:
                # Check if the resource doesn't exist or if we are not allowed to delete the resource
                data = db.select(self.context["type"], "id", "id=\"%s\"" % (self.context["resource"]))
                if len(data) > 0:
                    self._handleException(403)
                else:
                    self._handleException(404)
        elif self.context["datafile"]:
            pass
        elif self.context["datascript"]:
            self._buffer(self._callHandlerScript())
        else:
            self._handleException(400, reason = "No resource specified")

