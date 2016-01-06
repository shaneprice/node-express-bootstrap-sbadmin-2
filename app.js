var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var routes = require('./routes/index');
var users = require('./routes/user');
var forms = require('./routes/forms');
var tables = require('./routes/tables');
var buttons = require('./routes/buttons');
var panelWells = require('./routes/panels-wells');
var notifications = require('./routes/notifications');
var typography = require('./routes/typography');
var icons = require('./routes/icons');
var flot = require('./routes/flot');
var morris = require('./routes/morris');

var blank = require('./routes/blank');
var login = require('./routes/login');


var grid = require('./routes/grid');
var app = express();
var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

// view engine setup

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/forms',forms);
app.use('/tables',tables);
app.use('/buttons',buttons);
app.use('/panels-wells',panelWells);
app.use('/grid',grid);
app.use('/typography',typography);
app.use('/notifications',notifications);
app.use('/flot',flot);
app.use('/morris',morris);
app.use('/blank',blank);
app.use('/login',login);

app.use('/icons',icons);
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
