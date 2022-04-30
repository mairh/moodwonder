var _ = require('lodash');
var Team = require('../models/team');
var User = require('../models/user');
var CompanyInfo = require('../models/companyinfo');
var Company = require('../models/company');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var validations = require('../controllers/validationRules');
var App = require('../../public/assets/app.server');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");


/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * Chech the team is already exist or not
 *
 * Accept : -  @teamname
 */
exports.checkTeam = function(req, res, next) {

    var response    = {};
    response.status  = false;
    response.message = 'Something went wrong..';
    var teamname = req.body.teamname;

    var checkWithInCompanay = function(company){

        var where = { "manager_id" : new ObjectId(req.user._id), "teamname": teamname, company_id: company._id };
        Team.findOne(where, function(err, existingTeam) {

            if(existingTeam) {
                response.status = false;
                response.message = "Team name already exist";
                response.callback = req.body.callback;
                res.send(response);
                res.end();
            }else{
                // pass company _id to next route
                req.body.company_id = company._id;
                next();
            }
        });
    }

    if(teamname !== undefined && teamname !== ''){
        // find team _id from companies collection
        var company_id  = req.user.company_id;
        if(company_id !== ''){
            var company = { _id: company_id };
            CompanyInfo.findOne(company).exec(function(err,company){
                if(company){
                    checkWithInCompanay(company);
                }else{
                  res.send(response);
                  res.end();
                }
            });
        }else{
            response.message = 'Company not found';
            res.send(response);
            res.end();
        }
    }else{
        response.message = 'Team name is missing.';
        res.send(response);
        res.end();
    }
};

/**
 * Create new team
 *
 * Accept : -  @teamname
 */
exports.createTeam = function(req, res, next) {

  var teamname = req.body.teamname;
  var company_id = req.body.company_id;
  
  var team =  new Team({
      teamname: teamname,
      manager_id: new ObjectId(req.user._id),
      company_id: company_id
  });

  team.save(function(err) {
      if(!err){

          User.findOne({ _id: new ObjectId(req.user._id) },function(err, user){
              if(user !== null){
                  req.body.update  = { 'usertype': 'manager'};
                  req.body.resmessage  = 'Team created';
                  req.body._id = req.user._id;
                  next();
              }else{
                  console.log(err);
                  response.status   = false;
                  response.message  = 'Something went wrong..';
                  response.callback = req.body.callback;
                  res.send(response);
                  res.end();
              }
          });
      }else{

          console.log(err);
          response.status   = false;
          response.message  = 'Something went wrong..';
          response.callback = req.body.callback;
          res.send(response);
          res.end();
      }
  });
};

/**
 * Update team name
 *
 * Accept : -  @teamname,@teamid
 */
exports.updateTeam = function(req, res, next) {

  var teamname = req.body.teamname;
  var teamid   = req.body.teamid;
  var callback = req.body.callback;

  var where = { "_id" : new ObjectId(teamid), "manager_id" : new ObjectId(req.user._id) };
  // console.log(where);

  Team.findOne(where, function(err, existingTeam) {
    if(existingTeam) {
        Team.update(where,{ "teamname": teamname },function(err){
            if(err){
                response.status = false;
                response.message = "Something went wrong";
                response.callback = callback;
                res.send(response);
                res.end();
            }else{
                response.status = true;
                response.message = "Successfully updated team name";
                response.callback = callback;
                res.send(response);
                res.end();
            }
        });
    }else{
        response.status = false;
        response.message = "You don't have permission to change this team name";
        res.send(response);
        res.end();
    }
  });

};

/**
 * get my teams
 *
 */
exports.getMyTeams = function(req, res, next) {

  var where = { manager_id: new ObjectId(req.user._id) };

  Team.find(where).sort( { _id: -1 } ).exec(function(err, lists) {
    if(!err) {
        // console.log(lists);
        req.body.resdata = lists;
        next();
    } else {
        response.status   = false;
        response.message  = 'Something went wrong..';
        res.send(response);
        res.end();
    }
  });
};

/**
 * get my teams
 *
 */
