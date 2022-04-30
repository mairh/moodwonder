var express = require('express');
var _ = require('lodash');
var User = require('../models/user');
var CompanyInfo = require('../models/companyinfo');
var Invite = require('../models/invite');
var Team = require('../models/team');
var Vote = require('../models/vote');
var EOTM = require('../models/employeeOfTheMonth');
var Company = require('../models/company');
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var validations = require('../controllers/validationRules');
var App = require('../../public/assets/app.server');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var path = require('path');
var blockedDomains = require('../config/blocked-domains');
var VoteRank = require('../models/voterank');
var moment = require('moment');
var config = require('../config/config');
PRO_PIC_PATH = '/images/profilepics/';
BANNER_PIC_PATH = '/images/bannerpics/';

function dateByNumber(num) {
    // 1 for January
    num = num-1;
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var d = new Date();
    return month[num];
}

var hasValue = function(val){
    if(val !== undefined && val !== ''){
        return true;
    }else{
        return false;
    }
}

/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

/**
 * Encrypt password
 */
exports.encryptPassword = function (req, res, next) {

    try{
        var password = req.body.password.trim();

        if (password.length >= 6) {

            bcrypt.genSalt(5, function (err, salt) {

                if (!err) {
                    bcrypt.hash(password, salt, null, function (err, hash) {
                        if (!err) {
                            req.body.real_password = req.body.password;
                            req.body.password = hash;
                            // console.log(req.body.password);
                            next();
                        }else {
                            // bcrypt.hash Error
                            response.status = false;
                            response.message = 'Something went wrong..';
                            res.send(response);
                            res.end();
                        }
                    });
                } else {
                    // bcrypt.genSalt Error
                    response.status = false;
                    response.message = 'Something went wrong..';
                    res.send(response);
                    res.end();
                }
            });
        } else {
            req.body.real_password = req.body.password;
            req.body.password = '';
            next();
        }
    } catch(err) {
        req.body.password = '';
        next();
    }
}

/**
 * Check login status
 */
exports.checkLogin = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.json({'status': false, 'message': 'Session expired.!'});
        res.end();
    }
}

/**
 * Login
 */
exports.postLogin = function (req, res, next) {

    var response = {};
    passport.use('local-user', new LocalStrategy({
        usernameField: 'email'
    }, function (email, password, done) {
        User.findOne({email: email}, function (err, user) {
            if (!user)
                return done(null, false, {message: 'Email ' + email + ' not found'});
            user.comparePassword(password, function (err, isMatch) {
                if (isMatch) {
                    // No need to send password data to the browser
                    user.password = '';
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid email or password'});
                }
            });
        });
    }));


    // Do email and password validation for the server
    passport.authenticate('local-user', function (err, user, info) {
        //console.log(user);
        if (err)
            return next(err);
        if (!user) {
            response.status = false;
            response.message = info.message;
            res.send(response);
            res.end();
            return;
        }
        // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
        req.logIn(user, function (err) {
            if (err)
                return next(err);
            response.status = true;
            response.message = 'Success! You are logged in';
            response.user = user;
            if(req.body.javascript_status){
                //console.log('javascript_status');
                // if not set client_side_rendering_identifier
                // To fix script loading issue in the browser
                // refer bug Bug #15825
                res.redirect('/login');
                //next();
                return;
            }else{
                //console.log('javascript_status false');
                res.send(response);
                res.end();
            }
        });
    })(req, res, next);
};


/**
 * Get all Users for admin only
 */
exports.getallusersforadmin = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

    var condition = {};
    // How many adjacent pages should be shown on each side?
    var adjacents = 3;

    /*
       First get total number of rows in data table.
       If you have a WHERE clause in your query, make sure you mirror it here.
    */
    var total_pages = 0;
    var find_rows = false;

    User.count({}, function(err, c) {
        total_pages = c;
        if(total_pages){
            var start = 0;
            var limit = 10                              //how many items to show per page
            // console.log(req.body);
            var page = req.body.page;
            // console.log(typeof page);
            if(page){
                start = (page - 1) * limit;             //first item to display on this page
            }
            /* Get data. */
            User.find({}).skip(start).limit(limit).exec(function (err, lists) {
                if (!err) {

                    // Setup page vars for display.
                    if (page == 0) page = 1;                    //if no page var is given, default to 1.
                    prev = page - 1;                            //previous page is page - 1
                    next = page + 1;                            //next page is page + 1
                    lastpage = Math.ceil(total_pages/limit);    //lastpage is = total pages / items per page, rounded up.
                    lpm1 = lastpage - 1;                        //last page minus 1

                    // Now we apply our rules and draw the pagination object.
                    // We're actually saving the code to a variable in case we want to draw it more than once.
                    pagination = [];
                    if(lastpage > 1)
                    {
                        //previous button
                        if (page > 1){
                            pagination.push({ page: prev, text: 'previous' });
                        }else{
                            pagination.push({ page: false, text: 'previous' });
                        }

                        //pages
                        if (lastpage < 7 + (adjacents * 2))    //not enough pages to bother breaking it up
                        {
                            for (counter = 1; counter <= lastpage; counter++)
                            {
                                if (counter == page){
                                    pagination.push({ page: false, text: counter });
                                }else{
                                    pagination.push({ page: counter, text: counter });
                                }
                            }
                        }
                        else if(lastpage > 5 + (adjacents * 2))    //enough pages to hide some
                        {
                            //close to beginning; only hide later pages
                            if(page < 1 + (adjacents * 2))
                            {
                                for (counter = 1; counter < 4 + (adjacents * 2); counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                                pagination.push({ page: false, text: '..........' });
                                pagination.push({ page: lpm1, text: lpm1 });
                                pagination.push({ page: lastpage, text: lastpage });
                            }
                            //in middle; hide some front and some back
                            else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
                            {
                                pagination.push({ page: 1, text: 1 });
                                pagination.push({ page: 2, text: 2 });
                                pagination.push({ page: false, text: '..........' });
                                for (counter = page - adjacents; counter <= page + adjacents; counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                                pagination.push({ page: false, text: '..........' });
                                pagination.push({ page: lpm1, text: lpm1 });
                                pagination.push({ page: lastpage, text: lastpage });
                            }
                            //close to end; only hide early pages
                            else
                            {
                                pagination.push({ page: 1, text: 1 });
                                pagination.push({ page: 2, text: 2 });
                                pagination.push({ page: false, text: '..........' });
                                for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                            }
                        }

                        //next button
                        if (page < counter - 1){
                            pagination.push({ page: next, text: 'next' });
                        }else{
                            pagination.push({ page: false, text: 'next' });
                        }
                    }

                    response.status = true;
                    response.message = 'success';
                    // formatting user data for table
                    var data          = {};
                    data.rows         = new Array(lists.length);
                    data.pagination   = pagination;
                    data.class = "table";
                    if(lists !== null){
                        var counter = 0;
                        lists.map(function(user, key){

                            // console.log(user);
                            var company = { _id: user.company_id };
                            CompanyInfo.findOne(company).exec(function(err,company){

                                var hasComp = false;
                                if(company){
                                    hasComp = true;
                                }
                                data.rows[key] =  {
                                 _id: user._id,
                                 name: ( user.firstname+' '+user.lastname),
                                 email: user.email,
                                 usertype: user.usertype,
                                 company_admin: (user.company_admin) ? true : false,
                                 verifylink: (user.verifylink === "1") ? true : false,
                                 country: (hasComp && company.country !== undefined )? company.country: '',
                                 domain_name: (hasComp && company.domain_name !== undefined )? company.domain_name: '',
                                 companyname: (hasComp && company.companyname !== undefined )? company.companyname: '',
                                 companysize: (hasComp && company.companysize !== undefined )? company.companysize: '',
                                 language: user.language
                                };
                                counter++;
                                if(counter === data.rows.length){
                                    response.data = data;
                                    res.json(response);
                                }
                            });
                        });
                    }
                }
                else
                {
                    res.json(response);
                }
            });
        }else{
            res.json(response);
        }
    });
};

/**
 * Get all Users for admin only
 */
exports.getallusers = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';

    var condition = {};
    if(req.body.type !== undefined && req.body.type === 'admin'){
        //condition = { 'usertype': 'admin' };
    }

    User.find(condition).exec(function (err, lists) {
        if (!err) {
            response.status = true;
            response.message = 'success';

            // formatting user data for table
            var data = {};
            data.header = ['Id','Name', 'Email', 'Type', 'Verify Status', 'Country', 'Company name', 'Company size', 'Language'];
            data.rows   = new Array(lists.length);
            data.class = "table";
            if(lists !== null){
                var counter = 0;
                lists.map(function(user, key){

                    // console.log(user);
                    var company = { _id: user.company_id };
                    CompanyInfo.findOne(company).exec(function(err,company){

                        var hasComp = false;
                        if(company){
                            hasComp = true;
                        }
                        data.rows[key] =  [
                          {
                              column: user._id,
                              display:false
                          }
                         ,{column: ( user.firstname+' '+user.lastname) }
                         ,{column: user.email}
                         ,{column: user.usertype}
                         ,{column: (user.verifylink === "1") ? true : false }
                         ,{column: (hasComp && company.country !== undefined )? company.country: '' }
                         ,{column: (hasComp && company.companyname !== undefined )? company.companyname: '' }
                         ,{column: (hasComp && company.companysize !== undefined )? company.companysize: '' }
                         ,{column: user.language }
                        ];
                        counter++;
                        if(counter === data.rows.length){
                            response.data = data;
                            res.json(response);
                        }
                    });
                });
            }
        } else {
            res.json(response);
        }
    });
};

/**
 * Get a User
 */
