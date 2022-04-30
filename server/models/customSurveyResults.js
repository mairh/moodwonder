/**
 * Defining a customSurveyResults schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var customSurveyResultsSchema = new mongoose.Schema({
    user_id: {type: String, default: ''},
    survey_id: Schema.Types.ObjectId,
    question_id: {type: String, default: ''},
    question: {type: String, default: ''},
    answertype: {type: String, default: ''},
    answers : [{
        option : {type: String, default: ''}       
    }]
}, {
    collection: 'customSurveyResults'
});
module.exports = mongoose.model('customSurveyResults', customSurveyResultsSchema);
