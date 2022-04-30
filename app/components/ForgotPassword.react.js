import React from 'react';
import SignupActions from 'actions/SignupActions';
import SignupStore from 'stores/SignupStore';

export default class Signup extends React.Component {

    constructor (props) {
        super(props);
        this.state = SignupStore.getState();
        this.state.canSubmit = false;
        this.validationErrors = {};
    }

    componentDidMount () {
        SignupStore.listen(this._onChange);
    }

    componentWillUnmount () {
        SignupStore.unlisten(this._onChange);
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    }

    _onChange = (state) => {
        this.setState(state);
    }

    formSubmit = (e) => { e.preventDefault(); }

    _onSignupStep1Submit = () => {
        let email = React.findDOMNode(this.refs.email).value.trim();
        if (!this.isValidEmailAddress(email)) {
            this.setState({
                message: 'Invalid email',
                hasErrorMessage: true
            });
        }else{
            SignupActions.usersignupstep1({
                email: email,
                type: 'forgotpassword'
            });
        }
    }

    showNotification = (message) => {
        this.setState({
            notificationReact: {
                ...this.state.notificationReact,
                isActive: true,
                message: message
            }
        });
    }

    isValidEmailAddress = (emailAddress) => {
        let pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    handleNotificationClick = (notification) => {
        if (notification === 'email') {
            this.setState({
                notificationReact: {
                    ...this.state.notificationReact,
                    isActive: false
                }
            });
        }
    }

    render () {
        let message;
        let multimessages;

        if (this.state.messages !== undefined && this.state.messages.length > 0) {
            multimessages = this.state.messages.map((mes, key) => {
                return [<li>{mes}</li>];
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
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        if (this.state.isRegistered) {
            message = (
                <div className="ui success message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
            document.getElementById('email').value = '';
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
                    <h2 className="ui header"> FORGOTPASS_TITLE </h2>
                    <h2 className="ui  image header"> <a href="/" ><img src="../assets/images/logo.png" className="image"/></a> </h2>
                    <div className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <input type="email" ref="email" id="email" placeholder=" FORGOTPASS_PLACEHOLDER_PASSWORD " />
                                </div>
                            </div>
                            <button className="ui yellow button" onClick={this._onSignupStep1Submit}> FORGOTPASS_BTN_CREATE </button>
                        </div>
                        {message}
                        {multimessages}
                    </div>
                </div>
            </div>
        );
    }
}

Signup.propTypes = { user: {} };
