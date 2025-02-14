const { logEvents } = require('./logger');

// error handling
const errorHandler = (err, req, res, next) => {
    // call logEvents, include error name and message
    // request method, url, origin
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    // give details abt error, and where it is specificlaly
    console.log(err.stack);

    // is status code set? if not, return 500 for server error
    const status = res.statusCode ? res.statusCode : 500;

    // set status to what ternary (? :) determines
    res.status(status);

    // response in json data
    res.json({ message: err.message });

};

module.exports = errorHandler;