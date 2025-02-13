// initial imports

const express = require('express');
const app = express();
// import path from nodejs
const path = require('path');
// select what port we r running project on in developmnent & when we deploy
// if a port number is saved, use that
const PORT = process.env.PORT || 3500;

// tell express where to find static files (i.e. css, images)
// __dirname says to look in the current dir
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))

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

// note the use of ` (backticks/template literals), not '
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


