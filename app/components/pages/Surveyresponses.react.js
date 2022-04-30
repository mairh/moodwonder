import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Surveyresponses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            SVRS_LIST_BTN: '',
            SVRS_NODATA_MSG: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'surveyresponses', language: this.state.language});
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
            SVRS_LIST_BTN: pagedata.SVRS_LIST_BTN,
            SVRS_NODATA_MSG: pagedata.SVRS_NODATA_MSG
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitSurveyresponses = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeListBtn = (e) => {
        e.preventDefault();
        this.setState({ SVRS_LIST_BTN: e.target.value });
    }
    onChangeNodataMsg = (e) => {
        e.preventDefault();
        this.setState({ SVRS_NODATA_MSG: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let SVRS_LIST_BTN = this.state.SVRS_LIST_BTN;
        let SVRS_NODATA_MSG = this.state.SVRS_NODATA_MSG;


        return (
            <div className="ui container">
                <h4>Edit - Survey responses page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="surveyresponsesForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>SVRS_LIST_BTN</label>
                                <input className="form-control"
                                    name="SVRS_LIST_BTN"
                                    type="text"
                                    value={SVRS_LIST_BTN}
                                    onChange={this.onChangeListBtn} />
                            </div>
                            <div className="field">
                                <label>SVRS_NODATA_MSG</label>
                                <input className="form-control"
                                    name="SVRS_NODATA_MSG"
                                    type="text"
                                    value={SVRS_NODATA_MSG}
                                    onChange={this.onChangeNodataMsg} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitSurveyresponses}>Submit</button>
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
