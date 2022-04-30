/**
 * Defining a customSurveyResults schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var languagesSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    code: {type: String, default: ''}
}, {
    collection: 'languages'
});
module.exports = mongoose.model('languages', languagesSchema);
