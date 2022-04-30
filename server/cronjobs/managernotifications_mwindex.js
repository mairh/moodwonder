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

function getEngagementResults(memberid, callback) {

    // Get members engagement results
    var condition = {user_id: memberid};
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

var CronJob = require('cron').CronJob;
var mgrNotificationMWIndex = new CronJob({
    cronTime: '00 00 11 * * 1-7',
    //cronTime: '* * * * * *',
    onTick: function () {
        /*
         * Runs every day (Sunday through Saturday)
         * at 10:00:00 AM. 
         * cronTime: '00 00 10 * * 1-7',
         */
        getAllManagers(function (managers) {

            var mCount = managers.length;
            function mrepeater(i) {
                if (i < mCount) {

                    var manager = managers[i];
                    getTeams(manager, function (teams) {

                        var tCount = teams.length;
                        function teamrepeater(t) {
                            if (t < tCount) {
                                var team = teams[t];
                                getTeamMembers(team.member_ids, function (tmembers) {

                                    var tmCount = tmembers.length;
                                    function tmemberrepeater(tm) {
                                        if (tm < tmCount) {
                                            var member = tmembers[tm];
                                            getEngagementResults(member._id, function (posts) {

                                                var sum = _(posts).reduce(function (m, x) {
                                                    return m + x.rating;
                                                }, 0);
                                                var postedtimes = (posts.length) / 13;
                                                var mwindex = (sum / (postedtimes * 13)).toFixed(1);

                                                getMWIndexRule('MW_INDEX', function (rule) {
                                                    if (mwindex < rule.rule_value) {

                                                        var transporter = nodemailer.createTransport();
                                                        var body = "Hi ,<br><br> The user " + member.firstname + "'s (" + member.email + ")" + " MW index is " + mwindex + " <br>" +
                                                                "<br><br> Best wishes" +
                                                                "<br> Moodwonder Team";
                                                        var body = "Watch out " + manager.firstname + " " + manager.lastname + "!," + 
                                                                   "<br><br> Someone in " + team.teamname + " team average engagement rating is going below " + rule.rule_value + ". It is time to work hard on the company culture." +
                                                                   "<br>We suggest that you should have a team meeting or face to face meetings with all your subordinates to find out what's wrong and think how you can improve the situation." +
                                                                   "<br>Employee avg rating = " + mwindex + 
                                                                   "<br><br>Thanks," +
                                                                   "<br> Moodwonder Team";
                                                        body = emailTemplate.general(body);
                                                        transporter.sendMail({
                                                            from: Config.fromEmail,
                                                            to: manager.email,
                                                            //to: 'useremailtestacc@gmail.com',
                                                            subject: "Beware! Someone in " + team.teamname + " has the average rating below " + rule.rule_value,
                                                            html: body
                                                        });

                                                    }
                                                });

                                            });
                                            tmemberrepeater(tm + 1);
                                        }

                                    }
                                    tmemberrepeater(0);

                                });
                                teamrepeater(t + 1);

                            }
                        }
                        teamrepeater(0);

                    });
                    mrepeater(i + 1);

                }
            }
            mrepeater(0);

        });

    },
    start: true,
    timeZone: 'Asia/Kolkata'
});
mgrNotificationMWIndex.start();


