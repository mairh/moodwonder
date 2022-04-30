import React from 'react';
import { RouteHandler } from 'react-router';
import AppStore from 'stores/AppStore';
import Navigation from 'components/Navigation.react';
import Leftnav from 'components/Leftnav.react';
import Rightnav from 'components/Rightnav.react';
import SidebarMenu from 'components/SidebarMenu.react';
//import GoogleAnalytics from "components/analytics/GoogleAnalytics.react";

export default class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = AppStore.getState();
        this.noAccess = false;
    }

    componentDidMount () {
        let rootNode = React.findDOMNode(this);
        $(rootNode).find('.ui.sidebar').sidebar({
            transition: 'push',
            context: $(rootNode)
        })
        .sidebar('attach events', '.toc.item');

        // Redirect to landing page, if no access
        setTimeout(function(){
            if((this.noAccess === true) && !(this.state.isAuthenticated)) {
                window.location.assign('/login');
            }
        }.bind(this),1500);

        $('.toc').on("click", function() {
            let rootNode = React.findDOMNode(this);
            $(rootNode).find('.ui.sidebar').sidebar({
                //transition: 'slide along',
                transition: 'push',
                context: $(rootNode)
            })
            .sidebar('attach events', '.toc.item');
        });
    }

    render() {
        let handler      = (<RouteHandler />);
        let leftnav;
        let rightnav;
        let pageconter   = 'ui segment  width padding-top-110 ';
        let noPermission = (
            <div>
                <p> You do not have sufficient permissions to access this page. </p>
            </div>
        );
        let path = this.context.router.getCurrentPathname();

        // user only pages
        let pages = ["/","/login","/forgotpassword","/signup","/createpassword","/admin","/test1","/myteam"];
        if( pages.indexOf(path) === -1 ){
            if(!(this.state.isAuthenticated)){
                handler = noPermission;
                this.noAccess = true;
            }
        }
        // admin and manager only pages
        pages = ["/surveyforms","/customsurvey","/surveyresponses","/openendedresponses"];
        if( pages.indexOf(path) >= 0){
            if( (!this.state.isAuthenticated) || this.state.userType !== 'manager' ){
                handler = noPermission;
                this.noAccess = true;
            }
        }

        if (this.state.isAuthenticated) {
            leftnav = (<Leftnav />);
            rightnav = (<Rightnav />);
        }

        //pages = ["/myprofile","/mycompany"];
        pages = ["/myprofile","/employeeofthemonth","/viewvotes"];
        if( pages.indexOf(path) >= 0 ){

            rightnav     = '';
            pageconter   = 'ui segment  width-act padding-top-110 ';
        }else if (path.search('publicprofile') != -1){

            rightnav     = '';
            pageconter   = 'ui segment  width-act padding-top-110 ';
        }

        let sitecontent = [
            <Navigation />,
            <div className="ui vertical inverted sidebar menu" id="sidebar" style={{"zIndex":"1"}}>
                <a href="#" className="slide-side"></a>
                <SidebarMenu />
            </div>,
            <div className="pusher">
                <div className="ui inverted vertical masthead center aligned "></div>
                {leftnav}
                <div className={pageconter}>
                    <div className="ui main">
                        {handler}
                    </div>
                    {rightnav}
                </div>
            </div>
            //<GoogleAnalytics id="UA-40351687-1" />
        ];

        return (
            <span>{sitecontent}</span>
        );
    }
}
// https://github.com/rackt/react-router/issues/975#issuecomment-84598815
// No need of mixins in es6
App.contextTypes = { router: React.PropTypes.func };
