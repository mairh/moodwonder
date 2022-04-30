var _ = require('lodash');
var mongoose = require('mongoose');
var Homepage = require('../models/homepage');

/**
 * home page
 */
exports.getHomePage = function (req, res) {

    var language = req.body.language;
    var condition = {'language': language};
    Homepage.findOne(condition, function (err, data) {
        response = {};
        if (!err) {
            response.status = true;
            response.message = 'success';
            response.data = data;
            res.json(response);
            res.end();
        } else {
            response.status = false;
            response.message = 'failure';
            response.data = {};
            res.json(response);
            res.end();
        }
    });

};







