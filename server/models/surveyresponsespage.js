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
var SurveyresponsespageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    SVRS_LIST_BTN: {type: String,default: ''}, 
    SVRS_NODATA_MSG : {type: String,default: ''},
}, {
    collection: 'surveyresponsespage'
});

module.exports = mongoose.model('surveyresponsespage', SurveyresponsespageSchema);
