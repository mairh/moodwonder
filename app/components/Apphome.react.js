import React from 'react';
import Homeheader from 'components/mainhome/Homeheader.react';
import Homecontent from 'components/mainhome/Homecontent.react';
import Homefooter from 'components/mainhome/Homefooter.react';
import GoogleAnalytics from "components/analytics/GoogleAnalytics.react";

export default class Apphome extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className="home">
                <Homeheader />,
                <Homecontent />,
                <Homefooter />,
                <GoogleAnalytics id="UA-40351687-1" />
            </div>
        );
    }
}

Apphome.contextTypes = { router: React.PropTypes.func };
