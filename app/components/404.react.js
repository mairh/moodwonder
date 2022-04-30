import React from 'react';
// import Immutable from 'immutable';

export default class List extends React.Component {

    constructor(props) {
        super(props);
    }

    _onLogoClick = () => {
        window.location.assign('/');
    }

    render() {

        return (
            <div className="error-page">
                <div className="ui container" style={{ "height": "100%", "display": "table"}}>
                    <div className="mesg" style={{ "width": "30%", "margin": "0px auto"}}>
                        <div className="">
                            <h2 className=""> <img src="/assets/images/logo.png" style={{ "width": "50%", "cursor":"pointer"}} onClick={this._onLogoClick}/> </h2>
                            <div className="">
                                <div className="">
                                    <div className="">
                                        <h1>404</h1>
                                    </div>
                                    <div className="">
                                        <h3>ERR_MESSAGE</h3>
                                    </div>
                                    <div className="">
                                        ERR_TEXTBEFORE_LINK <a href="/" style={{"color": "#555459"}}>ERR_REDIRECT_LINK</a>?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
