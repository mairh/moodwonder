/**
 * Defining a signup page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var signupPageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    SGN_TITLE: {type: String, default: ''},
    SGN_WORK_EMAIL: {type: String, default: ''},
    SGN_BTN_SUBMIT: {type: String, default: ''},
    SGN_FOOTER_TERMS: {type: String, default: ''},
    SGN_FOOTER_POLICY: {type: String, default: ''}
}, {
    collection: 'signuppage'
});
module.exports = mongoose.model('signuppage', signupPageSchema);
