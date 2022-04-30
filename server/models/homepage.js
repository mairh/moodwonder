/**
 * Defining a home page schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var homePageSchema = new mongoose.Schema({
    language: {type: String, default: ''},
    HOM_SIGN_IN: {type: String, default: ''},
    HOM_REGISTER: {type: String, default: ''},
    HOM_SGN_WORK_EMAIL: {type: String, default: ''},
    HOM_GET_STARTED: {type: String, default: ''},
    HOM_NO_CREDIT_CARD: {type: String, default: ''},
    HOM_1_TITLE_1: {type: String, default: ''},
    HOM_1_SUBTITLE_1: {type: String, default: ''},
    HOM_2_TITLE_1: {type: String, default: ''},
    HOM_2_TITLE_2: {type: String, default: ''},
    HOM_2_ITEM_1: {type: String, default: ''},
    HOM_2_ITEM_2: {type: String, default: ''},
    HOM_2_ITEM_3: {type: String, default: ''},
    HOM_3_TITLE_1: {type: String, default: ''},
    HOM_3_BOX_1_TITLE_1: {type: String, default: ''},
    HOM_3_BOX_1_CONTENT: {type: String, default: ''},
    HOM_3_BOX_2_TITLE_1: {type: String, default: ''},
    HOM_3_BOX_2_CONTENT: {type: String, default: ''},
    HOM_3_BOX_3_TITLE_1: {type: String, default: ''},
    HOM_3_BOX_3_CONTENT: {type: String, default: ''},
    HOM_3_BOX_4_TITLE_1: {type: String, default: ''},
    HOM_3_BOX_4_CONTENT: {type: String, default: ''},
    HOM_4_TITLE_1: {type: String, default: ''},
    HOM_4_BOX_1_TITLE_1: {type: String, default: ''},
    HOM_4_BOX_1_CONTENT: {type: String, default: ''},
    HOM_4_BOX_2_TITLE_1: {type: String, default: ''},
    HOM_4_BOX_2_CONTENT: {type: String, default: ''},
    HOM_4_BOX_3_TITLE_1: {type: String, default: ''},
    HOM_4_BOX_3_CONTENT: {type: String, default: ''},
    HOM_4_BOX_4_TITLE_1: {type: String, default: ''},
    HOM_4_BOX_4_CONTENT: {type: String, default: ''},
    HOM_5_TITLE_1: {type: String, default: ''},
    HOM_5_BOX_1_TITLE_1: {type: String, default: ''},
    HOM_5_BOX_1_CONTENT: {type: String, default: ''},
    HOM_5_BOX_2_TITLE_1: {type: String, default: ''},
    HOM_5_BOX_2_CONTENT: {type: String, default: ''},
    HOM_5_BOX_3_TITLE_1: {type: String, default: ''},
    HOM_5_BOX_3_CONTENT: {type: String, default: ''},
    HOM_5_BOX_4_TITLE_1: {type: String, default: ''},
    HOM_5_BOX_4_CONTENT: {type: String, default: ''},
    HOM_6_TITLE_1: {type: String, default: ''},
    HOM_7_TITLE: {type: String, default: ''},
    HOM_7_NAME: {type: String, default: ''},
    HOM_7_EMAIL: {type: String, default: ''},
    HOM_7_MOBILE: {type: String, default: ''},
    HOM_7_LOOKING_FOR: {type: String, default: ''},
    HOM_7_SUBMIT: {type: String, default: ''},
    HOM_FOOTER_ABOUT: {type: String, default: ''},
    HOM_FOOTER_ANONYMITY: {type: String, default: ''},
    HOM_FOOTER_TERMS: {type: String, default: ''},
    HOM_FOOTER_POLICY: {type: String, default: ''},
    HOM_FOOTER_CONTACT: {type: String, default: ''}
}, {
    collection: 'homepage'
});
module.exports = mongoose.model('homepage', homePageSchema);
