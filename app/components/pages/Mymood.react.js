import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Mymood extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            MYMD_EGRAPH: '',
            MYMD_MRATING: '',
            MYMD_CSURVEY: '',
            MYMD_OPTMWINDEX: '',
            MYMD_OPTMOOD: '',
            MYMD_OPTMEANING: '',
            MYMD_OPTEXPECTATIONS: '',
            MYMD_OPTSTRENGTHS: '',
            MYMD_OPTRECOGNITION: '',
            MYMD_OPTDEVELOPMENT: '',
            MYMD_OPTINFLUENCE: '',
            MYMD_OPTGOALS: '',
            MYMD_OPTTEAM: '',
            MYMD_OPTFRIENDSHIP: '',
            MYMD_OPTFEEDBACK: '',
            MYMD_OPTOPPORTUNITIES: '',
            MYMD_OPTRECOMMENDATION: '',
            MYMD_OPTALLTIME: '',
            MYMD_OPTTWELVE: '',
            MYMD_OPTSIX: '',
            MYMD_OPTTHREE: '',
            MYMD_OPTLASTMONTH: '',
            MYMD_ATSTART: '',
            MYMD_HIGHEST: '',
            MYMD_LOWEST: '',
            MYMD_CURRENT: '',
            MYMD_DAYS_CHANGE: '',
            MYMD_WEEK_CHANGE: '',
            MYMD_E_ENGAGEMENT: '',
            MYMD_MOST_ENGAGING: '',
            MYMD_TOPTHREEAREAS_HEADING: '',
            MYMD_WORSTTHREEAREAS_HEADING: '',
            MYMD_MOSTIMPROVEDAREAS_HEADING: '',
            MYMD_LEASTIMPROVEDAREAS_HEADING: '',
            MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING: '',
            MYMD_LOWERTHANCOMPANYAVERAGE_HEADING: '',
            MYMD_HIGHERCAVERAGE_EMPTYMSG: '',
            MYMD_LOWERCAVERAGE_EMPTYMSG: '',
            MYMD_SGENERATION_TITLE: '',
            MYMD_SLISTSBTN: '',
            MYMD_STITLE: '',
            MYMD_TITLE_PLCHOLDER: '',
            MYMD_SFREEZE_DATE: '',
            MYMD_TARGET_GROUP: '',
            MYMD_TARGETORG: '',
            MYMD_TORG_DEFAULT_OPTION: '',
            MYMD_TARGETSURVEY: '',
            MYMD_TSURVEY_DEFAULT_OPTION1: '',
            MYMD_TSURVEY_DEFAULT_OPTION2: '',
            MYMD_QNS_TITLE: '',
            MYMD_ADD_QNS: '',
            MYMD_SUBMIT_SURVEY: '',
            MYMD_QNSTITLE: '',
            MYMD_QNSPLCHLOLDER: '',
            MYMD_ANSTYPE_LBL: '',
            MYMD_ANSTYPE_DEFAULT: '',
            MYMD_CHILD_ADDBTN: '',
            MYMD_CHILD_CANCELBTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'mymood', language: this.state.language});
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
            MYMD_EGRAPH: pagedata.MYMD_EGRAPH,
            MYMD_MRATING: pagedata.MYMD_MRATING,
            MYMD_CSURVEY: pagedata.MYMD_CSURVEY,
            MYMD_OPTMWINDEX: pagedata.MYMD_OPTMWINDEX,
            MYMD_OPTMOOD: pagedata.MYMD_OPTMOOD,
            MYMD_OPTMEANING: pagedata.MYMD_OPTMEANING,
            MYMD_OPTEXPECTATIONS: pagedata.MYMD_OPTEXPECTATIONS,
            MYMD_OPTSTRENGTHS: pagedata.MYMD_OPTSTRENGTHS,
            MYMD_OPTRECOGNITION: pagedata.MYMD_OPTRECOGNITION,
            MYMD_OPTDEVELOPMENT: pagedata.MYMD_OPTDEVELOPMENT,
            MYMD_OPTINFLUENCE: pagedata.MYMD_OPTINFLUENCE,
            MYMD_OPTGOALS: pagedata.MYMD_OPTGOALS,
            MYMD_OPTTEAM: pagedata.MYMD_OPTTEAM,
            MYMD_OPTFRIENDSHIP: pagedata.MYMD_OPTFRIENDSHIP,
            MYMD_OPTFEEDBACK: pagedata.MYMD_OPTFEEDBACK,
            MYMD_OPTOPPORTUNITIES: pagedata.MYMD_OPTOPPORTUNITIES,
            MYMD_OPTRECOMMENDATION: pagedata.MYMD_OPTRECOMMENDATION,
            MYMD_OPTALLTIME: pagedata.MYMD_OPTALLTIME,
            MYMD_OPTTWELVE: pagedata.MYMD_OPTTWELVE,
            MYMD_OPTSIX: pagedata.MYMD_OPTSIX,
            MYMD_OPTTHREE: pagedata.MYMD_OPTTHREE,
            MYMD_OPTLASTMONTH: pagedata.MYMD_OPTLASTMONTH,
            MYMD_ATSTART: pagedata.MYMD_ATSTART,
            MYMD_HIGHEST: pagedata.MYMD_HIGHEST,
            MYMD_LOWEST: pagedata.MYMD_LOWEST,
            MYMD_CURRENT: pagedata.MYMD_CURRENT,
            MYMD_DAYS_CHANGE: pagedata.MYMD_DAYS_CHANGE,
            MYMD_WEEK_CHANGE: pagedata.MYMD_WEEK_CHANGE,
            MYMD_E_ENGAGEMENT: pagedata.MYMD_E_ENGAGEMENT,
            MYMD_MOST_ENGAGING: pagedata.MYMD_MOST_ENGAGING,
            MYMD_TOPTHREEAREAS_HEADING: pagedata.MYMD_TOPTHREEAREAS_HEADING,
            MYMD_WORSTTHREEAREAS_HEADING: pagedata.MYMD_WORSTTHREEAREAS_HEADING,
            MYMD_MOSTIMPROVEDAREAS_HEADING: pagedata.MYMD_MOSTIMPROVEDAREAS_HEADING,
            MYMD_LEASTIMPROVEDAREAS_HEADING: pagedata.MYMD_LEASTIMPROVEDAREAS_HEADING,
            MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING: pagedata.MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING,
            MYMD_LOWERTHANCOMPANYAVERAGE_HEADING: pagedata.MYMD_LOWERTHANCOMPANYAVERAGE_HEADING,
            MYMD_HIGHERCAVERAGE_EMPTYMSG: pagedata.MYMD_HIGHERCAVERAGE_EMPTYMSG,
            MYMD_LOWERCAVERAGE_EMPTYMSG: pagedata.MYMD_LOWERCAVERAGE_EMPTYMSG,
            MYMD_SGENERATION_TITLE: pagedata.MYMD_SGENERATION_TITLE,
            MYMD_SLISTSBTN: pagedata.MYMD_SLISTSBTN,
            MYMD_STITLE: pagedata.MYMD_STITLE,
            MYMD_TITLE_PLCHOLDER: pagedata.MYMD_TITLE_PLCHOLDER,
            MYMD_SFREEZE_DATE: pagedata.MYMD_SFREEZE_DATE,
            MYMD_TARGET_GROUP: pagedata.MYMD_TARGET_GROUP,
            MYMD_TARGETORG: pagedata.MYMD_TARGETORG,
            MYMD_TORG_DEFAULT_OPTION: pagedata.MYMD_TORG_DEFAULT_OPTION,
            MYMD_TARGETSURVEY: pagedata.MYMD_TARGETSURVEY,
            MYMD_TSURVEY_DEFAULT_OPTION1: pagedata.MYMD_TSURVEY_DEFAULT_OPTION1,
            MYMD_TSURVEY_DEFAULT_OPTION2: pagedata.MYMD_TSURVEY_DEFAULT_OPTION2,
            MYMD_QNS_TITLE: pagedata.MYMD_QNS_TITLE,
            MYMD_ADD_QNS: pagedata.MYMD_ADD_QNS,
            MYMD_SUBMIT_SURVEY: pagedata.MYMD_SUBMIT_SURVEY,
            MYMD_QNSTITLE: pagedata.MYMD_QNSTITLE,
            MYMD_QNSPLCHLOLDER: pagedata.MYMD_QNSPLCHLOLDER,
            MYMD_ANSTYPE_LBL: pagedata.MYMD_ANSTYPE_LBL,
            MYMD_ANSTYPE_DEFAULT: pagedata.MYMD_ANSTYPE_DEFAULT,
            MYMD_CHILD_ADDBTN: pagedata.MYMD_CHILD_ADDBTN,
            MYMD_CHILD_CANCELBTN: pagedata.MYMD_CHILD_CANCELBTN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitMymood = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    eGraph = (e) => {
        e.preventDefault();
        this.setState({ MYMD_EGRAPH: e.target.value });
    }
    mRating = (e) => {
        e.preventDefault();
        this.setState({ MYMD_MRATING: e.target.value });
    }
    cSurvey = (e) => {
        e.preventDefault();
        this.setState({ MYMD_CSURVEY: e.target.value });
    }
    mwIndex = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTMWINDEX: e.target.value });
    }
    mood = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTMOOD: e.target.value });
    }
    mymdMeaning = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTMEANING: e.target.value });
    }
    mymdExpectations = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTEXPECTATIONS: e.target.value });
    }
    mymdStrengths = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTSTRENGTHS: e.target.value });
    }
    mymdRecognition = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTRECOGNITION: e.target.value });
    }
    mymdDevelopment = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTDEVELOPMENT: e.target.value });
    }
    mymdInfluence = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTINFLUENCE: e.target.value });
    }
    mymdGoals = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTGOALS: e.target.value });
    }
    mymdTeam = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTTEAM: e.target.value });
    }
    mymdFriendship = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTFRIENDSHIP: e.target.value });
    }
    mymdFeedback = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTFEEDBACK: e.target.value });
    }
    mymdOpportunities = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTOPPORTUNITIES: e.target.value });
    }
    mymdRecommendation = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTRECOMMENDATION: e.target.value });
    }
    mymdAlltime = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTALLTIME: e.target.value });
    }
    mymdTwelve = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTTWELVE: e.target.value });
    }
    mymdSix = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTSIX: e.target.value });
    }
    mymdThree = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTTHREE: e.target.value });
    }
    mymdLastMonth = (e) => {
        e.preventDefault();
        this.setState({ MYMD_OPTLASTMONTH: e.target.value });
    }
    mymdAtStart = (e) => {
        e.preventDefault();
        this.setState({ MYMD_ATSTART: e.target.value });
    }
    mymdHighest = (e) => {
        e.preventDefault();
        this.setState({ MYMD_HIGHEST: e.target.value });
    }
    mymdLowest = (e) => {
        e.preventDefault();
        this.setState({ MYMD_LOWEST: e.target.value });
    }
    mymdCurrent = (e) => {
        e.preventDefault();
        this.setState({ MYMD_CURRENT: e.target.value });
    }
    mymdDaysChange = (e) => {
        e.preventDefault();
        this.setState({ MYMD_DAYS_CHANGE: e.target.value });
    }
    mymdWeekChange = (e) => {
        e.preventDefault();
        this.setState({ MYMD_WEEK_CHANGE: e.target.value });
    }
    mymdEngagement = (e) => {
        e.preventDefault();
        this.setState({ MYMD_E_ENGAGEMENT: e.target.value });
    }
    mymdMostEngaging = (e) => {
        e.preventDefault();
        this.setState({ MYMD_MOST_ENGAGING: e.target.value });
    }
    mymdTopThreeAreasHeading = (e) => {
        e.preventDefault();
        this.setState({ MYMD_TOPTHREEAREAS_HEADING: e.target.value });
    }
    mymdWorstThreeAreasHeading = (e) => {
        e.preventDefault();
        this.setState({ MYMD_WORSTTHREEAREAS_HEADING: e.target.value });
    }
    mymdMostImprovedAreasHeading = (e) => {
        e.preventDefault();
        this.setState({ MYMD_MOSTIMPROVEDAREAS_HEADING: e.target.value });
    }
    mymdLeastImprovedAreasHeading = (e) => {
        e.preventDefault();
        this.setState({ MYMD_LEASTIMPROVEDAREAS_HEADING: e.target.value });
    }
    mymdHigherThanCompanyAvgHeading = (e) => {
        e.preventDefault();
        this.setState({ MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING: e.target.value });
    }
    mymdLowerThanCompanyAvgHeading = (e) => {
        e.preventDefault();
        this.setState({ MYMD_LOWERTHANCOMPANYAVERAGE_HEADING: e.target.value });
    }
    mymdHigherAvgEmptyMsg = (e) => {
        e.preventDefault();
        this.setState({ MYMD_HIGHERCAVERAGE_EMPTYMSG: e.target.value });
    }
    mymdLowerAvgEmptyMsg = (e) => {
        e.preventDefault();
        this.setState({ MYMD_LOWERCAVERAGE_EMPTYMSG: e.target.value });
    }
    mymdGenerationTitle = (e) => {
        e.preventDefault();
        this.setState({ MYMD_SGENERATION_TITLE: e.target.value });
    }
    mymdListBtn = (e) => {
        e.preventDefault();
        this.setState({ MYMD_SLISTSBTN: e.target.value });
    }
    mymdSTitle = (e) => {
        e.preventDefault();
        this.setState({ MYMD_STITLE: e.target.value });
    }
    mymdTitlePlaceholder = (e) => {
        e.preventDefault();
        this.setState({ MYMD_TITLE_PLCHOLDER: e.target.value });
    }
    mymdFreezeDate = (e) => {
        e.preventDefault();
        this.setState({ MYMD_SFREEZE_DATE: e.target.value });
    }
    mymdTargetGroup = (e) => {
        e.preventDefault();
        this.setState({ MYMD_TARGET_GROUP: e.target.value });
    }
    mymdTargetOrg = (e) => {
        e.preventDefault();
        this.setState({ MYMD_TARGETORG: e.target.value });
    }
    mymdOrgDOption = (e) => {
        e.preventDefault();
        this.setState({ MYMD_TORG_DEFAULT_OPTION: e.target.value });
    }
    mymdTargetSurvey = (e) => {
        e.preventDefault();
        this.setState({ MYMD_TARGETSURVEY: e.target.value });
    }
    mymdTargetSurveyOptionOne = (e) => {
        e.preventDefault();
        this.setState({ MYMD_TSURVEY_DEFAULT_OPTION1: e.target.value });
    }
    mymdTargetSurveyOptionTwo = (e) => {
        e.preventDefault();
        this.setState({ MYMD_TSURVEY_DEFAULT_OPTION2: e.target.value });
    }
    mymdQnsTitle = (e) => {
        e.preventDefault();
        this.setState({ MYMD_QNS_TITLE: e.target.value });
    }
    mymdAddQns = (e) => {
        e.preventDefault();
        this.setState({ MYMD_ADD_QNS: e.target.value });
    }
    mymdSubmitSurvey = (e) => {
        e.preventDefault();
        this.setState({ MYMD_SUBMIT_SURVEY: e.target.value });
    }
    mymdQnsTitle = (e) => {
        e.preventDefault();
        this.setState({ MYMD_QNSTITLE: e.target.value });
    }
    mymdQnsPlaceholder = (e) => {
        e.preventDefault();
        this.setState({ MYMD_QNSPLCHLOLDER: e.target.value });
    }
    mymdAnsTypeLbl = (e) => {
        e.preventDefault();
        this.setState({ MYMD_ANSTYPE_LBL: e.target.value });
    }
    mymdAnsTypeDefault = (e) => {
        e.preventDefault();
        this.setState({ MYMD_ANSTYPE_DEFAULT: e.target.value });
    }
    mymdChildAdd = (e) => {
        e.preventDefault();
        this.setState({ MYMD_CHILD_ADDBTN: e.target.value });
    }
    mymdChildCancel = (e) => {
        e.preventDefault();
        this.setState({ MYMD_CHILD_CANCELBTN: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let MYMD_EGRAPH = this.state.MYMD_EGRAPH;
        let MYMD_MRATING = this.state.MYMD_MRATING;
        let MYMD_CSURVEY = this.state.MYMD_CSURVEY;
        let MYMD_OPTMWINDEX = this.state.MYMD_OPTMWINDEX;
        let MYMD_OPTMOOD = this.state.MYMD_OPTMOOD;
        let MYMD_OPTMEANING = this.state.MYMD_OPTMEANING;
        let MYMD_OPTEXPECTATIONS = this.state.MYMD_OPTEXPECTATIONS;
        let MYMD_OPTSTRENGTHS = this.state.MYMD_OPTSTRENGTHS;
        let MYMD_OPTRECOGNITION = this.state.MYMD_OPTRECOGNITION;
        let MYMD_OPTDEVELOPMENT = this.state.MYMD_OPTDEVELOPMENT;
        let MYMD_OPTINFLUENCE = this.state.MYMD_OPTINFLUENCE;
        let MYMD_OPTGOALS = this.state.MYMD_OPTGOALS;
        let MYMD_OPTTEAM = this.state.MYMD_OPTTEAM;
        let MYMD_OPTFRIENDSHIP = this.state.MYMD_OPTFRIENDSHIP;
        let MYMD_OPTFEEDBACK = this.state.MYMD_OPTFEEDBACK;
        let MYMD_OPTOPPORTUNITIES = this.state.MYMD_OPTOPPORTUNITIES;
        let MYMD_OPTRECOMMENDATION = this.state.MYMD_OPTRECOMMENDATION;
        let MYMD_OPTALLTIME = this.state.MYMD_OPTALLTIME;
        let MYMD_OPTTWELVE = this.state.MYMD_OPTTWELVE;
        let MYMD_OPTSIX = this.state.MYMD_OPTSIX;
        let MYMD_OPTTHREE = this.state.MYMD_OPTTHREE;
        let MYMD_OPTLASTMONTH = this.state.MYMD_OPTLASTMONTH;
        let MYMD_ATSTART = this.state.MYMD_ATSTART;
        let MYMD_HIGHEST = this.state.MYMD_HIGHEST;
        let MYMD_LOWEST = this.state.MYMD_LOWEST;
        let MYMD_CURRENT = this.state.MYMD_CURRENT;
        let MYMD_DAYS_CHANGE = this.state.MYMD_DAYS_CHANGE;
        let MYMD_WEEK_CHANGE = this.state.MYMD_WEEK_CHANGE;
        let MYMD_E_ENGAGEMENT = this.state.MYMD_E_ENGAGEMENT;
        let MYMD_MOST_ENGAGING = this.state.MYMD_MOST_ENGAGING;
        let MYMD_TOPTHREEAREAS_HEADING = this.state.MYMD_TOPTHREEAREAS_HEADING;
        let MYMD_WORSTTHREEAREAS_HEADING = this.state.MYMD_WORSTTHREEAREAS_HEADING;
        let MYMD_MOSTIMPROVEDAREAS_HEADING = this.state.MYMD_MOSTIMPROVEDAREAS_HEADING;
        let MYMD_LEASTIMPROVEDAREAS_HEADING = this.state.MYMD_LEASTIMPROVEDAREAS_HEADING;
        let MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING = this.state.MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING;
        let MYMD_LOWERTHANCOMPANYAVERAGE_HEADING = this.state.MYMD_LOWERTHANCOMPANYAVERAGE_HEADING;
        let MYMD_HIGHERCAVERAGE_EMPTYMSG = this.state.MYMD_HIGHERCAVERAGE_EMPTYMSG;
        let MYMD_LOWERCAVERAGE_EMPTYMSG = this.state.MYMD_LOWERCAVERAGE_EMPTYMSG;
        let MYMD_SGENERATION_TITLE = this.state.MYMD_SGENERATION_TITLE;
        let MYMD_SLISTSBTN = this.state.MYMD_SLISTSBTN;
        let MYMD_STITLE = this.state.MYMD_STITLE;
        let MYMD_TITLE_PLCHOLDER = this.state.MYMD_TITLE_PLCHOLDER;
        let MYMD_SFREEZE_DATE = this.state.MYMD_SFREEZE_DATE;
        let MYMD_TARGET_GROUP = this.state.MYMD_TARGET_GROUP;
        let MYMD_TARGETORG = this.state.MYMD_TARGETORG;
        let MYMD_TORG_DEFAULT_OPTION = this.state.MYMD_TORG_DEFAULT_OPTION;
        let MYMD_TARGETSURVEY = this.state.MYMD_TARGETSURVEY;
        let MYMD_TSURVEY_DEFAULT_OPTION1 = this.state.MYMD_TSURVEY_DEFAULT_OPTION1;
        let MYMD_TSURVEY_DEFAULT_OPTION2 = this.state.MYMD_TSURVEY_DEFAULT_OPTION2;
        let MYMD_QNS_TITLE = this.state.MYMD_QNS_TITLE;
        let MYMD_ADD_QNS = this.state.MYMD_ADD_QNS;
        let MYMD_SUBMIT_SURVEY = this.state.MYMD_SUBMIT_SURVEY;
        let MYMD_QNSTITLE = this.state.MYMD_QNSTITLE;
        let MYMD_QNSPLCHLOLDER = this.state.MYMD_QNSPLCHLOLDER;
        let MYMD_ANSTYPE_LBL = this.state.MYMD_ANSTYPE_LBL;
        let MYMD_ANSTYPE_DEFAULT = this.state.MYMD_ANSTYPE_DEFAULT;
        let MYMD_CHILD_ADDBTN = this.state.MYMD_CHILD_ADDBTN;
        let MYMD_CHILD_CANCELBTN = this.state.MYMD_CHILD_CANCELBTN;


        return (
            <div className="ui container">
                <h4>Edit - My mood page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="mymoodForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>MYMD_EGRAPH</label>
                                <input className="form-control"
                                    name="MYMD_EGRAPH"
                                    type="text"
                                    value={MYMD_EGRAPH}
                                    onChange={this.eGraph} />
                            </div>
                            <div className="field">
                                <label>MYMD_MRATING</label>
                                <input className="form-control"
                                    name="MYMD_MRATING"
                                    type="text"
                                    value={MYMD_MRATING}
                                    onChange={this.mRating} />
                            </div>
                            <div className="field">
                                <label>MYMD_CSURVEY</label>
                                <input className="form-control"
                                    name="MYMD_CSURVEY"
                                    type="text"
                                    value={MYMD_CSURVEY}
                                    onChange={this.cSurvey} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTMWINDEX</label>
                                <input className="form-control"
                                    name="MYMD_OPTMWINDEX"
                                    type="text"
                                    value={MYMD_OPTMWINDEX}
                                    onChange={this.mwIndex} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTMOOD</label>
                                <input className="form-control"
                                    name="MYMD_OPTMOOD"
                                    type="text"
                                    value={MYMD_OPTMOOD}
                                    onChange={this.mood} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTMEANING</label>
                                <input className="form-control"
                                    name="MYMD_OPTMEANING"
                                    type="text"
                                    value={MYMD_OPTMEANING}
                                    onChange={this.mymdMeaning} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTEXPECTATIONS</label>
                                <input className="form-control"
                                    name="MYMD_OPTEXPECTATIONS"
                                    type="text"
                                    value={MYMD_OPTEXPECTATIONS}
                                    onChange={this.mymdExpectations} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTSTRENGTHS</label>
                                <input className="form-control"
                                    name="MYMD_OPTSTRENGTHS"
                                    type="text"
                                    value={MYMD_OPTSTRENGTHS}
                                    onChange={this.mymdStrengths} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTRECOGNITION</label>
                                <input className="form-control"
                                    name="MYMD_OPTRECOGNITION"
                                    type="text"
                                    value={MYMD_OPTRECOGNITION}
                                    onChange={this.mymdRecognition} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTDEVELOPMENT</label>
                                <input className="form-control"
                                    name="MYMD_OPTDEVELOPMENT"
                                    type="text"
                                    value={MYMD_OPTDEVELOPMENT}
                                    onChange={this.mymdDevelopment} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTINFLUENCE</label>
                                <input className="form-control"
                                    name="MYMD_OPTINFLUENCE"
                                    type="text"
                                    value={MYMD_OPTINFLUENCE}
                                    onChange={this.mymdInfluence} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTGOALS</label>
                                <input className="form-control"
                                    name="MYMD_OPTGOALS"
                                    type="text"
                                    value={MYMD_OPTGOALS}
                                    onChange={this.mymdGoals} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTTEAM</label>
                                <input className="form-control"
                                    name="MYMD_OPTTEAM"
                                    type="text"
                                    value={MYMD_OPTTEAM}
                                    onChange={this.mymdTeam} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTFRIENDSHIP</label>
                                <input className="form-control"
                                    name="MYMD_OPTFRIENDSHIP"
                                    type="text"
                                    value={MYMD_OPTFRIENDSHIP}
                                    onChange={this.mymdFriendship} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTFEEDBACK</label>
                                <input className="form-control"
                                    name="MYMD_OPTFEEDBACK"
                                    type="text"
                                    value={MYMD_OPTFEEDBACK}
                                    onChange={this.mymdFeedback} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTOPPORTUNITIES</label>
                                <input className="form-control"
                                    name="MYMD_OPTOPPORTUNITIES"
                                    type="text"
                                    value={MYMD_OPTOPPORTUNITIES}
                                    onChange={this.mymdOpportunities} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTRECOMMENDATION</label>
                                <input className="form-control"
                                    name="MYMD_OPTRECOMMENDATION"
                                    type="text"
                                    value={MYMD_OPTRECOMMENDATION}
                                    onChange={this.mymdRecommendation} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTALLTIME</label>
                                <input className="form-control"
                                    name="MYMD_OPTALLTIME"
                                    type="text"
                                    value={MYMD_OPTALLTIME}
                                    onChange={this.mymdAlltime} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTTWELVE</label>
                                <input className="form-control"
                                    name="MYMD_OPTTWELVE"
                                    type="text"
                                    value={MYMD_OPTTWELVE}
                                    onChange={this.mymdTwelve} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTSIX</label>
                                <input className="form-control"
                                    name="MYMD_OPTSIX"
                                    type="text"
                                    value={MYMD_OPTSIX}
                                    onChange={this.mymdSix} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTTHREE</label>
                                <input className="form-control"
                                    name="MYMD_OPTTHREE"
                                    type="text"
                                    value={MYMD_OPTTHREE}
                                    onChange={this.mymdThree} />
                            </div>
                            <div className="field">
                                <label>MYMD_OPTLASTMONTH</label>
                                <input className="form-control"
                                    name="MYMD_OPTLASTMONTH"
                                    type="text"
                                    value={MYMD_OPTLASTMONTH}
                                    onChange={this.mymdLastMonth} />
                            </div>
                            <div className="field">
                                <label>MYMD_ATSTART</label>
                                <input className="form-control"
                                    name="MYMD_ATSTART"
                                    type="text"
                                    value={MYMD_ATSTART}
                                    onChange={this.mymdAtStart} />
                            </div>
                            <div className="field">
                                <label>MYMD_HIGHEST</label>
                                <input className="form-control"
                                    name="MYMD_HIGHEST"
                                    type="text"
                                    value={MYMD_HIGHEST}
                                    onChange={this.mymdHighest} />
                            </div>
                            <div className="field">
                                <label>MYMD_LOWEST</label>
                                <input className="form-control"
                                    name="MYMD_LOWEST"
                                    type="text"
                                    value={MYMD_LOWEST}
                                    onChange={this.mymdLowest} />
                            </div>
                            <div className="field">
                                <label>MYMD_CURRENT</label>
                                <input className="form-control"
                                    name="MYMD_CURRENT"
                                    type="text"
                                    value={MYMD_CURRENT}
                                    onChange={this.mymdCurrent} />
                            </div>
                            <div className="field">
                                <label>MYMD_DAYS_CHANGE</label>
                                <input className="form-control"
                                    name="MYMD_DAYS_CHANGE"
                                    type="text"
                                    value={MYMD_DAYS_CHANGE}
                                    onChange={this.mymdDaysChange} />
                            </div>
                            <div className="field">
                                <label>MYMD_WEEK_CHANGE</label>
                                <input className="form-control"
                                    name="MYMD_WEEK_CHANGE"
                                    type="text"
                                    value={MYMD_WEEK_CHANGE}
                                    onChange={this.mymdWeekChange} />
                            </div>
                            <div className="field">
                                <label>MYMD_E_ENGAGEMENT</label>
                                <input className="form-control"
                                    name="MYMD_E_ENGAGEMENT"
                                    type="text"
                                    value={MYMD_E_ENGAGEMENT}
                                    onChange={this.mymdEngagement} />
                            </div>
                            <div className="field">
                                <label>MYMD_MOST_ENGAGING</label>
                                <input className="form-control"
                                    name="MYMD_MOST_ENGAGING"
                                    type="text"
                                    value={MYMD_MOST_ENGAGING}
                                    onChange={this.mymdMostEngaging} />
                            </div>
                            <div className="field">
                                <label>MYMD_TOPTHREEAREAS_HEADING</label>
                                <input className="form-control"
                                    name="MYMD_TOPTHREEAREAS_HEADING"
                                    type="text"
                                    value={MYMD_TOPTHREEAREAS_HEADING}
                                    onChange={this.mymdTopThreeAreasHeading} />
                            </div>
                            <div className="field">
                                <label>MYMD_WORSTTHREEAREAS_HEADING</label>
                                <input className="form-control"
                                    name="MYMD_WORSTTHREEAREAS_HEADING"
                                    type="text"
                                    value={MYMD_WORSTTHREEAREAS_HEADING}
                                    onChange={this.mymdWorstThreeAreasHeading} />
                            </div>
                            <div className="field">
                                <label>MYMD_MOSTIMPROVEDAREAS_HEADING</label>
                                <input className="form-control"
                                    name="MYMD_MOSTIMPROVEDAREAS_HEADING"
                                    type="text"
                                    value={MYMD_MOSTIMPROVEDAREAS_HEADING}
                                    onChange={this.mymdMostImprovedAreasHeading} />
                            </div>
                            <div className="field">
                                <label>MYMD_LEASTIMPROVEDAREAS_HEADING</label>
                                <input className="form-control"
                                    name="MYMD_LEASTIMPROVEDAREAS_HEADING"
                                    type="text"
                                    value={MYMD_LEASTIMPROVEDAREAS_HEADING}
                                    onChange={this.mymdLeastImprovedAreasHeading} />
                            </div>
                            <div className="field">
                                <label>MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING</label>
                                <input className="form-control"
                                    name="MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING"
                                    type="text"
                                    value={MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING}
                                    onChange={this.mymdHigherThanCompanyAvgHeading} />
                            </div>
                            <div className="field">
                                <label>MYMD_LOWERTHANCOMPANYAVERAGE_HEADING</label>
                                <input className="form-control"
                                    name="MYMD_LOWERTHANCOMPANYAVERAGE_HEADING"
                                    type="text"
                                    value={MYMD_LOWERTHANCOMPANYAVERAGE_HEADING}
                                    onChange={this.mymdLowerThanCompanyAvgHeading} />
                            </div>
                            <div className="field">
                                <label>MYMD_HIGHERCAVERAGE_EMPTYMSG</label>
                                <input className="form-control"
                                    name="MYMD_HIGHERCAVERAGE_EMPTYMSG"
                                    type="text"
                                    value={MYMD_HIGHERCAVERAGE_EMPTYMSG}
                                    onChange={this.mymdHigherAvgEmptyMsg} />
                            </div>
                            <div className="field">
                                <label>MYMD_LOWERCAVERAGE_EMPTYMSG</label>
                                <input className="form-control"
                                    name="MYMD_LOWERCAVERAGE_EMPTYMSG"
                                    type="text"
                                    value={MYMD_LOWERCAVERAGE_EMPTYMSG}
                                    onChange={this.mymdLowerAvgEmptyMsg} />
                            </div>
                            <div className="field">
                                <label>MYMD_SGENERATION_TITLE</label>
                                <input className="form-control"
                                    name="MYMD_SGENERATION_TITLE"
                                    type="text"
                                    value={MYMD_SGENERATION_TITLE}
                                    onChange={this.mymdGenerationTitle} />
                            </div>
                            <div className="field">
                                <label>MYMD_SLISTSBTN</label>
                                <input className="form-control"
                                    name="MYMD_SLISTSBTN"
                                    type="text"
                                    value={MYMD_SLISTSBTN}
                                    onChange={this.mymdListBtn} />
                            </div>
                            <div className="field">
                                <label>MYMD_STITLE</label>
                                <input className="form-control"
                                    name="MYMD_STITLE"
                                    type="text"
                                    value={MYMD_STITLE}
                                    onChange={this.mymdSTitle} />
                            </div>
                            <div className="field">
                                <label>MYMD_TITLE_PLCHOLDER</label>
                                <input className="form-control"
                                    name="MYMD_TITLE_PLCHOLDER"
                                    type="text"
                                    value={MYMD_TITLE_PLCHOLDER}
                                    onChange={this.mymdTitlePlaceholder} />
                            </div>
                            <div className="field">
                                <label>MYMD_SFREEZE_DATE</label>
                                <input className="form-control"
                                    name="MYMD_SFREEZE_DATE"
                                    type="text"
                                    value={MYMD_SFREEZE_DATE}
                                    onChange={this.mymdFreezeDate} />
                            </div>
                            <div className="field">
                                <label>MYMD_TARGET_GROUP</label>
                                <input className="form-control"
                                    name="MYMD_TARGET_GROUP"
                                    type="text"
                                    value={MYMD_TARGET_GROUP}
                                    onChange={this.mymdTargetGroup} />
                            </div>
                            <div className="field">
                                <label>MYMD_TARGETORG</label>
                                <input className="form-control"
                                    name="MYMD_TARGETORG"
                                    type="text"
                                    value={MYMD_TARGETORG}
                                    onChange={this.mymdTargetOrg} />
                            </div>
                            <div className="field">
                                <label>MYMD_TORG_DEFAULT_OPTION</label>
                                <input className="form-control"
                                    name="MYMD_TORG_DEFAULT_OPTION"
                                    type="text"
                                    value={MYMD_TORG_DEFAULT_OPTION}
                                    onChange={this.mymdOrgDOption} />
                            </div>
                            <div className="field">
                                <label>MYMD_TARGETSURVEY</label>
                                <input className="form-control"
                                    name="MYMD_TARGETSURVEY"
                                    type="text"
                                    value={MYMD_TARGETSURVEY}
                                    onChange={this.mymdTargetSurvey} />
                            </div>
                            <div className="field">
                                <label>MYMD_TSURVEY_DEFAULT_OPTION1</label>
                                <input className="form-control"
                                    name="MYMD_TSURVEY_DEFAULT_OPTION1"
                                    type="text"
                                    value={MYMD_TSURVEY_DEFAULT_OPTION1}
                                    onChange={this.mymdTargetSurveyOptionOne} />
                            </div>
                            <div className="field">
                                <label>MYMD_TSURVEY_DEFAULT_OPTION2</label>
                                <input className="form-control"
                                    name="MYMD_TSURVEY_DEFAULT_OPTION2"
                                    type="text"
                                    value={MYMD_TSURVEY_DEFAULT_OPTION2}
                                    onChange={this.mymdTargetSurveyOptionTwo} />
                            </div>
                            <div className="field">
                                <label>MYMD_QNS_TITLE</label>
                                <input className="form-control"
                                    name="MYMD_QNS_TITLE"
                                    type="text"
                                    value={MYMD_QNS_TITLE}
                                    onChange={this.mymdQnsTitle} />
                            </div>
                            <div className="field">
                                <label>MYMD_ADD_QNS</label>
                                <input className="form-control"
                                    name="MYMD_ADD_QNS"
                                    type="text"
                                    value={MYMD_ADD_QNS}
                                    onChange={this.mymdAddQns} />
                            </div>
                            <div className="field">
                                <label>MYMD_SUBMIT_SURVEY</label>
                                <input className="form-control"
                                    name="MYMD_SUBMIT_SURVEY"
                                    type="text"
                                    value={MYMD_SUBMIT_SURVEY}
                                    onChange={this.mymdSubmitSurvey} />
                            </div>
                            <div className="field">
                                <label>MYMD_QNSTITLE</label>
                                <input className="form-control"
                                    name="MYMD_QNSTITLE"
                                    type="text"
                                    value={MYMD_QNSTITLE}
                                    onChange={this.mymdQnsTitle} />
                            </div>
                            <div className="field">
                                <label>MYMD_QNSPLCHLOLDER</label>
                                <input className="form-control"
                                    name="MYMD_QNSPLCHLOLDER"
                                    type="text"
                                    value={MYMD_QNSPLCHLOLDER}
                                    onChange={this.mymdQnsPlaceholder} />
                            </div>
                            <div className="field">
                                <label>MYMD_ANSTYPE_LBL</label>
                                <input className="form-control"
                                    name="MYMD_ANSTYPE_LBL"
                                    type="text"
                                    value={MYMD_ANSTYPE_LBL}
                                    onChange={this.mymdAnsTypeLbl} />
                            </div>
                            <div className="field">
                                <label>MYMD_ANSTYPE_DEFAULT</label>
                                <input className="form-control"
                                    name="MYMD_ANSTYPE_DEFAULT"
                                    type="text"
                                    value={MYMD_ANSTYPE_DEFAULT}
                                    onChange={this.mymdAnsTypeDefault} />
                            </div>
                            <div className="field">
                                <label>MYMD_CHILD_ADDBTN</label>
                                <input className="form-control"
                                    name="MYMD_CHILD_ADDBTN"
                                    type="text"
                                    value={MYMD_CHILD_ADDBTN}
                                    onChange={this.mymdChildAdd} />
                            </div>
                            <div className="field">
                                <label>MYMD_CHILD_CANCELBTN</label>
                                <input className="form-control"
                                    name="MYMD_CHILD_CANCELBTN"
                                    type="text"
                                    value={MYMD_CHILD_CANCELBTN}
                                    onChange={this.mymdChildCancel} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitMymood}>Submit</button>
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
