import React from 'react';
import InviteActions from 'actions/InviteActions';
import InviteStore from 'stores/InviteStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

/*
* Component for Invite Others Widget
*
*/
export default class InviteOthers extends React.Component {

    // Do same feature changes in MobileInvite component
    constructor(props) {
        super(props);
        this.state = InviteStore.getState();
        this.state.canSubmit = false;
        this.state.mwkeys = MlangStore.getState().mwkeys;
        this.validationErrors = {};
    }

    componentDidMount() {
        InviteStore.listen(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
    }

    isValidEmailAddress = (emailAddress) => {
        let pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    _onSaveSubmit = (e) => {
        let email = React.findDOMNode(this.refs.email).value.trim();
        if (this.isValidEmailAddress(email)) {
            let obj = {
                invitetype: 'Signup',
                email: email
            };
            InviteActions.invitePeopleAnonymously(obj);
        }else{
            this.setState({ message: 'Invalid email address', hasError: true });
        }
        e.preventDefault();
    }

    render() {
        let message;
        let mlarray = this.state.mwkeys;

        if (this.state.message !== '' ) {
            console.log(this.state.message);
            message = (
                <div className={ (this.state.hasError) ? 'ui error message segment' : 'ui success message segment' }>
                    <ul className="list"><li>{this.state.message}</li></ul>
                </div>
            );

            if(!this.state.hasError) {
                document.getElementById('email').value = '';
            }
        }
        return (
            <form className="invite-people" onSubmit={this._onSaveSubmit} >
                <h2>{GetText('L_INVITE_PEOPLE_TITLE', mlarray)}</h2>
                <p>{GetText('L_INVITE_PEOPLE_DES', mlarray)}</p>
                <div className="ui input">
                    <input placeholder={GetText('L_INVITE_INPUT_PLCHOLDER', mlarray)} id="email" ref="email" type="text" />
                </div>
                <button type="submit" className="ui orange button">{GetText('L_INVITE_BTN', mlarray)}</button>
                {message}
            </form>
        );
    }
}
