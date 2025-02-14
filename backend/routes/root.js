const express = require('express');
const router = express.Router();
const path = require('path');

// regex, optional html
// send the file back in the function
// get the index.html file that matches
router.get('^/$|/index(.html)?', (req, res) => {
    // where to find the file
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
});

// export values & functions in a node.js file
module.exports = router;