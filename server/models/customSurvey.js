/**
 * Defining a customSurvey Model in mongoose
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * customSurvey Schema
 */
var customSurveySchema = new mongoose.Schema({
    surveytitle: {type: String, default: ''},
    user_id: Schema.Types.ObjectId,
    freezedate: {type: String, default: ''},
    createddate: {type: Date, default: Date.now},
    targetgroup: {type: String, default: ''},    
    target_teamid: {type: String, default: ''},
    targetlevel: {type: String, default: ''},    
    targetvalue: {type: String, default: ''},    
    questions: [{
            question: {type: String, default: ''},
            question_id: {type: String, default: ''},
            answertype: {type: String, default: ''},
            answers: [{
                    option: {type: String, default: ''}
                }]
        }]
}, {
    collection: 'customSurvey'
});
module.exports = mongoose.model('customSurvey', customSurveySchema);
