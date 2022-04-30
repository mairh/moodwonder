/**
 * Defining a Forgot Password page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');


/**
 * Schema
 */
var forgotPasswordPageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    FORGOTPASS_TITLE: {type: String, default: ''},
    FORGOTPASS_PLACEHOLDER_PASSWORD: {type: String, default: ''},
    FORGOTPASS_BTN_CREATE: {type: String, default: ''}

}, {
    collection: 'forgotpasswordpage'
});
module.exports = mongoose.model('forgotpasswordpage', forgotPasswordPageSchema);
