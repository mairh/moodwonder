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
var openendedsurveypageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    OPES_TOP_TITLE: {type: String, default: ''},
    OPES_OPTION: {type: String, default: ''},
    OPES_TOP_QNSONE: {type: String, default: ''},
    OPES_TOP_QNSTWO: {type: String, default: ''},
    OPES_TOP_QNSTHREE: {type: String, default: ''},
    OPES_WORST_TITLE: {type: String, default: ''},
    OPES_WORST_QNSONE: {type: String, default: ''},
    OPES_WORST_QNSTWO: {type: String, default: ''},
    OPES_WORST_QNSTHREE: {type: String, default: ''},
    OPES_MOOD: {type: String, default: ''},
    OPES_EXPECTATIONS: {type: String, default: ''},
    OPES_STRENGTHS: {type: String, default: ''},
    OPES_RECOGNITION: {type: String, default: ''},
    OPES_DEVELOPMENT: {type: String, default: ''},
    OPES_INFLUENCE: {type: String, default: ''},
    OPES_TEAM: {type: String, default: ''},
    OPES_FRIENDSHIP: {type: String, default: ''},
    OPES_FEEDBACK: {type: String, default: ''},
    OPES_OPPORTUNITIES: {type: String, default: ''},
    OPES_RECOMMENDATION: {type: String, default: ''},
    OPES_CANCEL_BTN: {type: String, default: ''},
    OPES_SUBMIT_BTN: {type: String, default: ''}
}, {
    collection: 'openendedsurveypage'
});
module.exports = mongoose.model('openendedsurveypage', openendedsurveypageSchema);


