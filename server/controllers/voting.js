var _ = require('lodash');
var User = require('../models/user');
var Vote = require('../models/vote');
var VoteRank = require('../models/voterank');
var EOTM = require('../models/employeeOfTheMonth');
var CompanyInfo = require('../models/companyinfo');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');
var moment = require('moment');
var config = require('../config/config');
PRO_PIC_PATH = '/images/profilepics/';

/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * post vote and comment for Employee of the month
 *
 * Accept : -  @votefor_userid,comment
 */
exports.postVote = function(req, res, next) {

  var votefor_userid  = req.body.emp_id;
  var comment  = req.body.comment;
  var response = {};
  response.status = false;
  response.message = 'Error';
  response.callback = req.body.callback;
  votefor_userid  = new ObjectId(votefor_userid);
    var company_id = req.user.company_id;
    var date = new Date();
    // date with YYYY-MM-DD format
    var cdate = JSON.stringify(date).substring(1, 11);
    
    var yearmonth = cdate.substring(0, 7)
    , conditions = { "user_id": new ObjectId(req.user._id), postdate : { $regex : new RegExp(yearmonth,'i') } };

    // checking all ready done 5 votes for this month
    // console.log(conditions);
    Vote.find(conditions, function (err, document) {
        var alreadyvoted = false;
        var mytotalvotes = 0;

        document.map(function (data, key){
            mytotalvotes++;
            // check already voted or not
            //if(data.votefor_userid === votefor_userid){
            if((data.votefor_userid.toString().indexOf(votefor_userid.toString())) !== -1 ){
                alreadyvoted = true;
            }
        });

        // check already voted or not
        if(votefor_userid.toString() === req.user._id.toString()){

            response.status = false;
            response.message = 'Self vote not allowed';
            res.send(response);
            res.end();
            return;
        }


        // disable self vote
        if(alreadyvoted){

            response.status = false;
            response.message = 'Already voted to this user';
            res.send(response);
            res.end();
        }

        else if(mytotalvotes < 5){

            var afterFeasibilityCheck = function(){
				// add a record with new vote
				conditions.votefor_userid = votefor_userid;
				conditions.postdate = cdate;
				conditions.comment = comment;
				conditions.company_id = company_id;
				conditions.name = req.user.firstname + ' ' + req.user.lastname;
				var vote = new Vote(conditions);
				vote.save(function (err) {
					if (!err) {
						response.status = true;
						response.message = 'success';

						try{
							// Find company details
							CompanyInfo.findOne({ _id: new ObjectId(req.user.company_id) },function(err,companyinfo){
								// If company exist
								if (!err && companyinfo !== null) {
									var company_name = (companyinfo.companyname.trim() !== '')? companyinfo.companyname: companyinfo.domain_name;
									votefor_userid = new ObjectId(votefor_userid);
									User.findOne({ _id: votefor_userid }, function(err, user){
										var transporter = nodemailer.createTransport();
										var link = 'http://' + req.get('host') + '/publicprofile/' + user._id;
										var body = "Hooray "+user.firstname+"! <br><br>" +
												"Someone in "+ company_name +" has voted for you on Moodwonder! You have done something remarkable or shown you are a great team player! Congrats! <br><br>" +
												
                                                '<strong>"'+ comment.replace(/\r?\n/g, '<br />') + '"</strong> <br><br>' +

                                                "<a style='-webkit-border-radius: 6; -moz-border-radius: 6; border-radius: 6px; font-family: Arial; color: #ffffff; font-size: 14px; background: #26a69a; padding: 10px 20px 10px 20px; text-decoration: none;' href='" + link + "'>See votes</a> <br><br>" +
												"It's time to cast your vote and thank someone for being a great colleague or for doing a great job!<br><br>" +
												"Thanks,"+
												"<br> Moodwonder Team";
										body = emailTemplate.general(body);
										transporter.sendMail({
											from: config.fromEmail,
											to: user.email,
											subject: 'Good Job! Someone in '+ company_name +' has voted for you',
											html: body
										});
										var postdate = moment().format('YYYY-MM-01');
										var conditions  = { user_id: user._id, company_id : companyinfo._id, postdate : postdate };
										var update  = { user_id: user._id, company_id : companyinfo._id, $inc: { count : 1 }, postdate : postdate };
										var options = { upsert: true };
										VoteRank.update(conditions, update, options, function (err) {
											// console.log('Vote rank updated');
										});
									});
								}else{
									console.log('Company record not found.');
								}
							});
						}
						catch(e)
						{
							console.log('Vote email - Error'+e);
						}
					} else {
						response.status = false;
						response.message = 'something went wrong';
					}
					res.send(response);
					res.end();
				});
            }

			// Employee of the month selection status
			EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company_id: req.user.company_id }, function(err, emp){

				if(!err && emp!==null){
					// Not allowed to vote if already awarded the EOTM
					response.status = false;
					response.message = "Employee of the month has already been awarded";
					res.send(response);
					res.end();
				}else{
					// Allow the vote if not awarded the EOTM
					afterFeasibilityCheck();
				}
			});

        } else {

            response.status = false;
            response.message = 'You cannot vote for more than 5 people';
            res.send(response);
            res.end();
        }
    });
};

