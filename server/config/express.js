var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore =  require('connect-mongo')(session);
var path = require('path');
var secrets = require('./secrets');
var flash = require('express-flash');
var methodOverride = require('method-override');

module.exports = function (app, passport) {
  app.set('port', (process.env.PORT || secrets.portnumber));

  app.disable('x-powered-by');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.set('view cache', false);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '../..', 'public')));

  app.enable('trust proxy');

  app.use(cookieParser());

  var sess = {
        resave: true,
        saveUninitialized: true,
        // Use generic cookie name for security purposes
        key: 'sessionId',
        secret: secrets.sessionSecret,
        // Add HTTPOnly, Secure attributes on Session Cookie
        // If secure is set, and you access your site over HTTP, the cookie will not be set
        cookie: {
            httpOnly: true,
            maxAge: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000))
        },
        store: new MongoStore({url: secrets.db, autoReconnect: true})
    };
    
  app.use(session(sess));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

};
