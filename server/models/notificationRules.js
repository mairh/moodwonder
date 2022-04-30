/**
 * Defining a notification rules schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var notificationRulesSchema = new mongoose.Schema({
    rule_key: {type: String, default: ''},
    rule_value: {type: String, default: ''},
    description: {type: String},
    status: {type: String, default: 'active'}
}, {
    collection: 'notificationrules'
});
module.exports = mongoose.model('notificationrules', notificationRulesSchema);


