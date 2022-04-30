/**
 * Defining a mwtheme page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var aboutpageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    ABT_BNNR_TITLE: {type: String, default: ''},
    ABT_BNNR_STARTED: {type: String, default: ''},
    ABT_ABOUTUS: {type: String, default: ''},
    ABT_ABTUS_PARA1: {type: String, default: ''},
    ABT_ABTUS_PARA2: {type: String, default: ''},
    ABT_ABTUS_PARA3: {type: String, default: ''},
    ABT_ABTUS_PARA4: {type: String, default: ''},
    ABT_ABTUS_PARA5: {type: String, default: ''},
    ABT_PEOPLE_BEHIND: {type: String, default: ''},
    ABT_PPL_BHD_DES: {type: String, default: ''},
    ABT_LINK_ABOUT: {type: String, default: ''},
    ABT_LINK_ANONYMITY: {type: String, default: ''},
    ABT_LINK_TERMS: {type: String, default: ''},
    ABT_LINK_POLICY: {type: String, default: ''},
    ABT_LINK_CONTACT: {type: String, default: ''},
    ABT_NAV_SIGNIN: {type: String, default: ''},
    ABT_NAV_REGISTER: {type: String, default: ''}
}, {
    collection: 'aboutpage'
});
module.exports = mongoose.model('aboutpage', aboutpageSchema);
