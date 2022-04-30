/**
 * Defining a login page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var loginPageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    LGN_BTN_SUBMIT: {type: String, default: ''},
    LGN_PLACEHOLDER_EMAIL: {type: String, default: ''},
    LGN_PLACEHOLDER_PASSWORD: {type: String, default: ''},
    LGN_BTN: {type: String, default: ''},
    LGN_FORGOT_PSWD: {type: String, default: ''},
    LGN_SIGNUP: {type: String, default: ''}
        
}, {
    collection: 'loginpage'
});
module.exports = mongoose.model('loginpage', loginPageSchema);
