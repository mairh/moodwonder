/**
 * Defining a Team Model in mongoose
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 *Team Schema
 */
var TeamSchema = new mongoose.Schema({
  teamname: {type: String, default: ''},
  manager_id: Schema.Types.ObjectId,
  company_id: {type: String, default: '0'},
  member_ids: [{ user_id : Schema.Types.ObjectId }]
});

TeamSchema.pre('save', function (next) {
next();
});

/**
 * Statics
 */
TeamSchema.statics = {}

module.exports = mongoose.model('Teams', TeamSchema);
