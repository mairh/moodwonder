var _ = require('underscore');
var mongoose = require('mongoose');
var User = require('../models/user');
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');
var EngagementResults = require('../models/engagementResults');
var SurveyParticipation = require('../models/surveyParticipation');
var Config = require('../config/config');

function getCompanyMemberIds(companyid, callback) {
    // Get members by matching company
    var condition = {company_id: companyid};
    User.find(condition).lean().exec(function (err, users) {
        if (users != 'undefined') {
            var id = [];
            for (var j = 0; j < users.length; j++) {
                id.push(users[j]._id);
            }
            callback(id);
        }
    });
}

function getCompanyEngagements(memberIds, callback) {
    // Get members engagement results
    var condition = {user_id: {$in: memberIds}};
    EngagementResults.find(condition).lean().exec(function (err, engagements) {
        if (engagements != 'undefined') {
            callback(engagements);
        }
    });
}

function getReport(userid, companyid, callback) {

    var report = report || {};
    report.u_mwindex_today = '';
    report.u_mwindex_weekago = '';
    report.u_mwindex_monthago = '';
    report.u_mood_today = '';
    report.u_mood_weekago = '';
    report.u_mood_monthago = '';
    report.c_mwindex_today = '';
    report.c_mwindex_weekago = '';
    report.c_mwindex_monthago = '';
    report.c_mood_today = '';
    report.c_mood_weekago = '';
    report.c_mood_monthago = '';
    
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var tdatestring = year + '-' + month + '-' + day;
    
    var weekago = new Date();
    weekago = new Date(weekago.setDate(weekago.getDate()- 7));
    var wyear = weekago.getFullYear();
    var wmonth = ('0' + (weekago.getMonth() + 1)).slice(-2);
    var wday = ('0' + weekago.getDate()).slice(-2);
    var wdatestring = wyear + '-' + wmonth + '-' + wday;
    
    var monthago = new Date();
    monthago = new Date(monthago.setMonth(monthago.getMonth()- 1));
    var myear = monthago.getFullYear();
    var mmonth = ('0' + (monthago.getMonth() + 1)).slice(-2);
    var mday = ('0' + monthago.getDate()).slice(-2);
    var mdatestring = myear + '-' + mmonth + '-' + mday;
    
    getCompanyMemberIds(companyid, function(memberIds){
        if (memberIds.length > 0) {
            
            getCompanyEngagements(memberIds, function(engagements){
                if(engagements.length > 0) {
                    
                    var userengagements = _.filter(engagements, function(u) { return u.user_id == userid; });
                    if (userengagements.length > 0) {
                        
                        var uToday = _.filter(userengagements, function(u) { return u.created.d == tdatestring; });
                        if (uToday.length > 0) {
                            var tmood = _.filter(uToday, function(u) { return u.mood == 'Mood'; })
                            report.u_mood_today = tmood[0].rating;
                            report.u_mwindex_today = ((_(uToday).reduce(function (m, x) {return m + x.rating;}, 0)) / 13).toFixed(1);
                        }
                        
                        var uWeekago = _.filter(userengagements, function(u) { return u.created.d == wdatestring; });
                        if (uWeekago.length > 0) {
                            var wmood = _.filter(uWeekago, function(u) { return u.mood == 'Mood'; })
                            report.u_mood_weekago = wmood[0].rating;
                            report.u_mwindex_weekago = ((_(uWeekago).reduce(function (m, x) {return m + x.rating;}, 0)) / 13).toFixed(1);
                        }
                        
                        var uMonthago = _.filter(userengagements, function(u) { return u.created.d == mdatestring; });
                        if (uMonthago.length > 0) {
                            var mmood = _.filter(uMonthago, function(u) { return u.mood == 'Mood'; })
                            report.u_mood_monthago = mmood[0].rating;
                            report.u_mwindex_monthago = ((_(uMonthago).reduce(function (m, x) {return m + x.rating;}, 0)) / 13).toFixed(1);
                        }
                        
                    }
                    
                    var cToday = _.filter(engagements, function(u) { return u.created.d == tdatestring; });
                    var cTodayCount = (cToday.length) / 13;
                    if (cToday.length > 0) {
                            var tmood = _.filter(cToday, function(u) { return u.mood == 'Mood'; })
                            report.c_mood_today = ((_(tmood).reduce(function (m, x) {return m + x.rating;}, 0)) / (cTodayCount)).toFixed(1);
                            report.c_mwindex_today = ((_(cToday).reduce(function (m, x) {return m + x.rating;}, 0)) / (13 * cTodayCount)).toFixed(1);
                    }
                    
                    var cWeekago = _.filter(engagements, function(u) { return u.created.d == wdatestring; });
                    var cWeekCount = (cWeekago.length) / 13;
                    if (cWeekago.length > 0) {
                        var wmood = _.filter(cWeekago, function(u) { return u.mood == 'Mood'; })
                        report.c_mood_weekago = ((_(wmood).reduce(function (m, x) {return m + x.rating;}, 0)) / (cWeekCount)).toFixed(1);
                        report.c_mwindex_weekago = ((_(cWeekago).reduce(function (m, x) {return m + x.rating;}, 0)) / (13 * cWeekCount)).toFixed(1);
                    }
                    
                    var cMonthago = _.filter(engagements, function(u) { return u.created.d == mdatestring; });
                    var cMonthCount = (cMonthago.length) / 13;
                    if (cMonthago.length > 0) {
                        var mmood = _.filter(cMonthago, function(u) { return u.mood == 'Mood'; })
                        report.c_mood_monthago = ((_(mmood).reduce(function (m, x) {return m + x.rating;}, 0)) / (cMonthCount)).toFixed(1);
                        report.c_mwindex_monthago = ((_(cMonthago).reduce(function (m, x) {return m + x.rating;}, 0)) / (13 * cMonthCount)).toFixed(1);
                    }
                    
                }
                callback(report);
            });
            
        }
        
    });
}

