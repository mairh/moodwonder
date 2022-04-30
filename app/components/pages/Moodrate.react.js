import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Moodrate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            MDR_RATEMOOD: '',
            MDR_MOODDESC: '',
            MDR_MOODBTN: '',
            MDR_MOODANSWER_ALL_BTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'moodrate', language: this.state.language});
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
            MDR_RATEMOOD: pagedata.MDR_RATEMOOD,
            MDR_MOODDESC: pagedata.MDR_MOODDESC,
            MDR_MOODBTN: pagedata.MDR_MOODBTN,
            MDR_MOODANSWER_ALL_BTN: pagedata.MDR_MOODANSWER_ALL_BTN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitMoodrate = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    mdrMoodrate = (e) => {
        e.preventDefault();
        this.setState({ MDR_RATEMOOD: e.target.value });
    }
    mdrMooddesc = (e) => {
        e.preventDefault();
        this.setState({ MDR_MOODDESC: e.target.value });
    }
    mdrMoodbtn = (e) => {
        e.preventDefault();
        this.setState({ MDR_MOODBTN: e.target.value });
    }
    mdrMoodAnsAllBtn = (e) => {
        e.preventDefault();
        this.setState({ MDR_MOODANSWER_ALL_BTN: e.target.value });
    }


    render() {

        let pagedata = this.state.pagedata;
        let MDR_RATEMOOD = this.state.MDR_RATEMOOD;
        let MDR_MOODDESC = this.state.MDR_MOODDESC;
        let MDR_MOODBTN = this.state.MDR_MOODBTN;
        let MDR_MOODANSWER_ALL_BTN = this.state.MDR_MOODANSWER_ALL_BTN;


        return (
            <div className="ui container">
                <h4>Edit - Mood rate page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="moodrateForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>MDR_RATEMOOD</label>
                                <input className="form-control"
                                    name="MDR_RATEMOOD"
                                    type="text"
                                    value={MDR_RATEMOOD}
                                    onChange={this.mdrMoodrate} />
                            </div>
                            <div className="field">
                                <label>MDR_MOODDESC</label>
                                <input className="form-control"
                                    name="MDR_MOODDESC"
                                    type="text"
                                    value={MDR_MOODDESC}
                                    onChange={this.mdrMooddesc} />
                            </div>
                            <div className="field">
                                <label>MDR_MOODBTN</label>
                                <input className="form-control"
                                    name="MDR_MOODBTN"
                                    type="text"
                                    value={MDR_MOODBTN}
                                    onChange={this.mdrMoodbtn} />
                            </div>
                            <div className="field">
                                <label>MDR_MOODANSWER_ALL_BTN</label>
                                <input className="form-control"
                                    name="MDR_MOODANSWER_ALL_BTN"
                                    type="text"
                                    value={MDR_MOODANSWER_ALL_BTN}
                                    onChange={this.mdrMoodAnsAllBtn} />
                            </div>


                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitMoodrate}>Submit</button>
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
