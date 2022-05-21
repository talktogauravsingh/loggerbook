
var gslogger = require("loggerbook");


/**
 * @param logPath
 * @param fileName
 * @param channel : [ 'minute', 'hourly', 'daily', 'monthly', 'yearly', 'single' ]
 * **/
gslogger.config({
	logPath : "/log",
	fileName : "gaurav",
	channel : "hourly"
});

/**
 * All available logging function are listed here
 * **/

gslogger.log('Add it in log file');
gslogger.debug('Hii Gaurav');
gslogger.info('{ "name": "Gaurav Singh", "Designation" : "Software Developer" }');
gslogger.notice('["javascript", "node", "react", "angular"]');
gslogger.warn('this is warn log');
gslogger.error('Hey, Somthing went wrong');
gslogger.emergency('lafda ho gya!');
gslogger.critical('this is critical message');