exports.getUserInfo = function (req, res) {

    response = {};
    response.status = false;
    response.message = 'Error';

    var condition = {'_id': new ObjectId(req.user._id)};
    User.findOne(condition, function (err, lists) {
        if (!err && lists !== null) {

            response = {};
            response.status = true;
            response.message = 'success';
            response.data = {
                '_id': 0,
                'fname': '',
                'lname': '',
                'email': '',
                'language': '',
                'reportfrequency': '',
                'password': '',
                'companyname': '',
                'mymanager': '',
                'industry': '',
                'continent': '',
                'country': '',
                'state': '',
                'city': '',
                'address': '',
                'website': '',
                'companysize': '',
                'summary': '',
                'usertype' : '',
                'company_admin' : false
            };
            if (req.query.type == 'company') {

                var company = { _id: req.user.company_id };
                CompanyInfo.findOne(company).exec(function(err,mycompany){
                    if(mycompany !== null){
                        response.data = mycompany;
                        res.json(response);
                    }else{
                        response.status = true;
                        response.message = 'success';
                        res.json(response);
                    }
                });
            } else {

                if (lists.mymanager === undefined || lists.mymanager[0] === undefined) {
                    lists.mymanager[0] = {'email': ''};
                }

                var profileimage = (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : '/images/no-profile-img.gif';
                var profileimage_status = (lists.profile_image !== '') ? true : false;
                var cover_image = (lists.cover_image !== '') ? BANNER_PIC_PATH+lists.cover_image : '/images/cover.jpg';
                var cover_image_status = (lists.cover_image !== '') ? true : false;
                response.data = {
                    '_id': lists._id,
                    'fname': lists.firstname,
                    'lname': lists.lastname,
                    'email': lists.email,
                    'language': lists.language,
                    'reportfrequency': lists.report_frequency,
                    'password': '',
                    'mymanager': lists.mymanager[0].email,
                    'profile_image': profileimage,
                    'profileimage_status': profileimage_status,
                    'cover_image': cover_image,
                    'cover_image_status': cover_image_status,
                    'summary': lists.summary,
                    'usertype' : lists.usertype,
                    'company_admin' : lists.company_admin
                };

                var date = new Date();
                // date with YYYY-MM-DD format
                var cdate = JSON.stringify(date).substring(1, 11);
                var yearmonth = cdate.substring(0, 7);
                EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company_id: lists.company_id }, function(err, emp){

                    if(!err && emp!==null){
                        response.data.disablevote = true;
                    }
                    res.json(response);
                });

            }
        } else {
            res.json(response);
        }
    });
};

/**
 * Get test
 */
exports.test = function (req, res) {
    var body = "Hi,<br><br> To complete your registration and verify your email please use the following link" +
            "<br><b>Click here :</b>" + ' http://' + req.get('host') + "/createpassword/sdfdsfsdfsdfsdf" +
            "<br> Best wishes" +
            "<br> Moodwonder Team";

    body = emailTemplate.general(body);
    var transporter = nodemailer.createTransport();
    transporter.sendMail({
        from: config.fromEmail,
        to: 'ujjwal@moodwonder.com',
        subject: 'Test mail',
        html: body
    });
    res.send({});
};

/**
 * Logout
 */
exports.getLogout = function (req, res, next) {
    console.log('loggedout');
    console.log(req.user);
    req.logout();
    //req.logOut();
    req.session.destroy();
    next();
};

/**
 * First step of signup.
 *
 * Accept : -  @email
 */
exports.postSignupStep1 = function (req, res, next) {

    /************************************************
       Make same changes in handleInviteSignup
    ************************************************/
    var response = {};
    req.body.email = req.body.email.toLowerCase();
    var email = req.body.email;
    var type = req.body.type;

    if (type == 'forgotpassword') {
        // console.log('------'+type);
        next();
        return;
    }

    if (!blockedDomains.checkDomain(email)) {
        response.status = false;
        response.message = 'It is a restricted email domain. Please make sure you enter your work email address';
        res.send(response);
        return;
    }

    var verifystring = email + Date.now();
    verifystring = crypto.createHash('md5').update(verifystring).digest("hex");
    var user = new User({
        email: req.body.email,
        verifylink: verifystring
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {

        if (existingUser !== null && existingUser) {

            response.status = false;
            response.message = 'The email address you have entered is already registered';
            res.send(response);
            res.end();
        } else {

            user.save(function (err, newuser) {
                if (!err) {

                    // Get domian name without extension
                    // 'test@example.com' converting into 'example'
                    var email  = req.body.email;
                    var domain = email.substring(email.lastIndexOf("@")+1);
                    var website = domain;
                    domain = domain.substring(0,domain.lastIndexOf("."));

                    var afterCompanyDetails = function(companyinfo){

                        // Make same changes in handleInviteSignup
                        var thismonth = moment().format('YYYY-MM-01');
                        var query  = { company_id : companyinfo._id, user_id: newuser._id, postdate : thismonth };
                        var newVoteRank = new VoteRank(query);
                        newVoteRank.save(function (err, doc) {
                            console.log('Vote rank inserted');
                        });
                        // console.log(companyinfo);
                        // Update company id in User collection
                        var conditions = {
                            _id: new ObjectId(newuser._id)
                        };

                        var today = moment().format('YYYY-MM-DD HH:mm:ss');
                        var update  = { company_id : companyinfo._id, verifylink_date: today };
                        var options = { multi: false };
                        User.update(conditions, update, options, function (err) {
                            if (!err) {

                                console.log('update done');
                            } else {

                                console.log(err);
                            }
                        });

                        var company_name = (companyinfo.companyname.trim() !== '')? companyinfo.companyname: companyinfo.domain_name;
                        var link = 'http://' + req.get('host') + '/createpassword/' +verifystring;
                        var transporter = nodemailer.createTransport();
                        var body = "Welcome to Moodwonder!,<br><br>" +
                                "We're happy you're here.<br><br>" +
                                "When you created "+company_name+" account, we didn't ask you to set a password. Let's do that now!<br><br>" +
                                "If you don't set a password within a day, you will not be able to use the link below.<br><br>" +
                                "<a style='-webkit-border-radius: 6; -moz-border-radius: 6; border-radius: 6px; font-family: Arial; color: #ffffff; font-size: 14px; background: #26a69a; padding: 10px 20px 10px 20px; text-decoration: none;' href='" + link + "'>Set my password</a> <br><br>" +
                                "You may copy/paste this link into your browser: <br><br>" +
                                "registration: " + link + "<br><br>" +
                                "Best wishes" +
                                "<br> Thanks again for joining Moodwonder!";
                        body = emailTemplate.general(body);
                        transporter.sendMail({
                            from: config.fromEmail,
                            to: email,
                            subject: 'Welcome to Moodwonder!',
                            html: body
                        });

                        response.status = true;
                        response.message = 'We have sent you an email, with instructions to complete your sign up process';

                        // if 'hash' params is exist, then add this user into the a team based on the team id in the Invite collections
                        // console.log('--req.body.hash----' + req.body.hash);
                        if (req.body.hash !== undefined && req.body.hash !== '') {

                            console.log('has hash');
                            var invite = new Invite({
                                email: email,
                                type: 'Team',
                                link: req.body.hash
                            });

                            Invite.find({ email: email }, function (err, allInvites) {
                                if(allInvites !== null){
                                    allInvites.map(function(existingInvite, key){
                                        if (existingInvite) {

                                            // console.log(existingInvite);
                                            // removing invitation record after taking the data from the collection
                                            // Otherwise it will show email id repetition in the members list in teams
                                            Invite.remove({_id: existingInvite._id }, function(err) {});

                                            if(existingInvite.type === 'Team'){
                                                var team_id = existingInvite.data[0].team._id;
                                                var where = {_id: new ObjectId(team_id)}
                                                // console.log(member_email);
                                                // check the team is exist or not
                                                Team.findOne(where, function (err, existingTeam) {
                                                    if (existingTeam) {

                                                        // User not exist in this group, Insert this user into this team
                                                        Team.update({"_id": existingTeam._id}, {$push: {member_ids: {_id: newuser._id}}}, function (err) {
                                                            if (err) {
                                                                response.status = false;
                                                                response.messages = ['Error when adding a new member'];
                                                            } else {
                                                                // Find e-mail id of the user who invited this user
                                                                User.findOne({_id: new ObjectId(existingTeam.manager_id)}, function (err, existingUser) {
                                                                    if (existingUser) {
                                                                        // console.log('has user');
                                                                        var conditions = {'_id': new ObjectId(newuser._id)}
                                                                        , update = {'mymanager': [{'_id': existingUser._id, 'email': existingUser.email}]}
                                                                        , options = {multi: false};

                                                                        // Set manager info
                                                                        User.update(conditions, update, options, function (err) {
                                                                            if (!err) {
                                                                                // console.log('updated manager');
                                                                            } else {
                                                                                // console.log('not updated manager');
                                                                            }
                                                                        });
                                                                    }
                                                                    else {
                                                                        // console.log('has no user');
                                                                    }
                                                                });
                                                                response.status = true;
                                                                response.messages = ['Member added'];
                                                            }
                                                        });
                                                    } else {
                                                        response.status = false;
                                                        response.messages = ['Team not exist'];
                                                    }
                                                });
                                                // redirectUrl();
                                            }else{
                                                // redirectUrl();
                                            }

                                        } else {
                                            response.status = true;
                                            response.messages = ['Error when processing your invitation'];
                                            req.body.response = response;
                                            // next();
                                        }
                                    });
                                }
                            });
                        } else {
                            res.send(response);
                            res.end();
                        }
                    };

                    var company = { domain_name: domain };

                    // Find company details
                    CompanyInfo.findOne(company,function(err,companyinfo){

                        // If company exist
                        if (!err && companyinfo !== null) {

                            afterCompanyDetails(companyinfo);
                        }else{
                            // Creating new company if not exist

                            company.companyname = domain;
                            company.website = website;
                            var newCompany = new CompanyInfo(company);
                            newCompany.save(function (err, companyinfo) {
                                if (!err && companyinfo !== null) {

                                    afterCompanyDetails(companyinfo);
                                }else{

                                    response.status = false;
                                    response.messages = ['Error when creating new company'];
                                    res.send(response);
                                    res.end();
                                }
                            });
                        }
                    });
                } else {
                    res.send(response);
                    res.end();
                }
            });
        }
    });
};

/**
 * Second step of signup.
 *
 * Accept : -  @password
 */
exports.postSignupStep2 = function (req, res, next) {

    var verifyString = req.body.hash.trim();
    var password = req.body.password.trim();

    if (verifyString == '') {

        response.status = false;
        response.message = 'Invalid verification link';
        res.send(response);
        res.end();
    } else if (password.length <= 6) {

        response.status = false;
        response.message = 'Password length should be at least 7 characters';
        res.send(response);
        res.end();
    } else {

        var conditions = {verifylink: verifyString}
        , update = {verifylink: 1,verifylink_date: '', password: password}
        , options = {multi: false};

        /**
         * Checking the verifylink is exist in the user collections
         */
        User.findOne(conditions, function (err, document) {

            if (document !== null) {

                var afterLinkValidityCheck = function(){
                    User.update(conditions, update, options, function (err) {
                        if (!err) {

                            response.status = true;
                            response.message = 'Password created';
                            req.body.email = document.email;
                            req.body.password = req.body.real_password;
                            next();
                        } else {

                            response.status = false;
                            response.message = 'Something went wrong..';
                            res.send(response);
                            res.end();
                        }
                    });
                }

                if(document.verifylink_date && document.verifylink_date !== ''){

                    var ms = moment().diff(moment(document.verifylink_date,"YYYY-MM-DD HH:mm:ss"));
                    // console.log(ms);
                    // 86400000 ms = 24 hours
                    if(ms > 86400000){
                        response.status = false;
                        response.message = 'Verification link has expired';
                        res.send(response);
                        res.end();
                    }else{
                        afterLinkValidityCheck();
                    }
                }else{
                    afterLinkValidityCheck();
                }

            } else {

                response.status = false;
                response.message = 'Invalid verification link';
                res.send(response);
                res.end();
            }
        });

    }

};

/**
 * For testing Signup functionality.
 */
exports.postSignUp = function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            req.flash('errors', {msg: 'Account with that email address already exists'});
        }
        user.save(function (err) {
            if (err)
                return next(err);
            req.logIn(user, function (err) {
                if (err)
                    return next(err);
                res.end('Success');
            });
        });
    });
};


