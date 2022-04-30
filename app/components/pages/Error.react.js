import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Error extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            ERR_MESSAGE: '',
            ERR_TEXTBEFORE_LINK: '',
            ERR_REDIRECT_LINK: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'error', language: this.state.language});
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
            ERR_MESSAGE: pagedata.ERR_MESSAGE,
            ERR_TEXTBEFORE_LINK: pagedata.ERR_TEXTBEFORE_LINK,
            ERR_REDIRECT_LINK: pagedata.ERR_REDIRECT_LINK
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitError = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    errMessage = (e) => {
        e.preventDefault();
        this.setState({ ERR_MESSAGE: e.target.value });
    }
    errTextBeforeLink = (e) => {
        e.preventDefault();
        this.setState({ ERR_TEXTBEFORE_LINK: e.target.value });
    }
    errRedirectLink = (e) => {
        e.preventDefault();
        this.setState({ ERR_REDIRECT_LINK: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let ERR_MESSAGE = this.state.ERR_MESSAGE;
        let ERR_TEXTBEFORE_LINK = this.state.ERR_TEXTBEFORE_LINK;
        let ERR_REDIRECT_LINK = this.state.ERR_REDIRECT_LINK;


        return (
            <div className="ui container">
                <h4>Edit - Error page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="errorForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>ERR_MESSAGE</label>
                                <input className="form-control"
                                    name="ERR_MESSAGE"
                                    type="text"
                                    value={ERR_MESSAGE}
                                    onChange={this.errMessage} />
                            </div>
                            <div className="field">
                                <label>ERR_TEXTBEFORE_LINK</label>
                                <input className="form-control"
                                    name="ERR_TEXTBEFORE_LINK"
                                    type="text"
                                    value={ERR_TEXTBEFORE_LINK}
                                    onChange={this.errTextBeforeLink} />
                            </div>
                            <div className="field">
                                <label>ERR_REDIRECT_LINK</label>
                                <input className="form-control"
                                    name="ERR_REDIRECT_LINK"
                                    type="text"
                                    value={ERR_REDIRECT_LINK}
                                    onChange={this.errRedirectLink} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitError}>Submit</button>
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
