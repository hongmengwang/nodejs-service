##Nodejs Service Demo
This is a test for nodejs backend Service

##Module

* npm 3.10.1
    * bunyan: 1.8.1
    * dtrace-provider: 0.6.0
    * minimist: 1.2.0
    * moment: 2.14.1
    * mysql: 2.11.1
    * nconf: 0.8.4
    * restify: 4.1.1

##Feedback
* Email: wanghongmeng@live.cn

##Install
```javascript
  npm install
```

##Start
```javascript
  node index.js
```

##PM2 Start
```javascript
  pm2 start index.js -i 4 --watch --name='nodejs-service' -- --profiles test --logPath /logs/nodejs/nodejs-service/stdout.log --port 8080
```
