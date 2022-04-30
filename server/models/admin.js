/**
 * Defining a admin schema Model in mongoose
 */
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * Schema
 */
var adminSchema = new mongoose.Schema({
    username: {type: String, default: ''},
    password: String,
    role: {type: String, default: 'ADMIN'}
}, {
    collection: 'admin'
});

/**
 *Defining our own custom document instance method
 */
adminSchema.methods = {
    comparePassword: function (candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err)
                return cb(err);
            cb(null, isMatch);
        })
    }
};

module.exports = mongoose.model('admin', adminSchema);
