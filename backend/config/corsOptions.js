const allowedOrigins = require('./allowedOrigins');

// third party middleware!!
const corsOptions = {
    origin: (origin, callback) => {
        // only those in the array of origins can access our restAPI
        // !origin is no origin (i.e. desktop)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // if successful, passback an error object (null bc no error) and the allowed boolean (true or false)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // sets access control allow credentials header
    credentials: true, 
    // usu 204, some devices have problems
    optionsSuccessStatus: 200
};

module.exports = corsOptions;