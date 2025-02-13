// initial imports

const express = require('express');
const app = express();
// import path from nodejs
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
// select what port we r running project on in developmnent & when we deploy
// if a port number is saved, use that
const PORT = process.env.PORT || 3500;

// want logger to come before everything else
app.use(logger);

app.use(cors(corsOptions));

// allow app to receive and parse json data
app.use(express.json());

// parse cookies that we see
app.use(cookieParser());

// tell express where to find static files (i.e. css, images)
// __dirname says to look in the current dir
// this is middleware :D
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

// call 404 page
app.all('*', (req, res) => {
    res.status(404);
    // if req has an accepts header that is html
    if (req.accepts('html')) {
        // at server level
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'});
    } else {
        res.type('txt'.send('404 Not Found'));
    }
})

//put error handler right before we tell the app to start listening
app.use(errorHandler);

// note the use of ` (backticks/template literals), not '
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


