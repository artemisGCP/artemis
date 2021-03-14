var express = require('express');
var router = express.Router();
var path = require('path');

//Render homepage with index.html
router.get('/', function (req, res) {
    res.json({
        message: 'Success. You are viewing the Training page'
    });
})

// Purpose: Posts training data to external API -- what is url?
router.post('/', function (req, res) {
    console.error("Nothing to train yet");
})

// Everything else gets directed to 404 page.
/*
router.get('/*', function (req, res) {
    res.send("404");
})
*/

module.exports = router;