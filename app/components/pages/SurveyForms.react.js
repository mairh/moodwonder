import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class SurveyForms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            SVFM_TITLE: '',
            SVFM_CREATE_BTN: '',
            SVFM_SEARCH_BOX: '',
            SVFM_TBLNUMBER: '',
            SVFM_TBLTITLE: '',
            SVFM_TBLDATE: '',
            SVFM_VIEWSURVEY_LINK: '',
            SVFM_VIEWRESPONSES_LINK: '',
            SVFM_DELETE_LINK: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'surveyforms', language: this.state.language});
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
            SVFM_TITLE: pagedata.SVFM_TITLE,
            SVFM_CREATE_BTN: pagedata.SVFM_CREATE_BTN,
            SVFM_SEARCH_BOX: pagedata.SVFM_SEARCH_BOX,
            SVFM_TBLNUMBER: pagedata.SVFM_TBLNUMBER,
            SVFM_TBLTITLE: pagedata.SVFM_TBLTITLE,
            SVFM_TBLDATE: pagedata.SVFM_TBLDATE,
            SVFM_VIEWSURVEY_LINK: pagedata.SVFM_VIEWSURVEY_LINK,
            SVFM_VIEWRESPONSES_LINK: pagedata.SVFM_VIEWRESPONSES_LINK,
            SVFM_DELETE_LINK: pagedata.SVFM_DELETE_LINK
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitSurveyForms = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeTitle = (e) => {
        e.preventDefault();
        this.setState({ SVFM_TITLE: e.target.value });
    }
    onChangeCreateBtn = (e) => {
        e.preventDefault();
        this.setState({ SVFM_CREATE_BTN: e.target.value });
    }
    onChangeSearchBox = (e) => {
        e.preventDefault();
        this.setState({ SVFM_SEARCH_BOX: e.target.value });
    }
    onChangeTblNumber = (e) => {
        e.preventDefault();
        this.setState({ SVFM_TBLNUMBER: e.target.value });
    }
    onChangeTblTitle = (e) => {
        e.preventDefault();
        this.setState({ SVFM_TBLTITLE: e.target.value });
    }
    onChangeTblDate = (e) => {
        e.preventDefault();
        this.setState({ SVFM_TBLDATE: e.target.value });
    }
    onChangeViewSurvey = (e) => {
        e.preventDefault();
        this.setState({ SVFM_VIEWSURVEY_LINK: e.target.value });
    }
    onChangeViewResponses = (e) => {
        e.preventDefault();
        this.setState({ SVFM_VIEWRESPONSES_LINK: e.target.value });
    }
    onChangeDelete = (e) => {
        e.preventDefault();
        this.setState({ SVFM_DELETE_LINK: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let SVFM_TITLE = this.state.SVFM_TITLE;
        let SVFM_CREATE_BTN = this.state.SVFM_CREATE_BTN;
        let SVFM_SEARCH_BOX = this.state.SVFM_SEARCH_BOX;
        let SVFM_TBLNUMBER = this.state.SVFM_TBLNUMBER;
        let SVFM_TBLTITLE = this.state.SVFM_TBLTITLE;
        let SVFM_TBLDATE = this.state.SVFM_TBLDATE;
        let SVFM_VIEWSURVEY_LINK = this.state.SVFM_VIEWSURVEY_LINK;
        let SVFM_VIEWRESPONSES_LINK = this.state.SVFM_VIEWRESPONSES_LINK;
        let SVFM_DELETE_LINK = this.state.SVFM_DELETE_LINK;


        return (
            <div className="ui container">
                <h4>Edit - Survey forms page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="surveyformsForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>SVFM_TITLE</label>
                                <input className="form-control"
                                    name="SVFM_TITLE"
                                    type="text"
                                    value={SVFM_TITLE}
                                    onChange={this.onChangeTitle} />
                            </div>

                            <div className="field">
                                <label>SVFM_CREATE_BTN</label>
                                <input className="form-control"
                                    name="SVFM_CREATE_BTN"
                                    type="text"
                                    value={SVFM_CREATE_BTN}
                                    onChange={this.onChangeCreateBtn} />
                            </div>

                            <div className="field">
                                <label>SVFM_SEARCH_BOX</label>
                                <input className="form-control"
                                    name="SVFM_SEARCH_BOX"
                                    type="text"
                                    value={SVFM_SEARCH_BOX}
                                    onChange={this.onChangeSearchBox} />
                            </div>

                            <div className="field">
                                <label>SVFM_TBLNUMBER</label>
                                <input className="form-control"
                                    name="SVFM_TBLNUMBER"
                                    type="text"
                                    value={SVFM_TBLNUMBER}
                                    onChange={this.onChangeTblNumber} />
                            </div>

                            <div className="field">
                                <label>SVFM_TBLTITLE</label>
                                <input className="form-control"
                                    name="SVFM_TBLTITLE"
                                    type="text"
                                    value={SVFM_TBLTITLE}
                                    onChange={this.onChangeTblTitle} />
                            </div>

                            <div className="field">
                                <label>SVFM_TBLDATE</label>
                                <input className="form-control"
                                    name="SVFM_TBLDATE"
                                    type="text"
                                    value={SVFM_TBLDATE}
                                    onChange={this.onChangeTblDate} />
                            </div>

                            <div className="field">
                                <label>SVFM_VIEWSURVEY_LINK</label>
                                <input className="form-control"
                                    name="SVFM_VIEWSURVEY_LINK"
                                    type="text"
                                    value={SVFM_VIEWSURVEY_LINK}
                                    onChange={this.onChangeViewSurvey} />
                            </div>

                            <div className="field">
                                <label>SVFM_VIEWRESPONSES_LINK</label>
                                <input className="form-control"
                                    name="SVFM_VIEWRESPONSES_LINK"
                                    type="text"
                                    value={SVFM_VIEWRESPONSES_LINK}
                                    onChange={this.onChangeViewResponses} />
                            </div>

                            <div className="field">
                                <label>SVFM_DELETE_LINK</label>
                                <input className="form-control"
                                    name="SVFM_DELETE_LINK"
                                    type="text"
                                    value={SVFM_DELETE_LINK}
                                    onChange={this.onChangeDelete} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitSurveyForms}>Submit</button>
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
