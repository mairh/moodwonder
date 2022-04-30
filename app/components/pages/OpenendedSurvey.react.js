import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class OpenendedSurvey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            OPES_TOP_TITLE: '',
            OPES_OPTION: '',
            OPES_TOP_QNSONE: '',
            OPES_TOP_QNSTWO: '',
            OPES_TOP_QNSTHREE: '',
            OPES_WORST_TITLE: '',
            OPES_WORST_QNSONE: '',
            OPES_WORST_QNSTWO: '',
            OPES_WORST_QNSTHREE: '',
            OPES_MOOD: '',
            OPES_EXPECTATIONS: '',
            OPES_STRENGTHS: '',
            OPES_RECOGNITION: '',
            OPES_DEVELOPMENT: '',
            OPES_INFLUENCE: '',
            OPES_TEAM: '',
            OPES_FRIENDSHIP: '',
            OPES_FEEDBACK: '',
            OPES_OPPORTUNITIES: '',
            OPES_RECOMMENDATION: '',
            OPES_CANCEL_BTN: '',
            OPES_SUBMIT_BTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'openendedsurvey', language: this.state.language});
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
            OPES_TOP_TITLE: pagedata.OPES_TOP_TITLE,
            OPES_OPTION: pagedata.OPES_OPTION,
            OPES_TOP_QNSONE: pagedata.OPES_TOP_QNSONE,
            OPES_TOP_QNSTWO: pagedata.OPES_TOP_QNSTWO,
            OPES_TOP_QNSTHREE: pagedata.OPES_TOP_QNSTHREE,
            OPES_WORST_TITLE: pagedata.OPES_WORST_TITLE,
            OPES_WORST_QNSONE: pagedata.OPES_WORST_QNSONE,
            OPES_WORST_QNSTWO: pagedata.OPES_WORST_QNSTWO,
            OPES_WORST_QNSTHREE: pagedata.OPES_WORST_QNSTHREE,
            OPES_MOOD: pagedata.OPES_MOOD,
            OPES_EXPECTATIONS: pagedata.OPES_EXPECTATIONS,
            OPES_STRENGTHS: pagedata.OPES_STRENGTHS,
            OPES_RECOGNITION: pagedata.OPES_RECOGNITION,
            OPES_DEVELOPMENT: pagedata.OPES_DEVELOPMENT,
            OPES_INFLUENCE: pagedata.OPES_INFLUENCE,
            OPES_TEAM: pagedata.OPES_TEAM,
            OPES_FRIENDSHIP: pagedata.OPES_FRIENDSHIP,
            OPES_FEEDBACK: pagedata.OPES_FEEDBACK,
            OPES_OPPORTUNITIES: pagedata.OPES_OPPORTUNITIES,
            OPES_RECOMMENDATION: pagedata.OPES_RECOMMENDATION,
            OPES_CANCEL_BTN: pagedata.OPES_CANCEL_BTN,
            OPES_SUBMIT_BTN: pagedata.OPES_SUBMIT_BTN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitOpenendedSurvey = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeTopTitle = (e) => {
        e.preventDefault();
        this.setState({ OPES_TOP_TITLE: e.target.value });
    }
    onChangeOption = (e) => {
        e.preventDefault();
        this.setState({ OPES_OPTION: e.target.value });
    }
    onChangeTopQone = (e) => {
        e.preventDefault();
        this.setState({ OPES_TOP_QNSONE: e.target.value });
    }
    onChangeTopQtwo = (e) => {
        e.preventDefault();
        this.setState({ OPES_TOP_QNSTWO: e.target.value });
    }
    onChangeTopQthree = (e) => {
        e.preventDefault();
        this.setState({ OPES_TOP_QNSTHREE: e.target.value });
    }
    onChangeWorstTitle = (e) => {
        e.preventDefault();
        this.setState({ OPES_WORST_TITLE: e.target.value });
    }
    onChangeWorstQone = (e) => {
        e.preventDefault();
        this.setState({ OPES_WORST_QNSONE: e.target.value });
    }
    onChangeWorstQtwo = (e) => {
        e.preventDefault();
        this.setState({ OPES_WORST_QNSTWO: e.target.value });
    }
    onChangeWorstQthree = (e) => {
        e.preventDefault();
        this.setState({ OPES_WORST_QNSTHREE: e.target.value });
    }
    onChangeMood = (e) => {
        e.preventDefault();
        this.setState({ OPES_MOOD: e.target.value });
    }
    onChangeExpectations = (e) => {
        e.preventDefault();
        this.setState({ OPES_EXPECTATIONS: e.target.value });
    }
    onChangeStrengths = (e) => {
        e.preventDefault();
        this.setState({ OPES_STRENGTHS: e.target.value });
    }
    onChangeRecognition = (e) => {
        e.preventDefault();
        this.setState({ OPES_RECOGNITION: e.target.value });
    }
    onChangeDevelopment = (e) => {
        e.preventDefault();
        this.setState({ OPES_DEVELOPMENT: e.target.value });
    }
    onChangeInfluence = (e) => {
        e.preventDefault();
        this.setState({ OPES_INFLUENCE: e.target.value });
    }
    onChangeTeam = (e) => {
        e.preventDefault();
        this.setState({ OPES_TEAM: e.target.value });
    }
    onChangeFriendship = (e) => {
        e.preventDefault();
        this.setState({ OPES_FRIENDSHIP: e.target.value });
    }
    onChangeFeedback = (e) => {
        e.preventDefault();
        this.setState({ OPES_FEEDBACK: e.target.value });
    }
    onChangeOpportunities = (e) => {
        e.preventDefault();
        this.setState({ OPES_OPPORTUNITIES: e.target.value });
    }
    onChangeRecommendation = (e) => {
        e.preventDefault();
        this.setState({ OPES_RECOMMENDATION: e.target.value });
    }
    onChangeCancel = (e) => {
        e.preventDefault();
        this.setState({ OPES_CANCEL_BTN: e.target.value });
    }
    onChangeSubmit = (e) => {
        e.preventDefault();
        this.setState({ OPES_SUBMIT_BTN: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let OPES_TOP_TITLE = this.state.OPES_TOP_TITLE;
        let OPES_OPTION = this.state.OPES_OPTION;
        let OPES_TOP_QNSONE = this.state.OPES_TOP_QNSONE;
        let OPES_TOP_QNSTWO = this.state.OPES_TOP_QNSTWO;
        let OPES_TOP_QNSTHREE = this.state.OPES_TOP_QNSTHREE;
        let OPES_WORST_TITLE = this.state.OPES_WORST_TITLE;
        let OPES_WORST_QNSONE = this.state.OPES_WORST_QNSONE;
        let OPES_WORST_QNSTWO = this.state.OPES_WORST_QNSTWO;
        let OPES_WORST_QNSTHREE = this.state.OPES_WORST_QNSTHREE;
        let OPES_MOOD = this.state.OPES_MOOD;
        let OPES_EXPECTATIONS = this.state.OPES_EXPECTATIONS;
        let OPES_STRENGTHS = this.state.OPES_STRENGTHS;
        let OPES_RECOGNITION = this.state.OPES_RECOGNITION;
        let OPES_DEVELOPMENT = this.state.OPES_DEVELOPMENT;
        let OPES_INFLUENCE = this.state.OPES_INFLUENCE;
        let OPES_TEAM = this.state.OPES_TEAM;
        let OPES_FRIENDSHIP = this.state.OPES_FRIENDSHIP;
        let OPES_FEEDBACK = this.state.OPES_FEEDBACK;
        let OPES_OPPORTUNITIES = this.state.OPES_OPPORTUNITIES;
        let OPES_RECOMMENDATION = this.state.OPES_RECOMMENDATION;
        let OPES_CANCEL_BTN = this.state.OPES_CANCEL_BTN;
        let OPES_SUBMIT_BTN = this.state.OPES_SUBMIT_BTN;


        return (
            <div className="ui container">
                <h4>Edit - Openended Survey page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="openendedsurveyForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>OPES_TOP_TITLE</label>
                                <input className="form-control"
                                    name="OPES_TOP_TITLE"
                                    type="text"
                                    value={OPES_TOP_TITLE}
                                    onChange={this.onChangeTopTitle} />
                            </div>
                            <div className="field">
                                <label>OPES_OPTION</label>
                                <input className="form-control"
                                    name="OPES_OPTION"
                                    type="text"
                                    value={OPES_OPTION}
                                    onChange={this.onChangeOption} />
                            </div>
                            <div className="field">
                                <label>OPES_TOP_QNSONE</label>
                                <input className="form-control"
                                    name="OPES_TOP_QNSONE"
                                    type="text"
                                    value={OPES_TOP_QNSONE}
                                    onChange={this.onChangeTopQone} />
                            </div>
                            <div className="field">
                                <label>OPES_TOP_QNSTWO</label>
                                <input className="form-control"
                                    name="OPES_TOP_QNSTWO"
                                    type="text"
                                    value={OPES_TOP_QNSTWO}
                                    onChange={this.onChangeTopQtwo} />
                            </div>
                            <div className="field">
                                <label>OPES_TOP_QNSTHREE</label>
                                <input className="form-control"
                                    name="OPES_TOP_QNSTHREE"
                                    type="text"
                                    value={OPES_TOP_QNSTHREE}
                                    onChange={this.onChangeTopQthree} />
                            </div>
                            <div className="field">
                                <label>OPES_WORST_TITLE</label>
                                <input className="form-control"
                                    name="OPES_WORST_TITLE"
                                    type="text"
                                    value={OPES_WORST_TITLE}
                                    onChange={this.onChangeWorstTitle} />
                            </div>
                            <div className="field">
                                <label>OPES_WORST_QNSONE</label>
                                <input className="form-control"
                                    name="OPES_WORST_QNSONE"
                                    type="text"
                                    value={OPES_WORST_QNSONE}
                                    onChange={this.onChangeWorstQone} />
                            </div>
                            <div className="field">
                                <label>OPES_WORST_QNSTWO</label>
                                <input className="form-control"
                                    name="OPES_WORST_QNSTWO"
                                    type="text"
                                    value={OPES_WORST_QNSTWO}
                                    onChange={this.onChangeWorstQtwo} />
                            </div>
                            <div className="field">
                                <label>OPES_WORST_QNSTHREE</label>
                                <input className="form-control"
                                    name="OPES_WORST_QNSTHREE"
                                    type="text"
                                    value={OPES_WORST_QNSTHREE}
                                    onChange={this.onChangeWorstQthree} />
                            </div>
                            <div className="field">
                                <label>OPES_MOOD</label>
                                <input className="form-control"
                                    name="OPES_MOOD"
                                    type="text"
                                    value={OPES_MOOD}
                                    onChange={this.onChangeMood} />
                            </div>
                            <div className="field">
                                <label>OPES_EXPECTATIONS</label>
                                <input className="form-control"
                                    name="OPES_EXPECTATIONS"
                                    type="text"
                                    value={OPES_EXPECTATIONS}
                                    onChange={this.onChangeExpectations} />
                            </div>
                            <div className="field">
                                <label>OPES_STRENGTHS</label>
                                <input className="form-control"
                                    name="OPES_STRENGTHS"
                                    type="text"
                                    value={OPES_STRENGTHS}
                                    onChange={this.onChangeStrengths} />
                            </div>
                            <div className="field">
                                <label>OPES_RECOGNITION</label>
                                <input className="form-control"
                                    name="OPES_RECOGNITION"
                                    type="text"
                                    value={OPES_RECOGNITION}
                                    onChange={this.onChangeRecognition} />
                            </div>
                            <div className="field">
                                <label>OPES_DEVELOPMENT</label>
                                <input className="form-control"
                                    name="OPES_DEVELOPMENT"
                                    type="text"
                                    value={OPES_DEVELOPMENT}
                                    onChange={this.onChangeDevelopment} />
                            </div>
                            <div className="field">
                                <label>OPES_INFLUENCE</label>
                                <input className="form-control"
                                    name="OPES_INFLUENCE"
                                    type="text"
                                    value={OPES_INFLUENCE}
                                    onChange={this.onChangeInfluence} />
                            </div>
                            <div className="field">
                                <label>OPES_TEAM</label>
                                <input className="form-control"
                                    name="OPES_TEAM"
                                    type="text"
                                    value={OPES_TEAM}
                                    onChange={this.onChangeTeam} />
                            </div>
                            <div className="field">
                                <label>OPES_FRIENDSHIP</label>
                                <input className="form-control"
                                    name="OPES_FRIENDSHIP"
                                    type="text"
                                    value={OPES_FRIENDSHIP}
                                    onChange={this.onChangeFriendship} />
                            </div>
                            <div className="field">
                                <label>OPES_FEEDBACK</label>
                                <input className="form-control"
                                    name="OPES_FEEDBACK"
                                    type="text"
                                    value={OPES_FEEDBACK}
                                    onChange={this.onChangeFeedback} />
                            </div>
                            <div className="field">
                                <label>OPES_OPPORTUNITIES</label>
                                <input className="form-control"
                                    name="OPES_OPPORTUNITIES"
                                    type="text"
                                    value={OPES_OPPORTUNITIES}
                                    onChange={this.onChangeOpportunities} />
                            </div>
                            <div className="field">
                                <label>OPES_RECOMMENDATION</label>
                                <input className="form-control"
                                    name="OPES_RECOMMENDATION"
                                    type="text"
                                    value={OPES_RECOMMENDATION}
                                    onChange={this.onChangeRecommendation} />
                            </div>
                            <div className="field">
                                <label>OPES_CANCEL_BTN</label>
                                <input className="form-control"
                                    name="OPES_CANCEL_BTN"
                                    type="text"
                                    value={OPES_CANCEL_BTN}
                                    onChange={this.onChangeCancel} />
                            </div>
                            <div className="field">
                                <label>OPES_SUBMIT_BTN</label>
                                <input className="form-control"
                                    name="OPES_SUBMIT_BTN"
                                    type="text"
                                    value={OPES_SUBMIT_BTN}
                                    onChange={this.onChangeSubmit} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitOpenendedSurvey}>Submit</button>
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
