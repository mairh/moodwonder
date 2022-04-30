import React from 'react';
import { RouteHandler } from 'react-router';
import Followingmenu from 'components/staticpages/Followingmenu.react';
import Sidebarmenu from 'components/staticpages/Siderbarmenu.react';
import Footer from 'components/staticpages/Footer.react';
import GoogleAnalytics from "components/analytics/GoogleAnalytics.react";

export default class Appstatic extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
        let sitecontent = [
            <div className="ui large top fixed hidden menu">
                <Followingmenu />
            </div>,
            <Sidebarmenu />,
            <RouteHandler />,
            <Footer/>,
            <GoogleAnalytics id="UA-40351687-1" />
        ];

        return (
            <div>{sitecontent}</div>
        );
    }
}

Appstatic.contextTypes = { router: React.PropTypes.func };
