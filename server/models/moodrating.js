/**
 * Defining a mood rating schema Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schema
 */
var moodRatingSchema = new mongoose.Schema({
    rating: {type: Number},
    user_id: Schema.Types.ObjectId,
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    datetime: {type: String, default: '0000-00-00'} //yyyy-mm-dd
}, {
    collection: 'moodrating'
});
module.exports = mongoose.model('moodrating', moodRatingSchema);
