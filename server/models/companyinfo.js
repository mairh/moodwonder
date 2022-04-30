/**
 * Defining a Companyinfo Model in mongoose
 */

var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var crypto = require('crypto');


/**
 *Companyinfo Schema
 */
var CompanyinfoSchema = new mongoose.Schema({
    domain_name : String,
    companyname : String,
    industry : String,
    continent : String,
    country : String,
    state : String,
    city : String,
    address : String,
    website : String,
    companysize : String
});

/**
 * Statics
 */
CompanyinfoSchema.statics = {}


module.exports = mongoose.model('Companyinfo', CompanyinfoSchema);
