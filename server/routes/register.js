/**
 * Created by Roman on 09/02/2016.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../database/newUser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res, next)
{
    res.render('register.hbs');
});

var inser
router.post('/submit', urlencodedParser, function (req, res)
{
    // Prepare output in JSON format
    var response = {
        firstname:req.body.fname,
        lastname:req.body.lname,
        nickname:req.body.username,
        mail:req.body.mail,
        profilePic:"" // TODO: DATA DE LA PHOTO
    };

//    console.log(req.files.ppic);

    user.addUser(req.body.ethaddr, function(ret){
        if (!ret.status) {
            // TODO: Fail de la base ou alors user already exists
            console.log(ret.message);
        } else {
            console.log('User added', ret.body);
        }
    }, response);

    res.end(JSON.stringify(response));
});


module.exports = router;