/**
 * Signup
 */
exports.postUserSignUp = function (req, res, next) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            req.flash('errors', {msg: 'Account with that email address already exists'});
        }
        user.save(function (err) {
            if (err)
                return next(err);
            req.logIn(user, function (err) {
                if (err)
                    return next(err);
                res.end('Success');
            });
        });
    });
};

/**
 * Save user details
 *
 * Accept :
 * @fname:
 * @lname,
 * @email,
 * @language,
 * @reportfrequency,
 * @password
 * @summary
 *
 */
exports.postSaveUserInfo = function (req, res, next) {

    var response = {};
    var saveUserInfo = function(update){
        var conditions = {'_id': new ObjectId(req.user._id)},
        options = {multi: false};
        User.update(conditions, update, options, function (err) {
            if (!err) {

                if(response.type && response.type === 'generalinfo' && update.language !== req.user.language){
                    req.user.language = update.language;
                    res.clearCookie('lang');
                    res.cookie('lang', language);
                    response.action = 'reload';
                }
                response.status = true;
                response.message = 'User details updated';
            } else {

                response.status = false;
                response.message = 'Something went wrong..';
            }
            res.send(response);
            res.end();
        });
    }

    var model = req.body;
    console.log(model);

    if(model !== undefined && hasValue(model.type)){

        var validation = true;
        var update     = {};

        if( model.type === 'summary' ){
            var summary = model.summary;
            response.type = 'summary';
            update = { summary: summary };

        }else if( model.type === 'personalinfo' ){

            var firstname =  model.fname;
            var lastname  =  model.lname;
            // password  encrypted at `encryptPassword` route
            var password  =  model.password;
            var real_pass =  model.real_password;
            var cpassword =  model.cpassword;

            //if( hasValue(firstname) && hasValue(lastname) ){
            response.type = 'personalinfo';
            update = { firstname: firstname, lastname: lastname };

            // console.log(real_pass);
            if ( hasValue(real_pass) && hasValue(cpassword) ) {

                if( real_pass !== cpassword ){
                    validation       =  false;
                    response.message =  'New Password and Confirm Password are not equal.';
                }else if(real_pass.length <=6 ){
                    validation       =  false;
                    response.message = 'Password length should be at least 7 characters';
                }else{
                    update = { firstname: firstname, lastname: lastname, password: password };
                }
            }

        }else if( model.type === 'generalinfo' ){

            var email             =  model.email;
            var report_frequency  =  model.report_frequency;
            var language          =  model.language;

            if( hasValue(email) && hasValue(report_frequency) && hasValue(language) ){
                response.type = 'generalinfo';
                update = { email: email, report_frequency: report_frequency, language: language };
            }else{
                validation = false;
                response.message = 'Please fill the required fields';
            }
        }

        // If validation error
        if(validation){
            saveUserInfo(update);
        }else{
            response.status = false;
            res.send(response);
            res.end();
        }

    }else{
        response.status = false;
        response.message = 'Something went wrong..';
        res.send(response);
        res.end();
    }
};

/**
 * Update user photo
 *
 * Accept :
 * @profilephoto:
 *
 */
exports.UpdateUserPhoto = function (req, res) {

    var ext=path.extname(req.files.profilephoto.name);
    // console.log(req.files);
    console.log(typeof req.files.profilephoto);
    if(typeof req.files.profilephoto != 'undefined')
    {
        if((ext!=".jpg")&&(ext!=".png")&&(ext!=".jpeg")&&(ext!=".gif"))
        {

            response.image=false;
            res.send(response);
            res.end();
            return;
        }else{

            imagename     = new Date().getTime() +req.files.profilephoto.originalname;
            var oldPath   =   req.files.profilephoto.path;
            var newPath   =   path.join(__dirname,'..','..')+"/public/images/profilepics/" + imagename;
            var source    =   fs.createReadStream(oldPath);
            var dest      =   fs.createWriteStream(newPath);
            source.pipe(dest);
            source.on('end', function () {

                var conditions = {'_id': new ObjectId(req.user._id)}
                      ,update  = {'profile_image': imagename }
                     , options = {multi: false};

                // Set manager info
                User.findOne(conditions, function (errUser, user) {
                    User.update(conditions, update, options, function (err) {
                        if (!err) {
                            response.status  = true;
                            response.message = 'Profile picture updated.';
                            response.image   = PRO_PIC_PATH + imagename;

                            try{
                                if (!errUser && user !== null && user.profile_image !== '') {
                                    var filename = path.join(__dirname,'..','..')+"/public/images/profilepics/" + user.profile_image;
                                    fs.unlink(filename, function (err) {
                                        if (!err){
                                            // console.log('file deleted');
                                        }else{
                                            console.log('file not found - unable to delete the file');
                                        }
                                    });
                                }
                            }catch(e){
                                console.log(e);
                            }
                        } else {
                            response.status  = false;
                            response.message = 'Something went wrong..';
                        }
                        res.send(response);
                        res.end();
                    });
                });
            });
            source.on('error', function (err) {
                response.status  = false;
                response.message = 'Something went wrong..';
                res.send(response);
                res.end();
            });
        }
    }
};

/**
 * Save user details
 *
 * Accept :
 * @email : Email id of the manager
 *
 */
exports.postSaveManagerInfo = function (req, res, next) {

    var model = req.body;
    var response = {};
    response.type = 'managerinfo';
    // console.log(model);

    var afterFeasibilityCheck = function (){
        if (model.email == '') {

            validation = false;
            response.status = false;
            response.message = 'Invalid email id';
            res.send(response);
            res.end();
        } else {

            var conditions = {'_id': new ObjectId(req.user._id)}
            , update = {'mymanager': [{'_id': req.body.searchData._id, 'email': req.body.searchData.email}]}
            , options = {multi: false};

            User.update(conditions, update, options, function (err) {
                if (!err) {

                    response.status = true;
                    response.message = "Manager's email updated successfully";
                } else {

                    response.status = false;
                    response.message = 'Something went wrong..';
                }
                // console.log(req.body.searchData._id.toString());
                // console.log((req.body.searchData._id.toString() === '0'));
                if(req.body.searchData._id.toString() === '0'){
                    req.body.type = "managerinfo";
                    req.body.invitedby = "colleague";
                    req.body.invitetype = "Signup";
                    req.body.email = model.email;
                    req.body.data = req.body;
                    //console.log(model);
                    next();
                }else{
                    res.send(response);
                    res.end();
                }
            });
        }
    };

    // check this user is existing as subordinate
    if(req.body.email !== req.user.email){
        if(req.body.searchData && req.body.searchData._id.toString() !== '0'){
            try{
                var condition = {
                    manager_id: new ObjectId(req.user._id),
                    member_ids: {
                        $elemMatch: {
                            _id: new ObjectId(req.body.searchData._id),
                        }
                    }
                };
                Team.findOne(condition, function(err, team){
                    if(!err && team !== null){
                        response.message = "You can't add your subordinate as your manager";
                        res.send(response);
                        res.end();
                    }else{
                        afterFeasibilityCheck();
                    }
                });

            }catch(e){
                console.log(e);
            }
        }else{
            try{
                var condition = {
                    email : req.body.searchData.email,
                    type : "Team",
                    reference: {
                        $elemMatch: {
                            manager_id: new ObjectId(req.user._id),
                        }
                    }
                };
                Invite.findOne(condition, function(err, team){
                    if(!err && team !== null){
                        response.message = "You have already invited this user as your subordinate";
                        res.send(response);
                        res.end();
                    }else{
                        afterFeasibilityCheck();
                    }
                });
            }catch(e){
                console.log(e);
            }
        }
    }else{
        response.message = "You can't add your self as your manager";
        res.send(response);
        res.end();
    }
};


/**
 * Save company details
 *
 * Accept :
 * @companyname
 * @industry
 * @continent
 * @country
 * @state
 * @city
 * @address
 * @website
 * @companysize
 *
 */
exports.postSaveCompanyInfo = function (req, res) {

    var model = req.body;

    var response = {};
    var hasError = false;
    var messages = [];
    for (var key in model) {

      /*
      if(key === 'companyname' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Company name cannot be empty..');
      }
      if(key === 'industry' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Industry name cannot be empty');
      }
      if(key === 'continent' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Continent name cannot be empty');
      }
      if(key === 'country' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Country name cannot be empty');
      }
      if(key === 'state' && model[key].trim() === '' ){
        hasError = true;
        messages.push('State name cannot be empty');
      }
      if(key === 'city' && model[key].trim() === '' ){
        hasError = true;
        messages.push('City name cannot be empty');
      }
      if(key === 'address' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Address name cannot be empty');
      }
      if(key === 'website' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Website name cannot be empty');
      }
      if(key === 'companysize' && model[key].trim() === '' ){
        hasError = true;
        messages.push('Companysize name cannot be empty');
      }
      */
    }

    if(hasError){
        response.status = false;
        response.messages = messages;
        res.send(response);
        res.end();
    }else{


    var model = model;

    // console.log(req.user.company_id);
    var conditions = { _id: new ObjectId(req.user.company_id)}
    , update = model
            , options = {multi: false};

    CompanyInfo.update(conditions, update, options, function (err) {
        if (!err) {

            response.status = true;
            response.messages = ['Company details saved'];
        } else {

            response.status = false;
            response.messages = ['Something went wrong..'];
        }
        res.send(response);
        res.end();
    });
    }
};

/**
 * Forgot password
 *
 * Accept : -  @email
 */
