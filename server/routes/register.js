/**
 * Created by Roman on 09/02/2016.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../database/users')

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res, next)
{
    res.render('register.hbs');
});

var inser
router.post('/submit', urlencodedParser, function (req, res)
{
    // Prepare output in JSON format
    var response = {
        firstname:req.body.username,
        addresses:[req.body.ethaddr]
    };
    console.log(req.files.ppic);
    user.addNewUser(response, function(ret){
        if (!ret.status) {
            // TODO: Fail de la base ou alors user already exists
            console.log(ret.message);
        } else {
            console.log('User added');
        }
    })

    console.log(response);
    res.end(JSON.stringify(response));
});


module.exports = router;
