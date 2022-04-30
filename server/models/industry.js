/**
 * Defining a Industry Model in mongoose
 *
 * For Saving Industry name
 */

var mongoose = require('mongoose');

/**
 * Industry Schema
 */
var IndustrySchema = new mongoose.Schema({
  name: { type: String }
});

module.exports = mongoose.model('Industry', IndustrySchema);
