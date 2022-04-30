var _ = require('lodash');
var mongoose = require('mongoose');
var EngagementArea = require('../models/engagementArea');


/**
 * Add new language
 */
exports.addEngagement = function (req, res) {

    var query = req.body;
    EngagementArea.create(query, function (err, items) {
        if (!err) {
            res.json({'status': true, 'message': 'query success'});
            res.end();
        } else {
            res.json({'status': false, 'message': 'query failed'});
            res.end();
        }
    });

};


/**
 * Edit language
 */
exports.editEngagement = function (req, res) {

    var data = JSON.parse(req.body.data);
    var mood = data.mood;
    var description = data.description;
    var status = data.status;

    var condition = {_id: mongoose.Types.ObjectId(req.body.id)};
    var update = {mood: mood, description: description, status: status};
    var options = {multi: false};

    EngagementArea.update(condition, update, options, function (err, callback) {
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
 * Get all languages
 */
exports.engagementAreas = function (req, res) {

    //console.log('req');
    //console.log(req);
    EngagementArea.find({}).exec(function (err, engagementareas) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.engagementareas = engagementareas;
            //console.log(engagementareas);
        } else {
            response.status = 'failure';
            response.engagementareas = [];
            console.log('Error in first query');
        }
        res.send(response);
        res.end();
    });

};

/**
 * Delete engagement
 */
exports.deleteEngagement = function (req, res) {
    var _id = mongoose.Types.ObjectId(req.body.id);
    EngagementArea.remove({_id: _id}, function (err) {
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















