/**
 * Defining a Company Model in mongoose
 *
 * For Saving company name from e-mail id given in the time of registration
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Place Schema
 */
var TakesurveySchema = new mongoose.Schema({
    language: {type: String, default: ''},
    TSVY_CANCEL_BTN: {type: String,default: ''}, 
    TSVY_SUBMIT_BTN : {type: String,default: ''},
}, {
    collection: 'takesurveypage'
});

module.exports = mongoose.model('takesurveypage', TakesurveySchema);
