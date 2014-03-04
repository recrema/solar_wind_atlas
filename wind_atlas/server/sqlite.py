# -*- coding: utf-8 -*-

import sqlite3, verifier, sys
from handler import Handler

def error(*args):
    # Raise an exception that will be caught in handler class
    if len(args) > 0:
        raise sys.exc_type, "%s<br><b>Details:</b> %s" % (sys.exc_value, args[0]), sys.exc_traceback
    else:
        raise sys.exc_type, sys.exc_value, sys.exc_traceback

class table:
    """A sqlite3 databse table object"""

    def __init__(self, dict):
        try:
            self.name = dict["table"] if dict.has_key("table") else False
            self.autoIncrement = dict["auto"] if dict.has_key("auto") else False
            self.fields = []
            for f in dict["fields"]:
                self.fields.append(field(f))
        except:
            error()

    def __repr__(self):
        return "<Sqlite3 table: Name=\"%s\">" % (self.name)

    def sql(self):
        sql = "CREATE TABLE %s (" % (self.name)
        if self.autoIncrement:
            sql += "'id' INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE"
        indexes = []
        for f in self.fields:
            sql += f.sql()
        sql += ")"
        return sql

    def index(self):
        indexes = []
        for f in self.fields:
            if f.index:
                indexes.append(f.name)
        return indexes

class field:
    """A sqlite3 databse field object"""

    def __init__(self, dict):
        try:
            self.name = dict["field"] if dict.has_key("field") else False
            self.type = dict["type"] if dict.has_key("type") else "TEXT"
            self.unique = dict["unique"] if dict.has_key("unique") else False
            self.notnull = dict["notnull"] if dict.has_key("notnull") else False
            self.default = dict["default"] if dict.has_key("default") else False
            self.length = dict["length"] if dict.has_key("length") else False
            self.index = dict["index"] if dict.has_key("index") else False
        except:
            error()

    def __repr__(self):
        return "<Sqlite3 field: Name=\"%s\">" % (self.name)

    def sql(self):
        return ", '%s' %s%s%s%s" % (self.name, self.type, "  NOT NULL" if self.notnull else "", "  UNIQUE" if self.unique else "", ("  DEFAULT " + str(self.default)) if self.default else "")

class db:
    """A sqlite3 databse class"""

    def __init__(self, database):
        self.file = database
        self.connect()

    def __del__(self):
        self.close()

    def exists(self):
        from os import stat
        return stat(self.file).st_size > 1

    def connect(self):
        try:
            self.connection = sqlite3.connect(self.file)
            self.cursor = self.connection.cursor()
        except:
            error()

    def close(self):
        try:
            self.cursor.close()
        except:
            error()

    def setup(self, structure):
        try:
            for s in structure:
                t = table(s)
                self.execute(t.sql())
                for i in t.index():
                    self.cursor.execute("CREATE INDEX userindex_%s_%s ON %s (%s)" % (t.name, i, t.name, i))
        except:
            error()

    def execute(self, sql):
        try:
            result = self.cursor.execute(sql)
            self.connection.commit()
            return result.fetchall()
        except:
            error(sql)

    def handleStrings(self, string):
        return string.replace('"', '""')


    def count(self, table, where):
        try:
            return int(self.cursor.execute("SELECT count(*) FROM " + table + ((" WHERE " + where) if where else "")).fetchone()[0])
        except:
            error()

    def createFunction(self, name, function):
        try:
            #TODO: Muss noch getested werden
            import inspect
            return self.connection.create_function(name, len(inspect.getargspec(function)[0]), function)
        except:
            error()

    def select(self, table, select, where = None, order = None):
        try:
            data = []
            select = ",".join(select) if (verifier.isList(select) or verifier.isTuple(select)) else select
            order = " ORDER BY " + order if order else ""
            from itertools import izip
            if not where:
                result = self.execute("SELECT %s FROM %s%s" % (select, table, order))
            else:
                result = self.execute("SELECT %s FROM %s WHERE %s%s" % (select, table, where, order))
            fieldNames = [d[0] for d in self.cursor.description]
            for row in result:
                data.append(dict(izip(fieldNames, row)))
            return data
        except:
            error()

    def delete(self, table, where):
        try:
            return self.execute("DELETE FROM %s WHERE %s" % (table, where))
        except:
            error()

    def write(self, table, record):
        try:
            #TODO: Besser diesen Ansatz nehmen da sicherer: cur.executemany("insert into test(x) values (?)", [("a",), ("b",)])
            values = []
            for r in record.values():
                if verifier.isDict(r):
                    if len(r) > 0:
                        values.append('NULL')
                    else:
                        values.append('NULL')
                elif verifier.isTuple(r) or verifier.isList(r):
                    if len(r) > 1:
                        values.append('"' + ";".join(["%s" % str(v) for v in r]) + '"')
                    elif len(r) > 0:
                        values.append('"' + str(r[0]) + '"')
                    else:
                        values.append('NULL')
                elif verifier.isInt(r) or verifier.isFloat(r):
                    values.append('"' + str(r) + '"')
                elif r == False:
                    values.append('"False"')
                elif r == None:
                    values.append('NULL')
                else:
                    values.append('"' + self.handleStrings(str(r)) + '"')
            self.execute("INSERT INTO %s (%s) VALUES (%s)" % (table, ",".join(record.keys()), ",".join(values)))
            return self.cursor.lastrowid
        except:
            error()

    def update(self, table, record, where):
        try:
            #TODO: Besser diesen Ansatz nehmen da sicherer: cur.executemany("insert into test(x) values (?)", [("a",), ("b",)])
            values = []
            for r in record:
                v = record[r]
                if verifier.isDict(v):
                    if len(v) > 0:
                        values.append('"' + r + '"=NULL')
                    else:
                        values.append('"' + r + '"=NULL')
                elif verifier.isTuple(v) or verifier.isList(v):
                    if len(v) > 1:
                        values.append('"' + r + '"="' + ";".join(["%s" % str(i) for i in v]) + '"')
                    elif len(v) > 0:
                        values.append('"' + r + '"="' + str(v[0]) + '"')
                    else:
                        values.append('"' + r + '"=NULL')
                elif verifier.isInt(v) or verifier.isFloat(v):
                    values.append(r + '=' + str(v))
                elif v == False:
                    values.append('"' + r + '"="False"')
                elif v == None:
                    values.append('"' + r + '"=NULL')
                else:
                    values.append('"' + r + '"="' + self.handleStrings(str(v)) + '"')
            return self.execute("UPDATE %s SET %s WHERE %s" % (table, ",".join(values), where))
        except:
            error()
