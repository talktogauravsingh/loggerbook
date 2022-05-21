# loggerbook - A Modern Logging Package


## What ?
loggerbook is modern logging package and it will help you to learn more about what's happening within your application. It provides robust logging services that allow you to log messages to files, the system error log, and even to email to notify your entire team.

loggerbook logging is based on "channels". Each channel represents a specific way of writing log information. For example, the single channel writes log files to a single log folder, while the hourly and monthly channel create a folder on their defination basis.

## Install
Install via npm
```bash
npm i loggerbook
```

Install via yarn
```bash
yarn i loggerbook
```

## How to use ?

On top of the file set the logger config
```javascript
var gslogger = require("loggerbook");

gslogger.config({
	logPath : "/log",
	fileName : "gaurav",
	channel : "hourly"
});
```

#### config function overview
Particulars   | Defination
------------- | -------------
logPath       | Path where you want to keep your log file
fileName      | define log file name 
channel       | logging folder rotation type


Now you can log your context or error by using below function
```javascript
gslogger.log('Add it in log file');
gslogger.debug('Hii Gaurav');
gslogger.info('{ "name": "Gaurav Singh", "Designation" : "Software Developer" }');
gslogger.notice('["javascript", "node", "react", "angular"]');
gslogger.warn('this is warn log');
gslogger.error('Hey, Somthing went wrong');
gslogger.emergency('lafda ho gya!');
gslogger.critical('this is critical message');
```

### Available Channel
Particulars   | Defination
------------- | -------------
minute        | Minute wise rotation of logging folder (for testing purpose)
hourly        | Hourly rotation type
daily         | On daily basis rotation
monthly       | Monthly basis rotation
yearly        | yearly basis rotation
single        | log in single file and folder

### Available Logging Type
```bash
    log, debug, info, notice, warn, error, emergency, critical 
```