exports.getOwnTeams = function(req, res, next) {

  var where = { manager_id: new ObjectId(req.user._id) };

  Team.find(where).exec(function(err, lists) {
    if(!err) {
        response.status   = true;
        response.data  = lists;
        response.message  = 'Teams';
        res.send(response);
        res.end();
    } else {
        response.status   = false;
        response.message  = 'Something went wrong..';
        res.send(response);
        res.end();
    }
  });
};

/**
 * Add a member to team
 *
 */
exports.addMemberToTeam = function(req, res, next) {

  //function for exiting from the callback function
  var response            =  {};
  var invite_member_email =  [];
  response.callback = (req.body.callback !== undefined) ? req.body.callback: '';

  function isValidEmailAddress(emailAddress){
      var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
  }
  
  var memberemail = req.body.memberemail;
  var team_id     = req.body.team_id;
  var feedback    = [];

  if(memberemail === ''){
      response.messages = ['Name is required'];
      feedback.push('Name is required');
  }
  else if(!isValidEmailAddress(memberemail))
  {
      response.messages = ['Invalid e-mail address'];
      feedback.push('Invalid e-mail address');
  }
  else if(memberemail === req.user.email)
  {
      response.messages = [req.user.email+': You are the team leader'];
      feedback.push(req.user.email+': You are the team leader');
  }
  else
  {
    var afterDomainCheck = function(){
        if(team_id !== ''){
            try{
                var where = { _id: new ObjectId(team_id) };
                // check the team is exist or not
                Team.findOne(where, function(err, existingTeam) {
                    if(existingTeam) {

                        // For getting live data from the current user
                        User.findOne({ _id: new ObjectId(req.user._id) }, function(err, currentUser) {
                            if( !err && currentUser!== null ){

                                var mymanager = '';
                                if(currentUser.mymanager && currentUser.mymanager[0] && currentUser.mymanager[0].email){
                                    mymanager = currentUser.mymanager[0].email;
                                }

                                if(mymanager === memberemail){
                                    response.status = false;
                                    response.messages = ["You can't add your manager as your subordinate"];
                                    feedback.push("You can't add your manager as your subordinate");
                                    response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
                                    res.send(response);
                                    res.end();
                                    return;
                                }else{
                                    // check the user is exist or not
                                    User.findOne({email: memberemail }, function(err, existingUser) {
                                        if(existingUser) {
                                            // check the member already exist in the group
                                            var where_mem_exist = { _id: existingTeam._id, member_ids: { $elemMatch: { _id: existingUser._id } } };
                                            Team.findOne(where_mem_exist, function(err, existingMember) {
                                                if(existingMember) {
                                                    response.status = false;
                                                    response.messages = [memberemail+': This user is already exist in the team'];
                                                    //feedback.push(memberemail+': This user is already exist in the team');
                                                    res.send(response);
                                                    res.end();
                                                }else{
                                                    // User not exist in this group, Insert this user into this team
                                                    Team.update({ "_id" : existingTeam._id },{$push: {member_ids: { _id: existingUser._id }}},function(err){
                                                        if(err){
                                                            response.status   = false;
                                                            response.messages = ['Unknown error with :'+ memberemail];
                                                            //feedback.push('Unknown error with :'+ memberemail);
                                                        }else{
                                                            response.status  = true;
                                                            response.messages = [memberemail+': Added as a member'];
                                                            //feedback.push(memberemail+': Added as a member');
                                                        }
                                                        res.send(response);
                                                        res.end();
                                                    });
                                                }
                                            });
                                        }else{
                                            // Calling another controller for Invite a user with the given e-mail id
                                            // Calling invitation.js/sendInvitation()
                                            req.body.invitetype = 'Team';
                                            req.body.invitedby  = "manager";
                                            req.body.data       = { 'email': memberemail, 'team': existingTeam ,feedback: feedback };
                                            next();
                                        }
                                    });
                                }
                            }else{
                                response.status = false;
                                response.messages = ['Unknow error'];
                                response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
                                res.send(response);
                                res.end();
                                return;
                            }
                        });

                    }else{
                        response.status = false;
                        response.messages = ['Team not exist'];
                        res.send(response);
                        res.end();
                    }
                });
            }catch(e){
                console.log(e);
            }
        }else{
            response.status = false;
            response.messages = ['Something went wrong'];
            res.send(response);
            res.end();
        }
    }

    var domain = memberemail.replace(/.*@/, "");
    domain     = domain.split('.')[0];
    try{
        CompanyInfo.findOne({ _id: new ObjectId(req.user.company_id) }, function(err, company){
            if(company !== null){
                // console.log(company);
                if(company.domain_name !== domain){
                    response.status = false;
                    // response.messages = ['The person whom you want to add as a subordinate should be an employee of your company and hence should have the same domain as in your email id.'];
                    response.messages = ['It is a restricted email domain. Please make sure you enter your work email address'];
                    // Feature #15688
                    res.send(response);
                    res.end();
                }else{
                    // to continue the execution
                    afterDomainCheck();
                }
            }else{
                response.status = false;
                response.messages = ['Company domain not found'];
                res.send(response);
                res.end();
            }
        });
    }catch(e){
        response.status = false;
        response.messages = ['Something went wrong'];
        res.send(response);
        res.end();
    }
  }
};

