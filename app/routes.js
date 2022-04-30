import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';

import App from 'components/App.react';
import Index from 'components/Index.react';
import Login from 'components/Login.react';
import Logout from 'components/Logout.react';
import InviteSignup from 'components/InviteSignup.react';
import SignupPage from 'components/SignupPage.react';
import ForgotPassword from 'components/ForgotPassword.react';
import CreatePassword from 'components/CreatePassword.react';
import Survey from 'components/Survey.react';
import MyProfile from 'components/MyProfile.react';
import MyTeam from 'components/MyTeam.react';
import Surveyforms from 'components/customsurvey/Customsurveyforms.react';
import Takesurvey from 'components/customsurvey/Takesurvey.react';
import NotFound from 'components/404.react';
import Languages from 'components/language/Languages.react';
import Pages from 'components/pages/Pages.react';
import Admin from 'components/Admin.react';
import Adminlogin from 'components/login/adminlogin.react';
import Adminlogout from 'components/login/Logout.react';
import Dashboard from 'components/dashboard/dashboard.react';
import Industry from 'components/Industry.react';
import Continents from 'components/Continents.react';
import Countries from 'components/Countries.react';
import States from 'components/States.react';
import City from 'components/Cities.react';
import Users from 'components/users/Users.react';
import SurveyStatistics from 'components/users/SurveyStatistics.react';
import UserDetails from 'components/users/UserDetails.react';
import CompanyAdmins from 'components/CompanyAdmins.react';
import MyMood from 'components/MyMood.react';
import MyMoodtest from 'components/MyMoodtest.react';
import EmployeeOfTheMonth from 'components/EmployeeOfTheMonth.react';
import ChooseEOTM from 'components/ChooseEOTM.react';
import Engagementarea from 'components/engagementarea/Engagementarea.react';
import Appuser from 'components/Appuser.react';
import OpenEndedQuestions from 'components/OpenEndedQuestions.react';
import AllTeams from 'components/AllTeams.react';
import MyCompany from 'components/MyCompany.react';
import Customsurveyresponses from 'components/customsurvey/Customsurveyresponses.react';
import Notificationrules from 'components/notificationrules/Notificationrules.react';
import Apphome from 'components/Apphome.react';
import Appstatic from 'components/Appstatic.react';
import About from 'components/staticpages/About.react';
import Anonymity from 'components/staticpages/Anonymity.react';
import Terms from 'components/staticpages/Terms.react';
import Policy from 'components/staticpages/Policy.react';
import PublicProfile from 'components/PublicProfile.react';
import MobileMoodrate from 'components/MobileMoodrate.react';
import MobileInvite from 'components/MobileInvite.react';
import Appmobile from 'components/Appmobile.react';
import OpenendedResponses from 'components/OpenendedResponses.react';
import Viewsurvey from 'components/customsurvey/Viewsurvey.react';
import CreateCustomSurvey from 'components/customsurvey/CreateCustomSurvey.react';


