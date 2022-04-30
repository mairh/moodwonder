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
var surveypageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    SRVY_TITLE: {type: String, default: ''},
    SRVY_MOOD_KEY: {type: String, default: ''},
    SRVY_MEANING_KEY: {type: String, default: ''},
    SRVY_EXPECTATIONS_KEY: {type: String, default: ''},
    SRVY_STRENGTHS_KEY: {type: String, default: ''},
    SRVY_RECOGNITION_KEY: {type: String, default: ''},
    SRVY_DEVELOPMENT_KEY: {type: String, default: ''},
    SRVY_INFLUENCE_KEY: {type: String, default: ''},
    SRVY_GOALS_KEY: {type: String, default: ''},
    SRVY_TEAM_KEY: {type: String, default: ''},
    SRVY_FRIENDSHIP_KEY: {type: String, default: ''},
    SRVY_FEEDBACK_KEY: {type: String, default: ''},
    SRVY_OPPORTUNITIES_KEY: {type: String, default: ''},
    SRVY_RECOMMENDATION_KEY: {type: String, default: ''},
    SRVY_MOOD_DES: {type: String, default: ''},
    SRVY_MEANING_DES: {type: String, default: ''},
    SRVY_EXPECTATIONS_DES: {type: String, default: ''},
    SRVY_STRENGTHS_DES: {type: String, default: ''},
    SRVY_RECOGNITION_DES: {type: String, default: ''},
    SRVY_DEVELOPMENT_DES: {type: String, default: ''},
    SRVY_INFLUENCE_DES: {type: String, default: ''},
    SRVY_GOALS_DES: {type: String, default: ''},
    SRVY_TEAM_DES: {type: String, default: ''},
    SRVY_FRIENDSHIP_DES: {type: String, default: ''},
    SRVY_FEEDBACK_DES: {type: String, default: ''},
    SRVY_OPPORTUNITIES_DES: {type: String, default: ''},
    SRVY_RECOMMENDATION_DES: {type: String, default: ''},
    SRVY_SUBMIT_BTN: {type: String, default: ''}
}, {
    collection: 'surveypage'
});
module.exports = mongoose.model('surveypage', surveypageSchema);
