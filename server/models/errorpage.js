/**
 * Defining a schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var errorpageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    ERR_MESSAGE: {type: String, default: ''},
    ERR_TEXTBEFORE_LINK: {type: String, default: ''},
    ERR_REDIRECT_LINK: {type: String, default: ''}

}, {
    collection: 'errorpage'
});
module.exports = mongoose.model('errorpage', errorpageSchema);


