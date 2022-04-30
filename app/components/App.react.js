import React from 'react';
import { RouteHandler } from 'react-router';
import Navigation from 'components/Navigation.react';
import Footer from 'components/Footer.react';
import AppStore from 'stores/AppStore';
import GoogleAnalytics from "components/analytics/GoogleAnalytics.react";

export default class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = AppStore.getState();
        this.noAccess = false;
    }

    componentDidMount () {
        AppStore.listen(this._onChange);
        // Redirect to landing page, if no access
        setTimeout(function(){
            if(this.noAccess){
                window.location.assign('/');
            }
        }.bind(this),3000);
    }

    componentWillUnmount () {
        AppStore.unlisten(this._onChange);
    }

    _onChange = () => {
    }

    render() {

        let handler      = (<RouteHandler />);
        let noPermission = (
            <div>
                <p> You do not have sufficient permissions to access this page. </p>
                <p> Please login to continue <a href="/login">Login</a> </p>
            </div>
        );
        let path = this.context.router.getCurrentPathname();

        // user only pages
        let pages = ["/","/survey","/login","/logout","/forgotpassword","/invitesignup","/createpassword","/admin","/test1","/allemployees"];

        let condition1 = (path.indexOf("/invitesignup") === -1 && pages.indexOf(path) === -1);
        let condition2 = (path.indexOf("/createpassword") === -1 && pages.indexOf(path) === -1);
        if(condition1 && condition2){
            if(!(this.state.isAuthenticated)){
                handler = noPermission;
                this.noAccess = true;
            }
        }
        // admin and manager only pages
        pages = ["/surveyforms","/myteam","/customsurvey"];
        if( pages.indexOf(path) >= 0){
            if( (!this.state.isAuthenticated) || this.state.userType !== 'manager' ){
                handler = noPermission;
                this.noAccess = true;
            }
        }
        // admin only pages
        pages = ["/surveyforms"];
        if( pages.indexOf(path) >= 0){
            if( (!this.state.isAuthenticated) || this.state.company_admin){
                handler = noPermission;
                this.noAccess = true;
            }
        }

        return (
            <div>
                <Navigation />
                {handler}
                <br/><br/>
                <Footer />
                <GoogleAnalytics id="UA-40351687-1" />
            </div>
        );
    }
}
// https://github.com/rackt/react-router/issues/975#issuecomment-84598815
// No need of mixins in es6
App.contextTypes = { router: React.PropTypes.func };
