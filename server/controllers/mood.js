var _ = require('lodash');
var mongoose = require('mongoose');
var User = require('../models/user');
var Moodrating = require('../models/moodrating');


/**
 * Add new language
 */
exports.addMoodRate = function (req, res) {

    console.log('req.user');
    console.log(req.user._id);

    var data = req.body;
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    data.user_id = mongoose.Types.ObjectId(req.user._id);
    data.datetime = year + '-' + month + '-' + day;

    function findMoodRateByDate(data, callback) {
        var datetime = data.datetime;
        var user_id = data.user_id;
        var query = {user_id: user_id, datetime: {$eq: datetime}};

        Moodrating.findOne(query).lean().exec(function (err, row) {
            if (row != 'undefined') {
                callback(row);
            }
        });
    }


    findMoodRateByDate(data, function (result) {

        if ((result == null) || (result == 'undefined')) {

            Moodrating.create(data, function (err, items) {
                var response = {};
                if (!err) {
                    response.status = 'success';
                    response.message = 'query success';
                    //response.user_id = req.body.user_id;
                    //response.user_id = req.user._id;
                } else {
                    response.status = 'failure';
                    response.message = 'query failed';
                    //response.user_id = req.body.user_id;
                    //response.user_id = req.user._id;
                }
                res.json(response);
                res.end();
            });

        } else {

            var condition = {_id: result._id};
            var update = {
                rating: data.rating,
                description: data.description,
                title: data.title
            };
            var options = {multi: false};

            Moodrating.update(condition, update, options, function (err) {
                var response = {};
                if (!err) {
                    response.status = 'success';
                    // response.user_id = req.body.user_id;
                    //response.user_id = req.user._id;
                } else {
                    response.status = 'failure';
                    // response.user_id = req.body.user_id;
                    //response.user_id = req.user._id;
                }
                res.json(response);
                res.end();
            });

        }
    });

};



exports.getMyMoods = function (req, res) {

    // var user_id = mongoose.Types.ObjectId(req.query.user_id);
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    var orderby = {datetime: -1}; // -1 DESC; 1 - ASC
    var limit = 7; // -1 DESC; 1 - ASC

    Moodrating.find(condition).sort(orderby).limit(limit).exec(function (err, moods) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.data = moods;
            //console.log(moods);
        } else {
            response.status = 'failure';
            response.data = [];
            //console.log('Error in first query');
        }
        res.send(response);
        res.end();
    });

};













