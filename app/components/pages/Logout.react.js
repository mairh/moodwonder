import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            LOUT_MESSAGE: '',
            LOUT_TEXTBEFORE_LOGIN: '',
            LOUT_LOGIN: '',
            LOUT_TEXTAFTER_LOGIN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'logout', language: this.state.language});
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
            LOUT_MESSAGE: pagedata.LOUT_MESSAGE,
            LOUT_TEXTBEFORE_LOGIN: pagedata.LOUT_TEXTBEFORE_LOGIN,
            LOUT_LOGIN: pagedata.LOUT_LOGIN,
            LOUT_TEXTAFTER_LOGIN: pagedata.LOUT_TEXTAFTER_LOGIN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitLogout = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeMessage = (e) => {
        e.preventDefault();
        this.setState({ LOUT_MESSAGE: e.target.value });
    }

    onChangeTextBefore = (e) => {
        e.preventDefault();
        this.setState({ LOUT_TEXTBEFORE_LOGIN: e.target.value });
    }

    onChangeLogin = (e) => {
        e.preventDefault();
        this.setState({ LOUT_LOGIN: e.target.value });
    }

    onChangeTextAfter = (e) => {
        e.preventDefault();
        this.setState({ LOUT_TEXTAFTER_LOGIN: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let LOUT_MESSAGE = this.state.LOUT_MESSAGE;
        let LOUT_TEXTBEFORE_LOGIN = this.state.LOUT_TEXTBEFORE_LOGIN;
        let LOUT_LOGIN = this.state.LOUT_LOGIN;
        let LOUT_TEXTAFTER_LOGIN = this.state.LOUT_TEXTAFTER_LOGIN;


        return (
            <div className="ui container">
                <h4>Edit - Logout page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="logoutForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>LOUT_MESSAGE</label>
                                <input className="form-control"
                                    name="LOUT_MESSAGE"
                                    type="text"
                                    value={LOUT_MESSAGE}
                                    onChange={this.onChangeMessage} />
                            </div>

                            <div className="field">
                                <label>LOUT_TEXTBEFORE_LOGIN</label>
                                <input className="form-control"
                                    type="text"
                                    name="LOUT_TEXTBEFORE_LOGIN"
                                    value={LOUT_TEXTBEFORE_LOGIN}
                                    onChange={this.onChangeTextBefore} />
                            </div>

                            <div className="field">
                                <label>LOUT_LOGIN</label>
                                <input className="form-control"
                                    type="text"
                                    name="LOUT_LOGIN"
                                    value={LOUT_LOGIN}
                                    onChange={this.onChangeLogin} />
                            </div>

                            <div className="field">
                                <label>LOUT_TEXTAFTER_LOGIN</label>
                                <input className="form-control"
                                    type="text"
                                    name="LOUT_TEXTAFTER_LOGIN"
                                    value={LOUT_TEXTAFTER_LOGIN}
                                    onChange={this.onChangeTextAfter} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitLogout}>Submit</button>
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
