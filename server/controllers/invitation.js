var _ = require('lodash');
var Team = require('../models/team');
var User = require('../models/user');
var Invite = require('../models/invite');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var validations = require('../controllers/validationRules');
var App = require('../../public/assets/app.server');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');
var CompanyInfo = require('../models/companyinfo');
var config = require('../config/config');

/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * Invite a user
 *
 * Accept : -  @teamname
 */
exports.sendInvitation = function(req, res, next) {

    var type         =    req.body.invitetype;
    var data         =    req.body.data;
    var feedback     =    ( typeof req.body.data !== 'undefined' ) ? req.body.data.feedback : [];
    var response     =    {};

    if(req.body.type){
        response.type = req.body.type;
    }

    var afterDomainCheck = function(){
        if( type == 'Team' ) {

            var email = '';
            if(data !== undefined){
                email = data.email;
            }

            var inviteString = email + Date.now();
            inviteString = crypto.createHash('md5').update(inviteString).digest("hex");

            // reference is used to check this invitation is already sent or not
            var reference = {};
            if( data !== undefined && data.team !== undefined && data.team._id !== undefined ) {
                reference = { "team": data.team._id, "manager_id": data.team.manager_id, "email": email };
            }

            var invite =  new Invite({
                email: email,
                type: type,
                link: inviteString,
                reference: reference,
                data: data
            });

            var where = { email: email, type : "Team", reference: { $elemMatch: reference } };
            Invite.findOne(where, function(err, existingInvite) {
                if(existingInvite) {
                    feedback.push(email+': Waiting to accept invitation');
                    // Exiting from the Callback function
                    response.status = true;
                    response.message = '';
                    response.messages = feedback;
                    response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
                    res.send(response);
                    res.end();
                }else{
                    invite.save(function(err) {
                        if(!err){

                            // Find company details
                            CompanyInfo.findOne({ _id: new ObjectId(req.user.company_id) },function(err,companyinfo){

                                // If company exist
                                if (!err && companyinfo !== null) {
                                    var invitedby   = req.body.invitedby;
                                    if(invitedby && invitedby === 'manager'){
                                        // Invited by Team manager
                                        invitedby = 'Yay! Your manager in ';
                                    }else if(invitedby && invitedby === 'colleague'){
                                        // Invite as a manager
                                        invitedby = 'Your colleague in ';
                                    }

                                    var link = 'http://' + req.get('host') + '/invitesignup/' +inviteString;
                                    var company_name = (companyinfo.companyname.trim() !== '')? companyinfo.companyname: companyinfo.domain_name;
                                    var transporter = nodemailer.createTransport();
                                    var body = "Welcome to Moodwonder! <br><br>" +
                                                invitedby + company_name +" has invited you to join Moodwonder. <br><br>" +
                                                "<a style='-webkit-border-radius: 6; -moz-border-radius: 6; border-radius: 6px; font-family: Arial; color: #ffffff; font-size: 14px; background: #26a69a; padding: 10px 20px 10px 20px; text-decoration: none;' href='" + link + "'>Set my password</a> <br><br>" +
                                                "You may copy/paste this link into your browser: <br><br>" +
                                                "registration: " + link + "<br><br>" +
                                                "Thanks," +
                                                "<br> Moodwonder Team";

                                    body = emailTemplate.general(body);

                                    transporter.sendMail({
                                        from: config.fromEmail,
                                        to: email,
                                        subject: 'You have been invited to join '+ company_name +' on Moodwonder',
                                        html: body
                                    }, function(error, info){
                                        if(error){
                                            // Error handling
                                        }
                                    });
                                }else{
                                    console.log('Company record not found.');
                                }
                            });
                            feedback.push('Invitation sent successfully');
                        }else{
                            feedback.push('Error with :'+current_member_email);
                        }
                        // Exiting from the Callback function
                        response.status   = true;
                        response.message  = '';
                        response.messages = feedback;
                        response.callback = (req.body.callback !== undefined) ? req.body.callback: '';
                        res.send(response);
                        res.end();
                    });
                }
            });
        }else if( type == 'Signup' ) {

            email = req.body.email;
            var inviteString = email + Date.now();
            inviteString = crypto.createHash('md5').update(inviteString).digest("hex");

            // reference is used to check this invitation is already sent or not
            var reference = { "invitedby": req.user.email, "email": req.body.email };
            
            var invite =  new Invite({
            email: email,
            type: type,
            link: inviteString,
            reference: reference
            });

            var where = { email: email };
            User.findOne(where, function(err, existingUser) {
                if(existingUser) {
                    response.status = false;
                    response.message = 'The email address you have entered is already registered';
                    res.send(response);
                    res.end();
                    return;
                }else{
                    where = { email: email, type : type, reference: { $elemMatch: reference } };
                    Invite.findOne(where, function(err, existingInvite) {
                        if(existingInvite) {
                            response.status = false;
                            response.message = 'Waiting to accept invitation';
                            res.send(response);
                            res.end();
                        }else{
                            invite.save(function(err) {
                                if(!err){

                            // Find company details
                            CompanyInfo.findOne({ _id: new ObjectId(req.user.company_id) },function(err,companyinfo){

                                        // If company exist
                                        if (!err && companyinfo !== null) {
                                            var invitedby   = req.body.invitedby;
                                            if(invitedby && invitedby === 'manager'){
                                                // Invited by Team manager
                                                invitedby = 'Yay! Your manager in ';
                                            }else if(invitedby && invitedby === 'colleague'){
                                                // Invite as a manager
                                                invitedby = 'Your colleague in ';
                                            }

                                            var link = 'http://' + req.get('host') + '/invitesignup/' +inviteString;
                                            var company_name = (companyinfo.companyname.trim() !== '')? companyinfo.companyname: companyinfo.domain_name;
                                            var transporter = nodemailer.createTransport();
                                            var body = "Welcome to Moodwonder! <br><br>" +
                                                        invitedby + company_name +" has invited you to join Moodwonder. <br><br>" +
                                                        "<a style='-webkit-border-radius: 6; -moz-border-radius: 6; border-radius: 6px; font-family: Arial; color: #ffffff; font-size: 14px; background: #26a69a; padding: 10px 20px 10px 20px; text-decoration: none;' href='" + link + "'>Set my password</a> <br><br>" +
                                                        "You may copy/paste this link into your browser: <br><br>" +
                                                        "registration: " + link + "<br><br>" +
                                                        "Thanks," +
                                                        "<br> Moodwonder Team";

                                            body = emailTemplate.general(body);

                                            transporter.sendMail({
                                                from: config.fromEmail,
                                                to: email,
                                                subject: 'You have been invited to join '+ company_name +' on Moodwonder',
                                                html: body
                                            }, function(error, info){
                                                if(error){
                                                    // Error handling
                                                }
                                            });
                                        }else{
                                            console.log('Company record not found.');
                                        }
                                    });
                                    
                                    response.status = true;
                                    response.message = 'Invitation sent successfully';
                                    res.send(response);
                                    res.end();
                                }else{
                                    res.send(response);
                                    res.end();
                                }
                            });
                        }
                    });
                }
            });

        }else{
            response.status = false;
            response.message = 'Something went wrong';
            res.send(response);
            res.end();
        }
    };

    var email = '';
    if(data !== undefined){
        email = data.email;
    }

    var domain = email.replace(/.*@/, "");
    // console.log(domain);
    domain     = domain.split('.')[0];
    //console.log(domain);
    try{
        CompanyInfo.findOne({ _id: new ObjectId(req.user.company_id) }, function(err, company){
            if(company !== null){
                // console.log(company);
                if(company.domain_name !== domain){
                    response.status = false;
                    response.message = 'Wrong domain name';
                    response.messages = ['Wrong domain name'];
                    res.send(response);
                    res.end();
                }else{
                    // to continue the execution
                    afterDomainCheck();
                }
            }else{
                response.status = false;
                response.message = 'Company domain not found';
                response.messages = ['Company domain not found'];
                res.send(response);
                res.end();
            }
        });
    }catch(e){
        console.log(e);
        response.status = false;
        response.message = 'Something went wrong';
        response.messages = ['Something went wrong'];
        res.send(response);
        res.end();
    }
};

