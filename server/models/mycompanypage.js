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
var mycompanypageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    MYCO_EGRAPH: {type: String, default: ''},
    MYCO_CRATING: {type: String, default: ''},
    MYCO_COMPANYINFO: {type: String, default: ''},
    MYCO_TITLE: {type: String, default: ''},
    MYCO_OPTMWINDEX: {type: String, default: ''},
    MYCO_OPTMOOD: {type: String, default: ''},
    MYCO_OPTMEANING: {type: String, default: ''},
    MYCO_OPTEXPECTATIONS: {type: String, default: ''},
    MYCO_OPTSTRENGTHS: {type: String, default: ''},
    MYCO_OPTRECOGNITION: {type: String, default: ''},
    MYCO_OPTDEVELOPMENT: {type: String, default: ''},
    MYCO_OPTINFLUENCE: {type: String, default: ''},
    MYCO_OPTGOALS: {type: String, default: ''},
    MYCO_OPTTEAM: {type: String, default: ''},
    MYCO_OPTFRIENDSHIP: {type: String, default: ''},
    MYCO_OPTFEEDBACK: {type: String, default: ''},
    MYCO_OPTOPPORTUNITIES: {type: String, default: ''},
    MYCO_OPTRECOMMENDATION: {type: String, default: ''},
    MYCO_MYSELF : {type: String, default: ''},
    MYCO_HEADING_TOPTHREE : {type: String, default: ''},
    MYCO_HEADING_WORSTTHREE : {type: String, default: ''},
    MYCO_HEADING_MOSTIMPROVED : {type: String, default: ''},
    MYCO_HEADING_LEASTIMPROVED : {type: String, default: ''},
    MYCO_INFO_HEADING : {type: String, default: ''},
    MYCO_INFO_SUBMIT : {type: String, default: ''},
    MYCO_INFO_PLCHLDR_COMPANYNAME : {type: String, default: ''},
    MYCO_INFO_PLCHLDR_INDUSTRY : {type: String, default: ''},
    MYCO_INFO_PLCHLDR_CONTINENT : {type: String, default: ''},
    MYCO_INFO_PLCHLDR_COUNTRY : {type: String, default: ''},
    MYCO_INFO_PLCHLDR_STATE : {type: String, default: ''},
    MYCO_INFO_PLCHLDR_CITY : {type: String, default: ''},
    MYCO_INFO_PLCHLDR_ADDRESS : {type: String, default: ''},
    MYCO_INFO_PLCHLDR_WEBSITE : {type: String, default: ''}
        
}, {
    collection: 'mycompanypage'
});
module.exports = mongoose.model('mycompanypage', mycompanypageSchema);