/**
 * get my teams
 *
 */
exports.removeMemberFromTeam = function(req, res, next) {

  var team_id = req.body.team_id;
  var member_id = req.body.member_id;
  var account_type = req.body.account_type;

  if( account_type == "invited") {
      // If the user type is 'invites' then remove this from 'invites' collection
      next();
  }
  else {
  
        if( team_id != '' && member_id != '') {

        var where = { _id: new ObjectId(team_id) }

        // check the team is exist or not
        Team.findOne(where, function(err, existingTeam) {
        if(existingTeam) {
            
            // User not exist in this group, Insert this user into this team
            member_id = new ObjectId(member_id);
            Team.update({ "_id" : existingTeam._id },{$pull: {member_ids: { _id: member_id }}},function(err){
                if(err){
                    response.status = false;
                    response.message = "Something went wrong";
                    res.send(response);
                    res.end();
                }else{
                    response.status = true;
                    response.message = "Member removed";
                    res.send(response);
                    res.end();
                }
            });
                        
        }else{
            response.status = false;
            response.message = 'Team not exist';
            res.send(response);
            res.end();
        }
        });


        }else{
        response.status = false;
        response.message = 'Something went wrong';
        res.send(response);
        res.end();
        }
  }
};

/**
 * get teams by id
 *
 */
exports.getTeamsById = function(req, res, next) {

    // console.log(req.body._id);
    if(req.body._id !== undefined && req.body._id !== ''){
        var where = { manager_id: new ObjectId(req.body._id) };

        Team.find(where).exec(function(err, lists) {
            if(!err) {
                // console.log(lists);
                req.body.resdata = lists;
                next();
            } else {
                response.status   = false;
                response.message  = 'Something went wrong..';
                res.send(response);
                res.end();
            }
        });
    }else{
        response.status = false;
        response.message = 'Something went wrong';
        res.send(response);
        res.end();
    }
};

/**
 * get my teams
 *
 */
exports.getTeamsByMember = function(req, res, next) {

  var _id = new ObjectId(req.user._id);
  var condition = { member_ids: { $elemMatch: { _id: _id } } };

  Team.find(condition).exec(function(err, lists) {
    if(!err) {
        response.status   = true;
        response.data  = lists;
        response.message  = 'Teams';
        res.send(response);
        res.end();
    } else {
        response.status   = false;
        response.message  = 'Something went wrong..';
        res.send(response);
        res.end();
    }
  });
};


exports.getCompanyDetails = function(req, res, next) {

  var company_id = new ObjectId(req.user.company_id);
  var condition = { _id: company_id };
  
  CompanyInfo.findOne(condition).exec(function(err,company){
    if(!err) {
        response.status   = true;
        response.data  = company;
        response.message  = 'Teams';
        res.send(response);
        res.end();
    } else {
        response.status   = false;
        response.message  = 'Something went wrong..';
        res.send(response);
        res.end();
    }
  });
};
