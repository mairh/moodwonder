/**
 * Defining a Invite Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Invite Schema
 */
var InviteSchema = new mongoose.Schema({
  email: {type: String, default: ''},
  type: {type: String, default: ''},
  link: {type: String, default: ''},
  reference: [],
  data: []
});

InviteSchema.pre('save', function (next) {
next();
});

/**
 * Statics
 */
InviteSchema.statics = {}

module.exports = mongoose.model('Invites', InviteSchema);
