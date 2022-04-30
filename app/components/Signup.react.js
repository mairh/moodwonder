import React from 'react';
import SignupActions from 'actions/SignupActions';
import SignupStore from 'stores/SignupStore';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = SignupStore.getState();
        this.state.canSubmit = false;
        this.validationErrors = {};
    }

    componentDidMount() {
        SignupStore.listen(this._onChange);
    }

    componentWillUnmount() {
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
        this.messageAutoClose(state);
    }

    formSubmit = (e) => { e.preventDefault(); }

    _onSignupStep1Submit = (e) => {
        let email = React.findDOMNode(this.refs.email).value.trim();
        let hash  = React.findDOMNode(this.refs.hash).value.trim();
        if(email === ''){
            this.setState({
                messages: ['Email Required']
            });
        }else if(this.isValidEmailAddress(email)){
            SignupActions.usersignupstep1({ email: email, hash: hash });
        }else{
            this.setState({
                messages: ['Invalid email']
            });
        }
        e.preventDefault();
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

    _onEmailChange = (e) => {
        const email = React.findDOMNode(this.refs.email).value.trim();
        if (!this.isValidEmailAddress(email)) {
            this.setState({
                notificationReact: {
                    ...this.state.notificationReact,
                    isActive: true
                }
            });
        }
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

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
        React.findDOMNode(this.refs.email).value = '';
    }

    render() {
        let message;
        let multimessages;
        let hash; // for invitation

        try{
            hash = this.props.params.hash;
        }catch(e){}

        if (this.state.messages !== undefined && this.state.messages.length > 0) {
            multimessages = this.state.messages.map((mes, key) => {
                return [<li>{mes}</li>];
            });
            multimessages = (
                <div className="ui error message segment m">
                    <ul className="list">
                        {multimessages}
                    </ul>
                </div>
            );
        }

        if (this.state.hasErrorMessage && this.state.message !== '') {
            message = (
                <div className="ui error message segment s">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        if (this.state.isRegistered && this.state.message !== '') {
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
            <form className="six wide column"  onSubmit={this._onSignupStep1Submit} method="post" >
                <div className="ui segment">
                    <div className="ui input">
                        <input ref="email" id="email" name="email" placeholder="HOM_SGN_WORK_EMAIL" type="text" />
                        <input ref="hash" name="hash" type="hidden" value={hash} />
                    </div>
                    <button type="submit" className="ui orange button" > <span className="pulse">HOM_GET_STARTED</span></button>
                    {message}
                    {multimessages}
                </div>
                <h4 className="ui yellow header center aligned">HOM_NO_CREDIT_CARD</h4>
            </form>
        );
    }
}
