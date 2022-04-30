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
var mymoodpageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    MYMD_EGRAPH: {type: String, default: ''},
    MYMD_MRATING: {type: String, default: ''},
    MYMD_CSURVEY: {type: String, default: ''},
    MYMD_OPTMWINDEX: {type: String, default: ''},
    MYMD_OPTMOOD: {type: String, default: ''},
    MYMD_OPTMEANING: {type: String, default: ''},
    MYMD_OPTEXPECTATIONS: {type: String, default: ''},
    MYMD_OPTSTRENGTHS: {type: String, default: ''},
    MYMD_OPTRECOGNITION: {type: String, default: ''},
    MYMD_OPTDEVELOPMENT: {type: String, default: ''},
    MYMD_OPTINFLUENCE: {type: String, default: ''},
    MYMD_OPTGOALS: {type: String, default: ''},
    MYMD_OPTTEAM: {type: String, default: ''},
    MYMD_OPTFRIENDSHIP: {type: String, default: ''},
    MYMD_OPTFEEDBACK: {type: String, default: ''},
    MYMD_OPTOPPORTUNITIES: {type: String, default: ''},
    MYMD_OPTRECOMMENDATION: {type: String, default: ''},
    MYMD_OPTALLTIME: {type: String, default: ''},
    MYMD_OPTTWELVE: {type: String, default: ''},
    MYMD_OPTSIX: {type: String, default: ''},
    MYMD_OPTTHREE: {type: String, default: ''},
    MYMD_OPTLASTMONTH: {type: String, default: ''},
    MYMD_ATSTART: {type: String, default: ''},
    MYMD_HIGHEST: {type: String, default: ''},
    MYMD_LOWEST: {type: String, default: ''},
    MYMD_CURRENT: {type: String, default: ''},
    MYMD_DAYS_CHANGE: {type: String, default: ''},
    MYMD_WEEK_CHANGE: {type: String, default: ''},
    MYMD_E_ENGAGEMENT: {type: String, default: ''},
    MYMD_MOST_ENGAGING: {type: String, default: ''},
    MYMD_TOPTHREEAREAS_HEADING: {type: String, default: ''},
    MYMD_WORSTTHREEAREAS_HEADING: {type: String, default: ''},
    MYMD_MOSTIMPROVEDAREAS_HEADING: {type: String, default: ''},
    MYMD_LEASTIMPROVEDAREAS_HEADING: {type: String, default: ''},
    MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING: {type: String, default: ''},
    MYMD_LOWERTHANCOMPANYAVERAGE_HEADING: {type: String, default: ''},
    MYMD_HIGHERCAVERAGE_EMPTYMSG: {type: String, default: ''},
    MYMD_LOWERCAVERAGE_EMPTYMSG: {type: String, default: ''},
    MYMD_SGENERATION_TITLE: {type: String, default: ''},
    MYMD_SLISTSBTN: {type: String, default: ''},
    MYMD_STITLE: {type: String, default: ''},
    MYMD_TITLE_PLCHOLDER: {type: String, default: ''},
    MYMD_SFREEZE_DATE: {type: String, default: ''},
    MYMD_TARGET_GROUP: {type: String, default: ''},
    MYMD_TARGETORG: {type: String, default: ''},
    MYMD_TORG_DEFAULT_OPTION: {type: String, default: ''},
    MYMD_TARGETSURVEY: {type: String, default: ''},
    MYMD_TSURVEY_DEFAULT_OPTION1: {type: String, default: ''},
    MYMD_TSURVEY_DEFAULT_OPTION2: {type: String, default: ''},
    MYMD_QNS_TITLE: {type: String, default: ''},
    MYMD_ADD_QNS: {type: String, default: ''},
    MYMD_SUBMIT_SURVEY: {type: String, default: ''},
    MYMD_QNSTITLE: {type: String, default: ''},
    MYMD_QNSPLCHLOLDER: {type: String, default: ''},
    MYMD_ANSTYPE_LBL: {type: String, default: ''},
    MYMD_ANSTYPE_DEFAULT: {type: String, default: ''},
    MYMD_CHILD_ADDBTN: {type: String, default: ''},
    MYMD_CHILD_CANCELBTN: {type: String, default: ''}
        
}, {
    collection: 'mymoodpage'
});
module.exports = mongoose.model('mymoodpage', mymoodpageSchema);


