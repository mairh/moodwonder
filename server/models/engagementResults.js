/**
 * Defining a engagementArea Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');


/**
 *engagementArea Schema
 */

//var engagementResultsSchema = new mongoose.Schema({
//    user_id: {type: String, default: ''},
//    engagementarea_id: {type: String, default: ''},
//    ratting: {type: Number, default: 0},
//    date: {type: Date, default: Date.now}
//}, {
//    collection: 'engagementResults'
//});

var engagementResultsSchema = new mongoose.Schema({
    user_id: {type: String, default: ''},
    mood: {type: String},
    rating: {type: Number},
    comment_title: {type: String, default: ''},
    comment: {type: String, default: ''},
    created: {
        d: {type: String},
        t: {type: String}
    },
    date: {type: Date, default: Date.now}
}, {
    collection: 'engagementResults'
});
module.exports = mongoose.model('engagementResults', engagementResultsSchema);
