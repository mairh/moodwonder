var _ = require('underscore');
var mongoose = require('mongoose');
var SurveyParticipation = require('../models/surveyParticipation');


exports.getMySurveyParticipation = function (req, res) {

    var user_id = req.body._id;
    var condition = {user_id: user_id};

    SurveyParticipation.find(condition).sort({_id: -1}).exec(function (err, data) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.data = data;

        } else {
            response.status = 'failure';
            response.data = [];
            console.log('Error in fetch query - survey participation');
        }
        res.send(response);
        res.end();
    });
};
