import sys, base64, threading
from os import path, listdir, curdir, sep, remove
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
from SocketServer import ThreadingMixIn

class HTTPCode(Exception):
    def __init__(self, code):
        self.code = code

class MyHandler(BaseHTTPRequestHandler):

    def getContent(self):
        requestpath = self.path.rsplit("?", 1)
        self.path = requestpath[0]
        self.query = requestpath[1] if len(requestpath) > 1 else ""
        if self.path == "/":
            self.path = "/index.html"
        resource = resourceFolder + self.path.replace("/", path.sep)
        if path.isdir(resource):
            return path.join(resource, "index.html")
        else:
            return resource

    def isApiPath(self):
        return self.path[1:4] == "api"

    def handleException(self, error):
        if error == 403:
            self.send_error(403)

    def __callApiHandler(self):
        # Import the handler and extend it by a LocalHandler which handles the responding via sendHeaders & wfile.write ...
        httphandler = self
        from handler import Handler
        class LocalHandler(Handler):
            def _respond(self):
                if self.responded is not True:
                    # Output headers
                    if self._headers.has_key("Status"):
                        httphandler.send_response(int(self._headers["Status"][0:3]))
                    else:
                        httphandler.send_response(200)
                    for h in self._headers:
                        httphandler.send_header(h, self._headers[h])
                    httphandler.end_headers()
                    # Output body
                    httphandler.wfile.write("".join(self._body))
                    self.responded = True

        # Build an request from the CGI environment object that we pass to our handler
        request = {
               "method": self.command,
               "path": self.path.replace("/", sep),
               "query": self.query,
               "server": self.headers.getheader("Host"),
               "rootfolder": resourceFolder,
               "language": self.headers.getheader("Accept-Language"),
               "agent": self.headers.getheader("User-Agent"),
               "authorization": self.headers.getheader("Authorization"),
               "authdialog": self.headers.getheader("X-Auth-Dialog") or True,
               "contentlength": int(self.headers.getheader("Content-Length") or 0),
               "contenttype": self.headers.getheader("Content-Type") or [],
               "content": self.rfile.read(int(self.headers.getheader("Content-Length") or 0))
               }

        # Call our new local handler
        try:
            l = LocalHandler(request, debug = True)
        except Exception, e:
            print e

    def do_GET(self):
        try:
            if self.isApiPath():
                self.getContent()
                self.__callApiHandler()
            else:
                f = open(self.getContent(), "rb")
                self.send_response(200)
                # Send Content-type based on file endings
                if self.getContent().endswith(".xml"):
                    self.send_header("Content-Type", "application/xml")
                elif self.getContent().endswith(".json"):
                    self.send_header("Content-Type", "application/json")
                elif (self.getContent().endswith(".html") or self.getContent().endswith(".htm")):
                    self.send_header("Content-Type", "text/html")
                elif self.getContent().endswith(".js"):
                    self.send_header("Content-Type", "text/x-js")
                elif self.getContent().endswith(".css"):
                    self.send_header("Content-Type", "text/css")
                self.end_headers()
                self.wfile.write(f.read())
                f.close()
        except HTTPCode, c:
            self.handleException(c.code)
        except IOError:
            self.send_error(404, "File Not Found: " + self.getContent())

    def do_POST(self):
        self.getContent()
        self.__callApiHandler()

    def do_PUT(self):
        self.getContent()
        self.__callApiHandler()

    def do_DELETE(self):
        self.getContent()
        self.__callApiHandler()

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Verarbeite Anfragen in einem separaten thread."""

try:
    resourceFolder = curdir
    if len(sys.argv) > 1:
        if path.exists(sys.argv[1]):
            resourceFolder = sys.argv[1]
        else:
            resourceFolder = sep.join(sys.argv[0].split(sep)[0:-2])
    server = ThreadedHTTPServer(("", 80), MyHandler)
    print "Simple Debug Server serves \"%s\" at localhost!" % resourceFolder
    server.serve_forever()
except KeyboardInterrupt:
    print "^C received, shutting down server"
    server.socket.close()
