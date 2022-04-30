/**
 * Defining a openEndedAnswers Model in mongoose
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * openEndedAnswers Schema
 */
var openEndedAnswersSchema = new mongoose.Schema({
    user_id: {type: String, default: ''},
    most_improved_qone : {type: String, default: ''},
    most_improved_aone : {type: String, default: ''},
    most_improved_qtwo : {type: String, default: ''},
    most_improved_atwo : {type: String, default: ''},
    most_improved_qthree : {type: String, default: ''},
    most_improved_athree : {type: String, default: ''},
    least_improved_qone : {type: String, default: ''},
    least_improved_aone : {type: String, default: ''},
    least_improved_qtwo : {type: String, default: ''},
    least_improved_atwo : {type: String, default: ''},
    least_improved_qthree : {type: String, default: ''},
    least_improved_athree : {type: String, default: ''},
    most_improved_mood : {type: String, default: ''},
    least_improved_mood : {type: String, default: ''},
    posted: {
        d: {type: String},
        t: {type: String}
    }    
}, {
    collection: 'openEndedAnswers'
});
module.exports = mongoose.model('openEndedAnswers', openEndedAnswersSchema);
