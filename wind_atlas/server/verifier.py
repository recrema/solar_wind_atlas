# -*- coding: utf-8 -*-

from types import *

def isTrue(obj):
    if str(obj).lower() in ("true", "yes", "ok", "ja", "checked", "selected"):
        return True
    else:
        return False


def isFalse(obj):
    if isTrue(obj):
        return False
    else:
        return True

def isString(obj):
    return type(obj) in (StringType, UnicodeType)

def isTuple(obj):
    return type(obj) is TupleType

def isList(obj):
    return type(obj) is ListType

def isDict(obj):
    return type(obj) is DictType

def isDigit(obj):
    try:
        return str(obj).isdigit()
    except:
        return False

def isInt(obj):
    return type(obj) is IntType

def isFloat(obj):
    return type(obj) is FloatType
