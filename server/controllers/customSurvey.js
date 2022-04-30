var _ = require('underscore');
var mongoose = require('mongoose');
var CustomSurvey = require('../models/customSurvey');
var User = require('../models/user');
var Team = require('../models/team');
var emailTemplate = require('../email/emailtemplates');
var nodemailer = require("nodemailer");
var EngagementResults = require('../models/engagementResults');
var SurveyParticipation = require('../models/surveyParticipation');
var CompanyInfo = require('../models/companyinfo');
var Config = require('../config/config');

function userHasSurvey(sid, uid, callback) {
    
    SurveyParticipation.find({survey_id: sid, user_id: uid}).lean().exec(function (err, survey) {
        if (!err) {
            if (survey.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
} 

function managerOwnedSurvey(uid, callback) {
    
    CustomSurvey.find({user_id: mongoose.Types.ObjectId(uid)}).lean().exec(function (err, survey) {
        if (!err) {
            if (survey.length > 0) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
}

exports.handleTakeSurvey = function(req, res, next) {

  var hash = req.params.hash;
  if(req.user) {
      res.clearCookie('takesurvey');
      userHasSurvey(hash, req.user._id, function(status) {
          if (status) {
              next();
          } else {
              managerOwnedSurvey(req.user._id, function(mstatus) {
                  if (mstatus) {
                    next();
                  } else {
                    res.redirect('/mymood');
                  }
              })
          }
      });
      
  } else {
      res.cookie('takesurvey', hash);
      res.redirect('/login');
  }
  

};

function saveSurvey(query, companyid, callback) {
    CustomSurvey.create(query, function (err, candies) {
        if (!err) {
            console.log('New custom survey created.');
            callback(true);
        } else {
            console.log('Error custom survey saving.');
            callback(false);
        }
    });
} 

function getSurveyForm(query, companyid, callback) {
    var condition = {surveytitle: query.surveytitle};
    CustomSurvey.find(condition).lean().exec(function (err, form) {
        if (form != 'undefined') {
            callback(form);
        }
    });
}



function getCompanyMembers(query, form, companyid, callback) {
    
    // Get members by matching company
    var condition = {company_id: companyid};
    User.find(condition).lean().exec(function (err, users) {
        if (users != 'undefined') {
            callback(users);
        }
    });
    
}

function getTeamMemberIds(query, form, callback) {
    
    //Get members from team
    var condition = {_id: mongoose.Types.ObjectId(query.target_teamid), manager_id: query.user_id};
    Team.find(condition).lean().exec(function (err, teams) {
        if (teams != 'undefined') {
            callback(teams);
        }
    });
}

function getTeamMemberDetails(query, memberIds, callback) {
    
    // Get members by matching company
    var condition = {_id: {$in: memberIds}};
    User.find(condition).lean().exec(function (err, users) {
        if (users != 'undefined') {
            callback(users);
        }
    });
}

function getEngagementResults(query, form, members, callback) {
    
    // Get members engagement results
    var memberIds = [];
    for (var mKey in members) {
        memberIds.push(members[mKey]._id);
    }
    
    var condition = {user_id: {$in: memberIds}};
    EngagementResults.find(condition).lean().exec(function (err, results) {
        if (results != 'undefined') {
            callback(results);
        }
    });
}   




exports.createForm = function (req, res) {
    var query = req.body;
    query.user_id = mongoose.Types.ObjectId(req.user._id);
    
    //var usercompany = req.user.company_info[0].companyname;
    var companyid = req.user.company_id;
    
    saveSurvey(query, companyid, function(status){
        
        if(status) {
            
            getSurveyForm(query, companyid, function(form){
                
                getMyCompany(companyid, function(company) { 
                    var companyname = company[0].companyname;
                
                    if(query.targetgroup == 'organization') {

                        if(query.target_teamid === companyid) {

                            //Get members by matching company
                            getCompanyMembers(query, form, companyid, function(members){
                                for (var mkey in members) {

                                    var member = members[mkey];
                                    
                                    if (String(req.user._id) !== String(member._id)) { 
                                        var sParticipation = {};
                                        sParticipation.survey_id = form[0]._id;
                                        sParticipation.user_id = member._id;
                                        sParticipation.freezedate = form[0].freezedate;
                                        sParticipation.status = 'notparticipated';

                                        SurveyParticipation.create(sParticipation, function (err, data) {
                                            if (!err) {
                                                console.log('New record added to survey participation.');
                                            } else {
                                                console.log('Error in adding new record to survey participation.');
                                            }
                                        });

                                        var transporter = nodemailer.createTransport();
                                        var body = "Hi " + member.firstname + " " + member.lastname + "," +
                                                   "<br><br> " + companyname + " has created a new quick survey for you on Moodwonder." +
                                                   "<br><br><a style='text-decoration: none; color: #ffffff; background: #03afa9; padding: 5px;' href='" + "http://" + req.get("host") + "/takesurvey/" + form[0]._id +"'>Take survey</a>" +
                                                   "<br><br>You may copy/paste this link into your browser: <br>" + 'http://' + req.get('host') + '/takesurvey/' + form[0]._id +
                                                   "<br><br> Thanks," +
                                                   "<br> Moodwonder Team";
                                        body = emailTemplate.general(body);
                                        transporter.sendMail({
                                            from: Config.fromEmail,
                                            to: member.email,
                                            //to: 'useremailtestacc@gmail.com',
                                            subject: companyname + ' created a quick survey for you on Moodwonder',
                                            html: body
                                        });
                                    }
                                }
                                res.json({status: true, message: 'query success'});
                            });

                        } else {

                            //Get members from team
                            getTeamMemberIds(query, form, function(members){
                                var member = members[0];
                                getTeamMemberDetails(query, member.member_ids, function(users){
                                    for (var ukey in users) {
                                    var user = users[ukey];
                                    if (String(req.user._id) !== String(user._id)) { 
                                        var sParticipation = {};
                                        sParticipation.survey_id = form[0]._id;
                                        sParticipation.user_id = user._id;
                                        sParticipation.freezedate = form[0].freezedate;
                                        sParticipation.status = 'notparticipated';

                                        SurveyParticipation.create(sParticipation, function (err, data) {
                                            if (!err) {
                                                console.log('New record added to survey participation.');
                                            } else {
                                                console.log('Error in adding new record to survey participation.');
                                            }
                                        });

                                        var transporter = nodemailer.createTransport();
                                        var body = "Hi " + user.firstname + " " + user.lastname + "," +
                                                   "<br><br> " + companyname + " has created a new quick survey for you on Moodwonder." +
                                                   "<br><br><a style='text-decoration: none; color: #ffffff; background: #03afa9; padding: 5px;' href='" + "http://" + req.get("host") + "/takesurvey/" + form[0]._id +"'>Take survey</a>" +
                                                   "<br><br>You may copy/paste this link into your browser: <br>" + 'http://' + req.get('host') + '/takesurvey/' + form[0]._id +
                                                   "<br><br> Thanks," +
                                                   "<br> Moodwonder Team";    
                                        body = emailTemplate.general(body);
                                        transporter.sendMail({
                                            from: Config.fromEmail,
                                            to: user.email,
                                            //to: 'useremailtestacc@gmail.com',
                                            subject: companyname + ' created a quick survey for you on Moodwonder',
                                            html: body
                                        });
                                    }
                                }
                                res.json({status: true, message: 'query success'});
                                });

                            });
                        }

                    } else if(query.targetgroup == 'survey') {
                        getCompanyMembers(query, form, companyid, function(members){

                            getEngagementResults(query, form, members, function(posts){

                                //var _USERCOUNT = members.length;

                                var survey = [];
                                for (var mKey in members) {

                                    var temp = {};      
                                    var user = members[mKey];
                                    temp.user_id = user._id;
                                    temp.email = user.email;
                                    temp.firstname = user.firstname;
                                    temp.lastname = user.lastname;

                                    var userposts = _.filter(posts, function(v) { return v.user_id == user._id; });
                                    var recentposts = _.first(_.sortBy(userposts, function(o) { return o._id; }).reverse(), 13);
                                    var sum;
                                    var avg;
                                    if (query.targetmood == 'mw_index') {
                                        sum = _(userposts).reduce(function(m,x) { return m + x.rating; }, 0);
                                        avg = (sum/13).toFixed(1);
                                    } else {
                                        var tempmood  = _.filter(recentposts, function(v) { return v.mood == query.targetmood; });
                                        sum = _(tempmood).reduce(function(m,x) { return x.rating; }, 0);
                                        avg = sum;
                                    }

                                    temp.sum = sum;
                                    temp.avg = avg;
                                    //temp.recentposts = recentposts;		
                                    survey.push(temp); 		    
                                }

                                survey = _.filter(survey, function(v) { return v.avg != 0; });
                                survey = _.sortBy(survey, function(o) { return o.avg; }).reverse();

                                var sValue = query.targetvalue;
                                var sLevel = query.targetlevel;
                                //sValue = Math.ceil((_USERCOUNT * sValue ) / 100);
                                sValue = Math.ceil(((survey.length) * sValue ) / 100);

                                if(sLevel == 'above') {
                                    survey = _.first(survey, sValue);
                                } else {
                                    survey = _.last(survey, sValue);
                                }

                                for (var skey in survey) {
                                    var data = survey[skey];
                                    
                                    if (String(req.user._id) !== String(data.user_id)) { 
                                        var sParticipation = {};
                                        sParticipation.survey_id = form[0]._id;
                                        sParticipation.user_id = data.user_id;
                                        sParticipation.freezedate = form[0].freezedate;
                                        sParticipation.status = 'notparticipated';

                                        SurveyParticipation.create(sParticipation, function (err, data) {
                                            if (!err) {
                                                console.log('New record added to survey participation.');
                                            } else {
                                                console.log('Error in adding new record to survey participation.');
                                            }
                                        });

                                        var transporter = nodemailer.createTransport();
                                        var body = "Hi " + data.firstname + " " + data.lastname + "," +
                                                   "<br><br> " + companyname + " has created a new quick survey for you on Moodwonder." +
                                                   "<br><br><a style='text-decoration: none; color: #ffffff; background: #03afa9; padding: 5px;' href='" + "http://" + req.get("host") + "/takesurvey/" + form[0]._id +"'>Take survey</a>" +
                                                   "<br><br>You may copy/paste this link into your browser: <br>" + 'http://' + req.get('host') + '/takesurvey/' + form[0]._id +
                                                   "<br><br> Thanks," +
                                                   "<br> Moodwonder Team";    
                                        body = emailTemplate.general(body);
                                        transporter.sendMail({
                                            from: Config.fromEmail,
                                            to: data.email,
                                            //to: 'useremailtestacc@gmail.com',
                                            subject: companyname + ' created a quick survey for you on Moodwonder',
                                            html: body
                                        });
                                    }
                                }


                                res.json({status: true, message: 'query success'});
                            });

                        });
                    }
                });
            });
            
        }
        
    });
    
    
};

/**
 * Get all custome survey forms 
 */
exports.getForms = function (req, res) {
    
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    
    CustomSurvey.find(condition).sort({_id: -1}).exec(function (err, forms) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.forms = forms;
            
        } else {
            response.status = 'failure';
            response.forms = [];
            console.log('Error in first query');
        }
        res.send(response);
        res.end();
    });
};


function getUserSurveyParticipation(uid, callback) {
    
    SurveyParticipation.find({user_id: uid, status: 'notparticipated'}).lean().exec(function (err, surveys) {
        if (surveys != 'undefined') {
            callback(surveys);
        }
    });
} 


exports.getMyCSurveyForms = function (req, res) {
    
    var user_id = mongoose.Types.ObjectId(req.user._id);
    
    getUserSurveyParticipation(req.user._id, function(sforms){
        
        if (sforms.length > 0) {
            
            var surveyids = [];
            for (var mKey in sforms) {
                surveyids.push(mongoose.Types.ObjectId(sforms[mKey].survey_id));
            }

            var condition = {_id: {$in: surveyids}};

            CustomSurvey.find(condition).sort({_id: -1}).exec(function (err, forms) {

                var response = {};
                if (!err) {
                    response.status = 'success';
                    response.forms = forms;

                } else {
                    response.status = 'failure';
                    response.forms = [];
                    console.log('Error in first query');
                }
                res.send(response);
                res.end();
            });
            
        } else {
            res.send({status: 'failure', forms: []});
            res.end();
        }
        
    });
};


/**
 * Get all custome survey forms 
 */
exports.deleteForm = function (req, res) {
    var _id = mongoose.Types.ObjectId(req.body.id);
    
    SurveyParticipation.remove({survey_id: _id, status: 'notparticipated'}, function (err) {
        if (err) {
            console.log('Error in deleting survey participation records.');
        } 
    });
    
    CustomSurvey.remove({_id: _id}, function (err) {
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
 * Get custome survey form by _id 
 */
exports.getSurveyForm = function (req, res) {
    
    var id = mongoose.Types.ObjectId(req.query.id);
    
    CustomSurvey.findOne({_id: id}).exec(function (err, form) {
        var response = {};
        if (!err) {
            response.status = 'success';
            response.form = form;
            
        } else {
            response.status = 'failure';
            response.form = [];
        }
        res.send(response);
        res.end();
    });
};


function getTeams(companyname, manager_id, callback) {
    
    var condition = {manager_id: manager_id};
    
    Team.find(condition).lean().exec(function (err, rows) {
        if (rows != 'undefined') {
            callback(rows);
        }
    });
   
}


function getMyCompany(companyid, callback) {
    
    var condition = {_id: companyid};
    
    CompanyInfo.find(condition).lean().exec(function (err, rows) {
        if (rows != 'undefined') {
            callback(rows);
        }
    });
   
}


exports.getOrganisation = function (req, res) {

    var user_id = mongoose.Types.ObjectId(req.user._id);
    var companyid = mongoose.Types.ObjectId(req.user.company_id);

    getMyCompany(companyid, function(company) { 
        var companyname = company[0].companyname;
        
        getTeams(companyname, user_id, function(teams) {
            
            var response = {};
            var data = {};

            if(!companyname) {
                companyname = '';
            }

            if(teams.length == 0 ) {
                teams = [];
            }

            data.companyname = companyname;
            data.companyid = company[0]._id;
            data.teams = teams;
            response.data = data;
            response.status = 'success';

            res.send(response);
            res.end();

        });
    });

};





