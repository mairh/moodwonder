/**
 * Defining a Invite Signup page schema Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema
 */
var InviteSignupSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    INVITESIGNUP_TITLE: {type: String, default: ''},
    INVITESIGNUP_PLACEHOLDER_EMAIL: {type: String, default: ''},
    INVITESIGNUP_BTN: {type: String, default: ''}
}, {
    collection: 'invitesignuppage'
});
module.exports = mongoose.model('invitesignuppage', InviteSignupSchema);
