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
var termspageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    TRMS_TITLE: {type: String, default: ''},
    TRMS_DES: {type: String, default: ''},
    TRMS_SEC1_T1: {type: String, default: ''},
    TRMS_SEC1_P1: {type: String, default: ''},
    TRMS_SEC1_P2: {type: String, default: ''},
    TRMS_SEC2_T1: {type: String, default: ''},
    TRMS_SEC2_P1: {type: String, default: ''},
    TRMS_SEC3_T1: {type: String, default: ''},
    TRMS_SEC3_P1: {type: String, default: ''},
    TRMS_SEC4_T1: {type: String, default: ''},
    TRMS_SEC4_P1: {type: String, default: ''},
    TRMS_SEC5_T1: {type: String, default: ''},
    TRMS_SEC5_P1: {type: String, default: ''},
    TRMS_SEC6_T1: {type: String, default: ''},
    TRMS_SEC6_P1: {type: String, default: ''},
    TRMS_SEC7_T1: {type: String, default: ''},
    TRMS_SEC7_P1: {type: String, default: ''},
    TRMS_SEC8_T1: {type: String, default: ''},
    TRMS_SEC8_P1: {type: String, default: ''},
    ABT_LINK_ABOUT: {type: String, default: ''},
    ABT_LINK_ANONYMITY: {type: String, default: ''},
    ABT_LINK_TERMS: {type: String, default: ''},
    ABT_LINK_POLICY: {type: String, default: ''},
    ABT_LINK_CONTACT: {type: String, default: ''},
    ABT_NAV_SIGNIN: {type: String, default: ''},
    ABT_NAV_REGISTER: {type: String, default: ''},
}, {
    collection: 'termspage'
});
module.exports = mongoose.model('termspage', termspageSchema);
