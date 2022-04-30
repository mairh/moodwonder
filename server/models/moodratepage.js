/**
 * Defining a mood rating schema Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schema
 */
var moodratepageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    MDR_RATEMOOD: {type: String, default: ''},
    MDR_MOODDESC: {type: String, default: ''},
    MDR_MOODBTN: {type: String, default: ''},
    MDR_MOODANSWER_ALL_BTN: {type: String, default: ''}

}, {
    collection: 'moodratepage'
});
module.exports = mongoose.model('moodratepage', moodratepageSchema);
