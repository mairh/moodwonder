import React from 'react';

export default class Footer extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav  navbar-center">
                            <li>
                                <span>&copy; copyright : Moodwonder </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