exports.postForgotPassword = function (req, res) {

    var response = {};
    var email = req.body.email;
    var verifystring = email + Date.now();
    verifystring = crypto.createHash('md5').update(verifystring).digest("hex");
    var user = new User({
        email: req.body.email,
        verifylink: verifystring
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            var conditions = {email: email}
            , update = {verifylink: verifystring, verifylink_date: ''}
            , options = {multi: false};

            User.update(conditions, update, options, function (err) {
                if (!err) {

                    var link = 'http://' + req.get('host') + '/createpassword/' + verifystring;
                    var transporter = nodemailer.createTransport();
                    var body = "To reset your password please click the following button: <br><br>" +
                            "<a style='-webkit-border-radius: 6; -moz-border-radius: 6; border-radius: 6px; font-family: Arial; color: #ffffff; font-size: 14px; background: #26a69a; padding: 10px 20px 10px 20px; text-decoration: none;' href='" + link + "'>Set my password</a> <br><br>" +
                            "You may copy/paste this link into your browser: <br><br>" +
                            "registration: " + link + "<br><br>" +
                            "Thanks," +
                            "<br> Moodwonder Team";
                    body = emailTemplate.general(body);

                    transporter.sendMail({
                        from: config.fromEmail,
                        to: email,
                        subject: 'Reset your password',
                        html: body
                    });
                    response.status = true;
                    response.message = 'We have sent you an email with instructions how to reset your password';
                    res.send(response);
                    res.end();
                } else {
                    res.send(response);
                    res.end();
                }
            });

        } else {
            response.status = false;
            response.message = 'Email id does not exist';
            res.send(response);
            res.end();
        }
    });
};

/**
 * Find user by e-mail id
 */
exports.findUserByEmailId = function (req, res, next) {

    var user = new User({
        email: req.body.email
    });

    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            req.body.searchData = existingUser;
            next();
        } else if (req.url === '/savemanagerdetails') {
            var searchData = {'_id': '0', 'email': req.body.email};
            req.body.searchData = searchData;
            next();
        } else {
            response.status = false;
            response.message = 'E-mail id not exist in the system';
            res.send(response);
            res.end();
        }
    });
};

/**
 * Update current user collection
 *
 * Working with next() method
 *
 */
exports.updateUser = function (req, res) {

    var callback = req.body.callback;
    var response = {};
    response.callback = callback;
    if (req.user && req.body.update) {

        var conditions = { '_id': new ObjectId(req.user._id) }
        , update = req.body.update
                , options = {multi: false};


        User.update(conditions, update, options, function (err) {
            if (!err) {

                response.status = true;
                response.callback = req.body.callback;
                response.message = req.body.resmessage;
            } else {

                response.status = false;
                response.callback = req.body.callback;
                response.message = 'Something went wrong..';
            }
            res.send(response);
            res.end();
        });

    } else {

        response.status = false;
        response.callback = req.body.callback;
        response.message = 'Something went wrong..';
        res.send(response);
        res.end();
    }
};

/**
 * Get users in each team
 */
exports.usersInTeams = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    response.type = 'usersInTeams';

    var team_users_result = [];
    var teamlength = req.body.resdata.length;
    //console.log(req.body.resdata);

    // Checking number of teams
    if (teamlength > 0) {
        response.status = true;
        response.message = 'Success';

        // Looping through each team
        var callBackExit = 0;

        // Looping through each team
        req.body.resdata.map(function (data, key) {

            // Taking all user ids from `member_ids` property
            var ids = [];
            var teamid = data._id;

            // looping through each members in a team
            data.member_ids.map(function (member, key) {
                ids[key] = member._id;
            });

            // Where condition to fetch users from `User` collection
            var where = {'_id': {$in: ids}};

            // Trying to fetch users
            User.find(where).exec(function (err, lists) {

                var userData = [];
                var team = {};
                if (!err) {
                    // Filtering required data such as _id,full name, usertype

                    lists.map(function (users, key) {
                        userData[key] = {'_id': users._id, 'member_email': users.email, 'member_name': users.firstname + ' ' + users.lastname, 'usertype': users.usertype}
                    });
                    // Assigning team name and members data into final result
                    team = {"_id": data._id, "name": data.teamname, "members": userData};
                } else {
                    // Handling error case
                    team = {"_id": data._id, "name": data.teamname, "members": {}};
                }

                // Fetching user details from Invitations
                var elemMatch = {"team": teamid};
                where = {type: "Team", reference: {$elemMatch: elemMatch}};
                Invite.find(where).exec(function (err, lists) {
                    callBackExit++;
                    if (!err) {
                        // Filtering required data such as _id,full name, usertype
                        lists.map(function (invities, key) {
                            userData.push({'_id': invities._id, 'member_email': invities.email, 'member_name': 'Invited', 'usertype': 'invited'});
                        });
                        team = {"_id": data._id, "name": data.teamname, "members": userData};
                    }

                    // team_users_result = team_users_result.concat(team);
                    team_users_result[key] = team;

                    if (teamlength == callBackExit) {
                        // Exiting from the Callback function
                        response.data = team_users_result;
                        res.send(response);
                        res.end();
                    }
                });
            });
        });
    } else {
        response.status = false;
        response.message = 'No teams';
        response.data = {};
    }
};

/**
 * Get get all employees by company name
 */
exports.getAllEmployees = function (req, res) {

    var company_id = req.user.company_id
    if(company_id !=='' ){
        company_id = false;
    }

    var date = new Date();
    // date with YYYY-MM-DD format
    var cdate = JSON.stringify(date).substring(1, 11);
    var yearmonth = cdate.substring(0, 7);

    if(company_id){
        User.find({ company_id: company_id }).exec(function (err, lists) {
            if (!err) {

                Vote.aggregate([
                    {
                        $match: {
                            postdate:
                            {
                                $regex : new RegExp(yearmonth,'i')
                            },
                            company_id: company_id
                        }
                    },
                    {
                        $group : {
                            _id : "$votefor_userid",
                            total : { $sum : 1 },
                            user_ids: {
                                $push: "$user_id"
                             }
                        }
                    }
                ],
                function (err, result) {

                    var emp_meta = {};
                    if (err) {
                        console.log(err);
                    }else{
                        result.map(function (data, key) {
                            emp_meta[data._id] = data;
                        });
                    }

                    EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company_id: company_id }, function(err, emp){

                        var employees = [];
                        // var mytotalvotes = 0;
                        lists.map(function (data, key) {

                            var votes         =   0;
                            var myvote        =   false;
                            var empofthemonth =   false;
                            if(emp_meta[data._id] !== undefined){
                                var cemp      =   emp_meta[data._id];
                                var userids   =   emp_meta[data._id].user_ids;
                                var user_ids  =   [];

                                // set employee of the month status
                                try {
                                    if(emp.emp_id === data._id){
                                        empofthemonth =   true;
                                    }
                                } catch (ex) {}
                                userids.map(function (id, key) { user_ids[key] = id.toString(); });
                                votes         =  cemp.total;
                                if((user_ids.indexOf(req.user._id.toString())) !== -1 ){
                                    myvote    =  true;
                                    // mytotalvotes++;
                                }
                            }
                            var profileimage  = (data.profile_image !== '') ? PRO_PIC_PATH+data.profile_image : '/images/no-profile-img.gif';
                            employees[key]    = { _id: data._id, photo: profileimage, name: (data.firstname+' '+data.lastname), votes: votes, myvote: myvote, empofthemonth: empofthemonth };
                        });

                        // Current user - my voting status
                        Vote.find({ postdate: { $regex : new RegExp(yearmonth,'i') }, user_id: new ObjectId(req.user._id) }, function(err, votes){

                            var mytotalvotes = 0;
                            console.log(votes);
                            if(!err && votes !== null){
                                votes.map(function (data, key) {
                                    mytotalvotes++;
                                });
                            }
                            console.log(mytotalvotes);

                            response.status = true;
                            response.message = 'success';
                            response.data = {};
                            response.data.employees = employees;
                            response.data.mytotalvotes = mytotalvotes;
                            res.send(response);
                        });


                    });
                }
            );

            } else {
                response.status = false;
                response.message = 'Something went wrong';
                response.data = employees;
                res.send(response);
            }
        });
    }else{
        response.status = false;
        response.message = 'Please select your company first.';
        res.send(response);
    }
};

/**
 * Get check admin status
 */
exports.isAdmin = function (req, res, next) {
    if(req.user.usertype === 'admin'){
        // redirect to next route
        next();
    }else{
        response.status = false;
        response.message = "You need administrator permission to perform this action.";
        res.send(response);
    }

};

/**
 * Wanning !!!!!! : Cron job function
 *
 * Function to loop through all employees in the users collection and sending e-mail
 * with `employee of the month` statistics , showing how many votes he got and who got the most votes in the company
 *
 * Send employee of the month statistics
 */
