#!/usr/bin/env bash
pm2 start index.js -i 4 --watch --name='commons-source' -- --profiles test --logPath /logs/nodejs/commons-source/stdout.log --port 8080
