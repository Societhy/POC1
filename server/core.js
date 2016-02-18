var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var organisation = require('./routes/organisation');
var register = require('./routes/register');
var debug = require('./routes/debug');

var app = express();
var db = require('./database/db');
var dbUser = require('./database/users');
var dbOrga = require('./database/orga');
var url = 'mongodb://10.41.177.67:27017/test';

var fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, 'public')));
app.use("/contract", express.static(path.join(__dirname, "../environments/development/build")));

db.connect(url, function (err) {
    if (err){
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        console.log('Connected to db');

        // USAGE: ADD NEW USER
        var user1 = {"addresses":["0x00000001", "0x0000000a"], "firstname":"user1", "lastname":"user1", "mail":"u@1.com", "photo":null, "listOrga":[], "transHisto":[], "infos":[]};
        dbUser.addNewUser(user1, function(ret) {
            if (!ret.status)
            console.log(ret.message);
            else
            console.log('User well added');
        });

        // USAGE: ADD NEW ORGA
        var MSF = {"name":"Medecins Sans Frontiere", "memberList":[], "transHisto":[], "actualities":[]};
        dbOrga.addNewOrga(MSF, function(ret) {
            if (!ret.status)
            console.log(ret.message);
            else
            console.log('Orga well added');
        });

        // USAGE: GET USER
        dbUser.getUserByAddress("0xea662181", function(ret) {
            if (!ret.status) {
                console.log('Error:', ret.message);
                return;
            }
            console.log(ret.body.firstname, ret.body.lastname);
        });

        // USAGE: GET ORGA
        dbOrga.getOrgaByName('unicef', function(ret) {
            if (!ret.status) {
                console.log('Error:', ret.message);
                return;
            }
            console.log(ret.body.name, ret.body.memberList);
        });

        // USAGE: CHANGE USER PROFILE PICTURE
        fs.readFile("./test/img/grout_r.jpg", 'base64', function(err, data){
            if (err) {
                return console.log(err);
            }
            dbUser.changeProfilePicture({addresses:'0x00000002'}, data, function(ret) {
                if (!ret.status){
                    console.log(ret.message);
                } else {
                    console.log(ret.message);
                }
            });
        });

        // USAGE: GET USER PROFILE PICTURE
        dbUser.getProfilePicture({addresses:'0x00000002'}, function(ret) {
            if (!ret.status) {
                console.log(ret.message);
            } else {
                fs.writeFile('./grout_lol.jpg', ret.body.data, 'base64', function(err){
                    if (err) {
                        return console.log(err);
                    }
                    console.log('File created.');
                });
            }
        });
    }
});

//routing
app.use('/', index);
app.use('/users', users);
app.use('/organisation', organisation);
app.use('/register', register);
app.use('/debug', debug);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
