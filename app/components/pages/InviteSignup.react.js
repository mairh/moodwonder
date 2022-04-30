import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class InviteSignup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            INVITESIGNUP_TITLE: '',
            INVITESIGNUP_PLACEHOLDER_EMAIL: '',
            INVITESIGNUP_BTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'invitesignup', language: this.state.language});
    }

    componentWillUnmount() {
        PageStore.unlisten(this._onChange);
    }

    _onChange = () => {
        this.setState({
            pagedata: PageStore.getState().pagedata
        });

        let pagedata = this.state.pagedata;
        this.setState({
            INVITESIGNUP_TITLE: pagedata.INVITESIGNUP_TITLE,
            INVITESIGNUP_PLACEHOLDER_EMAIL: pagedata.INVITESIGNUP_PLACEHOLDER_EMAIL,
            INVITESIGNUP_BTN: pagedata.INVITESIGNUP_BTN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitInviteSignup = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    inviteSignupTitle = (e) => {
        e.preventDefault();
        this.setState({ INVITESIGNUP_TITLE: e.target.value });
    }
    inviteSignupPlaceholder = (e) => {
        e.preventDefault();
        this.setState({ INVITESIGNUP_PLACEHOLDER_EMAIL: e.target.value });
    }
    inviteSignupBtn = (e) => {
        e.preventDefault();
        this.setState({ INVITESIGNUP_BTN: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let INVITESIGNUP_TITLE = this.state.INVITESIGNUP_TITLE;
        let INVITESIGNUP_PLACEHOLDER_EMAIL = this.state.INVITESIGNUP_PLACEHOLDER_EMAIL;
        let INVITESIGNUP_BTN = this.state.INVITESIGNUP_BTN;


        return (
            <div className="ui container">
                <h4>Edit - Invite signup page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="inviteSignupForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>INVITESIGNUP_TITLE</label>
                                <input className="form-control"
                                    name="INVITESIGNUP_TITLE"
                                    type="text"
                                    value={INVITESIGNUP_TITLE}
                                    onChange={this.inviteSignupTitle} />
                            </div>
                            <div className="field">
                                <label>INVITESIGNUP_PLACEHOLDER_EMAIL</label>
                                <input className="form-control"
                                    name="INVITESIGNUP_PLACEHOLDER_EMAIL"
                                    type="text"
                                    value={INVITESIGNUP_PLACEHOLDER_EMAIL}
                                    onChange={this.inviteSignupPlaceholder} />
                            </div>
                            <div className="field">
                                <label>INVITESIGNUP_BTN</label>
                                <input className="form-control"
                                    name="INVITESIGNUP_BTN"
                                    type="text"
                                    value={INVITESIGNUP_BTN}
                                    onChange={this.inviteSignupBtn} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitInviteSignup}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>
            </div>
        );
    }

}
