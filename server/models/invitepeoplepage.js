/**
 * Defining a mood rating schema Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schema
 */
var invitepeoplepageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    INP_TITLE: {type: String, default: ''},
    INP_DESCRIPTION: {type: String, default: ''},
    INP_PLCHOLDER: {type: String, default: ''},
    INP_INVITEBTN: {type: String, default: ''}

}, {
    collection: 'invitepeoplepage'
});
module.exports = mongoose.model('invitepeoplepage', invitepeoplepageSchema);
