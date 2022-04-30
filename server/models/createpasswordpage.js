/**
 * Defining a create Password page schema Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Schema
 */
var createPasswordPageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    CREATEPASS_TITLE: {type: String, default: ''},
    CREATEPASS_PLACEHOLDER_PASSWORD: {type: String, default: ''},
    CREATEPASS_BTN_CREATE: {type: String, default: ''}
}, {
    collection: 'createpasswordpage'
});
module.exports = mongoose.model('createpasswordpage', createPasswordPageSchema);
