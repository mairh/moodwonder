import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Signuppage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            L_MYMOOD_LINK: '',
            L_MYACCOUNT_LINK: '',
            L_MYCOMPANY_LINK: '',
            L_CAST_VOTE: '',
            L_VIEW_VOTE: '',
            L_PARTICIPATE_SURVEYS: '',
            L_ENGAGEMENT_SURVEY: '',
            L_MOODRATE: '',
            L_INVITEPEOPLE: '',
            L_INVITE_PEOPLE_TITLE: '',
            L_INVITE_PEOPLE_DES: '',
            L_INVITE_INPUT_PLCHOLDER: '',
            L_INVITE_BTN: '',
            L_MYPROFILE_LINK: '',
            L_LOGOUT_LINK: '',
            TOP_RATE_YOURMOOD: '',
            TOP_RATE_YOUR_MOODDESC: '',
            TOP_RATE_YOUR_MOODBTN: '',
            TOP_RATE_YOUR_MOODANSWER_ALL_BTN: '',
            TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: '',
            TOP_RIGHT_SIDE_LOGOUT_LINK: '',
            RIGHT_SIDEBAR_QUICK_STATISTICS: '',
            RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: '',
            RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: '',
            RIGHT_SIDEBAR_NO_OF_RESPONSES: '',
            RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: '',
            RIGHT_SIDEBAR_RESPONSE_COMPARISON: '',
            MW_OPTMOOD: '',
            MW_OPTMEANING: '',
            MW_OPTEXPECTATIONS: '',
            MW_OPTSTRENGTHS: '',
            MW_OPTRECOGNITION: '',
            MW_OPTDEVELOPMENT: '',
            MW_OPTINFLUENCE: '',
            MW_OPTGOALS: '',
            MW_OPTTEAM: '',
            MW_OPTFRIENDSHIP: '',
            MW_OPTFEEDBACK: '',
            MW_OPTOPPORTUNITIES: '',
            MW_OPTRECOMMENDATION: '',
            MDL_COMMENT_HEADER: '',
            MDL_CLOSE_BTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'mwusertheme', language: this.state.language});
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
            L_MYMOOD_LINK: pagedata.L_MYMOOD_LINK,
            L_MYACCOUNT_LINK: pagedata.L_MYACCOUNT_LINK,
            L_MYCOMPANY_LINK: pagedata.L_MYCOMPANY_LINK,
            L_CAST_VOTE: pagedata.L_CAST_VOTE,
            L_VIEW_VOTE: pagedata.L_VIEW_VOTE,
            L_MY_SURVEYS: pagedata.L_MY_SURVEYS,
            L_PARTICIPATE_SURVEYS: pagedata.L_PARTICIPATE_SURVEYS,
            L_ENGAGEMENT_SURVEY: pagedata.L_ENGAGEMENT_SURVEY,
            L_CREATE_NEW_SURVEY: pagedata.L_CREATE_NEW_SURVEY,
            L_OPENENDED_RESPONSES: pagedata.L_OPENENDED_RESPONSES,
            L_MOODRATE: pagedata.L_MOODRATE,
            L_INVITEPEOPLE: pagedata.L_INVITEPEOPLE,
            L_INVITE_PEOPLE_TITLE: pagedata.L_INVITE_PEOPLE_TITLE,
            L_INVITE_PEOPLE_DES: pagedata.L_INVITE_PEOPLE_DES,
            L_INVITE_INPUT_PLCHOLDER: pagedata.L_INVITE_INPUT_PLCHOLDER,
            L_INVITE_BTN: pagedata.L_INVITE_BTN,
            L_MYPROFILE_LINK: pagedata.L_MYPROFILE_LINK,
            L_LOGOUT_LINK: pagedata.L_LOGOUT_LINK,
            TOP_RATE_YOURMOOD: pagedata.TOP_RATE_YOURMOOD,
            TOP_RATE_YOUR_MOODDESC: pagedata.TOP_RATE_YOUR_MOODDESC,
            TOP_RATE_YOUR_MOODBTN: pagedata.TOP_RATE_YOUR_MOODBTN,
            TOP_RATE_YOUR_MOODANSWER_ALL_BTN: pagedata.TOP_RATE_YOUR_MOODANSWER_ALL_BTN,
            TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: pagedata.TOP_RIGHT_SIDE_MY_ACCOUNT_LINK,
            TOP_RIGHT_SIDE_LOGOUT_LINK: pagedata.TOP_RIGHT_SIDE_LOGOUT_LINK,
            RIGHT_SIDEBAR_QUICK_STATISTICS: pagedata.RIGHT_SIDEBAR_QUICK_STATISTICS,
            RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: pagedata.RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES,
            RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: pagedata.RIGHT_SIDEBAR_EMPLOYEES_AT_RISK,
            RIGHT_SIDEBAR_NO_OF_RESPONSES: pagedata.RIGHT_SIDEBAR_NO_OF_RESPONSES,
            RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: pagedata.RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE,
            RIGHT_SIDEBAR_RESPONSE_COMPARISON: pagedata.RIGHT_SIDEBAR_RESPONSE_COMPARISON,
            MW_OPTMOOD: pagedata.MW_OPTMOOD,
            MW_OPTMEANING: pagedata.MW_OPTMEANING,
            MW_OPTEXPECTATIONS: pagedata.MW_OPTEXPECTATIONS,
            MW_OPTSTRENGTHS: pagedata.MW_OPTSTRENGTHS,
            MW_OPTRECOGNITION: pagedata.MW_OPTRECOGNITION,
            MW_OPTDEVELOPMENT: pagedata.MW_OPTDEVELOPMENT,
            MW_OPTINFLUENCE: pagedata.MW_OPTINFLUENCE,
            MW_OPTGOALS: pagedata.MW_OPTGOALS,
            MW_OPTTEAM: pagedata.MW_OPTTEAM,
            MW_OPTFRIENDSHIP: pagedata.MW_OPTFRIENDSHIP,
            MW_OPTFEEDBACK: pagedata.MW_OPTFEEDBACK,
            MW_OPTOPPORTUNITIES: pagedata.MW_OPTOPPORTUNITIES,
            MW_OPTRECOMMENDATION: pagedata.MW_OPTRECOMMENDATION,
            MDL_COMMENT_HEADER: pagedata.MDL_COMMENT_HEADER,
            MDL_CLOSE_BTN: pagedata.MDL_CLOSE_BTN
        });
    }

    onSubmitSignup = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeKeys = (e, key) => {
        e.preventDefault();
        this.setState({ [key]: e.target.value });
    }

    onChangeMymoodLink = (e) => {
        e.preventDefault();
        this.setState({ L_MYMOOD_LINK: e.target.value });
    }

    onChangeMyaccountLink = (e) => {
        e.preventDefault();
        this.setState({ L_MYACCOUNT_LINK: e.target.value });
    }

    onChangeMycompanyLink = (e) => {
        e.preventDefault();
        this.setState({ L_MYCOMPANY_LINK: e.target.value });
    }

    onChangeCastVote = (e) => {
        e.preventDefault();
        this.setState({ L_CAST_VOTE: e.target.value });
    }

    onChangeViewVote = (e) => {
        e.preventDefault();
        this.setState({ L_VIEW_VOTE: e.target.value });
    }

    onChangeMySurveys = (e) => {
        e.preventDefault();
        this.setState({ L_MY_SURVEYS: e.target.value });
    }

    onChangeParticipateSurveys = (e) => {
        e.preventDefault();
        this.setState({ L_PARTICIPATE_SURVEYS: e.target.value });
    }

    onChangeEngagementSurvey = (e) => {
        e.preventDefault();
        this.setState({ L_ENGAGEMENT_SURVEY: e.target.value });
    }

    onChangeCreateNewSurvey = (e) => {
        e.preventDefault();
        this.setState({ L_CREATE_NEW_SURVEY: e.target.value });
    }

    onChangeOpenendedResponses = (e) => {
        e.preventDefault();
        this.setState({ L_OPENENDED_RESPONSES: e.target.value });
    }

    onChangeInviteTitle = (e) => {
        e.preventDefault();
        this.setState({ L_INVITE_PEOPLE_TITLE: e.target.value });
    }

    onChangeInviteDes = (e) => {
        e.preventDefault();
        this.setState({ L_INVITE_PEOPLE_DES: e.target.value });
    }

    onChangeInputPlcholder = (e) => {
        e.preventDefault();
        this.setState({ L_INVITE_INPUT_PLCHOLDER: e.target.value });
    }

    onChangeInviteBtn = (e) => {
        e.preventDefault();
        this.setState({ L_INVITE_BTN: e.target.value });
    }

    onChangeMyprofileLink = (e) => {
        e.preventDefault();
        this.setState({ L_MYPROFILE_LINK: e.target.value });
    }

    onChangeLogoutLink = (e) => {
        e.preventDefault();
        this.setState({ L_LOGOUT_LINK: e.target.value });
    }

    onChangeTopRateYourmood = (e) => {
        e.preventDefault();
        this.setState({ TOP_RATE_YOURMOOD: e.target.value });
    }

    onChangeTopRateYourmoodDesc = (e) => {
        e.preventDefault();
        this.setState({ TOP_RATE_YOUR_MOODDESC: e.target.value });
    }

    onChangeTopRateYourmoodBtn = (e) => {
        e.preventDefault();
        this.setState({ TOP_RATE_YOUR_MOODBTN: e.target.value });
    }

    onChangeTopRateYourmoodAnswerAllBtn = (e) => {
        e.preventDefault();
        this.setState({ TOP_RATE_YOUR_MOODANSWER_ALL_BTN: e.target.value });
    }

    topRightSideMyAccountLink = (e) => {
        e.preventDefault();
        this.setState({ TOP_RIGHT_SIDE_MY_ACCOUNT_LINK: e.target.value });
    }

    topRightSideLogoutLink = (e) => {
        e.preventDefault();
        this.setState({ TOP_RIGHT_SIDE_LOGOUT_LINK: e.target.value });
    }

    rightSidebarQuickStatistics = (e) => {
        e.preventDefault();
        this.setState({ RIGHT_SIDEBAR_QUICK_STATISTICS: e.target.value });
    }

    rightSidebarNumberOfEmployees = (e) => {
        e.preventDefault();
        this.setState({ RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES: e.target.value });
    }

    rightSidebarEmployeesAtRisk = (e) => {
        e.preventDefault();
        this.setState({ RIGHT_SIDEBAR_EMPLOYEES_AT_RISK: e.target.value });
    }

    rightSidebarNoOfResponses = (e) => {
        e.preventDefault();
        this.setState({ RIGHT_SIDEBAR_NO_OF_RESPONSES: e.target.value });
    }

    rightSidebarTimeSinceLastResponse = (e) => {
        e.preventDefault();
        this.setState({ RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE: e.target.value });
    }

    rightSidebarResponseComparison = (e) => {
        e.preventDefault();
        this.setState({ RIGHT_SIDEBAR_RESPONSE_COMPARISON: e.target.value });
    }

    mwOptMood = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTMOOD: e.target.value });
    }

    mwOptMeaning = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTMEANING: e.target.value });
    }

    mwOptExpectations = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTEXPECTATIONS: e.target.value });
    }

    mwOptStrengths = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTSTRENGTHS: e.target.value });
    }

    mwOptRecognition = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTRECOGNITION: e.target.value });
    }

    mwOptDevelopment = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTDEVELOPMENT: e.target.value });
    }

    mwOptInfluence = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTINFLUENCE: e.target.value });
    }

    mwOptGoals = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTGOALS: e.target.value });
    }

    mwOptTeam = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTTEAM: e.target.value });
    }

    mwOptFriendship = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTFRIENDSHIP: e.target.value });
    }

    mwOptFeedback = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTFEEDBACK: e.target.value });
    }

    mwOptOpportunities = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTOPPORTUNITIES: e.target.value });
    }

    mwOptRecommendation = (e) => {
        e.preventDefault();
        this.setState({ MW_OPTRECOMMENDATION: e.target.value });
    }
    moodRateLink = (e) => {
        e.preventDefault();
        this.setState({ L_MOODRATE: e.target.value });
    }
    invitePeopleLink = (e) => {
        e.preventDefault();
        this.setState({ L_INVITEPEOPLE: e.target.value });
    }
    mdlCommentHeader = (e) => {
        e.preventDefault();
        this.setState({ MDL_COMMENT_HEADER: e.target.value });
    }
    mdlCloseBtn = (e) => {
        e.preventDefault();
        this.setState({ MDL_CLOSE_BTN: e.target.value });
    }


    render() {

        let pagedata = this.state.pagedata;
        let L_MYMOOD_LINK = this.state.L_MYMOOD_LINK;
        let L_MYACCOUNT_LINK = this.state.L_MYACCOUNT_LINK;
        let L_MYCOMPANY_LINK = this.state.L_MYCOMPANY_LINK;
        let L_CAST_VOTE = this.state.L_CAST_VOTE;
        let L_VIEW_VOTE = this.state.L_VIEW_VOTE;
        let L_MY_SURVEYS = this.state.L_MY_SURVEYS;
        let L_PARTICIPATE_SURVEYS = this.state.L_PARTICIPATE_SURVEYS;
        let L_ENGAGEMENT_SURVEY = this.state.L_ENGAGEMENT_SURVEY;
        let L_CREATE_NEW_SURVEY = this.state.L_CREATE_NEW_SURVEY;
        let L_OPENENDED_RESPONSES = this.state.L_OPENENDED_RESPONSES;
        let L_MOODRATE = this.state.L_MOODRATE;
        let L_INVITEPEOPLE = this.state.L_INVITEPEOPLE;
        let L_INVITE_PEOPLE_TITLE = this.state.L_INVITE_PEOPLE_TITLE;
        let L_INVITE_PEOPLE_DES = this.state.L_INVITE_PEOPLE_DES;
        let L_INVITE_INPUT_PLCHOLDER = this.state.L_INVITE_INPUT_PLCHOLDER;
        let L_INVITE_BTN = this.state.L_INVITE_BTN;
        let L_MYPROFILE_LINK = this.state.L_MYPROFILE_LINK;
        let L_LOGOUT_LINK = this.state.L_LOGOUT_LINK;
        let TOP_RATE_YOURMOOD = this.state.TOP_RATE_YOURMOOD;
        let TOP_RATE_YOUR_MOODDESC = this.state.TOP_RATE_YOUR_MOODDESC;
        let TOP_RATE_YOUR_MOODBTN = this.state.TOP_RATE_YOUR_MOODBTN;
        let TOP_RATE_YOUR_MOODANSWER_ALL_BTN = this.state.TOP_RATE_YOUR_MOODANSWER_ALL_BTN;
        let TOP_RIGHT_SIDE_MY_ACCOUNT_LINK = this.state.TOP_RIGHT_SIDE_MY_ACCOUNT_LINK;
        let TOP_RIGHT_SIDE_LOGOUT_LINK = this.state.TOP_RIGHT_SIDE_LOGOUT_LINK;
        let RIGHT_SIDEBAR_QUICK_STATISTICS = this.state.RIGHT_SIDEBAR_QUICK_STATISTICS;
        let RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES = this.state.RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES;
        let RIGHT_SIDEBAR_EMPLOYEES_AT_RISK = this.state.RIGHT_SIDEBAR_EMPLOYEES_AT_RISK;
        let RIGHT_SIDEBAR_NO_OF_RESPONSES = this.state.RIGHT_SIDEBAR_NO_OF_RESPONSES;
        let RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE = this.state.RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE;
        let RIGHT_SIDEBAR_RESPONSE_COMPARISON = this.state.RIGHT_SIDEBAR_RESPONSE_COMPARISON;
        let MW_OPTMOOD = this.state.MW_OPTMOOD;
        let MW_OPTMEANING = this.state.MW_OPTMEANING;
        let MW_OPTEXPECTATIONS = this.state.MW_OPTEXPECTATIONS;
        let MW_OPTSTRENGTHS = this.state.MW_OPTSTRENGTHS;
        let MW_OPTRECOGNITION = this.state.MW_OPTRECOGNITION;
        let MW_OPTDEVELOPMENT = this.state.MW_OPTDEVELOPMENT;
        let MW_OPTINFLUENCE = this.state.MW_OPTINFLUENCE;
        let MW_OPTGOALS = this.state.MW_OPTGOALS;
        let MW_OPTTEAM = this.state.MW_OPTTEAM;
        let MW_OPTFRIENDSHIP = this.state.MW_OPTFRIENDSHIP;
        let MW_OPTFEEDBACK = this.state.MW_OPTFEEDBACK;
        let MW_OPTOPPORTUNITIES = this.state.MW_OPTOPPORTUNITIES;
        let MW_OPTRECOMMENDATION = this.state.MW_OPTRECOMMENDATION;
        let MDL_COMMENT_HEADER = this.state.MDL_COMMENT_HEADER;
        let MDL_CLOSE_BTN = this.state.MDL_CLOSE_BTN;


        return (
            <div className="ui container">
                <h4>Edit - Mw user theme page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="mwuserthemeForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>L_MYMOOD_LINK</label>
                                <input className="form-control"
                                    name="L_MYMOOD_LINK"
                                    type="text"
                                    value={L_MYMOOD_LINK}
                                    onChange={this.onChangeMymoodLink} />
                            </div>

                            <div className="field">
                                <label>L_MYACCOUNT_LINK</label>
                                <input className="form-control"
                                    name="L_MYACCOUNT_LINK"
                                    type="text"
                                    value={L_MYACCOUNT_LINK}
                                    onChange={this.onChangeMyaccountLink} />
                            </div>

                            <div className="field">
                                <label>L_MYCOMPANY_LINK</label>
                                <input className="form-control"
                                    name="L_MYCOMPANY_LINK"
                                    type="text"
                                    value={L_MYCOMPANY_LINK}
                                    onChange={this.onChangeMycompanyLink} />
                            </div>

                            <div className="field">
                                <label>L_CAST_VOTE</label>
                                <input className="form-control"
                                    name="L_CAST_VOTE"
                                    type="text"
                                    value={L_CAST_VOTE}
                                    onChange={this.onChangeCastVote} />
                            </div>

                            <div className="field">
                                <label>L_VIEW_VOTE</label>
                                <input className="form-control"
                                    name="L_VIEW_VOTE"
                                    type="text"
                                    value={L_VIEW_VOTE}
                                    onChange={this.onChangeViewVote} />
                            </div>

                            <div className="field">
                                <label>L_MY_SURVEYS</label>
                                <input className="form-control"
                                    name="L_MY_SURVEYS"
                                    type="text"
                                    value={L_MY_SURVEYS}
                                    onChange={this.onChangeMySurveys} />
                            </div>

                            <div className="field">
                                <label>L_PARTICIPATE_SURVEYS</label>
                                <input className="form-control"
                                    name="L_PARTICIPATE_SURVEYS"
                                    type="text"
                                    value={L_PARTICIPATE_SURVEYS}
                                    onChange={this.onChangeParticipateSurveys} />
                            </div>

                            <div className="field">
                                <label>L_ENGAGEMENT_SURVEY</label>
                                <input className="form-control"
                                    name="L_ENGAGEMENT_SURVEY"
                                    type="text"
                                    value={L_ENGAGEMENT_SURVEY}
                                    onChange={this.onChangeEngagementSurvey} />
                            </div>

                            <div className="field">
                                <label>L_CREATE_NEW_SURVEY</label>
                                <input className="form-control"
                                    name="L_CREATE_NEW_SURVEY"
                                    type="text"
                                    value={L_CREATE_NEW_SURVEY}
                                    onChange={this.onChangeCreateNewSurvey} />
                            </div>

                            <div className="field">
                                <label>L_OPENENDED_RESPONSES</label>
                                <input className="form-control"
                                    name="L_OPENENDED_RESPONSES"
                                    type="text"
                                    value={L_OPENENDED_RESPONSES}
                                    onChange={this.onChangeOpenendedResponses} />
                            </div>

                            <div className="field">
                                <label>L_MOODRATE</label>
                                <input className="form-control"
                                    name="L_MOODRATE"
                                    type="text"
                                    value={L_MOODRATE}
                                    onChange={this.moodRateLink} />
                            </div>

                            <div className="field">
                                <label>L_INVITEPEOPLE</label>
                                <input className="form-control"
                                    name="L_INVITEPEOPLE"
                                    type="text"
                                    value={L_INVITEPEOPLE}
                                    onChange={this.invitePeopleLink} />
                            </div>

                            <div className="field">
                                <label>L_INVITE_PEOPLE_TITLE</label>
                                <input className="form-control"
                                    name="L_INVITE_PEOPLE_TITLE"
                                    type="text"
                                    value={L_INVITE_PEOPLE_TITLE}
                                    onChange={this.onChangeInviteTitle} />
                            </div>

                            <div className="field">
                                <label>L_INVITE_PEOPLE_DES</label>
                                <input className="form-control"
                                    name="L_INVITE_PEOPLE_DES"
                                    type="text"
                                    value={L_INVITE_PEOPLE_DES}
                                    onChange={this.onChangeInviteDes} />
                            </div>

                            <div className="field">
                                <label>L_INVITE_INPUT_PLCHOLDER</label>
                                <input className="form-control"
                                    name="L_INVITE_INPUT_PLCHOLDER"
                                    type="text"
                                    value={L_INVITE_INPUT_PLCHOLDER}
                                    onChange={this.onChangeInputPlcholder} />
                            </div>

                            <div className="field">
                                <label>L_INVITE_BTN</label>
                                <input className="form-control"
                                    name="L_INVITE_BTN"
                                    type="text"
                                    value={L_INVITE_BTN}
                                    onChange={this.onChangeInviteBtn} />
                            </div>

                            <div className="field">
                                <label>L_MYPROFILE_LINK</label>
                                <input className="form-control"
                                    name="L_MYPROFILE_LINK"
                                    type="text"
                                    value={L_MYPROFILE_LINK}
                                    onChange={this.onChangeMyprofileLink} />
                            </div>

                            <div className="field">
                                <label>L_LOGOUT_LINK</label>
                                <input className="form-control"
                                    name="L_LOGOUT_LINK"
                                    type="text"
                                    value={L_LOGOUT_LINK}
                                    onChange={this.onChangeLogoutLink} />
                            </div>

                            <div className="field">
                                <label>TOP_RATE_YOURMOOD</label>
                                <input className="form-control"
                                    name="TOP_RATE_YOURMOOD"
                                    type="text"
                                    value={TOP_RATE_YOURMOOD}
                                    onChange={this.onChangeTopRateYourmood} />
                            </div>

                            <div className="field">
                                <label>TOP_RATE_YOUR_MOODDESC</label>
                                <input className="form-control"
                                    name="TOP_RATE_YOUR_MOODDESC"
                                    type="text"
                                    value={TOP_RATE_YOUR_MOODDESC}
                                    onChange={this.onChangeTopRateYourmoodDesc} />
                            </div>

                            <div className="field">
                                <label>TOP_RATE_YOUR_MOODBTN</label>
                                <input className="form-control"
                                    name="TOP_RATE_YOUR_MOODBTN"
                                    type="text"
                                    value={TOP_RATE_YOUR_MOODBTN}
                                    onChange={this.onChangeTopRateYourmoodBtn} />
                            </div>

                            <div className="field">
                                <label>TOP_RATE_YOUR_MOODANSWER_ALL_BTN</label>
                                <input className="form-control"
                                    name="TOP_RATE_YOUR_MOODANSWER_ALL_BTN"
                                    type="text"
                                    value={TOP_RATE_YOUR_MOODANSWER_ALL_BTN}
                                    onChange={this.onChangeTopRateYourmoodAnswerAllBtn} />
                            </div>

                            <div className="field">
                                <label>TOP_RIGHT_SIDE_MY_ACCOUNT_LINK</label>
                                <input className="form-control"
                                    name="TOP_RIGHT_SIDE_MY_ACCOUNT_LINK"
                                    type="text"
                                    value={TOP_RIGHT_SIDE_MY_ACCOUNT_LINK}
                                    onChange={this.topRightSideMyAccountLink} />
                            </div>

                            <div className="field">
                                <label>TOP_RIGHT_SIDE_LOGOUT_LINK</label>
                                <input className="form-control"
                                    name="TOP_RIGHT_SIDE_LOGOUT_LINK"
                                    type="text"
                                    value={TOP_RIGHT_SIDE_LOGOUT_LINK}
                                    onChange={this.topRightSideLogoutLink} />
                            </div>

                            <div className="field">
                                <label>RIGHT_SIDEBAR_QUICK_STATISTICS</label>
                                <input className="form-control"
                                    name="RIGHT_SIDEBAR_QUICK_STATISTICS"
                                    type="text"
                                    value={RIGHT_SIDEBAR_QUICK_STATISTICS}
                                    onChange={this.rightSidebarQuickStatistics} />
                            </div>

                            <div className="field">
                                <label>RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES</label>
                                <input className="form-control"
                                    name="RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES"
                                    type="text"
                                    value={RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES}
                                    onChange={this.rightSidebarNumberOfEmployees} />
                            </div>

                            <div className="field">
                                <label>RIGHT_SIDEBAR_EMPLOYEES_AT_RISK</label>
                                <input className="form-control"
                                    name="RIGHT_SIDEBAR_EMPLOYEES_AT_RISK"
                                    type="text"
                                    value={RIGHT_SIDEBAR_EMPLOYEES_AT_RISK}
                                    onChange={this.rightSidebarEmployeesAtRisk} />
                            </div>

                            <div className="field">
                                <label>RIGHT_SIDEBAR_NO_OF_RESPONSES</label>
                                <input className="form-control"
                                    name="RIGHT_SIDEBAR_NO_OF_RESPONSES"
                                    type="text"
                                    value={RIGHT_SIDEBAR_NO_OF_RESPONSES}
                                    onChange={this.rightSidebarNoOfResponses} />
                            </div>

                            <div className="field">
                                <label>RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE</label>
                                <input className="form-control"
                                    name="RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE"
                                    type="text"
                                    value={RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE}
                                    onChange={this.rightSidebarTimeSinceLastResponse} />
                            </div>

                            <div className="field">
                                <label>RIGHT_SIDEBAR_RESPONSE_COMPARISON</label>
                                <input className="form-control"
                                    name="RIGHT_SIDEBAR_RESPONSE_COMPARISON"
                                    type="text"
                                    value={RIGHT_SIDEBAR_RESPONSE_COMPARISON}
                                    onChange={this.rightSidebarResponseComparison} />
                            </div>

                            <div className="field">
                                <label>MW_OPTMOOD</label>
                                <input className="form-control"
                                    name="MW_OPTMOOD"
                                    type="text"
                                    value={MW_OPTMOOD}
                                    onChange={this.mwOptMood} />
                            </div>

                            <div className="field">
                                <label>MW_OPTMEANING</label>
                                <input className="form-control"
                                    name="MW_OPTMEANING"
                                    type="text"
                                    value={MW_OPTMEANING}
                                    onChange={this.mwOptMeaning} />
                            </div>

                            <div className="field">
                                <label>MW_OPTEXPECTATIONS</label>
                                <input className="form-control"
                                    name="MW_OPTEXPECTATIONS"
                                    type="text"
                                    value={MW_OPTEXPECTATIONS}
                                    onChange={this.mwOptExpectations} />
                            </div>

                            <div className="field">
                                <label>MW_OPTSTRENGTHS</label>
                                <input className="form-control"
                                    name="MW_OPTSTRENGTHS"
                                    type="text"
                                    value={MW_OPTSTRENGTHS}
                                    onChange={this.mwOptStrengths} />
                            </div>

                            <div className="field">
                                <label>MW_OPTRECOGNITION</label>
                                <input className="form-control"
                                    name="MW_OPTRECOGNITION"
                                    type="text"
                                    value={MW_OPTRECOGNITION}
                                    onChange={this.mwOptRecognition} />
                            </div>

                            <div className="field">
                                <label>MW_OPTDEVELOPMENT</label>
                                <input className="form-control"
                                    name="MW_OPTDEVELOPMENT"
                                    type="text"
                                    value={MW_OPTDEVELOPMENT}
                                    onChange={this.mwOptDevelopment} />
                            </div>

                            <div className="field">
                                <label>MW_OPTINFLUENCE</label>
                                <input className="form-control"
                                    name="MW_OPTINFLUENCE"
                                    type="text"
                                    value={MW_OPTINFLUENCE}
                                    onChange={this.mwOptInfluence} />
                            </div>

                            <div className="field">
                                <label>MW_OPTGOALS</label>
                                <input className="form-control"
                                    name="MW_OPTGOALS"
                                    type="text"
                                    value={MW_OPTGOALS}
                                    onChange={this.mwOptGoals} />
                            </div>

                            <div className="field">
                                <label>MW_OPTTEAM</label>
                                <input className="form-control"
                                    name="MW_OPTTEAM"
                                    type="text"
                                    value={MW_OPTTEAM}
                                    onChange={this.mwOptTeam} />
                            </div>

                            <div className="field">
                                <label>MW_OPTFRIENDSHIP</label>
                                <input className="form-control"
                                    name="MW_OPTFRIENDSHIP"
                                    type="text"
                                    value={MW_OPTFRIENDSHIP}
                                    onChange={this.mwOptFriendship} />
                            </div>

                            <div className="field">
                                <label>MW_OPTFEEDBACK</label>
                                <input className="form-control"
                                    name="MW_OPTFEEDBACK"
                                    type="text"
                                    value={MW_OPTFEEDBACK}
                                    onChange={this.mwOptFeedback} />
                            </div>

                            <div className="field">
                                <label>MW_OPTOPPORTUNITIES</label>
                                <input className="form-control"
                                    name="MW_OPTOPPORTUNITIES"
                                    type="text"
                                    value={MW_OPTOPPORTUNITIES}
                                    onChange={this.mwOptOpportunities} />
                            </div>

                            <div className="field">
                                <label>MW_OPTRECOMMENDATION</label>
                                <input className="form-control"
                                    name="MW_OPTRECOMMENDATION"
                                    type="text"
                                    value={MW_OPTRECOMMENDATION}
                                    onChange={this.mwOptRecommendation} />
                            </div>
                            <div className="field">
                                <label>MDL_COMMENT_HEADER</label>
                                <input className="form-control"
                                    name="MDL_COMMENT_HEADER"
                                    type="text"
                                    value={MDL_COMMENT_HEADER}
                                    onChange={this.mdlCommentHeader} />
                            </div>
                            <div className="field">
                                <label>MDL_CLOSE_BTN</label>
                                <input className="form-control"
                                    name="MDL_CLOSE_BTN"
                                    type="text"
                                    value={MDL_CLOSE_BTN}
                                    onChange={this.mdlCloseBtn} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitSignup}>Submit</button>
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
