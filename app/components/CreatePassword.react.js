import React from 'react';
import CreatePswdActions from 'actions/CreatePswdActions';
import CreatePswdStore from 'stores/CreatePswdStore';

export default class CreatePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = CreatePswdStore.getState();
        this.state.notificationReact = {
            message: 'Invalid password!',
            action: 'X',
            isActive: false,
            dismissAfter: 5000,
            position: 'tr',
            style: {
                bar: {
                    bottom: '82%',
                    backgroundColor: 'rgb(97, 172, 234)'
                },
                action: {
                    color: 'rgb(20, 27, 32)'
                }
            }
        };
    }

    componentDidMount() {
        CreatePswdStore.listen(this._onChange);
    }

    componentWillUnmount() {
        CreatePswdStore.unlisten(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
        if(this.state.hasError){
            this.showNotification(this.state.message);
        }
        if(this.state.responseStatus){
            window.location.assign('/mymood');
        }
    }

    formSubmit = (e) => { e.preventDefault(); }

    showNotification = (message) => {
        this.setState({
            notificationReact: {
                ...this.state.notificationReact,
                isActive: true,
                message: message
            }
        });
    }

    _onSignupStep2Submit = () => {
        let password = React.findDOMNode(this.refs.password).value.trim();
        let hash = React.findDOMNode(this.refs.hash).value.trim();
        if (password === '') {
            this.setState({
                message: 'Password field cannot be empty',
                hasErrorMessage: true
            });
            this.showNotification('Password field cannot be empty');
        }else if(password.length <= 6){
            this.setState({
                message: 'Password should have at least 7 characters',
                hasErrorMessage: true
            });
            this.showNotification('Password should have at least 7 characters');
        }else{
            CreatePswdActions.usersignupstep2({
                password: password,
                hash: hash
            });
        }
    }

    handleNotificationClick = (notification) => {
        if (notification === 'password') {
            this.setState({
                notificationReact: {
                    ...this.state.notificationReact,
                    isActive: false
                }
            });
        }
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

        if (this.state.hasError && this.state.message) {
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
        let pswdForm = null;
        if(!this.state.noPswdForm){
            pswdForm = (
                <div className="ui stacked segment">
                    <div className="field">
                        <div className="ui left icon input">
                            <input type="password" ref="password" id="password" placeholder=" CREATEPASS_PLACEHOLDER_PASSWORD " />
                            <input type="hidden" ref="hash" value={hash} />
                        </div>
                    </div>
                    <button className="ui yellow button" onClick={this._onSignupStep2Submit}> CREATEPASS_BTN_CREATE </button>
                </div>
            );
        }

        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui header"> CREATEPASS_TITLE </h2>
                    <h2 className="ui  image header"> <a href="/" ><img src="../assets/images/logo.png" className="image"/></a> </h2>
                    <div className="ui large form">
                        {pswdForm}
                        {message}
                        {multimessages}
                    </div>
                </div>
            </div>
        );
    }
}
