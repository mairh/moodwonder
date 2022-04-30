import React from 'react';
import Immutable from 'immutable';
import getFormData from 'get-form-data';
import AdminActions from 'actions/AdminActions';
import AdminStore from 'stores/AdminStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';

export default class Adminlogin extends React.Component {

    constructor(props) {
        super(props);
        mixins(Navigation, this);
        this.state = AdminStore.getState();
        this.state = {
            canSubmit: false,
            isAuth: AdminStore.getState().isAuth,
            authFailure: AdminStore.getState().authFailure
        };
        this.validationErrors = {};
    }

    componentDidMount() {
        AdminStore.listen(this._onChange);
    }

    componentWillUnmount() {
        AdminStore.unlisten(this._onChange);
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    }

    _onChange = () => {
        this.setState({
            isAuth: AdminStore.getState().isAuth,
            authFailure: AdminStore.getState().authFailure
        });

        if(this.state.isAuth === "true"){
            this.context.router.transitionTo('/admin/dashboard');
        } else {
            this.context.router.transitionTo('/admin');
        }
    }

    onAdminLogin = (e) => {
        e.preventDefault();
        let form = document.querySelector('#adminLogin');
        let data = getFormData(form, {trim: true});
        let username = data['username'];
        let password = data['password'];
        AdminActions.login({ username: username, password: password });
    }

    render() {
        let renderedResult = '';
        let authFailure = this.state.authFailure;
        let logStatus = '';
        if(authFailure === "true") {
            logStatus = (<div className="ui red message">
            <strong>Error!</strong> Invalid username or password.
            </div>);
        }

        renderedResult = (
            <div className="ui container">
                <div className="ui three column stackable grid container ">
                    <div className="column"></div>
                    <div className="column"><h2>Login here..</h2></div>
                    <div className="column"></div>
                </div>
                <div className="ui three column stackable grid container ">
                    <div className="column"></div>
                    <div className="column">
                        <form id="adminLogin" className="ui form" method="post" >
                            <div className="field">
                                <input type="text" name="username" placeholder="username"/>
                            </div>
                            <div className="field">
                                <input type="password" name="password" placeholder="password"/>
                            </div>
                            <div className="field">
                                {logStatus}
                            </div>
                            <div className="field">
                                <button className="ui blue button" onClick={this.onAdminLogin}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="column"></div>
                </div>
            </div>
        );

        return (
            <div className="ui container">
                {renderedResult}
            </div>
        );

    }
}

Adminlogin.propTypes = { adminuser: React.PropTypes.instanceOf(Immutable.Map) };
Adminlogin.contextTypes = { router: React.PropTypes.func };
