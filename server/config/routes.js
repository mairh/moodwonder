/**
 * Routes for express app
 */
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');

var Header = require('../../public/assets/header.server');
var App = require('../../public/assets/app.server');

var Homepage = require('../models/homepage');
var Signuppage = require('../models/signuppage');
var Loginpage = require('../models/loginpage');
var Languages = require('../models/languages');
var Myprofile = require('../models/myprofilepage');
var CreatePasswordPage = require('../models/createpasswordpage');
var ForgotPasswordPage = require('../models/forgotpasswordpage');
var InviteSignupPage = require('../models/invitesignuppage');
var EOMPage = require('../models/employeeofthemonthpage');
var PublicProfilePage = require('../models/publicprofilepage');
var Mwusertheme = require('../models/mwusertheme');
var AboutPage = require('../models/aboutpage');
var AnonymityPage = require('../models/anonymitypage');
var TermsPage = require('../models/termspage');
var PolicyPage = require('../models/policypage');
var SurveyPage = require('../models/surveypage');
var SurveyFormsPage = require('../models/surveyformspage');
var MymoodPage = require('../models/mymoodpage');
var MycompanyPage = require('../models/mycompanypage');
var OpenendedresponsesPage = require('../models/openendedresponsespage');
var LogoutPage = require('../models/logoutpage');
var OpenendedsurveyPage = require('../models/openendedsurveypage');
var MoodratePage = require('../models/moodratepage');
var InvitepeoplePage = require('../models/invitepeoplepage');
var ErrorPage = require('../models/errorpage');
var TakesurveyPage = require('../models/takesurveypage');
var SurveyresponsesPage = require('../models/surveyresponsespage');

var users = require('../controllers/users');
var teams = require('../controllers/teams');
var invitation = require('../controllers/invitation');
var voting = require('../controllers/voting');
var surveys = require('../controllers/surveys');
var customSurvey = require('../controllers/customSurvey');
var customSurveyResults = require('../controllers/customSurveyResults');
var language = require('../controllers/language');
var admin = require('../controllers/admin');
var surveyParticipation = require('../controllers/surveyParticipation');

var common = require('../controllers/common');
var mood = require('../controllers/mood');
var EngagementArea = require('../controllers/engagementArea');
var notificationRules = require('../controllers/notificationRules');

var Navigation = require('../languagesettings/nav');
var openEndedSurvey = require('../controllers/openEndedSurvey');

// Cron jobs
var customsurveyalert = require('../cronjobs/customsurveyalert');
var managernotifications_mwindex = require('../cronjobs/managernotifications_mwindex');
var managernotifications_individual = require('../cronjobs/managernotifications_individual');
var managernotifications_team = require('../cronjobs/managernotifications_team');
var report = require('../cronjobs/report');


