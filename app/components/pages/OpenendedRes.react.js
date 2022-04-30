import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class OpenendedRes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            OPER_TITLE : '',
            OPER_MOST_IMPROVED: '',
            OPER_LEAST_IMPROVED: '',
            OPER_OPTALL: '',
            OPER_OPTMOOD: '',
            OPER_OPTMEANING: '',
            OPER_OPTEXPECTATIONS: '',
            OPER_OPTSTRENGTHS: '',
            OPER_OPTRECOGNITION: '',
            OPER_OPTDEVELOPMENT: '',
            OPER_OPTINFLUENCE: '',
            OPER_OPTGOALS: '',
            OPER_OPTTEAM: '',
            OPER_OPTFRIENDSHIP: '',
            OPER_OPTFEEDBACK: '',
            OPER_OPTOPPORTUNITIES: '',
            OPER_OPTRECOMMENDATION: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'openendedres', language: this.state.language});
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
            OPER_TITLE: pagedata.OPER_TITLE,
            OPER_MOST_IMPROVED: pagedata.OPER_MOST_IMPROVED,
            OPER_LEAST_IMPROVED: pagedata.OPER_LEAST_IMPROVED,
            OPER_OPTALL: pagedata.OPER_OPTALL,
            OPER_OPTMOOD: pagedata.OPER_OPTMOOD,
            OPER_OPTMEANING: pagedata.OPER_OPTMEANING,
            OPER_OPTEXPECTATIONS: pagedata.OPER_OPTEXPECTATIONS,
            OPER_OPTSTRENGTHS: pagedata.OPER_OPTSTRENGTHS,
            OPER_OPTRECOGNITION: pagedata.OPER_OPTRECOGNITION,
            OPER_OPTDEVELOPMENT: pagedata.OPER_OPTDEVELOPMENT,
            OPER_OPTINFLUENCE: pagedata.OPER_OPTINFLUENCE,
            OPER_OPTGOALS: pagedata.OPER_OPTGOALS,
            OPER_OPTTEAM: pagedata.OPER_OPTTEAM,
            OPER_OPTFRIENDSHIP: pagedata.OPER_OPTFRIENDSHIP,
            OPER_OPTFEEDBACK: pagedata.OPER_OPTFEEDBACK,
            OPER_OPTOPPORTUNITIES: pagedata.OPER_OPTOPPORTUNITIES,
            OPER_OPTRECOMMENDATION: pagedata.OPER_OPTRECOMMENDATION
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitOpenendedRes = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeBannerTitle = (e) => {
        e.preventDefault();
        this.setState({ OPER_TITLE: e.target.value });
    }
    onChangeOperMostImproved = (e) => {
        e.preventDefault();
        this.setState({ OPER_MOST_IMPROVED: e.target.value });
    }
    onChangeOperLeastImproved = (e) => {
        e.preventDefault();
        this.setState({ OPER_LEAST_IMPROVED: e.target.value });
    }
    onChangeOperAll = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTALL: e.target.value });
    }
    onChangeOperMood = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTMOOD: e.target.value });
    }
    onChangeOperMeaning = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTMEANING: e.target.value });
    }
    onChangeOperExpectations = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTEXPECTATIONS: e.target.value });
    }
    onChangeOperStrengths = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTSTRENGTHS: e.target.value });
    }
    onChangeOperRecognition = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTRECOGNITION: e.target.value });
    }
    onChangeOperDevelopment = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTDEVELOPMENT: e.target.value });
    }
    onChangeOperInfluence = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTINFLUENCE: e.target.value });
    }
    onChangeOperGoals = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTGOALS: e.target.value });
    }
    onChangeOperTeam = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTTEAM: e.target.value });
    }
    onChangeOperFriendship = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTFRIENDSHIP: e.target.value });
    }
    onChangeOperFeedback = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTFEEDBACK: e.target.value });
    }
    onChangeOperOpportunities = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTOPPORTUNITIES: e.target.value });
    }
    onChangeOperRecommendation = (e) => {
        e.preventDefault();
        this.setState({ OPER_OPTRECOMMENDATION: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let OPER_TITLE = this.state.OPER_TITLE;
        let OPER_MOST_IMPROVED = this.state.OPER_MOST_IMPROVED;
        let OPER_LEAST_IMPROVED = this.state.OPER_LEAST_IMPROVED;
        let OPER_OPTALL = this.state.OPER_OPTALL;
        let OPER_OPTMOOD = this.state.OPER_OPTMOOD;
        let OPER_OPTMEANING = this.state.OPER_OPTMEANING;
        let OPER_OPTEXPECTATIONS = this.state.OPER_OPTEXPECTATIONS;
        let OPER_OPTSTRENGTHS = this.state.OPER_OPTSTRENGTHS;
        let OPER_OPTRECOGNITION = this.state.OPER_OPTRECOGNITION;
        let OPER_OPTDEVELOPMENT = this.state.OPER_OPTDEVELOPMENT;
        let OPER_OPTINFLUENCE = this.state.OPER_OPTINFLUENCE;
        let OPER_OPTGOALS = this.state.OPER_OPTGOALS;
        let OPER_OPTTEAM = this.state.OPER_OPTTEAM;
        let OPER_OPTFRIENDSHIP = this.state.OPER_OPTFRIENDSHIP;
        let OPER_OPTFEEDBACK = this.state.OPER_OPTFEEDBACK;
        let OPER_OPTOPPORTUNITIES = this.state.OPER_OPTOPPORTUNITIES;
        let OPER_OPTRECOMMENDATION = this.state.OPER_OPTRECOMMENDATION;


        return (
            <div className="ui container">
                <h4>Edit - Openended Responses page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="openendedresForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>OPER_TITLE</label>
                                <input className="form-control"
                                    name="OPER_TITLE"
                                    type="text"
                                    value={OPER_TITLE}
                                    onChange={this.onChangeBannerTitle} />
                            </div>
                            <div className="field">
                                <label>OPER_MOST_IMPROVED</label>
                                <input className="form-control"
                                    name="OPER_MOST_IMPROVED"
                                    type="text"
                                    value={OPER_MOST_IMPROVED}
                                    onChange={this.onChangeOperMostImproved} />
                            </div>
                            <div className="field">
                                <label>OPER_LEAST_IMPROVED</label>
                                <input className="form-control"
                                    name="OPER_LEAST_IMPROVED"
                                    type="text"
                                    value={OPER_LEAST_IMPROVED}
                                    onChange={this.onChangeOperLeastImproved} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTALL</label>
                                <input className="form-control"
                                    name="OPER_OPTALL"
                                    type="text"
                                    value={OPER_OPTALL}
                                    onChange={this.onChangeOperAll} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTMOOD</label>
                                <input className="form-control"
                                    name="OPER_OPTMOOD"
                                    type="text"
                                    value={OPER_OPTMOOD}
                                    onChange={this.onChangeOperMood} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTMEANING</label>
                                <input className="form-control"
                                    name="OPER_OPTMEANING"
                                    type="text"
                                    value={OPER_OPTMEANING}
                                    onChange={this.onChangeOperMeaning} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTEXPECTATIONS</label>
                                <input className="form-control"
                                    name="OPER_OPTEXPECTATIONS"
                                    type="text"
                                    value={OPER_OPTEXPECTATIONS}
                                    onChange={this.onChangeOperExpectations} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTSTRENGTHS</label>
                                <input className="form-control"
                                    name="OPER_OPTSTRENGTHS"
                                    type="text"
                                    value={OPER_OPTSTRENGTHS}
                                    onChange={this.onChangeOperStrengths} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTRECOGNITION</label>
                                <input className="form-control"
                                    name="OPER_OPTRECOGNITION"
                                    type="text"
                                    value={OPER_OPTRECOGNITION}
                                    onChange={this.onChangeOperRecognition} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTDEVELOPMENT</label>
                                <input className="form-control"
                                    name="OPER_OPTDEVELOPMENT"
                                    type="text"
                                    value={OPER_OPTDEVELOPMENT}
                                    onChange={this.onChangeOperDevelopment} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTINFLUENCE</label>
                                <input className="form-control"
                                    name="OPER_OPTINFLUENCE"
                                    type="text"
                                    value={OPER_OPTINFLUENCE}
                                    onChange={this.onChangeOperInfluence} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTGOALS</label>
                                <input className="form-control"
                                    name="OPER_OPTGOALS"
                                    type="text"
                                    value={OPER_OPTGOALS}
                                    onChange={this.onChangeOperGoals} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTTEAM</label>
                                <input className="form-control"
                                    name="OPER_OPTTEAM"
                                    type="text"
                                    value={OPER_OPTTEAM}
                                    onChange={this.onChangeOperTeam} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTFRIENDSHIP</label>
                                <input className="form-control"
                                    name="OPER_OPTFRIENDSHIP"
                                    type="text"
                                    value={OPER_OPTFRIENDSHIP}
                                    onChange={this.onChangeOperFriendship} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTFEEDBACK</label>
                                <input className="form-control"
                                    name="OPER_OPTFEEDBACK"
                                    type="text"
                                    value={OPER_OPTFEEDBACK}
                                    onChange={this.onChangeOperFeedback} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTOPPORTUNITIES</label>
                                <input className="form-control"
                                    name="OPER_OPTOPPORTUNITIES"
                                    type="text"
                                    value={OPER_OPTOPPORTUNITIES}
                                    onChange={this.onChangeOperOpportunities} />
                            </div>
                            <div className="field">
                                <label>OPER_OPTRECOMMENDATION</label>
                                <input className="form-control"
                                    name="OPER_OPTRECOMMENDATION"
                                    type="text"
                                    value={OPER_OPTRECOMMENDATION}
                                    onChange={this.onChangeOperRecommendation} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitOpenendedRes}>Submit</button>
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