/**
 * Remove invitation
 *
 * Accept : -  @member_id
 */
exports.removeInvitation = function(req, res, next) {
    var invitationId = req.body.member_id;
    invitationId = new ObjectId(invitationId);
    Invite.remove({_id: invitationId}, function (err) {
        if(err){
            response.status = false;
            response.message = "Something went wrong";
            res.send(response);
            res.end();
        }else{
            response.status = true;
            response.message = "Invitation removed";
            res.send(response);
            res.end();
        }
    });
};


/**
 * Handle signup page GET request 
 * Pass e-mail id to the react component if there is a valid url of invitation
 * 
 */
exports.handleSignup = function(req, res, next) {

  var hash = req.params.hash;

  var where = { link: hash }
  console.log(where);

  // check the link is exist or not
  Invite.findOne(where, function(err, record) {
    if(record) {
        req.body.inviteEmail = record.email;
        // going to * route handler
        next();
    }else{
        // going to * route handler
        next();
    }
  });

};

/**
 * Handle signup invitation
 * 
 */
exports.inviteSignup = function(req, res, next) {

    var email = req.body.email;
    if(!err){

        var transporter = nodemailer.createTransport();
        var body = "Hi,<br><br> Welcome to moodwonder. <br>"+
        "<b>Click here to join :</b>"+ ' http://'+req.get('host') +'/invitesignup/'+inviteString+
        "<br><br> Best wishes"+
        "<br> Moodwonder Team";

        body = emailTemplate.general(body);

        transporter.sendMail({
            from: config.fromEmail,
            to: email,
            subject: 'Moodwonder invitation',
            html: body
        }, function(error, info){
            if(error){
                // Error handling
            }
        });

        response.status = true;
        response.message = 'Invitation sent successfully';
        res.send(response);
        res.end();
    }else{
        res.send(response);
        res.end();
    }
};

