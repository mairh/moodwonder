var _ = require('underscore');
var mongoose = require('mongoose');
var Team = require('../models/team');
var User = require('../models/user');
var nodemailer = require("nodemailer");
var CustomSurvey = require('../models/customSurvey');
var emailTemplate = require('../email/emailtemplates');
var EngagementResults = require('../models/engagementResults');
var NotificationRules = require('../models/notificationRules');
var CustomSurveyResults = require('../models/customSurveyResults');
var Config = require('../config/config');
var CompanyInfo = require('../models/companyinfo');

function getAllManagers(callback) {

    var condition = {usertype: 'manager'};
    User.find(condition).lean().exec(function (err, user) {
        if (user != 'undefined') {
            callback(user);
        }
    });
}

function getTeams(manager, callback) {

//Get members from team
    var condition = {manager_id: mongoose.Types.ObjectId(manager._id)};
    Team.find(condition).lean().exec(function (err, teams) {
        if (teams != 'undefined') {
            callback(teams);
        }
    });
}

function getTeamMembers(memberIds, callback) {

    var id = [];
    for (var j = 0; j < memberIds.length; j++) {
        id.push(memberIds[j]._id);
    }

    var condition = {_id: {$in: id}};
    User.find(condition).lean().exec(function (err, users) {
        if (users != 'undefined') {
            callback(users);
        }
    });
}

function getEngagementResults(members, callback) {

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var datestring = year + '-' + month + '-' + day;
    // Get members engagement results

    // Get members engagement results
    var memberIds = [];
    for (var mKey in members) {
        memberIds.push(members[mKey]._id);
    }

    var condition = {user_id: {$in: memberIds}, 'created.d': {$eq: datestring}};
    EngagementResults.find(condition).lean().exec(function (err, results) {
        if (results != 'undefined') {
            callback(results);
        }
    });
}

function getMWIndexRule(key, callback) {

// Get members engagement results
    var condition = {rule_key: key, status: 'active'};
    NotificationRules.findOne(condition).lean().exec(function (err, rule) {
        if (rule != 'undefined') {
            callback(rule);
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

var CronJob = require('cron').CronJob;
var mgrNotificationTeam = new CronJob({
    cronTime: '00 30 11 * * 1-7',
    //cronTime: '* * * * * *',
    onTick: function () {
        /*
         * Runs every day (Sunday through Saturday)
         * at 10:00:00 AM. 
         * cronTime: '00 00 10 * * 1-7',
         */
        getAllManagers(function (managers) {

            var mCount = managers.length;
            function mteamrepeater(i) {
                if (i < mCount) {

                    var manager = managers[i];
                    getTeams(manager, function (teams) {

                        var tCount = teams.length;
                        function teamrepeater(t) {
                            if (t < tCount) {
                                var team = teams[t];
                                getTeamMembers(team.member_ids, function (tmembers) {
                                    
                                    getMyCompany(manager.company_id, function(company) { 
                                        var companyname = company[0].companyname;

                                        getEngagementResults(team.member_ids, function (posts) {

                                            var sum = _(posts).reduce(function (m, x) {
                                                return m + x.rating;
                                            }, 0);

                                            if (sum > 0) {
                                                var postedtimes = (posts.length) / 13;
                                                var teamindex = (sum / (postedtimes * 13)).toFixed(1);

                                                getMWIndexRule('TEAM_LOWER_LIMIT', function (lowerlimit) {
                                                    if (teamindex <= lowerlimit.rule_value) {

                                                        var transporter = nodemailer.createTransport();
                                                        var body =  "Hi " + manager.firstname + " " + manager.lastname + "," +
                                                                    "<br><br> " + team.teamname + " team average engagement rating is dropping below " + lowerlimit.rule_value + "." + 
                                                                    "Let's change it now by creating a more rewarding workplace environment." + 
                                                                    "We suggest that you should have a team meeting or face to face meetings with all your subordinates to find out what's wrong and think how you can improve the situation." +
                                                                    "<br><br>Average " + team.teamname + " engagement = " + teamindex + 
                                                                    "<br><br>Thanks," +
                                                                    "<br>Moodwonder Team";
                                                        body = emailTemplate.general(body);
                                                        transporter.sendMail({
                                                            from: Config.fromEmail,
                                                            to: manager.email,
                                                            //to: 'useremailtestacc@gmail.com',
                                                            subject: 'Unfortunately, ' + team.teamname + ' team is not engaged in ' + companyname,
                                                            html: body
                                                        });

                                                    }

                                                });

                                                getMWIndexRule('TEAM_UPPER_LIMIT', function (upperlimit) {
                                                    if (teamindex >= upperlimit.rule_value) {

                                                        var transporter = nodemailer.createTransport();
                                                        var body =  "Amazing job " + manager.firstname + " " + manager.lastname + "!" +
                                                                    "<br><br>" + team.teamname + " team average engagement rating is high (above " + upperlimit.rule_value + ")." +
                                                                    "<br><br>Average " + team.teamname + " engagement = " + teamindex + 
                                                                    "<br><br>Keep up the good work and make sure to maintain the high standards in employees' engagement. You are on the right track! We suggest that you'll set up a team meeting or type an email and tell the great news to the whole team!" +
                                                                    "<br><br>Thanks," +
                                                                    "<br> Moodwonder Team";
                                                        body = emailTemplate.general(body);
                                                        transporter.sendMail({
                                                            from: Config.fromEmail,
                                                            to: manager.email,
                                                            //to: 'useremailtestacc@gmail.com',
                                                            subject: 'Kudos, ' + team.teamname + ' team is very engaged in ' + companyname,
                                                            html: body
                                                        });

                                                    }

                                                });
                                            }
                                        });
                                    });

                                });
                                teamrepeater(t + 1);
                            }
                        }
                        teamrepeater(0);
                    });
                    mteamrepeater(i + 1);
                }
            }
            mteamrepeater(0);
        });
    },
    start: true,
    timeZone: 'Asia/Kolkata'
});
mgrNotificationTeam.start();


