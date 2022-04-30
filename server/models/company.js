/**
 * Defining a Company Model in mongoose
 *
 * For Saving company name from e-mail id given in the time of registration
 */

var mongoose = require('mongoose');

/**
 * Place Schema
 */
var CompanySchema = new mongoose.Schema({
  name: { type: String },
  admin: { type: String }
});

module.exports = mongoose.model('Company', CompanySchema);
