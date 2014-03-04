#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from os import environ
from sys import stdin
from handler import Handler

# Build an request from the CGI environment object that we pass to our handler
request = {
           "method": environ["REQUEST_METHOD"] if environ.has_key("REQUEST_METHOD") else "GET",
           "path": environ["REDIRECT_URL"] if environ.has_key("REDIRECT_URL") else "",
           "query": environ["QUERY_STRING"] if environ.has_key("QUERY_STRING") else "",
           "server": environ["SERVER_NAME"] if environ.has_key("SERVER_NAME") else "",
           "rootfolder": environ["DOCUMENT_ROOT"] if environ.has_key("DOCUMENT_ROOT") else "",
           "language": environ["HTTP_ACCEPT_LANGUAGE"] if environ.has_key("HTTP_ACCEPT_LANGUAGE") else "en",
           "agent": environ["HTTP_USER_AGENT"] if environ.has_key("HTTP_USER_AGENT") else "",
           "authorization": environ["HTTP_AUTHORIZATION"] if environ.has_key("HTTP_AUTHORIZATION") else (environ["REDIRECT_HTTP_AUTHORIZATION"] if environ.has_key("REDIRECT_HTTP_AUTHORIZATION") else None),
           "authdialog": environ["HTTP_X_AUTH_DIALOG"] if environ.has_key("HTTP_X_AUTH_DIALOG") else True,
           "contentlength": environ["CONTENT_LENGTH"] if environ.has_key("CONTENT_LENGTH") else None,
           "contenttype": environ["CONTENT_TYPE"] if environ.has_key("CONTENT_TYPE") else [],
           "content": stdin.read()
           }

# Call the request handler
try:
    Handler.handleRequest(request, debug = True)
except:
    pass
