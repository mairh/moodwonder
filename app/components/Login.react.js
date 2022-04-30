import React from 'react';
import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        // No need of mixins in ES6 pattern
        this.state = UserStore.getState();
        this.state.canSubmit = false;
        this.validationErrors = {};
        this.state.loginBtn = true;
    }

    componentDidMount() {
        UserStore.listen(this._onChange);
        this.setState({loginBtn: false});
    }

    componentWillUnmount() {
        UserStore.unlisten(this._onChange);
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    }

    _onChange = (state) => {
        this.setState(state);
        if(this.state.isLoggedIn){
            let hashkey = this.getCookie('takesurvey');
            this.deleteCookie('takesurvey');
            if(hashkey) {
                window.location.assign('/takesurvey/' + hashkey);
            } else {
                window.location.assign('/mymood');
            }
        }
    }

    deleteCookie = (name) => {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    getCookie = (cname) => {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for(let i=0; i<ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
        }
        return "";
    }

    _onLoginSubmit = (e) => {
        let email = React.findDOMNode(this.refs.email).value.trim();
        let password = React.findDOMNode(this.refs.password).value.trim();

        UserActions.manuallogin({
            email: email,
            password: password
        });
        e.preventDefault();
    }

    render() {
        let message;
        let multimessages;
        if (this.state.messages !== undefined && this.state.messages.length > 0) {
            multimessages = this.state.messages.map((mes, key) => {
                return [
                    <li>
                        {mes}
                    </li>
                ];
            });
            multimessages = (
                <div className="ui error message segment">
                    <ul className="list">
                        {multimessages}
                    </ul>
                </div>
            );
        }

        if (this.state.hasErrorMessage && this.state.message) {
            message = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>
                            {this.state.message}
                        </li>
                    </ul>
                </div>
            );
        }

        if (this.state.isRegistered) {
            message = (
                <div className="ui success message segment">
                    <ul className="list">
                        <li>
                            {this.state.message}
                        </li>
                    </ul>
                </div>
            );
        }else {
            if (this.state.isSignupWaiting) {
                message = (
                    <div className="ui success message segment">
                        <ul className="list">
                            <li>Processing...</li>
                        </ul>
                    </div>
                );
            }
        }

        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui  image header">
                        <a href="/" >
                            <img
                                src="assets/images/logo.png"
                                className="image"/>
                        </a>
                    </h2>
                    <div className="ui large form">
                        <form
                            className="ui stacked segment"
                            onSubmit={this._onLoginSubmit}
                            method="post" >
                            <div className="field">
                                <div className="ui left icon input">
                                    <input
                                        type="text"
                                        ref="email"
                                        name="email"
                                        placeholder="LGN_PLACEHOLDER_EMAIL" />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <input
                                        type="password"
                                        ref="password"
                                        name="password"
                                        placeholder="LGN_PLACEHOLDER_PASSWORD" />
                                    <input
                                        type="hidden"
                                        name="javascript_status"
                                        value="not loaded" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="ui yellow button"
                                disabled={this.state.loginBtn} >LGN_BTN</button>
                            {message}
                            {multimessages}
                        </form>
                    </div>
                    <div className="ui message ">
                        <a href="/forgotpassword" className="frgt">
                            LGN_FORGOT_PSWD ?
                        </a>
                        <a href="/signup">LGN_SIGNUP</a>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
Login.contextTypes = { router: React.PropTypes.func };
