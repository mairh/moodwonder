/**
 * Defining a employee of the month page schema Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema
 */
var employeeofthemonthPageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    EOM_TITLE_1: {type: String, default: ''},
    EOM_SEARCH_PLACEHOLDER_1: {type: String, default: ''},
    EOM_SEARCH_BTN_1: {type: String, default: ''},
    EOM_SHOW_MORE: {type: String, default: ''},
    EOM_VOTE_BTN: {type: String, default: ''},
    EOM_VOTECOUNT_TEXT: {type: String, default: ''},
    EOM_VOTE_PERIOD: {type: String, default: ''},
    EOM_POPUP_TITLE: {type: String, default: ''},
    EOM_POPUP_COMMENT: {type: String, default: ''},
    EOM_POPUP_VOTE_BTN: {type: String, default: ''},
    EOM_POPUP_CLOSE_BTN: {type: String, default: ''},
    EOM_VOTE_COUNT_MESSAGE: {type: String, default: ''},
    EOM_VIEWVOTES_TITLE_1: {type: String, default: ''},
    EOM_VIEWVOTES_SELECT: {type: String, default: ''},
    EOM_VIEW_VOTES_SELECTED: {type: String, default: ''},
    EOM_VIEWVOTES_POPUP_TITLE: {type: String, default: ''},
    EOM_VIEWVOTES_POPUP_MESSAGE: {type: String, default: ''},
    EOM_VIEWVOTES_POPUP_CLOSEBTN: {type: String, default: ''},
    EOM_VIEWVOTES_POPUP_PROCEEDBTN: {type: String, default: ''}
}, {
    collection: 'employeeofthemonthpage'
});
module.exports = mongoose.model('employeeofthemonthpage', employeeofthemonthPageSchema);
