var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var organisation = require('./routes/organisation');
var register = require('./routes/register');
var project = require('./routes/project');
var fundraise = require('./routes/fundraise');

var api = require('./api/api.js');

var app = express();
var db = require('./database/db');
var url = 'mongodb://10.224.9.117:27017/test';

var fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, 'public')));
app.use("/eth", express.static(path.join(__dirname, "../environments/development/build")));

db.connect(url, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        console.log('Connected to db');
    }
});

//routing
app.use('/', index);
app.use('/user', user);
app.use('/organisation', organisation);
app.use('/register', register);
app.use('/project', project);
app.use('/fundraise', fundraise);

//api
app.use('/api', api);

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