var CronJob = require('cron').CronJob;
var report = new CronJob({
    cronTime: '00 00 23 * * 1',
    //cronTime: '* * * * * *',
    onTick: function () {
        /*
         * Runs every Monday 
         * at 11:00:00 PM. 
         * cronTime: '00 00 23 * * 1',
         */
        console.log('report cron');

        Date.prototype.getMonthStartEnd = function (start) {
            var StartDate = new Date(this.getFullYear(), this.getMonth(), 1);
            var EndDate = new Date(this.getFullYear(), this.getMonth() + 1, 0);
            return [StartDate, EndDate];
        }

        var sendReport = function(user){
            getReport(user._id, user.company_id, function(report) {

                var today = new Date();
                var firstDay = (new Date(today.getTime() - 30*24*60*60*1000)).toString().substr(3,12);
                var lastDay = today.toString().substr(3,12);
                // console.log(JSON.stringify(report));

                var body = "Hi,<br><br> Hope you are doing well at work." +
                            "<br><br> Here is your engagement level summary ("+ firstDay +" - "+ lastDay +" ):" +
                            '<br> <table cellpadding="0" style="border:none;border-collapse:collapse;border-spacing:inherit;background-color:#e8edff">'+
                                '<tbody><tr style="background-color:#bbc8fd">'+
                                    '<td style="color:#112557;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#a5b5e6 0%,#bdc9ef 100%)">Moodwonder</td>'+
                                    '<td style="color:#112557;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#a5b5e6 0%,#bdc9ef 100%)">Today</td>'+
                                    '<td style="color:#112557;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#a5b5e6 0%,#bdc9ef 100%)">1 Week Ago</td>'+
                                    '<td style="color:#112557;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#a5b5e6 0%,#bdc9ef 100%)">1 Month Ago</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">Your MW index</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.u_mwindex_today +'</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.u_mwindex_weekago +'</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.u_mwindex_monthago +'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">Your Mood</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.u_mood_today +'</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.u_mood_weekago +'</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.u_mood_monthago +'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)"> MW Index</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.c_mwindex_today +'</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.c_mwindex_weekago +'</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.c_mwindex_monthago +'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)"> Mood</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.c_mood_today +'</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.c_mood_weekago +'</td>'+
                                    '<td style="color:#575c70;padding:10px;border-bottom:1px solid #fff;background:-webkit-linear-gradient(top,#dbe0ff 0%,#e8eefc 100%)">'+ report.c_mood_monthago +'</td>'+
                                '</tr>'+
                            '</tbody>'+
                            '</table>'+
                        "<br><b>Do not forget to invite your colleagues and friends. This will help us create the real employee engagement rankings." +
                        "<br><br> Best wishes" +
                        "<br> Moodwonder Team";

                body = emailTemplate.general(body);
                var transporter = nodemailer.createTransport();
                transporter.sendMail({
                    from: Config.fromEmail,
                    to: user.email,
                    subject: 'Moodwonder Report',
                    html: body
                });
            });
        }

        var condition = { report_frequency: 'Weekly' };
        var d = new Date();
        if(d.getDate() <= 7){
            condition = { $or: [{report_frequency: 'Monthly'}, {report_frequency: 'Weekly'}] };
        }
        User.find(condition, function(err, users){
            if(!err && users !== null){
                users.map(function (user, key) {
                    sendReport(user);
                });
            }else{
                console.log('Error or No data');
            }
        });
    },
    start: true,
    timeZone: 'Asia/Kolkata'
});
report.start();
