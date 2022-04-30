import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class MyManager extends React.Component {

    constructor (props) {
        super(props);
        mixins(Navigation, this);
        this.state = UserStore.getState();
        this.state.multilang = MlangStore.getState().multilang;
        this.state.canSubmit = false;
        this.state.mymanager = '';
        this.validationErrors = {};
    }

    componentDidMount () {
        UserActions.getuserinfo();
        UserStore.listen(this._onChange);
    }

    componentWillUnmount () {
        UserStore.unlisten(this._onChange);
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    }

    _onChange = (state) => {
        state.mymanager = this.state.userDetails.mymanager;
        this.setState(state);
        if(state.updateType && state.updateType === "managerinfo"){
            React.findDOMNode(this.refs.email).value = "";
        }
        this.messageAutoClose(state);
    }

    _clearTextBox = () => {
        React.findDOMNode(this.refs.email).value = '';
    }

    _onSaveSubmit = (model) => {
        let email = React.findDOMNode(this.refs.email).value.trim();
        let data  = { type: 'savemanager', email: email };
        if(this.isValidEmailAddress(email)){
            UserActions.saveManagerInfo(data);
        }else{
            this.setState({
                message: 'Invalid email',
                updateType : 'managerinfo'
            });
        }
    }

    isValidEmailAddress = (emailAddress) => {
        let pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    changeValue = (event) => {
        let mymanager = { mymanager: event.target.value };
        this.setState(mymanager);
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    render() {

        let renderedResult;

        let message;

        let userInfo = this.state.userDetails;

        let mlarray = this.state.multilang;

        if ( this.state.updateType === 'managerinfo' && this.state.message !== '' ) {
            message = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        renderedResult = (
            <div className="ten wide column">
                <div className="ui segment">
                    <h4 className="ui header ryt">{GetText('PRFL_MNGR_MYMANAGER', mlarray)}</h4>
                    {message}
                    <div className="ui small form">
                        <h3 className="ui dividing header">{GetText('PRFL_MNGR_TOP_MSG', mlarray)}</h3>

                        <div className=" field">
                            <div className="field ui two column stackable grid container">
                                <label className="column"><i className="privacy icon large"></i>{GetText('PRFL_MNGR_ROL', mlarray)}</label>
                                <label className="column"> Manager </label>
                            </div>
                            <div className="field ui two column stackable grid container">
                                <label className="column"><i className="mail icon large"></i>{GetText('PRFL_MNGR_EMAIL', mlarray)}</label>
                                <label className="column"> {userInfo.mymanager} </label>
                            </div>
                            <div className="field ui two column stackable grid container">
                                <label className="column"><i className="user icon large"></i>{GetText('PRFL_MNGR_CHNG_MNGR', mlarray)}</label>
                                <label className="column"> <input placeholder="Work Email" ref="email" type="email" onChange={this.changeValue} /></label>
                            </div>
                            <div onClick={this._onSaveSubmit} className="ui submit button submitt">{GetText('PRFL_MNGR_SUBMIT', mlarray)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="login">
                {renderedResult}
            </div>
        );

    }
}

MyManager.contextTypes = { router: React.PropTypes.func };
