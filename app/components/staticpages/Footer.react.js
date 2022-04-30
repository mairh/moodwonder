import React from 'react';

export default class Footer extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {

        return (
            <footer>
                <div className="ui  vertical footer segment">
                    <div className="ui container">
                        <div className="footer-left">
                            <a href="/about">ABT_LINK_ABOUT </a> |
                            <a href="/anonymity">ABT_LINK_ANONYMITY </a> |
                            <a href="/terms"> ABT_LINK_TERMS</a> |
                            <a href="/policy"> ABT_LINK_POLICY</a> |
                            <a href="/#contact"> ABT_LINK_CONTACT </a>
                        </div>
                        <a href="#"> © Moodwonder 2016 </a>
                    </div>
                </div>
            </footer>
        );
    }

}
