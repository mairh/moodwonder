import React from 'react';
import { RouteHandler } from 'react-router';
import AppStore from 'stores/AppStore';
import Navigation from 'components/Navigation.react';
import SidebarMenu from 'components/SidebarMenu.react';
import GoogleAnalytics from "components/analytics/GoogleAnalytics.react";

export default class Appmobile extends React.Component {

    constructor (props) {
        super(props);
        this.state = AppStore.getState();
        this.noAccess = false;
    }

    componentDidMount () {
        // Redirect to landing page, if no access
        setTimeout(function(){
            if(this.noAccess){
                window.location.assign('/');
            }
        }.bind(this),3000);
    }

    render() {

        let handler      = (<RouteHandler />);
        let noPermission = (<div>You do not have sufficient permissions to access this page.</div>);

        if(!(this.state.isAuthenticated)){
            handler = noPermission;
            this.noAccess = true;
        }

        let sitecontent = [
            <Navigation />,
            <SidebarMenu />,
            <div className="pusher">
                <div className="ui inverted vertical masthead center aligned "></div>
                <div className="ui segment  width padding-top-110">
                    <div className="ui main">
                        {handler}
                    </div>
                </div>
            </div>,
            <GoogleAnalytics id="UA-40351687-1" />
        ];

        return (
            <span>{sitecontent}</span>
        );
    }
}

Appmobile.contextTypes = { router: React.PropTypes.func };
