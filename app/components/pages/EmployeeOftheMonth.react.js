import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class EmployeeOftheMonth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            EOM_TITLE_1: '',
            EOM_SHOW_MORE: '',
            EOM_SEARCH_PLACEHOLDER_1: '',
            EOM_SEARCH_BTN_1: '',
            EOM_VOTE_BTN: '',
            EOM_VOTECOUNT_TEXT: '',
            EOM_VOTE_PERIOD: '',
            EOM_POPUP_TITLE: '',
            EOM_POPUP_COMMENT: '',
            EOM_POPUP_VOTE_BTN: '',
            EOM_POPUP_CLOSE_BTN: '',
            EOM_VOTE_COUNT_MESSAGE: '',
            EOM_VIEWVOTES_TITLE_1: '',
            EOM_VIEWVOTES_SELECT: '',
            EOM_VIEW_VOTES_SELECTED: '',
            EOM_VIEWVOTES_POPUP_TITLE: '',
            EOM_VIEWVOTES_POPUP_MESSAGE: '',
            EOM_VIEWVOTES_POPUP_CLOSEBTN: '',
            EOM_VIEWVOTES_POPUP_PROCEEDBTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'eom', language: this.state.language});
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
            EOM_TITLE_1: pagedata.EOM_TITLE_1,
            EOM_SHOW_MORE: pagedata.EOM_SHOW_MORE,
            EOM_SEARCH_PLACEHOLDER_1: pagedata.EOM_SEARCH_PLACEHOLDER_1,
            EOM_SEARCH_BTN_1: pagedata.EOM_SEARCH_BTN_1,
            EOM_VOTE_BTN: pagedata.EOM_VOTE_BTN,
            EOM_VOTECOUNT_TEXT: pagedata.EOM_VOTECOUNT_TEXT,
            EOM_VOTE_PERIOD: pagedata.EOM_VOTE_PERIOD,
            EOM_POPUP_TITLE: pagedata.EOM_POPUP_TITLE,
            EOM_POPUP_COMMENT: pagedata.EOM_POPUP_COMMENT,
            EOM_POPUP_VOTE_BTN: pagedata.EOM_POPUP_VOTE_BTN,
            EOM_POPUP_CLOSE_BTN: pagedata.EOM_POPUP_CLOSE_BTN,
            EOM_VOTE_COUNT_MESSAGE: pagedata.EOM_VOTE_COUNT_MESSAGE,
            EOM_VIEWVOTES_TITLE_1: pagedata.EOM_VIEWVOTES_TITLE_1,
            EOM_VIEWVOTES_SELECT: pagedata.EOM_VIEWVOTES_SELECT,
            EOM_VIEW_VOTES_SELECTED: pagedata.EOM_VIEW_VOTES_SELECTED,
            EOM_VIEWVOTES_POPUP_TITLE: pagedata.EOM_VIEWVOTES_POPUP_TITLE,
            EOM_VIEWVOTES_POPUP_MESSAGE: pagedata.EOM_VIEWVOTES_POPUP_MESSAGE,
            EOM_VIEWVOTES_POPUP_CLOSEBTN: pagedata.EOM_VIEWVOTES_POPUP_CLOSEBTN,
            EOM_VIEWVOTES_POPUP_PROCEEDBTN: pagedata.EOM_VIEWVOTES_POPUP_PROCEEDBTN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitEOM = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    eomTitle = (e) => {
        e.preventDefault();
        this.setState({ EOM_TITLE_1: e.target.value });
    }
    eomViewVotesTitle = (e) => {
        e.preventDefault();
        this.setState({ EOM_VIEWVOTES_TITLE_1: e.target.value });
    }
    eomShowMore = (e) => {
        e.preventDefault();
        this.setState({ EOM_SHOW_MORE: e.target.value });
    }
    eomSearchPlaceholder = (e) => {
        e.preventDefault();
        this.setState({ EOM_SEARCH_PLACEHOLDER_1: e.target.value });
    }
    eomSearchBtn = (e) => {
        e.preventDefault();
        this.setState({ EOM_SEARCH_BTN_1: e.target.value });
    }
    eomVoteBtn = (e) => {
        e.preventDefault();
        this.setState({ EOM_VOTE_BTN: e.target.value });
    }
    eomVoteCountText = (e) => {
        e.preventDefault();
        this.setState({ EOM_VOTECOUNT_TEXT: e.target.value });
    }
    eomVotePeriod = (e) => {
        e.preventDefault();
        this.setState({ EOM_VOTE_PERIOD: e.target.value });
    }
    eomPopupTitle = (e) => {
        e.preventDefault();
        this.setState({ EOM_POPUP_TITLE: e.target.value });
    }
    eomPopupComment = (e) => {
        e.preventDefault();
        this.setState({ EOM_POPUP_COMMENT: e.target.value });
    }
    eomPopupVoteBtn = (e) => {
        e.preventDefault();
        this.setState({ EOM_POPUP_VOTE_BTN: e.target.value });
    }
    eomPopupCloseBtn = (e) => {
        e.preventDefault();
        this.setState({ EOM_POPUP_CLOSE_BTN: e.target.value });
    }
    eomVoteCountMessage = (e) => {
        e.preventDefault();
        this.setState({ EOM_VOTE_COUNT_MESSAGE: e.target.value });
    }
    eomViewvotesSelect = (e) => {
        e.preventDefault();
        this.setState({ EOM_VIEWVOTES_SELECT: e.target.value });
    }
    eomViewVotesSelected = (e) => {
        e.preventDefault();
        this.setState({ EOM_VIEW_VOTES_SELECTED: e.target.value });
    }
    eomViewvotesPopupTitle = (e) => {
        e.preventDefault();
        this.setState({ EOM_VIEWVOTES_POPUP_TITLE: e.target.value });
    }
    eomViewvotesPopupMessage = (e) => {
        e.preventDefault();
        this.setState({ EOM_VIEWVOTES_POPUP_MESSAGE: e.target.value });
    }
    eomViewvotesPopupCloseBtn = (e) => {
        e.preventDefault();
        this.setState({ EOM_VIEWVOTES_POPUP_CLOSEBTN: e.target.value });
    }
    eomViewvotesPopupProceedBtn = (e) => {
        e.preventDefault();
        this.setState({ EOM_VIEWVOTES_POPUP_PROCEEDBTN: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let EOM_TITLE_1 = this.state.EOM_TITLE_1;
        let EOM_SHOW_MORE = this.state.EOM_SHOW_MORE;
        let EOM_SEARCH_PLACEHOLDER_1 = this.state.EOM_SEARCH_PLACEHOLDER_1;
        let EOM_SEARCH_BTN_1 = this.state.EOM_SEARCH_BTN_1;
        let EOM_VOTE_BTN = this.state.EOM_VOTE_BTN;
        let EOM_VOTECOUNT_TEXT = this.state.EOM_VOTECOUNT_TEXT;
        let EOM_VOTE_PERIOD = this.state.EOM_VOTE_PERIOD;
        let EOM_POPUP_TITLE = this.state.EOM_POPUP_TITLE;
        let EOM_POPUP_COMMENT = this.state.EOM_POPUP_COMMENT;
        let EOM_POPUP_VOTE_BTN = this.state.EOM_POPUP_VOTE_BTN;
        let EOM_POPUP_CLOSE_BTN = this.state.EOM_POPUP_CLOSE_BTN;
        let EOM_VOTE_COUNT_MESSAGE = this.state.EOM_VOTE_COUNT_MESSAGE;
        let EOM_VIEWVOTES_TITLE_1 = this.state.EOM_VIEWVOTES_TITLE_1;
        let EOM_VIEWVOTES_SELECT = this.state.EOM_VIEWVOTES_SELECT;
        let EOM_VIEW_VOTES_SELECTED = this.state.EOM_VIEW_VOTES_SELECTED;
        let EOM_VIEWVOTES_POPUP_TITLE = this.state.EOM_VIEWVOTES_POPUP_TITLE;
        let EOM_VIEWVOTES_POPUP_MESSAGE = this.state.EOM_VIEWVOTES_POPUP_MESSAGE;
        let EOM_VIEWVOTES_POPUP_CLOSEBTN = this.state.EOM_VIEWVOTES_POPUP_CLOSEBTN;
        let EOM_VIEWVOTES_POPUP_PROCEEDBTN = this.state.EOM_VIEWVOTES_POPUP_PROCEEDBTN;


        return (
            <div className="ui container">
                <h4>Edit - Employee of the Month & View votes page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="employeeOftheMonthForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>EOM_TITLE_1</label>
                                <input className="form-control"
                                    name="EOM_TITLE_1"
                                    type="text"
                                    value={EOM_TITLE_1}
                                    onChange={this.eomTitle} />
                            </div>
                            <div className="field">
                                <label>EOM_SHOW_MORE</label>
                                <input className="form-control"
                                    name="EOM_SHOW_MORE"
                                    type="text"
                                    value={EOM_SHOW_MORE}
                                    onChange={this.eomShowMore} />
                            </div>
                            <div className="field">
                                <label>EOM_SEARCH_PLACEHOLDER_1</label>
                                <input className="form-control"
                                    name="EOM_SEARCH_PLACEHOLDER_1"
                                    type="text"
                                    value={EOM_SEARCH_PLACEHOLDER_1}
                                    onChange={this.eomSearchPlaceholder} />
                            </div>
                            <div className="field">
                                <label>EOM_SEARCH_BTN_1</label>
                                <input className="form-control"
                                    name="EOM_SEARCH_BTN_1"
                                    type="text"
                                    value={EOM_SEARCH_BTN_1}
                                    onChange={this.eomSearchBtn} />
                            </div>
                            <div className="field">
                                <label>EOM_VOTE_BTN</label>
                                <input className="form-control"
                                    name="EOM_VOTE_BTN"
                                    type="text"
                                    value={EOM_VOTE_BTN}
                                    onChange={this.eomVoteBtn} />
                            </div>
                            <div className="field">
                                <label>EOM_VOTECOUNT_TEXT</label>
                                <input className="form-control"
                                    name="EOM_VOTECOUNT_TEXT"
                                    type="text"
                                    value={EOM_VOTECOUNT_TEXT}
                                    onChange={this.eomVoteCountText} />
                            </div>
                            <div className="field">
                                <label>EOM_VOTE_PERIOD</label>
                                <input className="form-control"
                                    name="EOM_VOTE_PERIOD"
                                    type="text"
                                    value={EOM_VOTE_PERIOD}
                                    onChange={this.eomVotePeriod} />
                            </div>
                            <div className="field">
                                <label>EOM_POPUP_TITLE</label>
                                <input className="form-control"
                                    name="EOM_POPUP_TITLE"
                                    type="text"
                                    value={EOM_POPUP_TITLE}
                                    onChange={this.eomPopupTitle} />
                            </div>
                            <div className="field">
                                <label>EOM_POPUP_COMMENT</label>
                                <input className="form-control"
                                    name="EOM_POPUP_COMMENT"
                                    type="text"
                                    value={EOM_POPUP_COMMENT}
                                    onChange={this.eomPopupComment} />
                            </div>
                            <div className="field">
                                <label>EOM_POPUP_VOTE_BTN</label>
                                <input className="form-control"
                                    name="EOM_POPUP_VOTE_BTN"
                                    type="text"
                                    value={EOM_POPUP_VOTE_BTN}
                                    onChange={this.eomPopupVoteBtn} />
                            </div>
                            <div className="field">
                                <label>EOM_POPUP_CLOSE_BTN</label>
                                <input className="form-control"
                                    name="EOM_POPUP_CLOSE_BTN"
                                    type="text"
                                    value={EOM_POPUP_CLOSE_BTN}
                                    onChange={this.eomPopupCloseBtn} />
                            </div>
                            <div className="field">
                                <label>EOM_VOTE_COUNT_MESSAGE</label>
                                <input className="form-control"
                                    name="EOM_VOTE_COUNT_MESSAGE"
                                    type="text"
                                    value={EOM_VOTE_COUNT_MESSAGE}
                                    onChange={this.eomVoteCountMessage} />
                            </div>
                            <div className="field">
                                <label>EOM_VIEWVOTES_TITLE_1</label>
                                <input className="form-control"
                                    name="EOM_VIEWVOTES_TITLE_1"
                                    type="text"
                                    value={EOM_VIEWVOTES_TITLE_1}
                                    onChange={this.eomViewVotesTitle} />
                            </div>
                            <div className="field">
                                <label>EOM_VIEWVOTES_SELECT</label>
                                <input className="form-control"
                                    name="EOM_VIEWVOTES_SELECT"
                                    type="text"
                                    value={EOM_VIEWVOTES_SELECT}
                                    onChange={this.eomViewvotesSelect} />
                            </div>
                            <div className="field">
                                <label>EOM_VIEW_VOTES_SELECTED</label>
                                <input className="form-control"
                                    name="EOM_VIEW_VOTES_SELECTED"
                                    type="text"
                                    value={EOM_VIEW_VOTES_SELECTED}
                                    onChange={this.eomViewVotesSelected} />
                            </div>
                            <div className="field">
                                <label>EOM_VIEWVOTES_POPUP_TITLE</label>
                                <input className="form-control"
                                    name="EOM_VIEWVOTES_POPUP_TITLE"
                                    type="text"
                                    value={EOM_VIEWVOTES_POPUP_TITLE}
                                    onChange={this.eomViewvotesPopupTitle} />
                            </div>
                            <div className="field">
                                <label>EOM_VIEWVOTES_POPUP_MESSAGE</label>
                                <input className="form-control"
                                    name="EOM_VIEWVOTES_POPUP_MESSAGE"
                                    type="text"
                                    value={EOM_VIEWVOTES_POPUP_MESSAGE}
                                    onChange={this.eomViewvotesPopupMessage} />
                            </div>
                            <div className="field">
                                <label>EOM_VIEWVOTES_POPUP_CLOSEBTN</label>
                                <input className="form-control"
                                    name="EOM_VIEWVOTES_POPUP_CLOSEBTN"
                                    type="text"
                                    value={EOM_VIEWVOTES_POPUP_CLOSEBTN}
                                    onChange={this.eomViewvotesPopupCloseBtn} />
                            </div>
                            <div className="field">
                                <label>EOM_VIEWVOTES_POPUP_PROCEEDBTN</label>
                                <input className="form-control"
                                    name="EOM_VIEWVOTES_POPUP_PROCEEDBTN"
                                    type="text"
                                    value={EOM_VIEWVOTES_POPUP_PROCEEDBTN}
                                    onChange={this.eomViewvotesPopupProceedBtn} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitEOM}>Submit</button>
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
