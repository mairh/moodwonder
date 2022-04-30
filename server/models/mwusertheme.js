/**
 * Defining a mwtheme page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var mwuserthemeSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    L_MYMOOD_LINK: {type: String, default: ''},
    L_MYACCOUNT_LINK: {type: String, default: ''},
    L_MYCOMPANY_LINK: {type: String, default: ''},
    L_CAST_VOTE: {type: String, default: ''},
    L_VIEW_VOTE: {type: String, default: ''},
    L_MY_SURVEYS: {type: String, default: ''},
    L_PARTICIPATE_SURVEYS: {type: String, default: ''},
    L_ENGAGEMENT_SURVEY: {type: String, default: ''},
    L_CREATE_NEW_SURVEY: {type: String, default: ''},
    L_OPENENDED_RESPONSES: {type: String, default: ''},
    L_MOODRATE: {type: String, default: ''},
    L_INVITEPEOPLE: {type: String, default: ''},
    L_INVITE_PEOPLE_TITLE: {type: String, default: ''},
    L_INVITE_PEOPLE_DES: {type: String, default: ''},
    L_INVITE_INPUT_PLCHOLDER: {type: String, default: ''},
    L_INVITE_BTN: {type: String, default: ''},
    L_MYPROFILE_LINK: {type: String, default: ''},
    L_LOGOUT_LINK: {type: String, default: ''},
    TOP_RATE_YOURMOOD: {type: String, default: ''},
    TOP_RATE_YOUR_MOODDESC: {type: String, default: ''},
    TOP_RATE_YOUR_MOODBTN: {type: String, default: ''},
    TOP_RATE_YOUR_MOODANSWER_ALL_BTN: {type: String, default: ''},
    TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: {type: String, default: ''},
    TOP_RIGHT_SIDE_LOGOUT_LINK: {type: String, default: ''},
    RIGHT_SIDEBAR_QUICK_STATISTICS: {type: String, default: ''},
    RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: {type: String, default: ''},
    RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: {type: String, default: ''},
    RIGHT_SIDEBAR_NO_OF_RESPONSES: {type: String, default: ''},
    RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: {type: String, default: ''},
    RIGHT_SIDEBAR_RESPONSE_COMPARISON: {type: String, default: ''},
    TAB_EGRAPH: {type: String, default: ''},
    TAB_MRATING: {type: String, default: ''},
    TAB_CSURVEY: {type: String, default: ''},
    MW_OPTMOOD: {type: String, default: ''},
    MW_OPTMEANING: {type: String, default: ''},
    MW_OPTEXPECTATIONS: {type: String, default: ''},
    MW_OPTSTRENGTHS: {type: String, default: ''},
    MW_OPTRECOGNITION: {type: String, default: ''},
    MW_OPTDEVELOPMENT: {type: String, default: ''},
    MW_OPTINFLUENCE: {type: String, default: ''},
    MW_OPTGOALS: {type: String, default: ''},
    MW_OPTTEAM: {type: String, default: ''},
    MW_OPTFRIENDSHIP: {type: String, default: ''},
    MW_OPTFEEDBACK: {type: String, default: ''},
    MW_OPTOPPORTUNITIES: {type: String, default: ''},
    MW_OPTRECOMMENDATION: {type: String, default: ''},
    MDL_COMMENT_HEADER: {type: String, default: ''},
    MDL_CLOSE_BTN: {type: String, default: ''}
        
}, {
    collection: 'mwusertheme'
});
module.exports = mongoose.model('mwusertheme', mwuserthemeSchema);
