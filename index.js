'use-strict';

const fs = require('fs');
const path = require('path');

const gsloggerKey = {
    'levels' : [
        'log', 'debug', 'info', 'notice', 'warn', 'error', 'emergency', 'critical' ],
    'channel' : [
        'minute', 'hourly', 'daily', 'monthly', 'yearly', 'single' ]
}

var gslogger = function(){
    this.configContainer = {};
    this.level = 'log';
    gsloggerKey.levels.forEach((level) => {
        this.generateFunction(level);
    });
}

gslogger.prototype.config = function(payload){
	if (typeof payload !== 'object') {
        throw new Error('Please use object parameter in config');
    }
	if (typeof payload.logPath === 'undefined') {
        throw new Error('logPath required');
    }
    if (typeof payload.fileName === 'undefined') {
        throw new Error('fileName required');
    }
    if (typeof payload.channel === 'undefined') {
        throw new Error('channel required');
    }

	this.configContainer = payload;
}

gslogger.prototype.updateFolderName = function(){
    const folderMoment = new Date();
    switch(this.configContainer.channel){
        case 'minute' :
            this.configContainer.folderName = `${folderMoment.getFullYear()}${this.twoDigit(folderMoment.getMonth())}${this.twoDigit(folderMoment.getDate())}${this.twoDigit(folderMoment.getHours())}${this.twoDigit(folderMoment.getMinutes())}`;
            break;
        case 'hourly' :
            this.configContainer.folderName = `${folderMoment.getFullYear()}${this.twoDigit(folderMoment.getMonth())}${this.twoDigit(folderMoment.getDate())}${this.twoDigit(folderMoment.getHours())}`;
            break;
        case 'daily'  :
            this.configContainer.folderName = `${folderMoment.getFullYear()}${this.twoDigit(folderMoment.getMonth())}${this.twoDigit(folderMoment.getDate())}`;
            break;
        case 'monthly' :
            this.configContainer.folderName = `${folderMoment.getFullYear()}${this.twoDigit(folderMoment.getMonth())}`;
            break;
        case 'yearly' :
            this.configContainer.folderName = folderMoment.getFullYear();
            break;
        case 'single' :
            this.configContainer.folderName = this.configContainer.fileName;
            break;
        default :
            throw new Error('Invalid channel name');
            break;

    }

    this.configContainer.mainPath = path.join(path.dirname(require.main.filename), this.configContainer.logPath);
    
    if (!fs.existsSync(this.configContainer.mainPath)){
        fs.mkdirSync(this.configContainer.mainPath);
    }

    if(!fs.existsSync(this.configContainer.mainPath + '/' + this.configContainer.folderName))
    {
        fs.mkdirSync(this.configContainer.mainPath + '/' + this.configContainer.folderName);
    }

    this.configContainer.mainPath = this.configContainer.mainPath + '/' + this.configContainer.folderName

}

gslogger.prototype.generateLogFile = function(payload){
    this.updateFolderName();
    var logFile = fs.createWriteStream(this.configContainer.mainPath + "/" +this.configContainer.fileName+".log", {flags : 'a'});
    this.writeLog(logFile, payload);
}

gslogger.prototype.prepareLogContent = function(payload){
    let logTimeStamps = this.prepareTimeStamp();
    return ` ${logTimeStamps} [${this.level}] ${payload} \r\n`;
}

gslogger.prototype.writeLog = function(logFile, payload){
    logFile.write(this.prepareLogContent(payload));
}

gslogger.prototype.generateFunction = function (level) {
    this[level] = function (logContext) {
        this.level = level;
        this.generateLogFile(logContext);
    }
}

gslogger.prototype.prepareTimeStamp = function() {
    const longDate = new Date();
    return `${longDate.getFullYear()}-${this.twoDigit(longDate.getMonth())}-${this.twoDigit(longDate.getDate())} ${this.twoDigit(longDate.getHours())}:${this.twoDigit(longDate.getMinutes())}:${this.twoDigit(longDate.getSeconds())}`;
}

gslogger.prototype.twoDigit = function(n) {
    return n < 10 ? '0' + n : n;
}


module.exports = new gslogger();