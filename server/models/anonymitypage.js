/**
 * Defining a schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var anonymitypageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    AMTY_BNNR_TITLE: {type: String, default: ''},
    AMTY_TITLE: {type: String, default: ''},
    AMTY_PARA1: {type: String, default: ''},
    AMTY_PARA2: {type: String, default: ''},
    AMTY_PARA_LI1: {type: String, default: ''},
    AMTY_PARA_LI2: {type: String, default: ''},
    AMTY_PARA_LI3: {type: String, default: ''},
    AMTY_PARA3: {type: String, default: ''},
    AMTY_PARA4: {type: String, default: ''},
    ABT_LINK_ABOUT: {type: String, default: ''},
    ABT_LINK_ANONYMITY: {type: String, default: ''},
    ABT_LINK_TERMS: {type: String, default: ''},
    ABT_LINK_POLICY: {type: String, default: ''},
    ABT_LINK_CONTACT: {type: String, default: ''},
    ABT_NAV_SIGNIN: {type: String, default: ''},
    ABT_NAV_REGISTER: {type: String, default: ''}
}, {
    collection: 'anonymitypage'
});
module.exports = mongoose.model('anonymitypage', anonymitypageSchema);
