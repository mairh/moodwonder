import React from 'react';
let LineChart = require("react-chartjs").Line;
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import Graphdata from 'utils/Graphdata';
import MoodRatings from 'utils/MoodRatings';
import QuickStatistics from 'utils/QuickStatistics';
import FullStar from 'components/FullStar.react';
import HalfStar from 'components/HalfStar.react';
import BlankStar from 'components/BlankStar.react';

let chartoptions = {
    animation: false,
    bezierCurve: false,
    datasetFill : false,
    showScale: true,
    scaleOverride: true,
    scaleShowVerticalLines: false,
    scaleGridLineWidth : 1,
    scaleSteps: 6,
    scaleStepWidth: 1,
    responsive: false,
    scaleStartValue: 0,
    scaleShowLabels: true,
    tooltipTemplate: "<%= value %>"
};

LineChart.prototype.titles = [];


export default class UsersSurveyStatistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            questions: [],
            surveyresults: [],
            lastsurvey: [],
            lastmood: [],
            graphperiod: 'all_time',
            graphengagement: 'mw_index',
            engagementgraphtab: true,
            quickstatisticstab: false,
            moodratingstab: false,
            companysurvey: [],
            industrysurvey: [],
            countrysurvey: [],
            engagedmanagers: [],
            currentuserid: '',
            totalcompanyusers: ''
        };
        this.engagementmoods = [];
        this.mooddropdown = false;
    }

    componentDidMount() {
        SurveyActions.getEngagementSurvey();
        console.log(this.props.user_id);
        SurveyActions.getEngagementResults(this.props.user_id);
        SurveyStore.listen(this._onMoodChange);

        $('.ui.menu .ui.dropdown').dropdown({
            on: 'click'
        });

        $('.graphperiod').dropdown({
            onChange: this.onChangeGraphPeriod
        });

        $('.graphengagement').dropdown({
            onChange: this.onChangeGraphEngagement
        });
    }

    componentDidUpdate () {
        if(this.mooddropdown) {
            $('.ui.menu .ui.dropdown').dropdown({
                on: 'click'
            });

            $('.graphengagement').dropdown({
                onChange: this.onChangeGraphEngagement
            });

            $('.graphperiod').dropdown({
                onChange: this.onChangeGraphPeriod
            });
        }
    }

    componentWillUnmount() {
        SurveyStore.unlisten(this._onMoodChange);
    }

    _onMoodChange = () => {
        this.setState({
            lastmood: SurveyStore.getState().lastmood,
            questions : SurveyStore.getState().questions,
            surveyresults: SurveyStore.getState().surveyresults,
            currentuserid: SurveyStore.getState().currentuserid
        });

        this.engagementmoods = this.state.questions.map((data, key) => {
            return data.mood;
        });
    }

    onPopupClose = (e) => {
        e.preventDefault();
        this.setState({ popup : false });
    }

    onPopupShow = (e) => {
        e.preventDefault();
        this.setState({ popup : true });
    }

    onChangeGraphPeriod = (value) => {
        console.log(value);
        this.setState({ graphperiod : value });
    }

    onChangeGraphEngagement = (value) => {
        console.log(value);
        this.setState({ graphengagement : value });
    }

    engagementGraphClick = (e) => {
        e.preventDefault();
        this.mooddropdown = true;
        this.setState({
            engagementgraphtab: true,
            quickstatisticstab : false,
            moodratingstab : false
        });
    }

    moodRatingsClick = (e) => {
        e.preventDefault();
        this.mooddropdown = false;
        this.setState({
            engagementgraphtab: false,
            quickstatisticstab : false,
            moodratingstab : true
        });
    }

    isFloat = (n) => {
        return n === +n && n !== (n|0);
    }

    getStars = (rating, star) => {
        let rate =  Math.abs(rating);
        let intRating =  parseInt(rate);
        let rows = [];
        for (let i = 0; i < intRating; i++) {
            rows.push(<FullStar star={star} />);
        }
        if (this.isFloat(rate)) {
            rows.push(<HalfStar star={star} />);
        }
        for (let j = 0; j < (4 - intRating); j++) {
            rows.push(<BlankStar />);
        }
        if (rows.length !== 5) {
            rows.push(<BlankStar />);
        }

        return rows;
    }

    render() {

        let surveyresults = this.state.surveyresults;
        let graphperiod = this.state.graphperiod;
        let graphengagement = this.state.graphengagement;
        let engagementgraphtab = this.state.engagementgraphtab;
        let moodratingstab = this.state.moodratingstab;
        let companysurvey = this.state.companysurvey;
        let currentuserid = this.state.currentuserid;

        let xlabel = [];
        let ydata = [];
        let yMoodData = [];

        // Start : Rate your mood
        let engagementmoods = this.engagementmoods;
        let moodoptions = '';
        moodoptions = engagementmoods.map((data, key) => {
            return (<option value={data}>{data}</option>);
        });
        // End : Rate your mood


        let moodGraph = Graphdata.getEngagementGraphData(graphperiod, 'Mood', surveyresults);
        let graphData = Graphdata.getEngagementGraphData(graphperiod, graphengagement, surveyresults);
        let engagementStatitics = Graphdata.getEngagementStatitics(graphperiod, graphengagement, surveyresults);

        // Start : MoodRatings
        let topThreeAreas = MoodRatings.getTopThreeAreas(surveyresults);
        let worstThreeAreas = MoodRatings.getWorstThreeAreas(surveyresults);
        let improvedAreas = MoodRatings.getMostImprovedAreas(surveyresults);
        let worstAreas = MoodRatings.getWorstImprovedAreas(surveyresults);
        let topThreeVsCompany = MoodRatings.getAreasVsCompany(companysurvey, currentuserid, '_TOP');
        let worstThreeVsCompany = MoodRatings.getAreasVsCompany(companysurvey, currentuserid, '_WORST');

        let topthree = topThreeAreas.map((data, key) => {

            let rows = this.getStars(data.rating, "green");

            return (
                <div className="column padding-ryt">
                    <div className="extra center aligned">
                        <p className="head">{data.rating}</p>
                        <div data-rating={data.rating} className="ui star rating">
                            {rows}
                        </div>
                        <div className="title">{data.mood}</div>
                    </div>
                </div>
            );
        });

        let worstthree = worstThreeAreas.map((data, key) => {

            let rows = this.getStars(data.rating, "red");

            return (
                <div className="column padding-ryt">
                    <div className="extra center aligned">
                        <p className="head">{data.rating}</p>
                        <div data-rating={data.rating} className="ui star rating">
                            {rows}
                        </div>
                        <div className="title">{data.mood}</div>
                    </div>
                </div>
            );
        });

        let improvedareas = improvedAreas.map((data, key) => {

            let rows = this.getStars(data.difference, "green");

            return (
                <div className="column padding-ryt">
                    <div className="extra center aligned">
                        <p className="head">{data.difference}</p>
                        <div data-rating={data.difference} className="ui star rating">
                            {rows}
                        </div>
                        <div className="title">{data.mood}</div>
                    </div>
                </div>
            );
        });

        let worstareas = worstAreas.map((data, key) => {

            let rows = this.getStars(data.difference, "red");

            return (
                <div className="column padding-ryt">
                    <div className="extra center aligned">
                        <p className="head">{data.difference}</p>
                        <div data-rating={data.difference} className="ui star rating">
                            {rows}
                        </div>
                        <div className="title">{data.mood}</div>
                    </div>
                </div>
            );
        });

        let topthreevscompany;
        if(topThreeVsCompany.length > 0) {
            topthreevscompany = topThreeVsCompany.map((data, key) => {

                let rows = this.getStars(data.avg, "green");

                return (
                    <div className="column padding-ryt">
                        <div className="extra center aligned">
                            <p className="head">{data.avg}</p>
                            <div data-rating={data.avg} className="ui star rating">
                                {rows}
                            </div>
                            <div className="title">{data.mood}</div>
                        </div>
                    </div>
                );
            });
        } else {
            topthreevscompany = (
                <div className="column padding-ryt">
                    <div className="extra center aligned">
                        <p className="head"></p>
                        <div className="ui star rating">
                            <i className="icon"></i>
                            <i className="icon"></i>
                            <i className="icon"></i>
                            <i className="icon"></i>
                            <i className="icon"></i>
                        </div>
                        <div className="title">You don't have any higher areas.</div>
                    </div>
                </div>
            );
        }

        let worstthreevscompany;
        if(worstThreeVsCompany.length > 0) {
            worstthreevscompany = worstThreeVsCompany.map((data, key) => {

                let rows = this.getStars(data.avg, "red");

                return (
                    <div className="column padding-ryt">
                        <div className="extra center aligned">
                            <p className="head">{data.avg}</p>
                            <div data-rating={data.avg} className="ui star rating">
                                {rows}
                            </div>
                            <div className="title">{data.mood}</div>
                        </div>
                    </div>
                );
            });
        } else {
            worstthreevscompany = (
                <div className="column padding-ryt">
                    <div className="extra center aligned">
                        <p className="head"></p>
                        <div className="ui star rating">
                            <i className="icon"></i>
                            <i className="icon"></i>
                            <i className="icon"></i>
                            <i className="icon"></i>
                            <i className="icon"></i>
                        </div>
                        <div className="title">You don't have any worst areas.</div>
                    </div>
                </div>
            );
        }

        // End : MoodRatings

        // Start : Quick Statistics
        let lastRatings = (QuickStatistics.getLastRatings(surveyresults)).reverse();

        let bCount = lastRatings.length - 1;
        let bIndex = 0;
        let bXLabel = [];
        let bYLdata = [];
        for(let data of lastRatings) {
            if(bIndex <= bCount) {
                bXLabel[bIndex] = data.mood;
                bYLdata[bIndex] = data.rating;
            }
            bIndex++;
        }

        let barchartdata =  barchartdata || {};
        let bardataset = {
            label: "Mood ratings",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: bYLdata
        };

        let bardatasets = [];
        bardatasets.push(bardataset);

        barchartdata.labels = bXLabel;
        barchartdata.datasets = bardatasets;
        // End : Quick Statistics


        // Start : Engagement Graph
        let count = graphData.length - 1;
        let index = 0;
        for(let data of graphData) {
            if(index <= count) {
                xlabel[index] = data.created.d;
                ydata[index] = data.rating;
            }
            index++;
        }

        let mIndex = 0;
        for(let mood of moodGraph) {
            if(mIndex <= count) {
                yMoodData[mIndex] = mood.rating;
            }
            mIndex++;
        }


        if (xlabel.length === 0) {
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);
            xlabel.push(year + '-' + month + '-' +day);
        }

        let chartdata =  chartdata || {};
        let data = {
            label: "First Dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: ydata
        };

        let mooddata = {
            label: "Second Dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(200,127,105,1)",
            pointColor: "rgba(200,127,105,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: yMoodData
        };

        let datasets = [];
        datasets.push(data);
        datasets.push(mooddata);

        chartdata.labels = xlabel;
        chartdata.datasets = datasets;
        // End : Engagement Graph

        let engagementGraphTabContent = '';
        if (engagementgraphtab) {
            engagementGraphTabContent = [
                <div className="ui bottom attached segment brdr-none menu">
                    <div className="ui  column stackable grid container">
                        <div className="column  brdr-none padding-none">
                            <div className="ui segment brdr-none padding-none ">
                                <div className=" right menu mobile">
                                    <select className="ui search dropdown graphengagement" name="graphengagement" onChange={this.onChangeGraphEngagement} value={graphengagement}>
                                        <option value="mw_index">MW-Index</option>
                                        {moodoptions}
                                    </select>
                                    <select className="ui dropdown graphperiod" name="graphperiod" onChange={this.onChangeGraphPeriod} value={graphperiod}>
                                        <option value="all_time">All time</option>
                                        <option value="last_12_months">Last 12 months</option>
                                        <option value="last_6_ months">Last 6 months</option>
                                        <option value="last_3_months">Last 3 months</option>
                                        <option value="last_month">Last month</option>
                                    </select>
                                </div>
                                <div className="clear"></div>
                                <div className="graph">
                                    <LineChart data={chartdata} options={chartoptions} width="800" height="250" redraw/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,

                <div className="clear"></div>,
                <div className="ui two column stackable grid ">
                    <div className="three column row padding-container">
                        <div className="column">
                            <div className="ui segment gry">At Start : {engagementStatitics.start}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">Highest : {engagementStatitics.highest}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">Lowest : {engagementStatitics.lowest}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">Current : {engagementStatitics.current}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">30 Days change : {engagementStatitics.thirtydayschange}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">Week change : {engagementStatitics.weekchange}</div>
                        </div>
                    </div>
                </div>
            ];
        }


        let moodRatingsTabContent = '';
        if (moodratingstab) {
            moodRatingsTabContent = (
                <div className="ui bottom attached segment brdr-none menu minus-margin-top-20">
                    <div className="ui segment brdr-none padding-none width-rating">
                        <div className="clear"></div>
                        <div className="ui two cards column stackable">

                            <div className="ui card  box-gry">
                                <div className="content box-gry-border">
                                    <div className="header">MY TOP THREE AREAS</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {topthree}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card box-gry">
                                <div className="content box-gry-border">
                                    <div className="header">MY WORST THREE AREAS</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container ">
                                        {worstthree}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">MY MOST IMPROVED AREAS (LAST 1 MONTH)</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {improvedareas}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">MY LEAST IMPROVED AREAS (LAST 1 MONTH)</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {worstareas}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">TOP 3 AREAS HIGHER THAN COMPANY AVERAGE</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {topthreevscompany}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">WORST 3 AREAS LOWER THAN COMPANY AVERAGE</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {worstthreevscompany}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="ui three cards  column stackable padding-20-mobile">
                            <div className="ui card box-white">
                                <div className="content  box-white-border">
                                    <div className="header two column">
                                        <div className="column"> <img src="assets/images/avatar/tom.jpg" alt="" /></div>
                                        <div className="column">
                                            MY LEAST IMPROVED AREAS
                                            <br/>
                                            <span className="small-title">(LAST ONE MONTH) </span>
                                        </div>
                                    </div>
                                    <div className="description"> No date available. Please add team members in your company. </div>
                                </div>
                                <div className="extra center aligned"> <a href="#">CLICK HERE</a> </div>
                            </div>
                            <div className="ui card box-white">
                                <div className="content  box-white-border">
                                    <div className="header two column">
                                        <div className="column"><img src="assets/images/avatar/tom.jpg" alt="" /></div>
                                        <div className="column">
                                            MY LEAST IMPROVED AREAS
                                            <br/>
                                            <span className="small-title">(LAST ONE MONTH)</span>
                                        </div>
                                    </div>
                                    <div className="description"> No date available. Please add team members in your company. </div>
                                </div>
                                <div className="extra center aligned"> <a href="#">CLICK HERE</a> </div>
                            </div>
                            <div className="ui card box-white">
                                <div className="content box-white-border">
                                    <div className="header two column">
                                        <div className="column"><img src="assets/images/avatar/tom.jpg" alt="" /> </div>
                                        <div className="column">
                                            ME vs COMPANIES
                                            <br/>
                                            <span className="small-title">(COUNTRY)</span>
                                        </div>
                                    </div>
                                    <div className="description"> No date available. Please add team members in your company. </div>
                                </div>
                                <div className="extra center aligned"> <a href="#">CLICK HERE</a> </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="ui tabular menu tab three column">
                    <a className="item mobile active column" onClick={this.engagementGraphClick} href="#"> Engagement Graph </a>
                    <a className="item mobile column" onClick={this.moodRatingsClick} href="#"> Mood Rating </a>
                </div>
                {engagementGraphTabContent}
                <div className="clear"></div>
                <br/><br/>
                <div className="clear"></div>
                {moodRatingsTabContent}

            </div>
        );
    }
}
