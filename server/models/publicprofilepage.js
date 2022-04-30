/**
 * Defining a public profile page schema Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema
 */
var publicprofilePageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    PUBLIC_PROFILE_VOTE_BTN: {type: String, default: ''},
    PUBLIC_PROFILE_VOTES: {type: String, default: ''},
    PUBLIC_PROFILE_MANAGERS: {type: String, default: ''},
    PUBLIC_PROFILE_SURVEYS_PARTICIPATED: {type: String, default: ''},
    PUBLIC_PROFILE_TEAMS: {type: String, default: ''}
}, {
    collection: 'publicprofilepage'
});
module.exports = mongoose.model('publicprofilepage', publicprofilePageSchema);
