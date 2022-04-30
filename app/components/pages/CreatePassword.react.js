import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class CreatePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            CREATEPASS_TITLE: '',
            CREATEPASS_PLACEHOLDER_PASSWORD: '',
            CREATEPASS_BTN_CREATE: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'createpassword', language: this.state.language});
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
            CREATEPASS_TITLE: pagedata.CREATEPASS_TITLE,
            CREATEPASS_PLACEHOLDER_PASSWORD: pagedata.CREATEPASS_PLACEHOLDER_PASSWORD,
            CREATEPASS_BTN_CREATE: pagedata.CREATEPASS_BTN_CREATE
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitCreatePassword = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    createPassTitle = (e) => {
        e.preventDefault();
        this.setState({ CREATEPASS_TITLE: e.target.value });
    }
    createPassPlaceholder = (e) => {
        e.preventDefault();
        this.setState({ CREATEPASS_PLACEHOLDER_PASSWORD: e.target.value });
    }
    createPassBtn = (e) => {
        e.preventDefault();
        this.setState({ CREATEPASS_BTN_CREATE: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let CREATEPASS_TITLE = this.state.CREATEPASS_TITLE;
        let CREATEPASS_PLACEHOLDER_PASSWORD = this.state.CREATEPASS_PLACEHOLDER_PASSWORD;
        let CREATEPASS_BTN_CREATE = this.state.CREATEPASS_BTN_CREATE;


        return (
            <div className="ui container">
                <h4>Edit - Create password page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="createPasswordForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>CREATEPASS_TITLE</label>
                                <input className="form-control"
                                    name="CREATEPASS_TITLE"
                                    type="text"
                                    value={CREATEPASS_TITLE}
                                    onChange={this.createPassTitle} />
                            </div>
                            <div className="field">
                                <label>CREATEPASS_PLACEHOLDER_PASSWORD</label>
                                <input className="form-control"
                                    name="CREATEPASS_PLACEHOLDER_PASSWORD"
                                    type="text"
                                    value={CREATEPASS_PLACEHOLDER_PASSWORD}
                                    onChange={this.createPassPlaceholder} />
                            </div>
                            <div className="field">
                                <label>CREATEPASS_BTN_CREATE</label>
                                <input className="form-control"
                                    name="CREATEPASS_BTN_CREATE"
                                    type="text"
                                    value={CREATEPASS_BTN_CREATE}
                                    onChange={this.createPassBtn} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitCreatePassword}>Submit</button>
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