exports.sendEOTMstats = function (req, res) {

};

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 59 23 * * *',
  onTick: function() {
    /*
    * Runs every day
    * at 23:59:00 AM.
    * cronTime: '00 59 23 * * *',
    */

    var sendVoteSummary = function(_id,rank,count,company){

        User.findOne({ _id: new ObjectId(_id) }, function (err, user) {
            var company_name = (company.companyname.trim() !== '')? company.companyname: company.domain_name;
            var transporter = nodemailer.createTransport();

            var userfullname = user.firstname+' '+user.lastname ;
            var body =     userfullname + ", here is your current vote summary <br><br>" +
                        "Number of votes you have this far :  "+ count +" <br><br>" +
                        "You currently stand at position " + rank + " to become 'Employee of the Month'. Keep up the great work and we wish you all the best!<br><br>" +
                        "Thanks," +
                        "<br>Moodwonder Team";

            body = emailTemplate.general(body);

            usernamePart = (user.firstname !== '')? 'for '+userfullname : '';
            console.log(user.email);

            transporter.sendMail({
                from: config.fromEmail,
                to: user.email,
                subject: company_name + ' voting summary '+usernamePart,
                html: body
            }, function(error, info){
                if(error){
                    // Error handling
                }
            });
        });
    }

    var loopUsers = function(company){
        // var month = moment().subtract(1, 'months').format('YYYY-MM-01');
        var month = moment().format('YYYY-MM-01');
        VoteRank.find({ company_id: company._id, postdate: month }).sort({count: -1}).exec(function(err, voterank){
            if(!err && voterank!==null){
                var rank = 0;
                var old_count = 0;
                voterank.map(function (data, key) {
                    if(old_count !== data.count){
                        rank++;
                    }
                    if( rank === 0 ){
                        rank++;
                    }
                    old_count = data.count;
                    // console.log(data.user_id +'-'+rank+'-'+data.count+'-'+company);
                    sendVoteSummary(data.user_id,rank,data.count,company);
                });
                // Remove/update VoteRank entries of previous month
                voterank.map(function (data, key) {
                    VoteRank.remove({ user_id: data.user_id, postdate: month }).exec(function (err) {
                        if(err){
                            console.log(err);
                        }
                        // console.log('Vote rank removed');
                    });
                    // var thismonth = moment().format('YYYY-MM-01');
                    var nextmonth = moment().add(1, 'months').format('YYYY-MM-01');
                    VoteRank.findOne({ user_id: data.user_id, postdate: nextmonth }).exec(function (err, doc) {
                        if(!err && doc === null){
                            // Insert new record if not exist
                            var query  = { company_id : data.company_id, user_id: data.user_id, postdate : nextmonth };
                            var newVoteRank = new VoteRank(query);
                            newVoteRank.save(function (err, doc) {
                                // console.log('Vote rank inserted');
                            });
                        }
                    });
                });

            }
        });
    }

    var today = moment().format('DD');
    var second_last_day = moment().endOf('month').subtract(1, 'days').format('DD');
    // var second_last_day = '07';

    // Run this only the second last day of this month

    // console.log(today +'==='+ second_last_day);
    // console.log(today === second_last_day);
    if(today === second_last_day){

        CompanyInfo.find({}).exec(function(err,company){
            if(!err && company!==null){
                company.map(function (data, key) {
                    // console.log(data);
                    loopUsers(data);
                });
            }
        });
    }

  },
  start: true,
  timeZone: 'Asia/Kolkata'
});
job.start();

/**
 * Get a User By Id
 */
exports.getUserInfoById = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    var _id = req.body._id;
    if( _id !== undefined && _id !== ''){
        var condition = {'_id': new ObjectId(_id)};
        User.findOne(condition, function (err, lists) {
            if (!err && !null) {

                response = {};
                response.status = true;
                response.message = 'success';
                response.data = {
                    'fname': '',
                    'lname': '',
                    'email': '',
                    'language': '',
                    'reportfrequency': '',
                    'password': '',
                    'companyname': '',
                    'mymanager': '',
                    'industry': '',
                    'continent': '',
                    'country': '',
                    'state': '',
                    'city': '',
                    'address': '',
                    'website': '',
                    'companysize': '',
                    'userstatus': false
                };
                // Find company details
                CompanyInfo.findOne({ _id: lists.company_id },function(err,companyinfo){

                    // If company exist
                    if (!err && companyinfo !== null) {
                        if (req.query.type == 'company') {
                            response.data = companyinfo;
                        } else {

                            if (lists.mymanager[0] == undefined) {
                                lists.mymanager[0] = {'email': ''};
                            }
                            var profileimage = (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : '/images/no-profile-img.gif';
                            response.data = {
                                'fname': lists.firstname,
                                'lname': lists.lastname,
                                'email': lists.email,
                                'language': lists.language,
                                'reportfrequency': lists.report_frequency,
                                'password': '',
                                'mymanager': lists.mymanager[0].email,
                                'profile_image': profileimage,
                                'userstatus': lists.userstatus
                            };
                        }
                        res.json(response);
                    }else{
                        // un usual case
                        console.log('company not found');
                    }
                });
            } else {
                res.json(response);
            }
        });
    }else{
        response.message = 'Invalid user Id';
        res.json(response);
    }
};

/**
 * Get a User Details By Id
 */
exports.updateUserByAdmin = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Unknown error';
    //console.log(req.body);

    var model = req.body;
    var hasBody = (req.body !== undefined);
    var hasUserId = ( hasBody && model._id !== undefined && model._id !== '' );

    if( hasBody && hasUserId){
        var updateQuery = {};
        var conditionQuery = { _id : new ObjectId(model._id) };
        var options = { multi: false };
        if(model.userstatus !== undefined){
            updateQuery.userstatus = (model.userstatus) ? 'Active':'Inactive';
        }else if(model.company_admin !== undefined){
            updateQuery.company_admin = (model.company_admin) ? true:false;
        }

        User.update(conditionQuery, updateQuery, options, function (err) {

            if (!err) {

                response.status = true;
                response.message = 'User details updated..';
            } else {

                response.status = false;
                response.message = 'Something went wrong..';
            }
            res.send(response);
            res.end();
        });

    }else{
        res.json(response);
    }

};

/**
 * Get list of all companies
**/
exports.getAllCompanies = function(req, res){

    var response = {};
    response.status = false;
    response.message = 'Error';
    //console.log(req.body);
    CompanyInfo.find({}).exec(function(err, doc){
        if(!err){
            response.status  = true;
            response.message = 'success';
            response.data    = doc;
            res.json(response);
        }else{
            res.json(response);
        }
    });
};

/**
* Get TeamsByCompany
* This function currently not using, But don't delete this
**/
exports.getTeamsByCompany = function(req, res){

    var companyTeams = [];
    var companyTeamsLength = 0;
    var teamIndex = 0;
    function usersInTeams(Teamlist,name){

        var team_users_result = [];
        var teamlength = Teamlist.length;
        //console.log(lists);

        // Checking number of teams
        if (teamlength > 0) {
            response.status = true;
            response.message = 'Success';

            // Looping through each team
            var callBackExit = 0;

            // Looping through each team
            Teamlist.map(function (data, key) {

                console.log('Team '+data.teamname);
                // Taking all user ids from `member_ids` property
                var ids = [];
                var teamid = data._id;

                // looping through each members in a team
                data.member_ids.map(function (member, key) {
                    ids[key] = member._id;
                });

                // Where condition to fetch users from `User` collection
                var where = {'_id': {$in: ids}};

                // Trying to fetch users
                User.find(where).exec(function (err, lists) {

                    var userData = [];
                    var team = {};
                    if (!err) {
                        // Filtering required data such as _id,full name, usertype

                        lists.map(function (users, key) {
                            userData[key] = {'_id': users._id, 'member_email': users.email, 'member_name': users.firstname + ' ' + users.lastname, 'usertype': users.usertype}
                        });
                        // Assigning team name and members data into final result
                        team = {"_id": data._id, "name": data.teamname, "members": userData};
                    } else {
                        // Handling error case
                        team = {"_id": data._id, "name": data.teamname, "members": {}};
                    }

                    // Fetching user details from Invitations
                    var elemMatch = {"team": teamid};
                    where = {type: "Team", reference: {$elemMatch: elemMatch}};
                    Invite.find(where).exec(function (err, lists) {
                        callBackExit++;
                        if (!err) {
                            // Filtering required data such as _id,full name, usertype
                            lists.map(function (invities, key) {
                                userData.push({'_id': invities._id, 'member_email': invities.email, 'member_name': 'Invited', 'usertype': 'invited'});
                            });
                            team = {"_id": data._id, "name": data.teamname, "members": userData};
                        }

                        team_users_result = team_users_result.concat(team);

                        if (teamlength == callBackExit) {
                            // Exiting from the Callback function
                            companyTeams[teamIndex] = { name: name, teams: team_users_result };
                            teamIndex++;
                            console.log('companyTeamsLength'+companyTeamsLength);
                            console.log('companyTeams teamlength'+teamlength);
                            console.log(companyTeams);
                        }
                        if (companyTeamsLength == teamIndex) {
                            response.status = true;
                            response.message = 'success';
                            response.data = companyTeams;
                            console.log(companyTeams);
                            res.send(response);
                            res.end();
                        }

                    });
                });
            });
        } else {
            response.status = false;
            response.message = 'No teams';
            response.data = {};
        }
    }

    function getTeamByManagerId(_id,name){
        var where = { manager_id: new ObjectId(_id) };
        Team.find(where).exec(function(err, lists) {
            if(!err) {
                // console.log(lists);
                usersInTeams(lists,name);
            }
        });
    }

    var response = {};
    response.status = false;
    response.message = 'Error';

    var companyname = req.body.companyname;
    var where = { usertype : "manager" };

    User.find(where).exec(function(err, lists) {
        if(!err) {

            console.log(lists);
            lists.map(function(data, key){
                companyTeamsLength = lists.length;
                // get teams by manager id
                getTeamByManagerId(data._id,(data.firstname+' '+data.lastname));
            });

        } else {
            response.status   = false;
            response.message  = 'Something went wrong..';
            res.send(response);
            res.end();
        }
    });
};

