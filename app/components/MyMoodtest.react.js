import React from 'react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import Graphdata from 'utils/Graphdata';
import MoodRatings from 'utils/MoodRatings';
import QuickStatistics from 'utils/QuickStatistics';
import FullStar from 'components/FullStar.react';
import HalfStar from 'components/HalfStar.react';
import BlankStar from 'components/BlankStar.react';
import HalfDaughnut from 'components/HalfDaughnut.react';
let LineChart = require("react-chartjs").Line;

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

export default class MyMoodtest extends React.Component {

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
        SurveyActions.getEngagementResults();
        SurveyActions.getResultsByCompany();
        SurveyActions.getResultsByIndustry();
        SurveyActions.getResultsByCountry();
        SurveyActions.getMostEngagingManagers();
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

        google.load('visualization', '1.1', {packages: ['corechart']});
        google.setOnLoadCallback(drawChart);

        function drawChart() {

            let data = new google.visualization.DataTable();
            data.addColumn('date', 'year');
            data.addColumn('number', '');
            data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
            data.addColumn('number', '');
            data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
            data.addRows([
                [new Date(2004, 12, 5), 5, createCustomHTMLContent(1000, ''), 2.6, createCustomHTMLContent(400, '')],
                [new Date(2005, 3, 1), 1.1, createCustomHTMLContent(1170, 'comment'), 5, createCustomHTMLContent(460, '')],
                [new Date(2006, 11, 24), 4, createCustomHTMLContent(660, 'S'), 3.1, createCustomHTMLContent(1120, 'comment')],
                [new Date(2007, 12, 8), 3.3, createCustomHTMLContent(1030, ''), 2, createCustomHTMLContent(540, '')],
                [new Date(2008, 7, 18), 2.8, createCustomHTMLContent(700, 'nul'), 4.7, createCustomHTMLContent(640, 'B')],
                [new Date(2008, 1, 30), 4.2, createCustomHTMLContent(930, ''), 0.8, createCustomHTMLContent(840, '')],
                [new Date(2008, 4, 12), 4.2, createCustomHTMLContent(930, ''), 0.8, createCustomHTMLContent(840, '')],
                [new Date(2009, 7, 21), 4.2, createCustomHTMLContent(930, ''), 0.8, createCustomHTMLContent(840, '')]
            ]);

            let options = {
                tooltip: {isHtml: true},
                title: '',
                pointSize: 6,
                pointColor: '#ffffff',
                vAxis: {
                    viewWindowMode: 'explicit',
                    viewWindow: {
                        max: 6,
                        min: 0
                    },
                    gridlines: {
                        color: '#CFD8DC'
                    },
                    baselineColor: '#CFD8DC'
                },
                hAxis: {
                    gridlines: {
                        color: 'transparent'
                    }
                },
                legend: 'none',
                series: {
                    0: {color: '#528CF1'},
                    1: {color: '#FFCA28'}
                }

            };

            let chart = new google.visualization.LineChart(document.getElementById('chart_div'));

            google.visualization.events.addListener(chart, 'ready', function () {
                $('circle').each(function () {
                    let $c = $(this);

                    let circles = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    circles.setAttribute("cx", $c.attr('cx'));
                    circles.setAttribute("cy", $c.attr('cy'));
                    circles.setAttribute("r", $c.attr('r'));
                    circles.setAttribute("fill", $c.attr('fill'));
                    this.parentElement.appendChild(circles);
                });
            });

            chart.draw(data, options);
        }

        function createCustomHTMLContent (rating, text) {
            return '<div>' + rating + '<br/>' + text + '</div>';
        }

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
            companysurvey: SurveyStore.getState().companysurvey,
            industrysurvey: SurveyStore.getState().industrysurvey,
            countrysurvey: SurveyStore.getState().countrysurvey,
            currentuserid: SurveyStore.getState().currentuserid,
            engagedmanagers: SurveyStore.getState().engagedmanagers,
            totalcompanyusers: SurveyStore.getState().totalcompanyusers
        });

        this.engagementmoods = this.state.questions.map((data, key) => {
            return data.mood;
        });

        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let datestring = year + '-' + month + '-' + day;

        if (this.state.lastmood == null || this.state.lastmood == 'undefined') {
            window.location.assign('/survey');
        } else {

            let lastSurveyPosted = this.state.lastmood.created.d;
            let posteddate = new Date(lastSurveyPosted);
            posteddate.setDate(posteddate.getDate() + 1);

            let nyear = posteddate.getFullYear();
            let nmonth = ('0' + (posteddate.getMonth() + 1)).slice(-2);
            let nday = ('0' + posteddate.getDate()).slice(-2);
            let ndatestring = nyear + '-' + nmonth + '-' + nday;
            if (ndatestring <= datestring) {
                window.location.assign('/survey');
            }
        }
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

    quickStatisticsClick = (e) => {
        e.preventDefault();
        this.mooddropdown = false;
        this.setState({
            engagementgraphtab: false,
            quickstatisticstab : true,
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
        let engagedmanagers = this.state.engagedmanagers;
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
        let myEmployeeEngagement = QuickStatistics.getMyEmployeeEngagement(companysurvey, currentuserid);

        let topmanagers;
        if (engagedmanagers.length > 0) {
            topmanagers = engagedmanagers.map((data, index) => {
                let image = "";
                if (index === 0) {
                    image = "assets/images/gold.png";
                } else if (index === 1) {
                    image = "assets/images/silver.png";
                } else if (index === 2) {
                    image = "assets/images/bronge.png";
                }
                return (
                    <div className="ui segment padding-20">
                        {data.name}
                        <span className="badge">
                            <img src={image} alt={data.avg} />
                        </span>
                    </div>
                );
            });
        } else {
            topmanagers = '';
        }

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

        let myEngagement = '';
        if (myEmployeeEngagement > 0) {
            myEngagement = (<HalfDaughnut datatext={myEmployeeEngagement} />);
        }

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
                                <div className="graph">
                                    <div id="chart_div" style={{"width" : "800px", "height" : "400px"}}></div>
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
                </div>,

                <div className="ui two column stackable grid ">
                    <div className="column ">
                        <div className="ui segment brdr">
                            <h2>Employee average Engagement</h2>
                            <div>
                                {myEngagement}
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui segment brdr">
                            <h2>Most engaging manager</h2>
                            {topmanagers}
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
                <div className="ui segment padding-none width-header rate header-middle-container">
                    <div className="clear"></div>
                    <div className="">
                        <h2>RATE YOUR MOOD</h2>
                        <p>How are you feeling at work today?</p>
                    </div>
                    <form id="moodRating">
                        <div className="ui slider range ">
                            <input type="range" />
                        </div>
                        <div  className="">
                            <button className="ui yellow button" onClick={this.onSubmitMood}>Submit</button>
                        </div>
                    </form>
                    <div  className="">
                        <button className="ui yellow button answer positive">Answer all statements</button>
                    </div>
                </div>

                <div className="invite-people mobile">
                    <h2>Invite people anonymously</h2>
                    <p>Invite everyone anonymously in your network, friends, colleagues, your boss, ex-colleagues ...</p>
                    <div className="ui input">
                        <input placeholder="Enter e-mail " type="text" />
                    </div>
                    <button className="ui orange button">Invite</button>
                </div>

                <div className="ui tabular menu tab three column">
                    <a className="item mobile active column" onClick={this.engagementGraphClick} href="#"> Engagement Graph </a>
                    <a className="item mobile column" onClick={this.moodRatingsClick} href="#"> Mood Rating </a>
                    <a className="item mobile column" onClick={this.quickStatisticsClick} href="#"> Custom Survey </a>
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
