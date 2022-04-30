var express = require('express');
var _ = require('lodash');
var Admin = require('../models/admin');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var validations = require('../controllers/validationRules');
var App = require('../../public/assets/app.server');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var LocalStrategy = require('passport-local').Strategy;


/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * Encrypt password
 */
exports.encryptPassword = function (req, res, next) {

    var password = req.body.password.trim();

    if (password.length >= 6) {

        bcrypt.genSalt(5, function (err, salt) {

            if (!err) {
                bcrypt.hash(password, salt, null, function (err, hash) {
                    if (!err) {
                        req.body.real_password = req.body.password;
                        req.body.password = hash;
                        next();
                    }
                    else {
                        // bcrypt.hash Error
                        response.status = false;
                        response.message = 'Something went wrong..';
                        res.send(response);
                        res.end();
                    }
                });
            } else {
                // bcrypt.genSalt Error
                response.status = false;
                response.message = 'Something went wrong..';
                res.send(response);
                res.end();
            }
        });
    } else {
        req.body.password = '';
        next();
    }
}

/**
 * Check login status
 */
exports.checkLogin = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.json({'status': false, 'message': 'Session expired.!'});
        res.end();
    }
}

/**
 * Login
 */
exports.login = function (req, res, next) {

    // Do email and password validation for the server
    passport.use('local-admin', new LocalStrategy({
        usernameField: 'username'
    }, function (username, password, done) {
        Admin.findOne({username: username}, function (err, user) {
            if (!user)
                return done(null, false, {message: 'Username ' + username + ' not found'});
            user.comparePassword(password, function (err, isMatch) {
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid username or password'});
                }
            });
        });
    }));

    //passport.authenticate('local', function (err, user, info) {
    passport.authenticate('local-admin', function (err, user, info) {
        if (err)
            return next(err);
        if (!user) {
            response.status = 'failure';
            response.message = info.message;
            res.send(response);
            res.end();
            return;
        }
        // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
        req.logIn(user, function (err) {
            if (err)
                return next(err);
            response.status = 'success';
            response.message = 'Success! You are logged in';
            response.user = user;
            res.send(response);
            res.end();
        });
    })(req, res, next);
};

/**
 * Logout
 */
exports.logout = function (req, res, next) {
    req.logout();
    //req.logOut();
    req.session.destroy();
    next();
};

/**
 * Admin check
 */
exports.getLoggedIn = function (req, res, next) {
    // Do email and password validation for the server
    // console.log(req.user.role);
    if ((req.user) && (req.user.role == "ADMIN")) {
        res.json({authenticated: true, role: req.user.role});
        next();
    } else {
        //res.json({authenticated: false, role: req.user.role});
        res.redirect('/admin');
    }
    
};

