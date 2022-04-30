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
var policypageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    PLCY_TITLE: {type: String, default: ''},
    PLCY_PARA1: {type: String, default: ''},
    PLCY_PARA2: {type: String, default: ''},
    PLCY_PARA3: {type: String, default: ''},
    PLCY_PARA4: {type: String, default: ''},
    PLCY_PARA5: {type: String, default: ''},
    PLCY_PARA6: {type: String, default: ''},
    ABT_LINK_ABOUT: {type: String, default: ''},
    ABT_LINK_ANONYMITY: {type: String, default: ''},
    ABT_LINK_TERMS: {type: String, default: ''},
    ABT_LINK_POLICY: {type: String, default: ''},
    ABT_LINK_CONTACT: {type: String, default: ''},
    ABT_NAV_SIGNIN: {type: String, default: ''},
    ABT_NAV_REGISTER: {type: String, default: ''},
}, {
    collection: 'policypage'
});
module.exports = mongoose.model('policypage', policypageSchema);
