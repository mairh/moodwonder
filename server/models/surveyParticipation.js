/**
 * Defining a surveyParticipation Model in mongoose
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * surveyParticipation Schema
 */
var surveyParticipationSchema = new mongoose.Schema({
    survey_id: {type: String, default: ''},
    user_id: {type: String, default: ''},
    freezedate: {type: String, default: ''},
    status: {type: String, default: 'notparticipated'}
}, {
    collection: 'surveyParticipation'
});
module.exports = mongoose.model('surveyParticipation', surveyParticipationSchema);
