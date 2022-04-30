var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var passport = require('passport');
var secrets = require('./config/secrets');
var autoIncrement = require('mongoose-auto-increment');
var Admin = require('./models/admin');
var User = require('./models/user');

var multer = require("multer");
var path = require('path');
app.use(multer());

// Find the appropriate database to connect to, default to localhost if not found.
var connect = function () {
    mongoose.connect(secrets.db, function (err, res) {
        if (err) {
            console.log('Error connecting to: ' + secrets.db + '. ' + err);
        } else {
            console.log('Succeeded connected to: ' + secrets.db);
        }
    });
};
connect();

//delete mongoose.connection.models['User'];

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function (file) {
    if (~file.indexOf('.js'))
        require(__dirname + '/models/' + file);
});

// Bootstrap passport config
// For user login
//require('./config/passport')(app, passport);


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Admin.findById(id, function (err, user) {
        if (err)
            done(err);
        if (user) {
            done(null, user);
        } else {
            User.findById(id, function (err, user) {
                if (err)
                    done(err);
                done(null, user);
            });
        }
    });
});

// Bootstrap application settings
require('./config/express')(app, passport);
// Bootstrap routes
require('./config/routes')(app, passport);
server.listen(app.get('port'));
