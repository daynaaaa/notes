// destructure format
const { format } = require ('date-fns');
// getting v4 when we destructure, and we rename it uuid
const {v4: uuid} = require('uuid');
// fs module for file system
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// helper function (async function that receives a message and a logFileName)
const logEvents = async (message, logFileName) => {
    // date time variable using forma function
    // new Date() object from nodejs, this is how we're formatting it
    const dateTime = '${format(new Date(), "yyyyMMdd\tHH:mm:ss")}';
    // needs to be template literal
    // \t tab
    // uuid() creates a specific id for each log item
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        // if directory does not exist, error
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            // if it doesn't exist, create it
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        // append to log file
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
};

// actual middle ware
const logger = (req, res, next) => {
    // call the logEvents function just made
    // origin is where the requies originated from
    // reqLog.log is a txt file, but convention for writing logs
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');

    console.log(`${req.method} ${req.path}`);
    // next piece of middleware
    next();
};

module.exports = {logEvents, logger}