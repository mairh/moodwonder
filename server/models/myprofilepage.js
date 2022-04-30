/**
 * Defining a My profile page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var myProfilePageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    PRFL_TAB_MYPROFILE: {type: String,default: ''},
    PRFL_TAB_MYMANAGER: {type: String,default: ''},
    PRFL_TAB_MYTEAM: {type: String,default: ''},
    PRFL_EDIT_PROFILE: {type: String,default: ''},
    PRFL_SUMMARY: {type: String,default: ''},
    PRFL_SMMRY_TITLE: {type: String,default: ''},
    PRFL_PERSONAL_INFO: {type: String,default: ''},
    PRFL_PINFO_FNAME : {type: String,default: ''},
    PRFL_PINFO_LNAME : {type: String,default: ''},
    PRFL_PINFO_CHANGE_PSWD : {type: String,default: ''},
    PRFL_PINFO_CNFM_PSWD : {type: String,default: ''},
    PRFL_GENERAL_INFO : {type: String,default: ''},
    PRFL_GINFO_WRK_EMAIL : {type: String,default: ''},
    PRFL_GINFO_LNG : {type: String,default: ''},
    PRFL_GINFO_RPT_FRQ : {type: String,default: ''},
    PRFL_MNGR_MYMANAGER: {type: String,default: ''}, 
    PRFL_MNGR_TOP_MSG: {type: String,default: ''}, 
    PRFL_MNGR_ROL: {type: String,default: ''}, 
    PRFL_MNGR_EMAIL: {type: String,default: ''}, 
    PRFL_MNGR_CHNG_MNGR: {type: String,default: ''}, 
    PRFL_MNGR_CANCEL: {type: String,default: ''}, 
    PRFL_MNGR_SUBMIT : {type: String,default: ''},
    PRFL_TEAM_TOP_MSG: {type: String,default: ''}, 
    PRFL_TEAM_ADD_TEAM: {type: String,default: ''}, 
    PRFL_TEAM_NAME: {type: String,default: ''},
    PRFL_TEAM_SAVE: {type: String,default: ''},
    PRFL_TEAM_SUBORDINATES: {type: String,default: ''}, 
    PRFL_TEAM_ADD_ANOTHER: {type: String,default: ''}, 
    PRFL_TEAM_WRK_EML: {type: String,default: ''}, 
    PRFL_TEAM_SUBORDINATES_SAVE: {type: String,default: ''}
}, {
    collection: 'myprofile'
});
module.exports = mongoose.model('myprofile', myProfilePageSchema);
