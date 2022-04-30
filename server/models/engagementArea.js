/**
 * Defining a engagementArea Model in mongoose
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');

// Other oauthtypes to be added

/**
 *engagementArea Schema
 */
var engagementAreaSchema = new mongoose.Schema({
    mood: {type: String, default: ''},
    description: {type: String},
    status: {type: String, default: 'active'}
}, {
    collection: 'engagementAreas'
});
module.exports = mongoose.model('engagementAreas', engagementAreaSchema);