module.exports = function (app, passport) {
    // user routes
    app.post('/login', users.postLogin);
    app.post('/usersignupstep1', users.postSignupStep1, users.postForgotPassword);
    app.post('/usersignupstep2', users.encryptPassword, users.postSignupStep2, users.postLogin);
    app.post('/signup', users.postSignUp);
    app.post('/usersignup', users.postUserSignUp);
    app.post('/saveuserdetails', users.checkLogin, users.encryptPassword, users.postSaveUserInfo, users.postSaveManagerInfo);
    app.post('/updateuserphoto', users.checkLogin, users.UpdateUserPhoto);
    app.post('/updateuserbanner', users.checkLogin, users.UpdateProfileBanner);
    app.post('/savemanagerdetails', users.checkLogin, users.findUserByEmailId, users.postSaveManagerInfo, invitation.sendInvitation);
    app.post('/savecompanydetails', users.checkLogin, users.postSaveCompanyInfo);
    app.post('/createteam', users.checkLogin, teams.checkTeam, teams.createTeam, users.updateUser);
    app.post('/updateteam', users.checkLogin, teams.checkTeam, teams.updateTeam);
    app.post('/getmyteams', users.checkLogin, teams.getMyTeams, users.usersInTeams);
    app.post('/addmembertoteam', users.checkLogin, teams.addMemberToTeam, invitation.sendInvitation);
    app.post('/removememberfromteam', users.checkLogin, teams.removeMemberFromTeam, invitation.removeInvitation);
    app.post('/invitesignup', users.checkLogin, invitation.sendInvitation);
    app.post('/inviteanonymously', users.checkLogin, invitation.inviteAnonymously);
    app.get('/login', users.loginHandler);
    app.get('/logout', users.getLogout);
    app.get('/test', users.test);
    app.get('/userinfo', users.checkLogin, users.getUserInfo);
    app.get('/getownteams', users.checkLogin, teams.getOwnTeams);
    app.get('/getteamsbymember', users.checkLogin, teams.getTeamsByMember);
    app.get('/getcompanydetails', users.checkLogin, teams.getCompanyDetails);

    app.post('/saveengagementsurveyresult', users.checkLogin, surveys.saveEngagementSurveyResult);
    app.post('/getresultsbycompany', users.checkLogin, surveys.getResultsByComapny);
    app.post('/getcompanydata', users.checkLogin, surveys.getCompanyStatisticsData);
    app.get('/getengagementsurvey', users.checkLogin, surveys.getEngagementSurvey);
    app.get('/getlastengagementsurvey', users.checkLogin, surveys.getLastSurvey);
    app.get('/getengagementresults', users.checkLogin, surveys.getSurveyResults);
    app.get('/getresultsbyindustry', users.checkLogin, surveys.getResultsByIndustry);
    app.get('/getresultsbycountry', users.checkLogin, surveys.getResultsByCountry);
    app.get('/getengagingmanagers', users.checkLogin, surveys.getMostEngagingManagers);
    app.get('/mymood', surveys.handleMyMood);

    app.post('/createsurveyform', users.checkLogin, customSurvey.createForm);
    app.post('/deleteform', users.checkLogin, customSurvey.deleteForm);
    app.post('/getmysurveyforms', users.checkLogin, customSurvey.getMyCSurveyForms);
    app.get('/getsurveyforms', users.checkLogin, customSurvey.getForms);
    app.get('/getsurveyform', users.checkLogin, customSurvey.getSurveyForm);
    app.get('/getorganization', users.checkLogin, customSurvey.getOrganisation);
    app.get('/takesurvey/:hash', customSurvey.handleTakeSurvey);

    app.post('/savesurveyresults', users.checkLogin, customSurveyResults.saveSurveyResults);
    app.get('/getsurveyresponses', users.checkLogin, customSurveyResults.getSurveyResponses);
    
    app.post('/getmysurveyparticipation', users.checkLogin, surveyParticipation.getMySurveyParticipation);

    app.post('/addlanguage', language.addLanguage);
    app.post('/editlanguage', language.editLanguage);
    app.post('/updatepagekeys', language.updatePageKeys);
    app.post('/deletelanguage', language.deleteLanguage);
    app.get('/getpage', language.getPage);
    app.get('/getlanguages', language.getLanguages);

    app.post('/adminlogin', admin.login);
    app.get('/admin', users.loginHandler);
    app.get('/adminlogout', admin.logout);
    app.get('/loggedin', admin.getLoggedIn);

    app.post('/addmood', users.checkLogin, mood.addMoodRate);
    app.get('/mymoods', users.checkLogin, mood.getMyMoods);

    app.post('/addengagement', admin.checkLogin, EngagementArea.addEngagement);
    app.post('/editengagement', admin.checkLogin, EngagementArea.editEngagement);
    app.post('/deleteengagement', admin.checkLogin, EngagementArea.deleteEngagement);
    app.get('/getengagementareas', admin.checkLogin, EngagementArea.engagementAreas);

    app.post('/editrule', admin.checkLogin, notificationRules.editRule);
    app.post('/deleterule', admin.checkLogin, notificationRules.deleteRule);
    app.get('/getrules', admin.checkLogin, notificationRules.getRules);

    //app.post('/getallemployees', users.checkLogin, users.getAllEmployees);
    app.post('/getallemployees', users.checkLogin, users.getAllEmployeesInCompany);
    app.post('/postvote', users.checkLogin, voting.postVote);
    app.post('/getempmonthview', users.checkLogin, voting.getEmpMonthView);
    // app.post('/chooseemployeeofthemonth', users.checkLogin, users.isAdmin, voting.chooseEmployeeOfTheMonth);
    app.post('/chooseemployeeofthemonth', users.checkLogin, voting.chooseEmployeeOfTheMonth);

    // Admin API calls
    app.post('/getallusers', admin.checkLogin, users.getallusersforadmin);
    //app.post('/getallusers', admin.checkLogin, users.getallusers);
    app.post('/getuser', admin.checkLogin, users.getUserInfoById);
    app.post('/updateuser', admin.checkLogin, users.updateUserByAdmin);
    app.post('/getuserteamsbyid', admin.checkLogin, teams.getTeamsById, users.usersInTeams);
    app.post('/getopenended', admin.checkLogin, openEndedSurvey.getOpenEndedSurveyAnswer);
    app.post('/getallcompanies', admin.checkLogin, users.getAllCompanies);
    app.post('/getallteamsbycompany', admin.checkLogin, users.getAllTeamsFromCompany);
    app.post('/getallteamsmembers', admin.checkLogin, users.getAllTeamsMembers, users.usersInTeams);
    app.post('/searchteam', admin.checkLogin, users.searchTeam);
    app.post('/addindustry', admin.checkLogin, common.addIndustry);
    app.post('/getindustries', admin.checkLogin, common.getIndustry);
    app.post('/getindustries', admin.checkLogin, common.getIndustry);
    app.post('/updateindustry', admin.checkLogin, common.updateIndustry);
    app.post('/deleteindustry', admin.checkLogin, common.deleteIndustry);
    app.post('/addplaces', admin.checkLogin, common.addPlaces);
    app.post('/getplaces', admin.checkLogin, common.getPlaces);
    app.post('/updateplaces', admin.checkLogin, common.updatePlaces);
    app.post('/deleteplaces', admin.checkLogin, common.deletePlaces);
    app.post('/getplacesdata', admin.checkLogin, common.getPlacesData);
    app.post('/requestdemo', common.requestDemo);

    // Set variables from server side
    app.get('/mycompany', common.handleMycompany);
    app.get('/my_company', common.handleMycompany);
    app.get('/invitesignup/:hash', users.handleInviteSignup);
    // app.get('/invitesignup/:hash', invitation.handleSignup); Old handler
    app.get('/publicprofile/:hash', admin.checkLogin, users.getPublicProfile);
    app.get('/createpassword/:hash', users.handleSetPassword);

    //app.get('/openendedsurvey', users.checkLogin, openEndedSurvey.handleOpenendedSurvey);
    app.get('/openendedquestions', users.checkLogin, openEndedSurvey.getQuestions);
    app.post('/saveopenendedsurvey', users.checkLogin, openEndedSurvey.saveOpenEndedSurvey);
    app.post('/getmembers', users.checkLogin, openEndedSurvey.getMembers);
    app.post('/getanswers', users.checkLogin, openEndedSurvey.getAnswers);
    app.post('/getemployeevotes', admin.checkLogin, users.getEmployeeVotes);

    app.use(function noCachePlease(req, res, next) {
        if(req.user && req.user.role !== 'ADMIN') {
          // console.log('req.user');
          res.header("Cache-Control", "no-cache, no-store, must-revalidate");
          res.header("Pragma", "no-cache");
          res.header("Expires", 0);
        }
        next();
    });

    app.get('*', function (req, res, next) {

        if (/(\.png$|\.map$|\.jpg$)/.test(req.url))
            return;
        var user = req.user ? {authenticated: true, isWaiting: false, usertype: req.user.usertype, company_admin: req.user.company_admin } : {authenticated: false, isWaiting: false};
        var publicprofile = (req.body.response !== undefined) ? { publicuser: req.body.response }: { publicuser: false };
        var inviteEmail = req.body.inviteEmail ? req.body.inviteEmail : '';

        var AppStore = { isAuthenticated: false, userType: false, company_admin: false };
        if(typeof req.user !== 'undefined' && req.user !== null ){
            // console.log('req.user');
            // console.log((req.user === null) );
            AppStore = {isAuthenticated: true, userType: req.user.usertype, company_admin: req.user.company_admin };
        }

        // To set state of a component from server
        // Must follow this format below
        // yourStore{ your: params }
        // You will get the params using the following code in your components
        // this.state.yourState
        // console.log(publicprofile);
        // console.log(req.url);
        
        var UserStore = { user: user, continents: req.body.continents };
        if(req.body.industries){
            UserStore.industries = req.body.industries;
        }
        var CreatePswdStore = { user: { uid: req.user ? req.user._id : null } };
        if(req.body.ErrorState){
            var ErrorState = req.body.ErrorState;
            CreatePswdStore.message = ErrorState.message;
            CreatePswdStore.noPswdForm = ErrorState.noPswdForm;
            CreatePswdStore.hasError = ErrorState.hasError;
        }
        res.locals.data = {
            UserStore: UserStore,
            PublicUserStore: publicprofile,
            CreatePswdStore: CreatePswdStore,
            SignupStore: {inviteEmail: inviteEmail},
            AppStore: AppStore
        };

        if( req.url.search("invitesignup") !== -1 && req.body.response ){
            res.locals.data.SignupStore = req.body.response;
        }
        next();
    });
    
    
    function getMwthemeKeys(page, lang, html, callback) {
        
        Mwusertheme.findOne({language: lang}, {_id: 0}).lean().exec(function (err, docs) {
            if (docs != 'undefined') {
                callback(docs);
            }
        });
    }

    function getMwKeys(page, lang, callback) {
        
        Mwusertheme.findOne({language: lang}, {_id: 0}).lean().exec(function (err, docs) {
            if (docs != 'undefined') {
                callback(docs);
            }
        });
    }
    

    function getPageKeys(page, lang, callback) {
        // console.log('page');
        // console.log(page);

        var modelObj = modelObj || {};

        switch (page) {
            case 'login':
                modelObj = {};
                modelObj = Loginpage;
                break;

            case 'signup':
                modelObj = {};
                modelObj = Signuppage;
                break;

            case 'home':
                modelObj = {};
                modelObj = Homepage;
                break;

            case 'myprofile':
                modelObj = {};
                modelObj = Myprofile;
                break;

            case 'createpassword':
                modelObj = {};
                modelObj = CreatePasswordPage;
                break;

            case 'forgotpassword':
                modelObj = {};
                modelObj = ForgotPasswordPage;
                break;

            case 'invitesignup':
                modelObj = {};
                modelObj = InviteSignupPage;
                break;

            case 'employeeofthemonth':
                modelObj = {};
                modelObj = EOMPage;
                break;

            case 'viewvotes':
                modelObj = {};
                modelObj = EOMPage;
                break;

            case 'publicprofile':
                modelObj = {};
                modelObj = PublicProfilePage;
                break;
                
            case 'about':
                modelObj = {};
                modelObj = AboutPage;
                break;    
                
            case 'anonymity':
                modelObj = {};
                modelObj = AnonymityPage;
                break;    
                
            case 'terms':
                modelObj = {};
                modelObj = TermsPage;
                break;    
                
            case 'policy':
                modelObj = {};
                modelObj = PolicyPage;
                break;    
            
            case 'survey':
                modelObj = {};
                modelObj = SurveyPage;
                break;
                
            case 'surveyforms':
            case 'viewsurvey':
                modelObj = {};
                modelObj = SurveyFormsPage;
                break;
                
            case 'mymood':
            case 'customsurvey':
                modelObj = {};
                modelObj = MymoodPage;
                break;
                
            case 'mycompany':
                modelObj = {};
                modelObj = MycompanyPage;
                break;
                
            case 'openendedresponses':
                modelObj = {};
                modelObj = OpenendedresponsesPage;
                break;
                
            case 'logout':
                modelObj = {};
                modelObj = LogoutPage;
                break;
                
            case 'openendedsurvey':
                modelObj = {};
                modelObj = OpenendedsurveyPage;
                break;

            case 'moodrate':
                modelObj = {};
                modelObj = MoodratePage;
                break;

            case 'invitepeople':
                modelObj = {};
                modelObj = InvitepeoplePage;
                break;

            case 'takesurvey':
                modelObj = {};
                modelObj = TakesurveyPage;
                break;
                
            case 'surveyresponses':
                modelObj = {};
                modelObj = SurveyresponsesPage;
                break;
                
            case 'testing':
                modelObj = {};
                modelObj = SurveyPage;
                break;

            default:
                modelObj = {};
                modelObj = ErrorPage;
                break;
        }

        modelObj.findOne({language: lang}, {_id: 0}).lean().exec(function (err, docs) {
            if (docs != 'undefined') {
                callback(docs);
            }
        });
    }

    app.get('*', function (req, res, next) {

        var lang = req.cookies.lang;
        var pageurl = req.url;

        if (lang == 'undefined' || lang == null) {
            lang = 'EN';
            res.clearCookie('lang');
            res.cookie('lang', lang);
        }

        //var html = App(JSON.stringify(res.locals.data || {}), req.url);
        
        var userstyles = '';
        userstyles += '<link rel="stylesheet" href="/assets/halfdaughnut/css/font-awesome.min.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/fonts.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/halfdaughnut/css/jquery.circliful.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/reset.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/site.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/container.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/custom-container.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/grid.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/header.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/image.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/menu.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/divider.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/dropdown.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/segment.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/button.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/list.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/sidebar.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/transition.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/popup.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/icon.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/input.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/card.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/rating.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/account.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/label.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/form.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/custom.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/modal.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/custom_modal.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/dimmer.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/custom/404.css" />';
        userstyles += '<link rel="stylesheet" href="/assets/styles/vendor/message.css" />';

        var userscripts = '';
        userscripts += '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/semantic.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/visibility.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/sidebar.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/transition.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/form.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/dropdown.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/popup.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/modal.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/SimpleAjaxUploader.min.js"></script>';
        userscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/custom/commonscripts.js"></script>';
        userscripts += '<script src="/assets/halfdaughnut/js/jquery.circliful.js"></script>';
        
        var homestyles = '';
        homestyles += '<link rel="stylesheet" href="/assets/styles/custom/fonts.css" />';
        homestyles += '<link rel="stylesheet" href="/assets/styles/vendor/semantic.css" />';
        homestyles += '<link rel="stylesheet" href="/assets/styles/custom/semantic_custom.css" />';
        homestyles += '<link rel="stylesheet" href="/assets/styles/custom/animation.css" />';
        homestyles += '<link rel="stylesheet" href="/assets/fullPage.js-master/jquery.fullPage.css" />';
        homestyles += '<link rel="stylesheet" href="/assets/styles/custom/examples.css" />';
        homestyles += '<link rel="stylesheet" href="/assets/styles/custom/404.css"/>';
        homestyles += '<link rel="stylesheet" href="/assets/styles/custom/custom.css" />';
        homestyles += '<link rel="stylesheet" href="/assets/styles/vendor/message.css" />';
        
        var homescripts = '';
        homescripts += '<!--[if IE]><script type="text/javascript">var console = { log: function() {} };</script><![endif]-->';
        homescripts += '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>';
        homescripts += '<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>';
        homescripts += '<script type="text/javascript" src="/assets/fullPage.js-master/jquery.fullPage.js"></script>';
        homescripts += '<script type="text/javascript" src="/assets/js/custom/home.js"></script>';
        homescripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/semantic.js"></script>';
        
        var moodrate = '';
        moodrate += '<link rel="stylesheet" href="/assets/styles/custom/fonts.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/reset.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/site.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/container.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/custom/custom-container.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/grid.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/header.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/image.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/custom/menu.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/divider.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/dropdown.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/segment.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/button.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/list.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/custom/sidebar.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/transition.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/popup.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/custom/icon.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/input.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/card.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/rating.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/vendor/modal.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/custom/custom.css" />';
        moodrate += '<link rel="stylesheet" href="/assets/styles/custom/404.css" />';
        
  
        var adminstyles = '';
        adminstyles += '<link rel="stylesheet" href="/assets/styles/custom/admin_main.css" />';
        adminstyles += '<link rel="stylesheet" href="/assets/styles/custom/fonts.css" />';
        //adminstyles += '<link rel="stylesheet" href="/assets/styles/vendor/semantic.css" />';
        adminstyles += '<link rel="stylesheet" href="/assets/styles/vendor/segment.css" />';
        adminstyles += '<link rel="stylesheet" href="/assets/styles/vendor/grid.css" />';
        adminstyles += '<link rel="stylesheet" href="/assets/styles/vendor/message.css" />';
        adminstyles += '<link rel="stylesheet" href="/assets/styles/vendor/container.css" />';
        adminstyles += '<link rel="stylesheet" href="/assets/styles/custom/adminstyles.css" />';
        adminstyles += '<link rel="stylesheet" href="/assets/styles/custom/404.css"/>';
        
        var adminscripts = '';
        adminscripts += '<script type="text/javascript" charset="utf-8"  src="/assets/js/vendor/jquery.min.js"></script>';
        adminscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/visibility.js"></script>';
        adminscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/sidebar.js"></script>';
        adminscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/transition.js"></script>';
        adminscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/tab.min.js"></script>';
        adminscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/dropdown.js"></script>';
        adminscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/dimmer.js"></script>';
        adminscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/modal.js"></script>';
        //adminscripts += '<script type="text/javascript" charset="utf-8"  src="/assets/js/custom/adminscripts.js"></script>';
        
        var staticstyles = '';
        staticstyles += '<link rel="stylesheet" href="/assets/styles/custom/fonts.css" />';
        staticstyles += '<link rel="stylesheet" href="/assets/styles/vendor/semantic.css" />';
        staticstyles += '<link rel="stylesheet" href="/assets/styles/custom/semantic_custom.css" />';
        staticstyles += '<link rel="stylesheet" href="/assets/styles/custom/static.css" />';
        staticstyles += '<link rel="stylesheet" href="/assets/styles/custom/404.css"/>';
        
        var staticscripts = '';
        staticscripts += '<script type="text/javascript" charset="utf-8"  src="/assets/js/vendor/jquery.min.js"></script>';
        staticscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/custom/static.js"></script>';
        staticscripts += '<script type="text/javascript" charset="utf-8" src="/assets/js/vendor/semantic.js"></script>';
        
        var loginpage = '';
        loginpage += '<link rel="stylesheet" href="/assets/styles/custom/fonts.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/reset.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/site.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/container.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/custom/custom-container.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/grid.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/header.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/image.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/custom/menu.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/divider.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/segment.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/custom/form.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/input.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/button.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/list.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/vendor/message.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/custom/icon.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/custom/login-page-custom.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/custom/custom.css" />';
        loginpage += '<link rel="stylesheet" href="/assets/styles/custom/404.css"/>';
        
        var loginscripts = '';
        loginscripts += '<script type="text/javascript" charset="utf-8"  src="/assets/js/vendor/jquery.min.js"></script>';
        loginscripts += '<script type="text/javascript" charset="utf-8"  src="/assets/js/vendor/form.js"></script>';
        loginscripts += '<script type="text/javascript" charset="utf-8"  src="/assets/js/vendor/transition.js"></script>';
        loginscripts += '<script type="text/javascript" charset="utf-8"  src="/assets/js/custom/login.js"></script>';
        
        var customsurveystyles = '';
        customsurveystyles += userstyles;
        customsurveystyles += '<link rel="stylesheet" href="/assets/styles/custom/customsurvey.css" />';
        
        //var page = pageurl.split("/").pop();
        var page = '';
        if (pageurl == '/') {
            page = 'home';
        } else if (pageurl.search('createpassword') != -1) {
            page = 'createpassword';
        } else if (pageurl.search('invitesignup') != -1) {
            page = 'invitesignup';
        } else if (pageurl.search('publicprofile') != -1) {
            page = 'publicprofile';
        } else if (pageurl.search('takesurvey') != -1) {
            page = 'takesurvey';
        } else if (pageurl.search('surveyresponses') != -1) {
            page = 'surveyresponses';
        } else {

            page = pageurl.split("/").pop();
        }

        getPageKeys(page, lang, function (response) {

            var respons = '';
            var nav = '';

            getMwKeys(page, lang, function (mwkeys) {

                switch(page) {
                
                    case 'survey':
                    case 'surveyforms':
                    case 'viewsurvey':
                    case 'mymood':
                    case 'customsurvey':
                    case 'mycompany':
                    case 'openendedresponses':
                    case 'logout':
                    case 'myprofile':
                    case 'employeeofthemonth':
                    case 'viewvotes':
                    case 'publicprofile':
                    case 'openendedsurvey':
                    case 'moodrate':
                    case 'invitepeople':
                    case 'takesurvey':
                    case 'surveyresponses':
                        res.locals.data.MlangStore = { multilang : JSON.stringify(response), mwkeys: JSON.stringify(mwkeys) };
                        //res.locals.data.MlangStore = { multilang : response };
                        break;

                    default:
                        break;

                }


                switch (lang) {
                    case 'EN':
                        respons = {HOME_TITLE: "Language En", LBL_USERNAME: "Username en", LBL_PASSWORD: "Password en", PH_USERNAME: "username en", PH_PASSWORD: "password en"};
                        nav = Navigation.header.EN;
                        break;

                    case 'FI':
                        respons = {HOME_TITLE: "Language Fr", LBL_USERNAME: "Username fr", LBL_PASSWORD: "Password fr", PH_USERNAME: "username fr", PH_PASSWORD: "password fr"};
                        nav = Navigation.header.FI;
                        break;

                    default:
                        break;
                }

                var html = App(JSON.stringify(res.locals.data || {}), req.url);
                if (pageurl == '/' || pageurl == '/index') {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", homestyles)
                        .replace("BODYCLASS", 'home')
                        .replace("JSCRIPTS", homescripts);

                } else if (pageurl == '/moodrate') {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", moodrate)
                        .replace("BODYCLASS", 'home')
                        .replace("JSCRIPTS", userscripts);

                }   else if (pageurl == '/about' || pageurl == '/anonymity' || pageurl == '/terms' || pageurl == '/policy') {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", staticstyles)
                        .replace("BODYCLASS", 'inner-pages')
                        .replace("JSCRIPTS", staticscripts);

                } else if (pageurl.search('admin') != -1) {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", adminstyles)
                        .replace("BODYCLASS", '')
                        .replace("JSCRIPTS", adminscripts);

                } else if (pageurl == '/login' || pageurl == '/logout') {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", loginpage)
                        .replace("BODYCLASS", 'login loginpage')
                        .replace("JSCRIPTS", loginscripts);

                } else if (pageurl.search('signup') != -1) {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", loginpage)
                        .replace("BODYCLASS", 'login loginpage')
                        .replace("JSCRIPTS", userscripts);

                } else if (pageurl.search('invitesignup') != -1) {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", loginpage)
                        .replace("BODYCLASS", 'login loginpage')
                        .replace("JSCRIPTS", userscripts);

                } else if (pageurl.search('createpassword') != -1) {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", loginpage)
                        .replace("BODYCLASS", 'login loginpage')
                        .replace("JSCRIPTS", userscripts);

                } else if (pageurl == '/forgotpassword') {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", loginpage)
                        .replace("BODYCLASS", 'login loginpage')
                        .replace("JSCRIPTS", userscripts);

                } else if (pageurl == '/customsurvey') {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", customsurveystyles)
                        .replace("BODYCLASS", '')
                        .replace("JSCRIPTS", userscripts);
                } else if (pageurl == '/employeeofthemonth') {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", userstyles)
                        .replace("BODYCLASS", 'employeeofthemonth')
                        .replace("JSCRIPTS", userscripts);
                } else if (pageurl == '/viewvotes') {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", userstyles)
                        .replace("BODYCLASS", 'viewvotes')
                        .replace("JSCRIPTS", userscripts);
                } else if (pageurl.search("publicprofile") !== -1) {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", userstyles)
                        .replace("BODYCLASS", 'publicprofile')
                        .replace("JSCRIPTS", userscripts);
                } else {
                    html = html.replace("TITLE", Header.title)
                        .replace("META", Header.meta)
                        .replace("LINK", userstyles)
                        .replace("BODYCLASS", '')
                        .replace("JSCRIPTS", userscripts);
                }


                for (var val in nav) {
                    //html = html.split(val).join(nav[val]);
                    var pattern = new RegExp(val, "g");
                    html = html.replace(pattern, nav[val]);
                }

                switch(page) {
                    case 'survey':
                    case 'surveyforms':
                    case 'viewsurvey':
                    case 'mymood':
                    case 'customsurvey':
                    case 'mycompany':
                    case 'openendedresponses':
                    case 'logout':
                    case 'myprofile':
                    case 'employeeofthemonth':
                    case 'viewvotes':
                    case 'publicprofile':
                    case 'openendedsurvey':
                    case 'moodrate':
                    case 'invitepeople':
                    case 'takesurvey':
                    case 'surveyresponses':
                        break;

                    default:
                        for (var val in response) {
                            var pattern = new RegExp(val, "g");
                            html = html.replace(pattern, response[val]);
                        }
                        break;

                }

                //for (var val in response) {
                //    var pattern = new RegExp(val, "g");
                //    html = html.replace(pattern, response[val]);
                //}

                //getMwthemeKeys(page, lang, html, function (data) {
                //    for (var val in data) {
                //        var pattern = new RegExp(val, "g");
                //        html = html.replace(pattern, data[val]);
                //    }

                    res.contentType = "text/html; charset=utf8";
                    res.end(html);
                //});

            });
        });
    });
};
 
