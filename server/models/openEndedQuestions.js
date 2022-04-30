/**
 * Defining a openEndedQuestions Model in mongoose
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * openEndedQuestions Schema
 */
var openEndedQuestionsSchema = new mongoose.Schema({
    most_improved_qone : {type: String, default: ''},
    most_improved_qtwo : {type: String, default: ''},
    most_improved_qthree : {type: String, default: ''},
    least_improved_qone : {type: String, default: ''},
    least_improved_qtwo : {type: String, default: ''},
    least_improved_qthree : {type: String, default: ''}
}, {
    collection: 'openEndedQuestions'
});
module.exports = mongoose.model('openEndedQuestions', openEndedQuestionsSchema);
