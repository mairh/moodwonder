/**
 * Defining a Vote Model in mongoose
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');


/**
 *Vote Schema
 */
var VoteSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  votefor_userid: mongoose.Schema.Types.ObjectId,
  company_id: { type: String, default: '' },
  name: { type: String, default: '' },
  comment: { type: String, default: '' },
  postdate: { type: String, default: '' }
});


/**
 * Statics
 */
VoteSchema.statics = {}
module.exports = mongoose.model('Votes', VoteSchema);
