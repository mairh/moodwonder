var _ = require('lodash');
var mongoose = require('mongoose');
var NotificationRules = require('../models/notificationRules');


/**
 * Get all rules
 */
exports.getRules = function (req, res) {

    //console.log('req');
    //console.log(req);
    NotificationRules.find({}).exec(function (err, rules) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.rules = rules;
            //console.log(engagementareas);
        } else {
            response.status = 'failure';
            response.rules = [];
            console.log('Error in get rules query');
        }
        res.send(response);
        res.end();
    });

};

/**
 * Edit rule
 */
exports.editRule = function (req, res) {

    var data = JSON.parse(req.body.data);
    var rule_key = data.rule_key;
    var rule_value = data.rule_value;
    var description = data.description;
    var status = data.status;

    var condition = {_id: mongoose.Types.ObjectId(req.body.id)};
    var update = {rule_key: rule_key, rule_value: rule_value, description: description, status: status};
    var options = {multi: false};

    NotificationRules.update(condition, update, options, function (err, callback) {
        var response = {};
        if (!err) {
            response.status = 'success';
        } else {
            response.status = 'failure';
        }
        res.json(response);
        res.end();
    });

};

/**
 * Delete rule
 */
exports.deleteRule = function (req, res) {
    var _id = mongoose.Types.ObjectId(req.body.id);
    NotificationRules.remove({_id: _id}, function (err) {
        var response = {};
        if (!err) {
            response.status = 'success';
        } else {
            response.status = 'failure';
        }
        res.json(response);
        res.end();
    });
};
















