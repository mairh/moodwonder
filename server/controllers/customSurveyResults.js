var _ = require('lodash');
var mongoose = require('mongoose');
var CustomSurveyResults = require('../models/customSurveyResults');
var User = require('../models/user');
var CustomSurvey = require('../models/customSurvey');
var SurveyParticipation = require('../models/surveyParticipation');

/**
 * save survey results
 */
exports.saveSurveyResults = function (req, res) {
    
    var surveyresults = req.body.surveyresults;
    var length = surveyresults.length;
    var response = {};
    
    for (var i = 0; i < length; i++) {
        var row = {};
        row = JSON.parse(surveyresults[i]);
        row.user_id = mongoose.Types.ObjectId(req.user._id);
        
        if (i == 0) {
            var condition = {survey_id: row.survey_id, user_id: req.user._id};
            var update = {status: 'participated'};
            var options = {multi: false};
            
            SurveyParticipation.update(condition, update, options, function (err, data) {
                if (!err) {
                    console.log('Record updated - survey participation.');
                } else {
                    console.log('Error in record updation - survey participation.');
                }
            });
        }
        
        CustomSurveyResults.create(row, function (err, data) {
            if (!err) {
                response.status = 'success';
            } else {
                response.status = 'failure';
            }
        });
    }
    res.json({'status': true});
    res.end();
};


function getSurveyForm(id, callback) {
    var condition = {_id: mongoose.Types.ObjectId(id)};
    CustomSurvey.find(condition).lean().exec(function (err, form) {
        if (form != 'undefined') {
            callback(form);
        }
    });
}

function getSurveyResults(id, callback) {
    var condition = {survey_id: mongoose.Types.ObjectId(id)};
    CustomSurveyResults.find(condition).lean().exec(function (err, results) {
        if (results != 'undefined') {
            callback(results);
        }
    });
}

function getSurveyUserDetails(results, callback) {
    
    var users =   _.chain(results).map(function(user) { return mongoose.Types.ObjectId(user.user_id) }).uniq().value();
    var condition = {_id: {$in: users}};
    User.find(condition).lean().exec(function (err, users) {
        if (users != 'undefined') {
            callback(users);
        }
    });
}


exports.getSurveyResponses = function (req, res) {
    
    var id = mongoose.Types.ObjectId(req.query.id);
    
    getSurveyForm (id, function (form) {
        
        getSurveyResults (id, function (results) {
            
            getSurveyUserDetails (results, function (users) {
                
                var response = {};
                response.status = true;
                response.surveyform = form;
                response.surveyresponses = results;
                response.users = users;
                res.send(response);
                res.end();
                
            });
            
        });
        
    }); 
    
};







