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
var surveyformspageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    SVFM_TITLE: {type: String, default: ''},
    SVFM_CREATE_BTN: {type: String, default: ''},
    SVFM_SEARCH_BOX: {type: String, default: ''},
    SVFM_TBLNUMBER: {type: String, default: ''},
    SVFM_TBLTITLE: {type: String, default: ''},
    SVFM_TBLDATE: {type: String, default: ''},
    SVFM_VIEWSURVEY_LINK: {type: String, default: ''},
    SVFM_VIEWRESPONSES_LINK: {type: String, default: ''},
    SVFM_DELETE_LINK: {type: String, default: ''}
}, {
    collection: 'surveyformspage'
});
module.exports = mongoose.model('surveyformspage', surveyformspageSchema);
