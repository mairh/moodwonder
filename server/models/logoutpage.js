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
var logoutpageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    LOUT_MESSAGE: {type: String, default: ''},
    LOUT_TEXTBEFORE_LOGIN: {type: String, default: ''},
    LOUT_LOGIN: {type: String, default: ''},
    LOUT_TEXTAFTER_LOGIN: {type: String, default: ''},
    
        
}, {
    collection: 'logoutpage'
});
module.exports = mongoose.model('logoutpage', logoutpageSchema);


