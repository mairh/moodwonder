import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Survey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            SRVY_TITLE: '',
            SRVY_MOOD_KEY: '',
            SRVY_MEANING_KEY: '',
            SRVY_EXPECTATIONS_KEY: '',
            SRVY_STRENGTHS_KEY: '',
            SRVY_RECOGNITION_KEY: '',
            SRVY_DEVELOPMENT_KEY: '',
            SRVY_INFLUENCE_KEY: '',
            SRVY_GOALS_KEY: '',
            SRVY_TEAM_KEY: '',
            SRVY_FRIENDSHIP_KEY: '',
            SRVY_FEEDBACK_KEY: '',
            SRVY_OPPORTUNITIES_KEY: '',
            SRVY_RECOMMENDATION_KEY: '',
            SRVY_MOOD_DES: '',
            SRVY_MEANING_DES: '',
            SRVY_EXPECTATIONS_DES: '',
            SRVY_STRENGTHS_DES: '',
            SRVY_RECOGNITION_DES: '',
            SRVY_DEVELOPMENT_DES: '',
            SRVY_INFLUENCE_DES: '',
            SRVY_GOALS_DES: '',
            SRVY_TEAM_DES: '',
            SRVY_FRIENDSHIP_DES: '',
            SRVY_FEEDBACK_DES: '',
            SRVY_OPPORTUNITIES_DES: '',
            SRVY_RECOMMENDATION_DES: '',
            SRVY_SUBMIT_BTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'survey', language: this.state.language});
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
            SRVY_TITLE: pagedata.SRVY_TITLE,
            SRVY_MOOD_KEY: pagedata.SRVY_MOOD_KEY,
            SRVY_MEANING_KEY: pagedata.SRVY_MEANING_KEY,
            SRVY_EXPECTATIONS_KEY: pagedata.SRVY_EXPECTATIONS_KEY,
            SRVY_STRENGTHS_KEY: pagedata.SRVY_STRENGTHS_KEY,
            SRVY_RECOGNITION_KEY: pagedata.SRVY_RECOGNITION_KEY,
            SRVY_DEVELOPMENT_KEY: pagedata.SRVY_DEVELOPMENT_KEY,
            SRVY_INFLUENCE_KEY: pagedata.SRVY_INFLUENCE_KEY,
            SRVY_GOALS_KEY: pagedata.SRVY_GOALS_KEY,
            SRVY_TEAM_KEY: pagedata.SRVY_TEAM_KEY,
            SRVY_FRIENDSHIP_KEY: pagedata.SRVY_FRIENDSHIP_KEY,
            SRVY_FEEDBACK_KEY: pagedata.SRVY_FEEDBACK_KEY,
            SRVY_OPPORTUNITIES_KEY: pagedata.SRVY_OPPORTUNITIES_KEY,
            SRVY_RECOMMENDATION_KEY: pagedata.SRVY_RECOMMENDATION_KEY,
            SRVY_MOOD_DES: pagedata.SRVY_MOOD_DES,
            SRVY_MEANING_DES: pagedata.SRVY_MEANING_DES,
            SRVY_EXPECTATIONS_DES: pagedata.SRVY_EXPECTATIONS_DES,
            SRVY_STRENGTHS_DES: pagedata.SRVY_STRENGTHS_DES,
            SRVY_RECOGNITION_DES: pagedata.SRVY_RECOGNITION_DES,
            SRVY_DEVELOPMENT_DES: pagedata.SRVY_DEVELOPMENT_DES,
            SRVY_INFLUENCE_DES: pagedata.SRVY_INFLUENCE_DES,
            SRVY_GOALS_DES: pagedata.SRVY_GOALS_DES,
            SRVY_TEAM_DES: pagedata.SRVY_TEAM_DES,
            SRVY_FRIENDSHIP_DES: pagedata.SRVY_FRIENDSHIP_DES,
            SRVY_FEEDBACK_DES: pagedata.SRVY_FEEDBACK_DES,
            SRVY_OPPORTUNITIES_DES: pagedata.SRVY_OPPORTUNITIES_DES,
            SRVY_RECOMMENDATION_DES: pagedata.SRVY_RECOMMENDATION_DES,
            SRVY_SUBMIT_BTN: pagedata.SRVY_SUBMIT_BTN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitSurvey = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeBannerTitle = (e) => {
        e.preventDefault();
        this.setState({ SRVY_TITLE: e.target.value });
    }
    onChangeMoodKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_MOOD_KEY: e.target.value });
    }
    onChangeMeaningKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_MEANING_KEY: e.target.value });
    }
    onChangeExpectationsKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_EXPECTATIONS_KEY: e.target.value });
    }
    onChangeStrenghtsKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_STRENGTHS_KEY: e.target.value });
    }
    onChangeRecognitionKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_RECOGNITION_KEY: e.target.value });
    }
    onChangeDevelopmentKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_DEVELOPMENT_KEY: e.target.value });
    }
    onChangeInfluenceKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_INFLUENCE_KEY: e.target.value });
    }
    onChangeGoalsKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_GOALS_KEY: e.target.value });
    }
    onChangeTeamKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_TEAM_KEY: e.target.value });
    }
    onChangeFriendshipKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_FRIENDSHIP_KEY: e.target.value });
    }
    onChangeFeedbackKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_FEEDBACK_KEY: e.target.value });
    }
    onChangeOpportunitiesKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_OPPORTUNITIES_KEY: e.target.value });
    }
    onChangeRecommendationKey = (e) => {
        e.preventDefault();
        this.setState({ SRVY_RECOMMENDATION_KEY: e.target.value });
    }
    onChangeMoodDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_MOOD_DES: e.target.value });
    }
    onChangeMeaningDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_MEANING_DES: e.target.value });
    }
    onChangeExpectationsDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_EXPECTATIONS_DES: e.target.value });
    }
    onChangeStrengthsDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_STRENGTHS_DES: e.target.value });
    }
    onChangeRecongnitionDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_RECOGNITION_DES: e.target.value });
    }
    onChangeDevelopmentDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_DEVELOPMENT_DES: e.target.value });
    }
    onChangeInfluenceDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_INFLUENCE_DES: e.target.value });
    }
    onChangeGoalsDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_GOALS_DES: e.target.value });
    }
    onChangeTeamDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_TEAM_DES: e.target.value });
    }
    onChangeFriendshipDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_FRIENDSHIP_DES: e.target.value });
    }
    onChangeFeedbackDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_FEEDBACK_DES: e.target.value });
    }
    onChangeOpportunitiesDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_OPPORTUNITIES_DES: e.target.value });
    }
    onChangeRecommendationDes = (e) => {
        e.preventDefault();
        this.setState({ SRVY_RECOMMENDATION_DES: e.target.value });
    }
    onChangeSubmitBtn = (e) => {
        e.preventDefault();
        this.setState({ SRVY_SUBMIT_BTN: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let SRVY_TITLE = this.state.SRVY_TITLE;
        let SRVY_MOOD_KEY = this.state.SRVY_MOOD_KEY;
        let SRVY_MEANING_KEY = this.state.SRVY_MEANING_KEY;
        let SRVY_EXPECTATIONS_KEY = this.state.SRVY_EXPECTATIONS_KEY;
        let SRVY_STRENGTHS_KEY = this.state.SRVY_STRENGTHS_KEY;
        let SRVY_RECOGNITION_KEY = this.state.SRVY_RECOGNITION_KEY;
        let SRVY_DEVELOPMENT_KEY = this.state.SRVY_DEVELOPMENT_KEY;
        let SRVY_INFLUENCE_KEY = this.state.SRVY_INFLUENCE_KEY;
        let SRVY_GOALS_KEY = this.state.SRVY_GOALS_KEY;
        let SRVY_TEAM_KEY = this.state.SRVY_TEAM_KEY;
        let SRVY_FRIENDSHIP_KEY = this.state.SRVY_FRIENDSHIP_KEY;
        let SRVY_FEEDBACK_KEY = this.state.SRVY_FEEDBACK_KEY;
        let SRVY_OPPORTUNITIES_KEY = this.state.SRVY_OPPORTUNITIES_KEY;
        let SRVY_RECOMMENDATION_KEY = this.state.SRVY_RECOMMENDATION_KEY;
        let SRVY_MOOD_DES = this.state.SRVY_MOOD_DES;
        let SRVY_MEANING_DES = this.state.SRVY_MEANING_DES;
        let SRVY_EXPECTATIONS_DES = this.state.SRVY_EXPECTATIONS_DES;
        let SRVY_STRENGTHS_DES = this.state.SRVY_STRENGTHS_DES;
        let SRVY_RECOGNITION_DES = this.state.SRVY_RECOGNITION_DES;
        let SRVY_DEVELOPMENT_DES = this.state.SRVY_DEVELOPMENT_DES;
        let SRVY_INFLUENCE_DES = this.state.SRVY_INFLUENCE_DES;
        let SRVY_GOALS_DES = this.state.SRVY_GOALS_DES;
        let SRVY_TEAM_DES = this.state.SRVY_TEAM_DES;
        let SRVY_FRIENDSHIP_DES = this.state.SRVY_FRIENDSHIP_DES;
        let SRVY_FEEDBACK_DES = this.state.SRVY_FEEDBACK_DES;
        let SRVY_OPPORTUNITIES_DES = this.state.SRVY_OPPORTUNITIES_DES;
        let SRVY_RECOMMENDATION_DES = this.state.SRVY_RECOMMENDATION_DES;
        let SRVY_SUBMIT_BTN = this.state.SRVY_SUBMIT_BTN;


        return (
            <div className="ui container">
                <h4>Edit - Engagement Survey page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="surveyForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>SRVY_TITLE</label>
                                <input className="form-control"
                                    name="SRVY_TITLE"
                                    type="text"
                                    value={SRVY_TITLE}
                                    onChange={this.onChangeBannerTitle} />
                            </div>
                            <div className="field">
                                <label>SRVY_MOOD_KEY</label>
                                <input className="form-control"
                                    name="SRVY_MOOD_KEY"
                                    type="text"
                                    value={SRVY_MOOD_KEY}
                                    onChange={this.onChangeMoodKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_MEANING_KEY</label>
                                <input className="form-control"
                                    name="SRVY_MEANING_KEY"
                                    type="text"
                                    value={SRVY_MEANING_KEY}
                                    onChange={this.onChangeMeaningKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_EXPECTATIONS_KEY</label>
                                <input className="form-control"
                                    name="SRVY_EXPECTATIONS_KEY"
                                    type="text"
                                    value={SRVY_EXPECTATIONS_KEY}
                                    onChange={this.onChangeExpectationsKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_STRENGTHS_KEY</label>
                                <input className="form-control"
                                    name="SRVY_STRENGTHS_KEY"
                                    type="text"
                                    value={SRVY_STRENGTHS_KEY}
                                    onChange={this.onChangeStrenghtsKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_RECOGNITION_KEY</label>
                                <input className="form-control"
                                    name="SRVY_RECOGNITION_KEY"
                                    type="text"
                                    value={SRVY_RECOGNITION_KEY}
                                    onChange={this.onChangeRecognitionKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_DEVELOPMENT_KEY</label>
                                <input className="form-control"
                                    name="SRVY_DEVELOPMENT_KEY"
                                    type="text"
                                    value={SRVY_DEVELOPMENT_KEY}
                                    onChange={this.onChangeDevelopmentKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_INFLUENCE_KEY</label>
                                <input className="form-control"
                                    name="SRVY_INFLUENCE_KEY"
                                    type="text"
                                    value={SRVY_INFLUENCE_KEY}
                                    onChange={this.onChangeInfluenceKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_GOALS_KEY</label>
                                <input className="form-control"
                                    name="SRVY_GOALS_KEY"
                                    type="text"
                                    value={SRVY_GOALS_KEY}
                                    onChange={this.onChangeGoalsKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_TEAM_KEY</label>
                                <input className="form-control"
                                    name="SRVY_TEAM_KEY"
                                    type="text"
                                    value={SRVY_TEAM_KEY}
                                    onChange={this.onChangeTeamKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_FRIENDSHIP_KEY</label>
                                <input className="form-control"
                                    name="SRVY_FRIENDSHIP_KEY"
                                    type="text"
                                    value={SRVY_FRIENDSHIP_KEY}
                                    onChange={this.onChangeFriendshipKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_FEEDBACK_KEY</label>
                                <input className="form-control"
                                    name="SRVY_FEEDBACK_KEY"
                                    type="text"
                                    value={SRVY_FEEDBACK_KEY}
                                    onChange={this.onChangeFeedbackKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_OPPORTUNITIES_KEY</label>
                                <input className="form-control"
                                    name="SRVY_OPPORTUNITIES_KEY"
                                    type="text"
                                    value={SRVY_OPPORTUNITIES_KEY}
                                    onChange={this.onChangeOpportunitiesKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_RECOMMENDATION_KEY</label>
                                <input className="form-control"
                                    name="SRVY_RECOMMENDATION_KEY"
                                    type="text"
                                    value={SRVY_RECOMMENDATION_KEY}
                                    onChange={this.onChangeRecommendationKey} />
                            </div>
                            <div className="field">
                                <label>SRVY_MOOD_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_MOOD_DES"
                                    value={SRVY_MOOD_DES}
                                    onChange={this.onChangeMoodDes} >{SRVY_MOOD_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_MEANING_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_MEANING_DES"
                                    value={SRVY_MEANING_DES}
                                    onChange={this.onChangeMeaningDes} >{SRVY_MEANING_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_EXPECTATIONS_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_EXPECTATIONS_DES"
                                    value={SRVY_EXPECTATIONS_DES}
                                    onChange={this.onChangeExpectationsDes} >{SRVY_EXPECTATIONS_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_STRENGTHS_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_STRENGTHS_DES"
                                    value={SRVY_STRENGTHS_DES}
                                    onChange={this.onChangeStrengthsDes} >{SRVY_STRENGTHS_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_RECOGNITION_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_RECOGNITION_DES"
                                    value={SRVY_RECOGNITION_DES}
                                    onChange={this.onChangeRecongnitionDes} >{SRVY_RECOGNITION_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_DEVELOPMENT_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_DEVELOPMENT_DES"
                                    value={SRVY_DEVELOPMENT_DES}
                                    onChange={this.onChangeDevelopmentDes} >{SRVY_DEVELOPMENT_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_INFLUENCE_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_INFLUENCE_DES"
                                    value={SRVY_INFLUENCE_DES}
                                    onChange={this.onChangeInfluenceDes} >{SRVY_INFLUENCE_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_GOALS_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_GOALS_DES"
                                    value={SRVY_GOALS_DES}
                                    onChange={this.onChangeGoalsDes} >{SRVY_GOALS_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_TEAM_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_TEAM_DES"
                                    value={SRVY_TEAM_DES}
                                    onChange={this.onChangeTeamDes} >{SRVY_TEAM_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_FRIENDSHIP_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_FRIENDSHIP_DES"
                                    value={SRVY_FRIENDSHIP_DES}
                                    onChange={this.onChangeFriendshipDes} >{SRVY_FRIENDSHIP_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_FEEDBACK_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_FEEDBACK_DES"
                                    value={SRVY_FEEDBACK_DES}
                                    onChange={this.onChangeFeedbackDes} >{SRVY_FEEDBACK_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_OPPORTUNITIES_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_OPPORTUNITIES_DES"
                                    value={SRVY_OPPORTUNITIES_DES}
                                    onChange={this.onChangeOpportunitiesDes} >{SRVY_OPPORTUNITIES_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_RECOMMENDATION_DES</label>
                                <textarea className="form-control"
                                    name="SRVY_RECOMMENDATION_DES"
                                    value={SRVY_RECOMMENDATION_DES}
                                    onChange={this.onChangeRecommendationDes} >{SRVY_RECOMMENDATION_DES}</textarea>
                            </div>
                            <div className="field">
                                <label>SRVY_SUBMIT_BTN</label>
                                <input className="form-control"
                                    name="SRVY_SUBMIT_BTN"
                                    type="text"
                                    value={SRVY_SUBMIT_BTN}
                                    onChange={this.onChangeSubmitBtn} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitSurvey}>Submit</button>
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
