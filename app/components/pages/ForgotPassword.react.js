import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            FORGOTPASS_TITLE: '',
            FORGOTPASS_PLACEHOLDER_PASSWORD: '',
            FORGOTPASS_BTN_CREATE: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'forgotpassword', language: this.state.language});
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
            FORGOTPASS_TITLE: pagedata.FORGOTPASS_TITLE,
            FORGOTPASS_PLACEHOLDER_PASSWORD: pagedata.FORGOTPASS_PLACEHOLDER_PASSWORD,
            FORGOTPASS_BTN_CREATE: pagedata.FORGOTPASS_BTN_CREATE
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitForgotPassword = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    forgotPassTitle = (e) => {
        e.preventDefault();
        this.setState({ FORGOTPASS_TITLE: e.target.value });
    }
    forgotPassPlaceholder = (e) => {
        e.preventDefault();
        this.setState({ FORGOTPASS_PLACEHOLDER_PASSWORD: e.target.value });
    }
    forgotPassBtn = (e) => {
        e.preventDefault();
        this.setState({ FORGOTPASS_BTN_CREATE: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let FORGOTPASS_TITLE = this.state.FORGOTPASS_TITLE;
        let FORGOTPASS_PLACEHOLDER_PASSWORD = this.state.FORGOTPASS_PLACEHOLDER_PASSWORD;
        let FORGOTPASS_BTN_CREATE = this.state.FORGOTPASS_BTN_CREATE;


        return (
            <div className="ui container">
                <h4>Edit - Forgot password page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="forgotPasswordForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>FORGOTPASS_TITLE</label>
                                <input className="form-control"
                                    name="FORGOTPASS_TITLE"
                                    type="text"
                                    value={FORGOTPASS_TITLE}
                                    onChange={this.forgotPassTitle} />
                            </div>
                            <div className="field">
                                <label>FORGOTPASS_PLACEHOLDER_PASSWORD</label>
                                <input className="form-control"
                                    name="FORGOTPASS_PLACEHOLDER_PASSWORD"
                                    type="text"
                                    value={FORGOTPASS_PLACEHOLDER_PASSWORD}
                                    onChange={this.forgotPassPlaceholder} />
                            </div>
                            <div className="field">
                                <label>FORGOTPASS_BTN_CREATE</label>
                                <input className="form-control"
                                    name="FORGOTPASS_BTN_CREATE"
                                    type="text"
                                    value={FORGOTPASS_BTN_CREATE}
                                    onChange={this.forgotPassBtn} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitForgotPassword}>Submit</button>
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
