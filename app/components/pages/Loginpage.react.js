import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Signuppage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            LGN_BTN_SUBMIT: '',
            LGN_PLACEHOLDER_EMAIL: '',
            LGN_PLACEHOLDER_PASSWORD: '',
            LGN_BTN: '',
            LGN_FORGOT_PSWD: '',
            LGN_SIGNUP: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'login', language: this.state.language});
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
            LGN_PLACEHOLDER_EMAIL: pagedata.LGN_PLACEHOLDER_EMAIL,
            LGN_PLACEHOLDER_PASSWORD: pagedata.LGN_PLACEHOLDER_PASSWORD,
            LGN_BTN: pagedata.LGN_BTN,
            LGN_FORGOT_PSWD: pagedata.LGN_FORGOT_PSWD,
            LGN_SIGNUP: pagedata.LGN_SIGNUP
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitLogin = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    placeholderEmail = (e) => {
        e.preventDefault();
        this.setState({ LGN_PLACEHOLDER_EMAIL: e.target.value });
    }

    placeholderPassword = (e) => {
        e.preventDefault();
        this.setState({ LGN_PLACEHOLDER_PASSWORD: e.target.value });
    }

    loginBtn = (e) => {
        e.preventDefault();
        this.setState({ LGN_BTN: e.target.value });
    }

    forgotPassword = (e) => {
        e.preventDefault();
        this.setState({ LGN_FORGOT_PSWD: e.target.value });
    }

    loginSignup = (e) => {
        e.preventDefault();
        this.setState({ LGN_SIGNUP: e.target.value });
    }


    render() {

        let pagedata = this.state.pagedata;
        let LGN_PLACEHOLDER_EMAIL = this.state.LGN_PLACEHOLDER_EMAIL;
        let LGN_PLACEHOLDER_PASSWORD = this.state.LGN_PLACEHOLDER_PASSWORD;
        let LGN_BTN = this.state.LGN_BTN;
        let LGN_FORGOT_PSWD = this.state.LGN_FORGOT_PSWD;
        let LGN_SIGNUP = this.state.LGN_SIGNUP;


        return (
            <div className="ui container">
                <h4>Edit - Login page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="loginForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />
                            <div className="field">
                                <label>LGN_PLACEHOLDER_EMAIL</label>
                                <input className="form-control"
                                    name="LGN_PLACEHOLDER_EMAIL"
                                    type="text"
                                    value={LGN_PLACEHOLDER_EMAIL}
                                    onChange={this.placeholderEmail} />
                            </div>
                            <div className="field">
                                <label>LGN_PLACEHOLDER_PASSWORD</label>
                                <input className="form-control"
                                    type="text"
                                    name="LGN_PLACEHOLDER_PASSWORD"
                                    value={LGN_PLACEHOLDER_PASSWORD}
                                    onChange={this.placeholderPassword} />
                            </div>
                            <div className="field">
                                <label>LGN_BTN</label>
                                <input className="form-control"
                                    type="text"
                                    name="LGN_BTN"
                                    value={LGN_BTN}
                                    onChange={this.loginBtn} />
                            </div>
                            <div className="field">
                                <label>LGN_FORGOT_PSWD</label>
                                <input className="form-control"
                                    type="text"
                                    name="LGN_FORGOT_PSWD"
                                    value={LGN_FORGOT_PSWD}
                                    onChange={this.forgotPassword} />
                            </div>
                            <div className="field">
                                <label>LGN_SIGNUP</label>
                                <input className="form-control"
                                    type="text"
                                    name="LGN_SIGNUP"
                                    value={LGN_SIGNUP}
                                    onChange={this.loginSignup} />
                            </div>
                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitLogin}>Submit</button>
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
