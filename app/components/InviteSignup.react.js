import React from 'react';
import SignupStore from 'stores/SignupStore';

export default class InviteSignup extends React.Component {

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
    }

    render() {
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
                    <h2 className="ui  image header"> <a href="/" ><img src="../assets/images/logo.png" className="image"/></a> </h2>
                    <form className="ui large form">
                        {message}
                        {multimessages}
                    </form>
                </div>
            </div>
        );
    }
}

InviteSignup.propTypes = { user: {} };
