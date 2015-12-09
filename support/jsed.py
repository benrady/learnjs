#!/usr/bin/env python

import json,sys

json_file = open(sys.argv[1], "r+")
doc = json.load(json_file)

keys = sys.argv[2].split('.')

def search(d, keys):
    if len(keys) == 1:
        return d[keys[0]]
    else:
        return search(d[keys[0]], keys[1:])

print search(doc, keys)

