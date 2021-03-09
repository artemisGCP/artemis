var express = require('express');
var router = express.Router();
var path = require('path');

//Render login 
router.get('/', function (req, res) {
    res.json({
        message: 'Success. You are viewing the login page'
    });
})

// Everything else gets directed to 404 page.
/*
router.get('/*', function (req, res) {
    res.send("404");
})
*/

module.exports = router;