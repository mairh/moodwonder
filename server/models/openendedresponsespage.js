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
var openendedresponsespageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    OPER_TITLE: {type: String, default: ''},
    OPER_MOST_IMPROVED: {type: String, default: ''},
    OPER_LEAST_IMPROVED: {type: String, default: ''},
    OPER_OPTALL: {type: String, default: ''},
    OPER_OPTMOOD: {type: String, default: ''},
    OPER_OPTMEANING: {type: String, default: ''},
    OPER_OPTEXPECTATIONS: {type: String, default: ''},
    OPER_OPTSTRENGTHS: {type: String, default: ''},
    OPER_OPTRECOGNITION: {type: String, default: ''},
    OPER_OPTDEVELOPMENT: {type: String, default: ''},
    OPER_OPTINFLUENCE: {type: String, default: ''},
    OPER_OPTGOALS: {type: String, default: ''},
    OPER_OPTTEAM: {type: String, default: ''},
    OPER_OPTFRIENDSHIP: {type: String, default: ''},
    OPER_OPTFEEDBACK: {type: String, default: ''},
    OPER_OPTOPPORTUNITIES: {type: String, default: ''},
    OPER_OPTRECOMMENDATION: {type: String, default: ''}
}, {
    collection: 'openendedresponsespage'
});
module.exports = mongoose.model('openendedresponsespage', openendedresponsespageSchema);


