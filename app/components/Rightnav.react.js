import React from 'react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import QuickStatistics from 'utils/QuickStatistics';
import CompanyQuickStatistics from 'utils/CompanyQuickStatistics';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class Rightnav extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            surveyresults: [],
            companysurvey: [],
            currentuserid: '',
            totalcompanyusers: '',
            mwkeys: MlangStore.getState().mwkeys
        };
    }

    componentDidMount () {
        SurveyActions.getEngagementSurvey();
        SurveyActions.getEngagementResults('undefined'); // An undefined check on server.
        SurveyActions.getResultsByCompany();
        SurveyStore.listen(this._onMoodChange);
    }

    componentWillUnmount () {
        SurveyStore.unlisten(this._onMoodChange);
    }

    _onMoodChange = () => {
        this.setState({
            surveyresults: SurveyStore.getState().surveyresults,
            companysurvey: SurveyStore.getState().companysurvey,
            currentuserid: SurveyStore.getState().currentuserid,
            totalcompanyusers: SurveyStore.getState().totalcompanyusers
        });
    }


    render () {
        let surveyresults = this.state.surveyresults;
        let companysurvey = this.state.companysurvey;
        let currentuserid = this.state.currentuserid;
        let totalcompanyusers = (this.state.totalcompanyusers) ? this.state.totalcompanyusers : 0;
        let mlarray = this.state.mwkeys;

        let employeesAtRisk = CompanyQuickStatistics.getEmployeeAtRisk(companysurvey);
        let lastMonthResponses;
        let timeSinceLastPost;
        let lastRatings;

        let cPath = this.context.router.getCurrentPathname();
        let pages = ["/mycompany"];
        if( pages.indexOf(cPath) >= 0){
            //MyCompany Statistics.
            lastMonthResponses = CompanyQuickStatistics.getNumberOfResponses(companysurvey);
            timeSinceLastPost = CompanyQuickStatistics.getTimeSinceLastPosted(companysurvey);
            lastRatings = (CompanyQuickStatistics.getLastRatings(companysurvey)).reverse();

        } else {
            //MyMood Statistics.
            lastMonthResponses = QuickStatistics.getNumberOfResponses(surveyresults);
            timeSinceLastPost = QuickStatistics.getTimeSinceLastPosted(surveyresults, currentuserid);
            lastRatings = (QuickStatistics.getLastRatings(surveyresults)).reverse();
        }

        let responeHeader;
        if (lastRatings === undefined || lastRatings.length == 0) {
            responeHeader = '';
        } else {
            responeHeader = (<h4 className="ui header ryt">{GetText('RIGHT_SIDEBAR_RESPONSE_COMPARISON', mlarray)}</h4>);
        }

        let responseComparison = lastRatings.map((data, index) => {
            return [
                <div className="column padding-ryt response">
                    <div className="ui segment padding-20">
                        <p>{GetText('MW_OPT' + data.mood, mlarray)}</p>
                    </div>
                </div>,

                <div className="column padding-ryt response">
                    <div className="ui segment padding-20">
                        <p><meter min="0" max="5" low="3.1" high="4" optimum="5" value={data.rating} className="tab-ryt-meter"></meter></p>
                    </div>
                </div>
            ];
        });

        let days = '- ';
        if(!isNaN(timeSinceLastPost['day'])) {
            days = timeSinceLastPost['day'];
        }

        let hours = '- ';
        if(!isNaN(timeSinceLastPost['hour'])) {
            hours = timeSinceLastPost['hour'];
        }

        let mins = '- ';
        if(!isNaN(timeSinceLastPost['min'])) {
            mins = timeSinceLastPost['min'];
        }

        return (
            <div className="ui right fixed vertical menu ryt right-menu">
                <div className="ui segment ryt brdr-none">
                    <div className="item ryt">
                        <div className="ui segment ryt brdr-none">
                            <h4 className="ui header ryt">{GetText('RIGHT_SIDEBAR_QUICK_STATISTICS', mlarray)}</h4>
                            <div className="ui segment padding-10">
                                {GetText('RIGHT_SIDEBAR_NUMBER_OF_EMPLOYEES', mlarray)}
                                <span className="employees">{totalcompanyusers}</span>
                            </div>
                            <div className="ui segment padding-20 ">
                                {GetText('RIGHT_SIDEBAR_EMPLOYEES_AT_RISK', mlarray)}
                                <span className="risk">{employeesAtRisk}</span>
                            </div>
                            <div className="ui segment padding-30 ">
                                {GetText('RIGHT_SIDEBAR_NO_OF_RESPONSES', mlarray)}
                                <span className="last-month">{lastMonthResponses}</span>
                            </div>
                        </div>
                    </div>
                    <div className="item ryt">
                        <h4 className="ui header ryt">{GetText('RIGHT_SIDEBAR_TIME_SINCE_LAST_RESPONSE', mlarray)}</h4>
                        <div className="ui two column stackable grid">
                            <div className="three column row padding-top  ">
                                <div className="column padding-ryt">
                                    <div className="ui segment red-time">
                                        <p>{days} Days</p>
                                    </div>
                                </div>
                                <div className="column padding-ryt">
                                    <div className="ui segment red-time">
                                        <p>{hours} Hrs</p>
                                    </div>
                                </div>
                                <div className="column padding-ryt">
                                    <div className="ui segment red-time">
                                        <p>{mins} Mins</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item ryt">
                        {responeHeader}
                        <div className="ui two column stackable grid">
                            <div className="two column row padding-top">
                                {responseComparison}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Rightnav.contextTypes = { router: React.PropTypes.func };
