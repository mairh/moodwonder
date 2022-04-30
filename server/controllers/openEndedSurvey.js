var _ = require('underscore');
var mongoose = require('mongoose');
var OpenEndedQuestions = require('../models/openEndedQuestions');
var OpenEndedAnswers = require('../models/openEndedAnswers');
var User = require('../models/user');
var Team = require('../models/team');

/**
 * home page
 */

//exports.handleOpenendedSurvey = function(req, res, next) {
//};

exports.getQuestions = function (req, res) {

    OpenEndedQuestions.find().lean().exec(function (err, data) {
        var response = {};
        if (!err) {
            response.status = true;
            response.message = 'success';
            response.questions = data;
        } else {
            response.status = false;
            response.message = 'failure';
            response.questions = [];
        }
        res.json(response);
        res.end();
    });

};

function checkUserPostedOpenEndedSurvey(user_id, posteddate, callback) {

    var condition = {'user_id': mongoose.Types.ObjectId(user_id), 'posted.d': {$eq: posteddate}};
    OpenEndedAnswers.find(condition).sort({_id: - 1}).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}

exports.saveOpenEndedSurvey = function (req, res) {

    var query = req.body;
    query.user_id = req.user._id;
    
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice( - 2);
    var day = ('0' + today.getDate()).slice( - 2);
    var hour = ('0' + today.getHours()).slice( - 2);
    var minutes = ('0' + today.getMinutes()).slice( - 2);
    var seconds = ('0' + today.getSeconds()).slice( - 2);
    var datestring = year + '-' + month + '-' + (day);
    var timestring = hour + ':' + minutes + ':' + seconds;
    
    var posted = posted || {};
    posted.d = datestring;
    posted.t = timestring;
    
    query.posted = posted;
    
    if (req.user._id != '') {
        checkUserPostedOpenEndedSurvey(req.user._id, datestring, function(rows) {
            
            if (rows.length > 0) {
                var condition = {'user_id': mongoose.Types.ObjectId(req.user._id), 'posted.d': {$eq: datestring}};
                OpenEndedAnswers.remove(condition).exec(function (err) {
                    if (!err) {}
                });
            }
                        
            OpenEndedAnswers.create(query, function (err, data) {
                if (!err) {
                    res.json({'status': true, 'message': 'Open ended answers saved'});
                } else {
                    res.json({'status': false, 'message': 'Error: Open ended answers - something went wrong..'});
                }
            });
        });
        
    } else {
        res.json({'status': false, 'message': 'Session expired.!'});
    }

};

// Get open ended survey answer by id and datetime
exports.getOpenEndedSurveyAnswer = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';


	var FindOpenEndedQuestions = function(callBackFn){

		OpenEndedQuestions.find().lean().exec(function (err, data) {
			callBackFn(data[0]);
		});
	}

	var FindopenEndedAnswers = function(questions){
		
		var _id = req.body._id;
		var date = req.body.date;
		var whereCondition = { "user_id": _id };
		// if date is undefined, then take the last record
		if(date !== undefined){
			whereCondition = { "user_id": _id, "posted.d": date };
		}

		OpenEndedAnswers.find(whereCondition).sort({_id:-1}).limit(1).exec(function (err, data) {
			var response = {};
			if (!err && data.length !==0 && questions.length !== 0) {
				data = data[0];
				var qa = [];
				qa[0] = { q: questions.most_improved_qone, a: data.most_improved_aone };
				qa[1] = { q: questions.most_improved_qtwo, a: data.most_improved_atwo };
				qa[2] = { q: questions.most_improved_qthree, a: data.most_improved_athree };
				qa[3] = { q: questions.least_improved_qone, a: data.least_improved_aone };
				qa[4] = { q: questions.least_improved_qtwo, a: data.least_improved_atwo };
				qa[5] = { q: questions.least_improved_qthree, a: data.least_improved_athree };
				response.status = true;
				response.message = 'success';
				response.data = qa;
			} else {
				response.status = false;
				response.message = 'No record found';
				response.data = [];
			}
			res.json(response);
			res.end();
		});
	}

	try{
		if(req.body._id !== undefined && req.body._id !== '' ){
			FindOpenEndedQuestions(FindopenEndedAnswers);
		}else{
			res.json(response);
			res.end();
		}
	}catch(e){
		res.json(response);
		res.end();
	}

};

exports.getMembers = function (req, res, next) {

    var currentUser = req.user;
    //var company = currentUser.company_info[0].companyname;
    //console.log('currentUser');
    //console.log(JSON.stringify(currentUser));
    var companyid = currentUser.company_id;
    
    User.find({company_id: companyid}).lean().exec(function (err, members) {
        var response = {};
        if (!err) {
            response.status = true;
            response.message = 'success';
            response.members = members;
        } else {
            response.status = false;
            response.message = 'failure';
            response.members = [];
        }
        res.json(response);
        res.end();
    });
};

exports.getAnswers_bk = function (req, res, next) {
    
    var _id = req.body._id;
    OpenEndedAnswers.find({user_id: _id}).lean().exec(function (err, data) {
        var response = {};
        if (!err) {
            response.status = true;
            response.message = 'success';
            response.answers = data;
        } else {
            response.status = false;
            response.message = 'failure';
            response.answers = [];
        }
        res.json(response);
        res.end();
    });

};

function getCompanyMembers(companyid, callback) {
    
    User.find({company_id: companyid}).lean().exec(function (err, members) {
        if (!err) {
            callback(members);
        }
    });
}

exports.getAnswers = function (req, res, next) {
    
    var mood = req.body.mood;
    var area = req.body.area;
    var uid = req.user._id;
    var companyid = req.user.company_id;
    
    getCompanyMembers(companyid, function(members){
       if (members.length > 0) {
           var memberIds = [];
           for (var mkey in members) {
                  memberIds.push(members[mkey]._id);
           }
           


           var condition;
           if (area == "most_improved") {
                condition = {user_id: {$in: memberIds}};
                (mood != 'All') ? condition.most_improved_mood = mood : '';
           
           } else {

                condition = {user_id: {$in: memberIds}}; 
                (mood != 'All') ? condition.least_improved_mood = mood : '';
          }
        
           OpenEndedAnswers.find(condition).lean().exec(function (err, data) {
                var response = {};
                if (!err) {
                    response.status = true;
                    response.message = 'success';
                    response.answers = data;
                } else {
                    response.status = false;
                    response.message = 'failure';
                    response.answers = [];
                }
                res.json(response);
                res.end();
            });
           
       } else {
           var response = {};
           response.status = false;
           response.message = 'failure';
           response.answers = [];
           res.json(response);
           res.end();
       }
    });
    
};



