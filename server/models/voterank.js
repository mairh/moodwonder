/**
 * Defining a Vote Rank Model in mongoose
 */

var mongoose = require('mongoose');

/**
 *Vote Rank Schema
**/
var VoteRankSchema = new mongoose.Schema({
  user_id: { type: String, default: '' },
  company_id: { type: String, default: '' },
  count: { type: Number, default: 0 },
  postdate: { type: String, default: '' }
});

/**
 * Statics
 */
VoteRankSchema.statics = {}
module.exports = mongoose.model('VoteRanks', VoteRankSchema);