const routes = (
    <Route>
        <Route name="appadmin" path="/admin" handler={Admin} >
            <Route name="admin" handler={Adminlogin} />
            <Route name="/admin/login" handler={Adminlogin} />
            <Route name="/admin/logout" handler={Adminlogout} />
            <Route name="/admin/languages" handler={Languages} />
            <Route name="/admin/pages" handler={Pages} />
            <Route name="/admin/dashboard" handler={Dashboard} />
            <Route name="/admin/engagementarea" handler={Engagementarea} />
            <Route name="/admin/industry" handler={Industry} />
            <Route name="/admin/continents" handler={Continents} />
            <Route name="/admin/countries/:id/:continents" handler={Countries} />
            <Route name="/admin/states/:id/:country" handler={States} />
            <Route name="/admin/cities/:id/:state" handler={City} />
            <Route name="/admin/users" handler={Users} />
            <Route name="/admin/companyadmins" handler={CompanyAdmins} />
            <Route name="/admin/userdetails/:uid" handler={UserDetails} />
            <Route name="/admin/surveystatistics/:uid" handler={SurveyStatistics} />
            <Route name="/admin/teams" handler={AllTeams} />
            <Route name="/admin/teams/:id" handler={AllTeams} />
            <Route name="/admin/rules" handler={Notificationrules} />

            <DefaultRoute handler={Adminlogin} />
            <NotFoundRoute name="404page" handler={NotFound} />
        </Route>
        <Route name="about" path="/about" handler={Appstatic} >
            <Route name="" handler={About} />
        </Route>
        <Route name="anonymity" path="/anonymity" handler={Appstatic} >
            <Route name="" handler={Anonymity} />
        </Route>
        <Route name="terms" path="/terms" handler={Appstatic} >
            <Route name="" handler={Terms} />
        </Route>
        <Route name="policy" path="/policy" handler={Appstatic} >
            <Route name="" handler={Policy} />
        </Route>
        <Route name="survey" path="/survey" handler={Appuser} >
            <Route name="" handler={Survey} />
        </Route>
        <Route name="moodrate" path="/moodrate" handler={Appmobile} >
            <Route name="" handler={MobileMoodrate} />
        </Route>
        <Route name="invitepeople" path="/invitepeople" handler={Appmobile} >
            <Route name="" handler={MobileInvite} />
        </Route>
        <Route name="openendedsurvey" path="/openendedsurvey" handler={Appuser} >
            <Route name="" handler={OpenEndedQuestions} />
        </Route>
        <Route name="openendedresponses" path="/openendedresponses" handler={Appuser} >
            <Route name="" handler={OpenendedResponses} />
        </Route>
        <Route name="myprofile" path="/myprofile" handler={Appuser} >
            <Route name="" handler={MyProfile} />
        </Route>
        <Route name="myteam" path="/myteam" handler={Appuser} >
            <Route name="" handler={MyTeam} />
        </Route>
        <Route name="surveyforms" path="/surveyforms" handler={Appuser} >
            <Route name="" handler={Surveyforms} />
        </Route>
        <Route name="takesurvey/:key" path="/takesurvey/:key" handler={Appuser} >
            <Route name="" handler={Takesurvey} />
        </Route>
        <Route name="surveyresponses/:key" path="/surveyresponses/:key" handler={Appuser} >
            <Route name="" handler={Customsurveyresponses} />
        </Route>
        <Route name="viewsurvey" path="/viewsurvey" handler={Appuser} >
            <Route name="" handler={Viewsurvey} />
        </Route>
        <Route name="customsurvey" path="/customsurvey" handler={Appuser} >
            <Route name="" handler={CreateCustomSurvey} />
        </Route>
        <Route name="mymoodtest" path="/mymoodtest" handler={Appuser} >
            <Route name="" handler={MyMoodtest} />
        </Route>
        <Route name="mymood" path="/mymood" handler={Appuser} >
            <Route name="" handler={MyMood} />
        </Route>
        <Route name="mycompany" path="/mycompany" handler={Appuser} >
            <Route name="" handler={MyCompany} />
        </Route>
        <Route name="employeeofthemonth" path="/employeeofthemonth" handler={Appuser} >
            <Route name="" handler={EmployeeOfTheMonth} />
        </Route>
        <Route name="viewvotes" path="/viewvotes" handler={Appuser} >
            <Route name="" handler={ChooseEOTM} />
        </Route>
        <Route name="publicprofile" path="/publicprofile" handler={Appuser} >
            <Route name="/publicprofile/:hash" handler={PublicProfile} />
        </Route>
        <Route name="apphome" path="/" handler={Apphome} >
            <Route name="index" handler={Index} />
        </Route>
        // No layout for login
        <Route name="login" path="/login" handler={Login} >
        </Route>
        <Route name="signup" path="/signup" handler={SignupPage} >
        </Route>
        <Route name="invitesignup/:hash" path="/invitesignup/:hash" handler={InviteSignup} >
        </Route>
        <Route name="createpassword/:hash" path="/CreatePassword/:hash" handler={CreatePassword} >
        </Route>
        <Route name="forgotpassword" path="/forgotpassword" handler={ForgotPassword} >
        </Route>
        <Route name="logout" path="/logout" handler={Logout} >
        </Route>
        <Route name="app" path="/" handler={App} >
            <DefaultRoute handler={Index} />
        </Route>
        <NotFoundRoute name="404" handler={NotFound} />
    </Route>
);

export default routes;