/**
 * Get all stats data of an emplyee by month
 *
 * Accept : -  @votefor_userid,comment
 */
exports.getEmpMonthView = function(req, res, next) {

  var votefor_userid  =   req.body.emp_id;
  var date            =   req.body.date;
  votefor_userid      =   new ObjectId(votefor_userid);
  var dateObj         =   new Date();

  var company_id      =   req.user.company_id;

  // date with YYYY-MM-DD format
  var cdate           =   JSON.stringify(dateObj).substring(1, 11);
  if(date !== undefined){
      cdate = date;
  }

  var yearmonth = cdate.substring(0, 7)
  , conditions  = { "company_id": company_id, "votefor_userid": votefor_userid, postdate : { $regex : new RegExp(yearmonth,'i')  } };

  User.findOne({ _id: votefor_userid, company_id: company_id }, function(err, user){
    if (!err) {

        Vote.find(conditions, function (err, document) {

            var totalvotes =  0;
            var comments   =  [];
            var employee   =  {};
            document.map(function (document, key){
                totalvotes++;
                var comment = { comment: document.comment, name: document.name };
                comments[key] = comment;
            });
            var profileimage = (user.profile_image !== '') ? PRO_PIC_PATH+user.profile_image : PRO_PIC_PATH+'no-profile-img.gif';
            employee = {
                _id: user._id,
                photo: profileimage,
                name: (user.firstname+' '+user.lastname),
                votes: totalvotes,
                comments: comments
            };
            response.status  = true;
            response.message = 'success';
            response.data = employee;
            res.send(response);
        });
    } else {
        response.status = false;
        response.message = 'something went wrong';
        res.send(response);
        res.end();
    }
  });
};

/**
 * Get all stats data of an emplyee by month
 *
 * Accept : -  @votefor_userid,comment
 */
exports.chooseEmployeeOfTheMonth = function(req, res, next) {

  var votefor_userid  =   req.body.emp_id;
  votefor_userid      =   new ObjectId(votefor_userid);
  var dateObj         =   new Date();
  var company_id      =   req.user.company_id;

  // date with YYYY-MM-DD format
  var cdate           =   JSON.stringify(dateObj).substring(1, 11);
  var yearmonth       =   cdate.substring(0, 7);
 
  User.findOne({ _id: votefor_userid, company_id: company_id }, function(err, user){
    if ( !err && user !== null ) {
        var conditions         =     {};
        EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company_id: company_id }, function(err, emp){
            if(emp){
                response.status = false;
                response.message = 'Already awarded';
                res.send(response);
                res.end();
            }else{
                // add a record with new vote
                var conditions         =     {};
                conditions.date        =     cdate;
                conditions.company_id  =     company_id;
                conditions.emp_id      =     votefor_userid;
                conditions.emp_details =     user;
                var eotm               =     new EOTM(conditions);
                eotm.save(function (err) {
                    if (!err) {

                        try{
                            // Find company details
                            CompanyInfo.findOne({ _id: new ObjectId(req.user.company_id) },function(err,companyinfo){
                                // If company exist
                                if (!err && companyinfo !== null) {
                                    var company_name = (companyinfo.companyname.trim() !== '')? companyinfo.companyname: companyinfo.domain_name;
                                    var transporter = nodemailer.createTransport();
                                    var link = 'http://' + req.get('host') + '/publicprofile/'+user._id;
                                    var body = "Congratulations "+ user.firstname +' '+ user.lastname +"! You have received the most votes in Moodwonder within "+ company_name +" this month!<br><br>" +
                                            "<a style='-webkit-border-radius: 6; -moz-border-radius: 6; border-radius: 6px; font-family: Arial; color: #ffffff; font-size: 14px; background: #26a69a; padding: 10px 20px 10px 20px; text-decoration: none;' href='" + link + "'>Check it out</a> <br><br>" +
                                            "Thanks,"+
                                            "<br> Moodwonder Team";
                                    body = emailTemplate.general(body);
                                    transporter.sendMail({
                                        from: config.fromEmail,
                                        to: user.email,
                                        subject: 'Well done!, You have been receiving the most votes in '+ company_name +'. You should be named as the Employee of the Month!',
                                        html: body
                                    });
                                }else{
                                    console.log('Company record not found.');
                                }
                            });
                        }
                        catch(e)
                        {
                            console.log('Vote email - Error'+e);
                        }

                        response.status = true;
                        response.message = 'success';
                    } else {
                        response.status = false;
                        response.message = 'something went wrong';
                    }
                    res.send(response);
                    res.end();
                });
            }
        });
    } else {
        response.status = false;
        response.message = 'something went wrong';
        res.send(response);
        res.end();
    }
  });
};