/**
* Get all teams from a company
**/
exports.getAllTeamsFromCompany = function (req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';
    var company_id   = req.body.company_id;

    if(!company_id){
        response.message = 'Invalid company id';
        res.json(response);
        return;
    }
    var condition = {
        company_id: company_id
    };
    // How many adjacent pages should be shown on each side?
    var adjacents = 3;

    /*
       First get total number of rows in data table.
       If you have a WHERE clause in your query, make sure you mirror it here.
    */
    var total_pages = 0;
    var find_rows = false;

    Team.count(condition, function(err, c) {
        total_pages = c;
        if(total_pages){
            var start = 0;
            var limit = 4                              //how many items to show per page
            // console.log(req.body);
            var page = req.body.page;
            // console.log(typeof page);
            if(page){
                start = (page - 1) * limit;             //first item to display on this page
            }
            /* Get data. */
            Team.find(condition).skip(start).limit(limit).exec(function (err, lists) {
                if (!err) {

                    // Setup page vars for display.
                    if (page == 0) page = 1;                    //if no page var is given, default to 1.
                    prev = page - 1;                            //previous page is page - 1
                    next = page + 1;                            //next page is page + 1
                    lastpage = Math.ceil(total_pages/limit);    //lastpage is = total pages / items per page, rounded up.
                    lpm1 = lastpage - 1;                        //last page minus 1

                    // Now we apply our rules and draw the pagination object.
                    // We're actually saving the code to a variable in case we want to draw it more than once.
                    pagination = [];
                    if(lastpage > 1)
                    {
                        //previous button
                        if (page > 1){
                            pagination.push({ page: prev, text: 'previous' });
                        }else{
                            pagination.push({ page: false, text: 'previous' });
                        }

                        //pages
                        if (lastpage < 7 + (adjacents * 2))    //not enough pages to bother breaking it up
                        {
                            for (counter = 1; counter <= lastpage; counter++)
                            {
                                if (counter == page){
                                    pagination.push({ page: false, text: counter });
                                }else{
                                    pagination.push({ page: counter, text: counter });
                                }
                            }
                        }
                        else if(lastpage > 5 + (adjacents * 2))    //enough pages to hide some
                        {
                            //close to beginning; only hide later pages
                            if(page < 1 + (adjacents * 2))
                            {
                                for (counter = 1; counter < 4 + (adjacents * 2); counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                                pagination.push({ page: false, text: '..........' });
                                pagination.push({ page: lpm1, text: lpm1 });
                                pagination.push({ page: lastpage, text: lastpage });
                            }
                            //in middle; hide some front and some back
                            else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
                            {
                                pagination.push({ page: 1, text: 1 });
                                pagination.push({ page: 2, text: 2 });
                                pagination.push({ page: false, text: '..........' });
                                for (counter = page - adjacents; counter <= page + adjacents; counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                                pagination.push({ page: false, text: '..........' });
                                pagination.push({ page: lpm1, text: lpm1 });
                                pagination.push({ page: lastpage, text: lastpage });
                            }
                            //close to end; only hide early pages
                            else
                            {
                                pagination.push({ page: 1, text: 1 });
                                pagination.push({ page: 2, text: 2 });
                                pagination.push({ page: false, text: '..........' });
                                for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                            }
                        }

                        //next button
                        if (page < counter - 1){
                            pagination.push({ page: next, text: 'next' });
                        }else{
                            pagination.push({ page: false, text: 'next' });
                        }
                    }

                    response.status = true;
                    response.message = 'success';
                    // formatting user data for table
                    var data          = {};
                    data.rows         = new Array(lists.length);
                    data.pagination   = pagination;
                    data.class = "table";
                    if(lists !== null){
                        var counter = 0;
                        lists.map(function(item, key){

                            data.rows[key] =  {
                                _id: item._id,
                                name: item.teamname
                            };
                        });
                    }
                    response.data = data;
                    res.json(response);
                }
                else
                {
                    res.json(response);
                }
            });
        }else{
            res.json(response);
        }
    });
};

/**
* Get All Teams Members By _id
**/
exports.getAllTeamsMembers = function(req, res, next){

    var response = {};
    response.status = false;
    response.message = 'Error';

    var _id = req.body._id;
    if(_id !== undefined && _id !== ''){

        // get team members _id from Teams collection
        var where = { _id: new ObjectId(_id) };
        Team.find(where).exec(function(err, lists){
            if(!err){
                // console.log(lists);
                req.body.resdata = lists;
                next();
            }else{
                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }
};

/**
*  search Team By key word
**/
exports.searchTeam = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    response.callback = req.body.callback;


    var teamname = req.body.teamname;
    if(teamname !== undefined && teamname !== ''){

        var condition = { teamname: { $regex : new RegExp(teamname,'i') } };
        // How many adjacent pages should be shown on each side?
        var adjacents = 3;

        /*
           First get total number of rows in data table.
           If you have a WHERE clause in your query, make sure you mirror it here.
        */
        var total_pages = 0;
        var find_rows = false;

        Team.count(condition, function(err, c) {
            total_pages = c;
            if(total_pages){
                var start = 0;
                var limit = 10                              //how many items to show per page
                // console.log(req.body);
                var page = req.body.page;
                // console.log(typeof page);
                if(page){
                    start = (page - 1) * limit;             //first item to display on this page
                }
                /* Get data. */
                Team.find(condition).skip(start).limit(limit).exec(function (err, lists) {
                    if (!err) {

                        // Setup page vars for display.
                        if (page == 0) page = 1;                    //if no page var is given, default to 1.
                        prev = page - 1;                            //previous page is page - 1
                        next = page + 1;                            //next page is page + 1
                        lastpage = Math.ceil(total_pages/limit);    //lastpage is = total pages / items per page, rounded up.
                        lpm1 = lastpage - 1;                        //last page minus 1

                        // Now we apply our rules and draw the pagination object.
                        // We're actually saving the code to a variable in case we want to draw it more than once.
                        pagination = [];
                        if(lastpage > 1)
                        {
                            //previous button
                            if (page > 1){
                                pagination.push({ page: prev, text: 'previous' });
                            }else{
                                pagination.push({ page: false, text: 'previous' });
                            }

                            //pages
                            if (lastpage < 7 + (adjacents * 2))    //not enough pages to bother breaking it up
                            {
                                for (counter = 1; counter <= lastpage; counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                            }
                            else if(lastpage > 5 + (adjacents * 2))    //enough pages to hide some
                            {
                                //close to beginning; only hide later pages
                                if(page < 1 + (adjacents * 2))
                                {
                                    for (counter = 1; counter < 4 + (adjacents * 2); counter++)
                                    {
                                        if (counter == page){
                                            pagination.push({ page: false, text: counter });
                                        }else{
                                            pagination.push({ page: counter, text: counter });
                                        }
                                    }
                                    pagination.push({ page: false, text: '..........' });
                                    pagination.push({ page: lpm1, text: lpm1 });
                                    pagination.push({ page: lastpage, text: lastpage });
                                }
                                //in middle; hide some front and some back
                                else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
                                {
                                    pagination.push({ page: 1, text: 1 });
                                    pagination.push({ page: 2, text: 2 });
                                    pagination.push({ page: false, text: '..........' });
                                    for (counter = page - adjacents; counter <= page + adjacents; counter++)
                                    {
                                        if (counter == page){
                                            pagination.push({ page: false, text: counter });
                                        }else{
                                            pagination.push({ page: counter, text: counter });
                                        }
                                    }
                                    pagination.push({ page: false, text: '..........' });
                                    pagination.push({ page: lpm1, text: lpm1 });
                                    pagination.push({ page: lastpage, text: lastpage });
                                }
                                //close to end; only hide early pages
                                else
                                {
                                    pagination.push({ page: 1, text: 1 });
                                    pagination.push({ page: 2, text: 2 });
                                    pagination.push({ page: false, text: '..........' });
                                    for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                                    {
                                        if (counter == page){
                                            pagination.push({ page: false, text: counter });
                                        }else{
                                            pagination.push({ page: counter, text: counter });
                                        }
                                    }
                                }
                            }

                            //next button
                            if (page < counter - 1){
                                pagination.push({ page: next, text: 'next' });
                            }else{
                                pagination.push({ page: false, text: 'next' });
                            }
                        }

                        response.status = true;
                        response.message = 'success';
                        // formatting user data for table
                        var data          = {};
                        data.rows         = new Array(lists.length);
                        data.pagination   = pagination;
                        data.class = "table";
                        if(lists !== null){
                            var teamCounter = 0;
                            lists.map(function(item, key){

                                CompanyInfo.findOne({ _id: new ObjectId(item.company_id)}).exec(function(err, company){

                                    var companyname = 'No company name';
                                    var domain_name = 'No domain name';
                                    if(!err && company !== null){
                                        // console.log(item);
                                        companyname = company.companyname;
                                        domain_name = company.domain_name;
                                    }

                                    data.rows[key] =  {
                                        _id: item._id,
                                        teamname: item.teamname,
                                        companyname: companyname,
                                        domain_name: domain_name
                                    };
                                    //console.log(data.rows[key]);
                                    teamCounter++;

                                    // Exit condition
                                    if(lists.length === teamCounter){
                                        response.data = data;
                                        res.json(response);
                                    }
                                });
                            });
                        }else{
                            res.json(response);
                        }
                    }
                    else
                    {
                        response.message = 'Something went wrong !';
                        res.json(response);
                    }
                });
            }else{
                response.message = 'No result found';
                res.json(response);
            }
        });

    }else{
        response.message = 'Please enter a team name';
        res.send(response);
        res.end();
    }


};

exports.searchTeam1 = function (req, res){
    var response = {};
    response.status = false;
    response.message = 'Error';
    response.callback = req.body.callback;

    var joinCompany = function(list){
        var teamCounter = 0;
        var data = {};
        data.header = ['Id','Company name', 'Team name', ''];
        data.rows   = [];
        data.class = "table";
        list.map(function(team, key){

            Company.findOne({ _id: new ObjectId(team.company_id)}).exec(function(err, company){

                var companyname = 'No company name';
                if(!err && company !== null){
                    companyname = company.name;
                }
                data.rows[key] = [
                    { column: team._id, display : false },
                    { column: companyname},
                    { column: team.teamname},
                    { column: 'Show team members', popup: true  }
                 ];
                 teamCounter++;

                // Exit condition
                if(list.length === teamCounter){
                    response.status = true;
                    response.message = 'Success';
                    response.data = data;
                    res.send(response);
                    res.end();
                }
            });

        });
    }

    var teamname = req.body.teamname;
    if(teamname !== undefined && teamname !== ''){
        Team.find({ teamname: { $regex : new RegExp(teamname,'i') } }).exec(function(err, list){
            if(!err){
                // join company name
                // console.log(list);
                if(list.length >0){
                    joinCompany(list);
                }else{
                    response.status = false;
                    response.message = 'No result';
                    res.send(response);
                    res.end();
                }
            }else{
                res.send(response);
                res.end();
            }
        });
    }else{
        response.message = 'Please enter a team name';
        res.send(response);
        res.end();
    }
}

/**
 * Update user profile banner
 *
 * Accept :
 * @bannerimage:
 *
 */
exports.UpdateProfileBanner = function (req, res) {

    var ext=path.extname(req.files.bannerimage.name);
    if(typeof req.files.bannerimage != 'undefined')
    {
        if((ext!=".jpg")&&(ext!=".png")&&(ext!=".jpeg")&&(ext!=".gif"))
        {

            response.image=false;
            res.send(response);
            res.end();
            return;
        }else{

            imagename     = new Date().getTime() +req.files.bannerimage.originalname;
            var oldPath   =   req.files.bannerimage.path;
            var newPath   =   path.join(__dirname,'..','..')+"/public/images/bannerpics/" + imagename;
            var source    =   fs.createReadStream(oldPath);
            var dest      =   fs.createWriteStream(newPath);
            source.pipe(dest);
            source.on('end', function () {

                var conditions = {'_id': new ObjectId(req.user._id)}
                      ,update  = {'cover_image': imagename }
                     , options = {multi: false};

                // Set manager info
                User.findOne(conditions, function (errUser, user) {
                    User.update(conditions, update, options, function (err) {
                        if (!err) {
                            response.status  = true;
                            response.message = 'Banner image updated.';
                            response.image   = BANNER_PIC_PATH + imagename;

                            try{
                                if (!errUser && user !== null && user.cover_image !== '') {
                                    var filename = path.join(__dirname,'..','..')+"/public/images/bannerpics/" + user.cover_image;
                                    fs.unlink(filename, function (err) {
                                        if (!err){
                                            // console.log('file deleted');
                                        }else{
                                            console.log('file not found - unable to delete the file');
                                        }
                                    });
                                }
                            }catch(e){
                                console.log(e);
                            }
                        } else {
                            response.status  = false;
                            response.message = 'Something went wrong..';
                        }
                        res.send(response);
                        res.end();
                    });
                });
            });
            source.on('error', function (err) {
                response.status  = false;
                response.message = 'Something went wrong..';
                res.send(response);
                res.end();
            });
        }
    }
};

function isValid(id) {

    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if(id == null) return false;

    if(typeof id == 'number')
        return true;
    if(typeof id == 'string') {
        return id.length == 12 || (id.length == 24 && checkForHexRegExp.test(id));
    }
    return false;
};

/**
 * Get get all employees by company name
 */
exports.getAllEmployeesInCompany = function (req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

    var callbacklog = {};

    var existCondition = function(){
        if(callbacklog.employeeTotalVotes && callbacklog.myTotalVotes){
            res.send(response);
        }
    }

    var last_id = req.body.last_id;
    var keyword = req.body.keyword;
    // put 21 if you want 20 results
    var limit = 6;
    var date = new Date();
    // date with YYYY-MM-DD format
    var cdate = JSON.stringify(date).substring(1, 11);
    var yearmonth = cdate.substring(0, 7);

    var company_id = req.user.company_id;

    if(company_id){

        var condition = { company_id: company_id };
        if(isValid(last_id)){
            condition._id = { "$gt": new ObjectId(last_id) };
        }
        if(keyword !== undefined && keyword.trim() !== ''){
            condition.$or =  [ { firstname: new RegExp(keyword,'i') }, { lastname: new RegExp(keyword,'i') } ];
        }
        // console.log(condition);

        User.find(condition).limit(limit).sort({_id: 1}).exec(function (err, lists) {

            if (!err) {
                if(lists !== null){

                    //console.log(lists);
                    // Find employee of the month
                    EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company_id: company_id }, function(err, emp){

                        var employees = [];
                        var hasMoreData = false;
                        var awardStatus = false;
                        lists.map(function (data, key) {

                            var empofthemonth =   false;
                            var profileimage  = (data.profile_image !== '') ? PRO_PIC_PATH+data.profile_image : '/images/no-profile-img.gif';
                            // set employee of the month status
                            try {
                                if(emp.emp_id.toString() === data._id.toString()){
                                    empofthemonth =   true;
                                    awardStatus =   true;
                                }
                            } catch (ex) {}

                            //////////////////// set basic details //////////////////////
                            employees[key] = {
                                _id: data._id,
                                photo: profileimage,
                                name: (data.firstname+' '+data.lastname),
                                votes: 0, // Total votes
                                myvote: false,
                                empofthemonth: empofthemonth
                            };
                        });
                        // console.log(employees);

                        if( employees.length >= limit ){
                            hasMoreData = true;
                            // remove 1 last record from the array
                            // bacause we are using this for checking more records in the db
                            employees.pop();
                        }


                        // Set total votes received by each employee
                        if(employees.length >0 ){
                            var counter = 0;
                            employees.map(function (data, key) {
                                var condition = {
                                    postdate: { $regex : new RegExp(yearmonth,'i') },
                                    votefor_userid: new ObjectId(data._id)
                                };
                                Vote.find(condition, function(err, votes){
                                    counter++;
                                    try{
                                        ////////////////// Set total votes received by each employee
                                        employees[key].votes = votes.length;
                                    }catch(e){}

                                    if(votes !== null){
                                        votes.map(function(vote, vkey){
                                            if(vote.user_id.toString() === req.user._id.toString()){
                                                ////////////////// Set my vote status
                                                employees[key].myvote = true;
                                            }
                                        });
                                    }

                                    // check employee total votes finding is finished or not
                                    // console.log(employees.length +"==="+ counter);
                                    if(employees.length === counter){
                                        callbacklog.employeeTotalVotes = true;
                                        //console.log(employees);
                                        existCondition();
                                    }
                                });
                                // To disable the click if already selected the winner
                                employees[key].disabled = awardStatus;
                            });
                        }else{
                            callbacklog.employeeTotalVotes = true;
                            existCondition();
                        }

                        // Current user - my total votes
                        Vote.find({ postdate: { $regex : new RegExp(yearmonth,'i') }, user_id: new ObjectId(req.user._id) }, function(err, votes){

                            var mytotalvotes = 0;
                            if(!err && votes !== null){
                                votes.map(function (data, key) {
                                    mytotalvotes++;
                                });
                            }

                            response.status = true;
                            response.message = 'success';
                            response.data = {};
                            response.data.employees = employees;
                            response.data.hasMoreData = hasMoreData;
                            response.data.mytotalvotes = mytotalvotes;
                            response.data.current_user_id = req.user._id;
                            response.data.voteperiod = {};
                            response.data.awardStatus = awardStatus;

                            Date.prototype.getMonthStartEnd = function (start) {
                                var StartDate = new Date(this.getFullYear(), this.getMonth(), 1);
                                var EndDate = new Date(this.getFullYear(), this.getMonth() + 1, 0);
                                return [StartDate, EndDate];
                            }

                            var startEnd = new Date().getMonthStartEnd();
                            // console.log(typeof startEnd);
                            var firstDay = startEnd[0].toString().substr(3,12);
                            var lastDay = startEnd[1].toString().substr(3,12);

                            response.data.voteperiod = { start: firstDay, end: lastDay };
                            callbacklog.myTotalVotes = true;
                            existCondition();
                        });
                        existCondition();
                    });
                }else{
                    response.status = false;
                    response.message = 'No records found';
                    response.data = [];
                    res.send(response);
                }
            }else{
                response.status = false;
                response.message = 'Something went wrong';
                response.data = [];
                res.send(response);
            }
        });
    }else{
        response.status = false;
        response.message = 'Please select your company first.';
        res.send(response);
    }
};

/**
 * Get public profile details
 *
 **/
exports.getPublicProfile = function (req, res, next) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

    var existCondition = function(){
        if(
        response.data.teams !== undefined &&
        response.data.manager !== undefined &&
        response.data.vote !== undefined &&
        response.data.disablevote !== undefined &&
        response.data.currentuservotes !== undefined &&
        response.data.currentusereom !== undefined
        ){
            response.data.current_user_id = req.user._id;
            req.body.response = response;
            next();
        }
    }

    var ordinalSuffix = function(d) {
      if(d>3 && d<21) return 'TH';
      switch (d % 10) {
            case 1:  return "ST";
            case 2:  return "ND";
            case 3:  return "RD";
            default: return "TH";
        }
    }

    var date = new Date();
    // date with YYYY-MM-DD format
    var cdate = JSON.stringify(date).substring(1, 11);
    var yearmonth = cdate.substring(0, 7);

    var _id = req.params.hash;
    if( _id !== undefined && _id !== '' && ObjectId.isValid(_id)){
        var condition = {'_id': new ObjectId(_id)};
        User.findOne(condition, function (err, lists) {
            if (!err && !null) {
                response = {};
                response.status = true;
                response.message = 'success';
                lists.password = '';
                lists.cover_image = (lists.cover_image !== '') ? BANNER_PIC_PATH+lists.cover_image : '/images/cover.jpg';
                lists.profile_image = (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : '/images/no-profile-img.gif';
                response.data = {};
                response.data.profile = lists;

                // get all teams created by this user
                var where = { manager_id: new ObjectId(_id) };
                Team.find(where).exec(function(err, lists) {
                    if(!err) {
                        // console.log(lists);
                        response.data.teams = {
                            status: true,
                            message: "success",
                            data: lists
                        };
                    } else {
                        response.data.teams = {
                            status: false,
                            message: "something went wrong..",
                            data: []
                        };
                    }
                    existCondition();
                });

                // get manager's name of this user
                if(lists !== undefined && lists.mymanager !== undefined && lists.mymanager[0] !== undefined &&  lists.mymanager[0].email !== undefined)
                {
                    var userList = lists;
                    var where = { email: userList.mymanager[0].email };
                    // console.log(where);
                    User.findOne(where).exec(function(err, lists) {
                        if(!err && lists !== null) {
                            // console.log(lists);
                            var propic =  (lists.profile_image !== '') ? PRO_PIC_PATH+lists.profile_image : '/images/no-profile-img.gif';
                            var name = lists.email;
                            if(lists.firstname !== '' || lists.lastname !== ''){
                                name = lists.firstname+' '+lists.lastname;
                            }
                            response.data.manager = {
                                status: true,
                                message: "success",
                                data: { _id: lists._id, email: lists.email, name: name, propic: propic }
                            };
                        } else {

                            var mymanager = userList.mymanager[0];
                            var propic = '/images/no-profile-img.gif';
                            response.data.manager = {
                                status: true,
                                message: "Record not found",
                                data: { _id: mymanager._id, name: mymanager.email, email: mymanager.email, propic: propic }
                            };
                        }
                        existCondition();
                    });
                }else{
                    // if no email is set as the my manager
                    response.data.manager = {
                        status: false,
                        message: "Manager not defined..",
                        data: []
                    };
                    existCondition();
                }

                // Current user - my voting status
                Vote.find({ postdate: { $regex : new RegExp(yearmonth,'i') }, user_id: new ObjectId(req.user._id) }, function(err, votes){

                    var mytotalvotes = 0;
                    var myvote       =   false;
                    response.data.vote = {
                        mytotalvotes: mytotalvotes,
                        myvote: myvote
                    };
                    if(!err && votes !== null){
                        votes.map(function (data, key) {
                            mytotalvotes++;
                            // console.log(_id.toString());
                            // console.log(data.votefor_userid);

                            if((data.votefor_userid.toString().indexOf(_id.toString())) !== -1 ){
                                myvote = true;
                            }
                        });
                        response.data.vote = {
                            mytotalvotes: mytotalvotes,
                            myvote: myvote
                        };
                    }
                    existCondition();
                });

                // Current user total votes
                //postdate: { $regex : new RegExp(yearmonth,'i') },
                Vote.find({ votefor_userid: new ObjectId(_id) }, function(err, votes){

                    response.data.currentuservotes = 0;
                    if(!err && votes !== null){
                        votes.map(function (data, key) {
                            response.data.currentuservotes++;
                        });
                    }
                    existCondition();
                });


                // Current user employee of the month status
                EOTM.find({ emp_id: new ObjectId(_id) }, function(err, eoms){

                    response.data.currentusereom = '';
                    var currentusereom = 0;
                    if(!err && eoms !== null){
                        eoms.map(function (data, key) {
                            currentusereom++;
                        });
                        if(currentusereom > 0){
                            response.data.currentusereom = currentusereom + ordinalSuffix(currentusereom);
                        }
                    }
                    existCondition();
                });


                // Employee of the month selection status
                var date = new Date();
                // date with YYYY-MM-DD format
                var cdate = JSON.stringify(date).substring(1, 11);
                var yearmonth = cdate.substring(0, 7);
                EOTM.findOne({ date: { $regex : new RegExp(yearmonth,'i') }, company_id: lists.company_id }, function(err, emp){

                    if(!err && emp!==null){
                        response.data.disablevote = true;
                    }else{
                        response.data.disablevote = false;
                    }
                    existCondition();
                });

            } else {
                req.body.response = response;
                next();
            }
        });
    }else{
        res.redirect('/Error?msg=Invalid user Id');
        /*
        response.message = 'Invalid user Id';
        req.body.response = response;
        next();*/
    }
};


/**
 * Get public profile votes
 *
 **/
exports.getEmployeeVotes = function (req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';
    response.data = {};
    response.data.currentuservotes = [];

    var lastCommentId = req.body.lastCommentId;
    var hasMoreComments = false;
    var limit = 6;
    var date = new Date();
    // date with YYYY-MM-DD format
    var cdate = JSON.stringify(date).substring(1, 11);
    var yearmonth = cdate.substring(0, 7);

    var _id = req.body.votefor_userid;
    if( _id !== undefined && _id !== '' && ObjectId.isValid(_id)){

        var voteCond = { votefor_userid: new ObjectId(_id) };
        if(isValid(lastCommentId)){
            voteCond._id = { "$lt": new ObjectId(lastCommentId) };
        }

        Vote.count(voteCond, function(err, c) {
            if(c > limit ){
                hasMoreComments = true;
            }
            response.data.hasMoreComments = hasMoreComments;
            // Current user total votes
            Vote.find(voteCond).limit(limit).sort({_id: -1}).exec(function(err, votes){
                if(!err && votes !== null){
                    votes.map(function (data, key) {
                        var postdate = data.postdate.split('-');
                        var datestring = postdate[1] + '/' + postdate[2] + '/' + postdate[0];
                        response.data.currentuservotes[key] = {'_id':data._id,
                                                               'comment':data.comment,
                                                               'postdate':datestring
                                                               };
                    });
                }

                response.status = true;
                response.message = 'success';
                res.send(response);
            });

        });




    }else{
        response.status = false;
        response.message = 'Invalid User!.';
        res.send(response);
    }
};


/**
 * Handle invite signup page GET request
 * Pass e-mail id to the react component if there is a valid url of invitation
 *
 */
exports.handleInviteSignup = function(req, res, next) {

    /************************************************
       Make same changes in postSignupStep1
    ************************************************/
  var response =  {};
  var hash     =  req.params.hash;
  req.body.hash = hash; // temp fix
  var where    =  { link: hash }

  // check the link is exist or not
  Invite.findOne(where, function(err, record) {
    if(record) {

        var email = record.email.toLowerCase();
        req.body.email = email; // temp fix
        if (!blockedDomains.checkDomain(email)) {
            response.status  = false;
            response.message = 'It is a restricted email domain. Please make sure you enter your work email address';
            req.body.response = response;
            next();
            return;
        }

        var verifystring = email + Date.now();
        verifystring = crypto.createHash('md5').update(verifystring).digest("hex");
        var user = new User({
            email: req.body.email,
            verifylink: verifystring
        });

        User.findOne({email: req.body.email}, function (err, existingUser) {

            if (existingUser !== null && existingUser) {

                response.status   = false;
                response.message  = 'The email address you have entered is already registered';
                req.body.response = response;
                next();
                return;

            } else {

                user.save(function (err, newuser) {
                    if (!err) {

                        var redirectUrl = function(){
                            // Redirect to create password page
                            res.redirect('/createpassword/' + verifystring );
                        }
                        // Get domian name without extension
                        // 'test@example.com' converting into 'example'
                        var email  = req.body.email;
                        var domain = email.substring(email.lastIndexOf("@")+1);
                        var website = domain;
                        domain = domain.substring(0,domain.lastIndexOf("."));

                        var afterCompanyDetails = function(companyinfo){

                            // Make same changes in postSignupStep1
                            var thismonth = moment().format('YYYY-MM-01');
                            var query  = { company_id : companyinfo._id, user_id: newuser._id, postdate : thismonth };
                            var newVoteRank = new VoteRank(query);
                            newVoteRank.save(function (err, doc) {
                                console.log('Vote rank inserted');
                            });

                            // Update company id in User collection
                            var conditions = {
                                _id: new ObjectId(newuser._id)
                            };

                            var update  = { company_id : companyinfo._id};
                            var options = { multi: false };
                            User.update(conditions, update, options, function (err) {
                                if (!err) {

                                    console.log('update done');
                                } else {

                                    console.log(err);
                                }
                            });
                            // if 'hash' params is exist, then add this user into the a team based on the team id in the Invite collections
                            // console.log('--req.body.hash----' + req.body.hash);
                            if (req.body.hash !== undefined && req.body.hash !== '') {

                                var invite = new Invite({
                                    email: email,
                                    type: 'Team',
                                    link: req.body.hash
                                });

                                Invite.find({ email: email }, function (err, allInvites) {
                                    if(allInvites !== null){
                                        allInvites.map(function(existingInvite, key){
                                            if (existingInvite) {

                                                // console.log(existingInvite);
                                                // removing invitation record after taking the data from the collection
                                                // Otherwise it will show email id repetition in the members list in teams
                                                Invite.remove({_id: existingInvite._id }, function(err) {});

                                                if(existingInvite.type === 'Team'){
                                                    var team_id = existingInvite.data[0].team._id;
                                                    var where = {_id: new ObjectId(team_id)}
                                                    // console.log(member_email);
                                                    // check the team is exist or not
                                                    Team.findOne(where, function (err, existingTeam) {
                                                        if (existingTeam) {

                                                            // User not exist in this group, Insert this user into this team
                                                            Team.update({"_id": existingTeam._id}, {$push: {member_ids: {_id: newuser._id}}}, function (err) {
                                                                if (err) {
                                                                    response.status = false;
                                                                    response.messages = ['Error when adding a new member'];
                                                                } else {
                                                                    // Find e-mail id of the user who invited this user
                                                                    User.findOne({_id: new ObjectId(existingTeam.manager_id)}, function (err, existingUser) {
                                                                        if (existingUser) {
                                                                            // console.log('has user');
                                                                            var conditions = {'_id': new ObjectId(newuser._id)}
                                                                            , update = {'mymanager': [{'_id': existingUser._id, 'email': existingUser.email}]}
                                                                            , options = {multi: false};

                                                                            // Set manager info
                                                                            User.update(conditions, update, options, function (err) {
                                                                                if (!err) {
                                                                                    // console.log('updated manager');
                                                                                } else {
                                                                                    // console.log('not updated manager');
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            // console.log('has no user');
                                                                        }
                                                                    });
                                                                    response.status = true;
                                                                    response.messages = ['Member added'];
                                                                }
                                                            });
                                                        } else {
                                                            response.status = false;
                                                            response.messages = ['Team not exist'];
                                                        }
                                                    });
                                                    // redirectUrl();
                                                }else{
                                                    // redirectUrl();
                                                }

                                            } else {
                                                response.status = true;
                                                response.messages = ['Error when processing your invitation'];
                                                req.body.response = response;
                                                // next();
                                            }
                                        });
                                    }
                                });
                                redirectUrl();
                            } else {

                                response.status = true;
                                response.messages = ['Error when processing your invitation'];
                                req.body.response = response;
                                next();
                            }
                        };

                        var company = { domain_name: domain };

                        // Find company details
                        CompanyInfo.findOne(company,function(err,companyinfo){

                            // If company exist
                            if (!err && companyinfo !== null) {

                                afterCompanyDetails(companyinfo);
                            }else{
                                // Creating new company if not exist

                                company.companyname = domain;
                                company.website = website;
                                var newCompany = new CompanyInfo(company);
                                newCompany.save(function (err, companyinfo) {
                                    if (!err && companyinfo !== null) {

                                        // console.log(companyinfo);
                                        // return;
                                        // afterCompanyDetails(companyinfo);
                                    }else{

                                        response.status = false;
                                        response.messages = ['Error when creating new company'];
                                        res.send(response);
                                        //res.end();
                                        req.body.response = response;
                                        next();
                                    }
                                });
                            }
                        });

                    } else {
                        response.status = true;
                        response.message = 'Error when processing your invitation';
                        req.body.response = response;
                        next();
                        return;
                    }
                });
            }
        });
    }else{
        // Invalid invitation link

        if(req.user){
            res.redirect('/mymood');
        }else{
            res.redirect('/');
        }
        // redirect to landing page
        /*
        req.body.response = {
            message: 'Invalid invitation link',
            hasErrorMessage: true,
            status: false
        };
        next();
        */
    }
  });
};

exports.handleSetPassword = function(req, res, next) {

    var verifyString = req.params.hash.trim();
    var ErrorState = {};

    if (verifyString == '') {

        response.status = false;
        response.message = 'Invalid verification link';

    } else {

        var conditions = { verifylink: verifyString };

        /**
         * Checking the verifylink is exist in the user collections
         */
        User.findOne(conditions, function (err, document) {

            if (document !== null) {

                if(document.verifylink_date && document.verifylink_date !== ''){

                    var ms = moment().diff(moment(document.verifylink_date,"YYYY-MM-DD HH:mm:ss"));
                    // console.log(ms);
                    // 86400000 ms = 24 hours
                    if(ms > 86400000){
                        ErrorState.hasError  =   true;
                        ErrorState.noPswdForm =   true;
                        ErrorState.message = 'Verification link has expired';
                        req.body.ErrorState = ErrorState;
                        next();
                    }else{
                        next();
                    }
                }else{
                    next();
                }
            } else {

                ErrorState.hasError  =   true;
                ErrorState.noPswdForm =   true;
                ErrorState.message = 'Invalid verification link';
                req.body.ErrorState = ErrorState;
                next();
            }
        });
    }
};

exports.loginHandler = function(req, res, next) {
    if(req.user && req.user.company_id){
        // this is a normal user because company_id exist
        res.redirect('/mymood');
    }else{
        // No user
        next();
    }
};