/**
 * Handle signup invitation
 * 
 */
exports.inviteAnonymously = function(req, res, next) {

    var response = {};
    var email = req.body.email;
    if(email!==''){

        User.findOne( { email: email }, function(err, record) {
            if(!record){

                // Find company details
                CompanyInfo.findOne({ _id: new ObjectId(req.user.company_id) },function(err,companyinfo){

                    // If company exist
                    if (!err && companyinfo !== null) {

                        var company_name = (companyinfo.companyname.trim() !== '')? companyinfo.companyname: companyinfo.domain_name;
                        var transporter = nodemailer.createTransport();
                        var body = "Welcome to Moodwonder! <br><br>" +
                                    "Yay! Someone has invited you anynomously to join Moodwonder.! <br><br>" +
                                    "Thanks," +
                                    "<br>Moodwonder Team";

                        body = emailTemplate.general(body);

                        transporter.sendMail({
                            from: config.fromEmail,
                            to: email,
                            subject: 'You have been invited to join '+ company_name +' on Moodwonder',
                            html: body
                        }, function(error, info){
                            if(error){
                                // Error handling
                            }
                        });
                    }else{
                        console.log('Company record not found.');
                    }
                });

                response.status = true;
                response.message = 'Invitation sent successfully';
                res.send(response);
                res.end();

            }else{
                response.status = false;
                response.message = 'The email address you have entered is already registered';
                res.send(response);
                res.end();
            }
        });

    }else{
        response.status = false;
        response.message = 'error';
        res.send(response);
        res.end();
    }
};
