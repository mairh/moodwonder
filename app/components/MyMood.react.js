require('react-date-picker/base.css');
require('react-date-picker/theme/hackerone.css');
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
import HalfDaughnut from 'components/HalfDaughnut.react';

import DatePicker from 'react-date-picker';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import Question from 'components/customsurvey/Question.react';
import getFormData from 'get-form-data';
import UserStore from 'stores/UserStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

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
    responsive: true,
    scaleStartValue: 0,
    scaleShowLabels: true,
    tooltipTemplate: "<%= value %>"
};

LineChart.prototype.titles = [];

export default class MyMood extends React.Component {

    constructor(props) {
        super(props);
        this.state = CustomSurveyStore.getState();
        this.state = UserStore.getState();
        this.state = {
            popup: false,
            questions: [],
            surveyresults: [],
            lastsurvey: [],
            lastmood: [],
            graphperiod: 'all_time',
            graphengagement: 'mw_index',
            engagementgraphtab: true,
            customsurveytab: false,
            moodratingstab: false,
            companysurvey: [],
            industrysurvey: [],
            countrysurvey: [],
            engagedmanagers: [],
            currentuserid: '',
            totalcompanyusers: '',
            qIndex: 1,
            squestions: ['q1'],
            radio: [],
            rIndex: 1,
            checkbox: [],
            cIndex: 1,
            textbox: [],
            tIndex: 1,
            textarea: [],
            txIndex: 1,
            formstatus: false,
            freezedate: '',
            today: '',
            organization: [],
            errormessage: '',
            multilang: MlangStore.getState().multilang
        };
        this.engagementmoods = [];
        this.mooddropdown = false;
    }

    componentDidMount() {
        SurveyActions.getEngagementSurvey();
        SurveyActions.getEngagementResults('undefined'); // An undefined check on server.
        SurveyActions.getResultsByCompany();
        SurveyActions.getMostEngagingManagers();
        SurveyStore.listen(this._onMoodChange);

        UserStore.listen(this._onUserDataChange);
        MlangStore.listen(this._onMLChange);

        let today = new Date();
        let yToday = today.getFullYear();
        let mToday = ('0' + (today.getMonth() + 1)).slice(-2);
        let dToday = ('0' + today.getDate()).slice(-2);
        today = yToday + '-' + mToday + '-' + dToday;

        CustomSurveyActions.getOrganization();
        CustomSurveyStore.listen(this._onChange);
        this.setState({formstatus: false});
        this.setState({freezedate: today});
        this.setState({today: today});
    }

    componentDidUpdate () {
        $('.graphengagement').dropdown({
            onChange: this.onChangeGraphEngagement
        });

        $('.graphperiod').dropdown({
            onChange: this.onChangeGraphPeriod
        });

        if (this.state.formstatus) {
            document.getElementById("surveyForm").reset();
            $("#question_q1").val('');
        }
    }

    componentWillUnmount() {
        SurveyStore.unlisten(this._onMoodChange);

        this.setState({qIndex: this.state.qIndex + 1});
        CustomSurveyStore.unlisten(this._onChange);

        UserStore.unlisten(this._onUserDataChange);
        MlangStore.unlisten(this._onMLChange);
    }

    _onUserDataChange = (state) => {
        this.setState(state);
    }

    //Start: Custom survey
    _onChange = () => {
        this.setState({
            isSurveySaved: CustomSurveyStore.getState().isSurveySaved,
            organization: CustomSurveyStore.getState().organization
        });
    }

    ScrollTop = () => {
        if (document.all){
            document.body.scrollLeft = 0;
            document.body.scrollTop = 0;
        }
        else{
            window.pageXOffset = 0;
            window.pageYOffset = 0;
        }
    }

    onSurveySubmit = (e) => {
        try {
            e.preventDefault();
            let form = document.querySelector('#surveyForm');
            let data = getFormData(form, {trim: true});
            let question = this.state.squestions;
            let survey = survey || {};

            survey.surveytitle = data['surveytitle'];
            survey.freezedate = data['freezedate'];
            survey.targetgroup = data['targetgroup'];
            if(survey.targetgroup === 'organization') {
                survey.target_teamid = data['target_teamid'];
            } else {
                survey.targetlevel = data['targetlevel'];
                survey.targetvalue = data['targetvalue'];
            }

            survey.questions = [];
            let keys = Object.keys(data);

            for(let qid of question){
                let id = qid.replace('q', '');
                let qTemp = {};

                qTemp.question = data['question_' + qid];
                qTemp.question_id = id;
                qTemp.answertype = data['answertype_' + qid];
                qTemp.answers = [];

                let rString = qid + 'r';
                let cString = qid + 'c';
                let tString = qid + 'te';
                let txString = qid + 'tx';

                for (let key of keys) {
                    let aTemp = {};
                    if((key.search(rString) !== -1) || (key.search(cString) !== -1))
                    {
                        aTemp.option = data[key][0];
                        qTemp.answers.push(aTemp);
                    }
                    if((key.search(tString) !== -1) || (key.search(txString) !== -1))
                    {
                        aTemp.option = '';
                        qTemp.answers.push(aTemp);
                    }
                }

                survey.questions.push(qTemp);
            }

            //Start: Form validation
            let errorFlag = false;
            if (survey.surveytitle === '' || survey.surveytitle === null) {
                this.setState({errormessage: 'Please enter survey title.'});
                errorFlag = true;

            } else if (survey.targetgroup === 'organization' && (survey.target_teamid === '' || survey.target_teamid === '0')) {
                this.setState({errormessage: 'Please create a team or add your company first.'});
                errorFlag = true;

            } else if (survey.targetgroup === 'survey' && (survey.targetvalue === '' || survey.targetvalue === null)) {
                this.setState({errormessage: 'Please enter survey percentage.'});
                errorFlag = true;

            } else {

                for(let qid of question){
                    let id = qid.replace('q', '');
                    if(data['question_' + qid] === '' || data['question_' + qid] === null) {
                        this.setState({errormessage: 'Please enter question ' + id});
                        errorFlag = true;
                        break;

                    } else if(data['answertype_' + qid] === '0') {
                        this.setState({errormessage: 'Please choose an answer type for question ' + id});
                        errorFlag = true;
                        break;

                    } else if(data['answertype_' + qid] === 'radio') {

                        let rString = qid + 'r';
                        for (let key of keys) {
                            if((key.search(rString) !== -1))
                            {
                                if (data[key][0] === '' || data[key][0] === null) {
                                    this.setState({errormessage: 'Radio option empty for question ' + id});
                                    errorFlag = true;
                                    break;
                                }
                            }
                        }

                    } else if(data['answertype_' + qid] === 'checkbox') {

                        let cString = qid + 'c';
                        for (let key of keys) {
                            if((key.search(cString) !== -1))
                            {
                                if (data[key][0] === '' || data[key][0] === null) {
                                    this.setState({errormessage: 'Checkbox option empty for question ' + id});
                                    errorFlag = true;
                                    break;
                                }
                            }
                        }
                    }
                }

            }
            //End: Form validation

            if(!errorFlag) {
                CustomSurveyActions.createCustomSurveyForm(survey);
                this.setState({formstatus: true});
                window.parent.scroll(0,0);
                $('.dp-footer-today').trigger('click');
                this.setState({squestions: ['q1']});
                this.setState({freezedate: this.state.today});
                this.setState({radio: []});
                this.setState({checkbox: []});
                this.setState({textbox: []});
                this.setState({textarea: []});
                document.getElementById("surveyForm").reset();
            }
        }catch(e){}
    }

    onAddQuestion = (e) => {
        e.preventDefault();
        let qIndex = parseInt(this.state.qIndex);
        let squestions = this.state.squestions;
        qIndex++;
        squestions.push('q' + qIndex);
        this.setState({qIndex: qIndex});
        this.setState({squestions: squestions});
    }

    onRemoveQuestion = (child) => {
        let qid = child.props.qid;
        let squestions = this.state.squestions;
        let key = squestions.indexOf(qid);
        if(key !== -1) {
            squestions.splice(key, 1);
        }
        this.setState({squestions: squestions});
    }

    onAddRadioOption = (e, child) => {
        let rIndex = parseInt(this.state.rIndex);
        let qid = child.props.qid;
        let radio = this.state.radio;
        rIndex++;
        radio.push(qid + 'r' + rIndex);
        this.setState({rIndex: rIndex});
        this.setState({radio: radio});
    }

    onRemoveRadioOption = (e, child) => {
        let rid = child.props.rid;
        let radio = this.state.radio;
        let key = radio.indexOf(rid);
        if(key !== -1) {
            radio.splice(key, 1);
        }
        this.setState({radio: radio});
    }

    onAddCheckboxOption = (e, child) => {
        let cIndex = parseInt(this.state.cIndex);
        let qid = child.props.qid;
        let checkbox = this.state.checkbox;
        cIndex++;
        checkbox.push(qid + 'c' + cIndex);
        this.setState({cIndex: cIndex});
        this.setState({checkbox: checkbox});
    }

    onRemoveCheckboxOption = (e, child) => {
        let cid = child.props.cid;
        let checkbox = this.state.checkbox;
        let key = checkbox.indexOf(cid);
        if(key !== -1) {
            checkbox.splice(key, 1);
        }
        this.setState({checkbox: checkbox});
    }

    changeHandler = (key, attr, event) => {
        let state = {};
        state[key] = this.state[key] || {};
        state[key][attr] = event.currentTarget.value;
        this.setState(state);
    };

    onDateChange = (e) => {
        this.setState({freezedate: e});
    };

    onSelectAnswerType = (e, child) => {
        let qid = child.props.qid;
        let answerType = e.target.value;

        let radio = this.state.radio;
        let checkbox = this.state.checkbox;
        let textbox = this.state.textbox;
        let textarea = this.state.textarea;

        // Radio - Clear all the previous states against qustion id.
        let rClear = [];
        for(let item of radio){
            if(item.search(qid) !== -1) {
                rClear.push(item);
            }
        }
        for(let item of rClear){
            radio.splice(radio.indexOf(item), 1);
        }
        this.setState({radio: radio});

        // Checkbox - Clear all the previous states against qustion id.
        let cClear = [];
        for(let item of checkbox){
            if(item.search(qid) !== -1) {
                cClear.push(item);
            }
        }
        for(let item of cClear){
            checkbox.splice(checkbox.indexOf(item), 1);
        }
        this.setState({checkbox: checkbox});

        // Textbox - Clear all the previous states against qustion id.
        let tClear = [];
        for(let item of textbox){
            if(item.search(qid) !== -1) {
                tClear.push(item);
            }
        }
        for(let item of tClear){
            textbox.splice(textbox.indexOf(item), 1);
        }
        this.setState({textbox: textbox});

        // Textarea - Clear all the previous states against qustion id.
        let txClear = [];
        for(let item of textarea){
            if(item.search(qid) !== -1) {
                txClear.push(item);
            }
        }
        for(let item of txClear){
            textarea.splice(textarea.indexOf(item), 1);
        }
        this.setState({textarea: textarea});

        let aid = '';

        switch(answerType){
        case 'radio':
            aid = qid + 'r1';
            let nRadio = this.state.radio;
            nRadio.push(aid);
            this.setState({radio: nRadio});
            break;
        case 'checkbox':
            aid = qid + 'c1';
            let nCheckbox = this.state.checkbox;
            nCheckbox.push(aid);
            this.setState({checkbox: nCheckbox});
            break;
        case 'textbox':
            aid = qid + 'te1';
            let nTextbox = this.state.textbox;
            nTextbox.push(aid);
            this.setState({textbox: nTextbox});
            break;
        case 'textarea':
            aid = qid + 'tx1';
            let nTextarea = this.state.textarea;
            nTextarea.push(aid);
            this.setState({textarea: nTextarea});
            break;
        default: break;
        }
    }

    onDateChange = (e) => {
        this.setState({freezedate: e});
    };
    //End : Custom survey

    _onMoodChange = () => {
        try {
            this.setState({
                questions : SurveyStore.getState().questions,
                surveyresults: SurveyStore.getState().surveyresults,
                companysurvey: SurveyStore.getState().companysurvey,
                industrysurvey: SurveyStore.getState().industrysurvey,
                countrysurvey: SurveyStore.getState().countrysurvey,
                currentuserid: SurveyStore.getState().currentuserid,
                engagedmanagers: SurveyStore.getState().engagedmanagers,
                totalcompanyusers: SurveyStore.getState().totalcompanyusers,
                lastmood: SurveyStore.getState().lastmood
            });

            this.engagementmoods = this.state.questions.map((data, key) => {
                return data.mood;
            });
        } catch(e) {}
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
        this.setState({ graphperiod : value });
    }

    onChangeGraphEngagement = (value) => {
        this.setState({ graphengagement : value });
    };

    engagementGraphClick = (e) => {
        e.preventDefault();
        this.mooddropdown = true;
        this.setState({
            engagementgraphtab: true,
            customsurveytab : false,
            moodratingstab : false
        });
    }

    customSurveyClick = (e) => {
        e.preventDefault();
        this.mooddropdown = false;
        this.setState({
            engagementgraphtab: false,
            customsurveytab : true,
            moodratingstab : false
        });
    }

    moodRatingsClick = (e) => {
        e.preventDefault();
        this.mooddropdown = false;
        this.setState({
            engagementgraphtab: false,
            customsurveytab : false,
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
        let customsurveytab = this.state.customsurveytab;
        let moodratingstab = this.state.moodratingstab;
        let companysurvey = this.state.companysurvey;
        let engagedmanagers = this.state.engagedmanagers;
        let currentuserid = this.state.currentuserid;
        //let user = this.state.userData;
        let errormessage = this.state.errormessage;
        let mlarray = this.state.multilang;

        let xlabel = [];
        let ydata = [];
        let yMoodData = [];

        //Start : Custom survey
        let squestions = this.state.squestions;
        let radio = this.state.radio;
        let checkbox = this.state.checkbox;
        let textbox = this.state.textbox;
        let textarea = this.state.textarea;
        let formstatus = this.state.formstatus;
        let freezedate = this.state.freezedate;
        let today = this.state.today;
        let organization = this.state.organization;
        let statusmessage = '';

        let teamoption = '';
        let companyoption = '';
        let teams = [];

        if (organization.companyname !== '') {
            companyoption = (
                <option value={organization.companyid}>
                    {organization.companyname}
                </option>
            );
        }

        let teamdata = organization.teams;

        for(let key in teamdata) {
            let team = teamdata[key];
            teams.push({_id: team._id, teamname: team.teamname});
        }

        teamoption = (teams).map((team) => {
            return (<option value={team._id}>{team.teamname}</option>);
        });

        if(formstatus) {
            statusmessage = (
                <div className="ui one column stackable grid container ">
                    <div className="column">
                        <div className="ui green message">Survey created successfully.</div>
                    </div>
                </div>
            );
        }

        let sno = 1;
        let contents = squestions.map((qid) => {
            let rString = qid + 'r';
            let rArr = [];
            for (let item of radio) {
                if(item.search(rString) !== -1)
                {
                    rArr.push(item);
                }
            }

            let cString = qid + 'c';
            let cArr = [];
            for (let item of checkbox) {
                if(item.search(cString) !== -1)
                {
                    cArr.push(item);
                }
            }

            let tString = qid + 'te';
            let tArr = [];
            for (let item of textbox) {
                if(item.search(tString) !== -1)
                {
                    tArr.push(item);
                }
            }

            let txString = qid + 'tx';
            let txArr = [];
            for (let item of textarea) {
                if(item.search(txString) !== -1)
                {
                    txArr.push(item);
                }
            }

            return (
                <Question
                    qid={qid}
                    sno={sno++}
                    onClick={this.onRemoveQuestion}
                    onChange={this.onSelectAnswerType}
                    changeQuestion={this.changeHandler}
                    formdata={this.state.formdata}
                    radio={rArr}
                    removeRadio={this.onRemoveRadioOption}
                    addRadio={this.onAddRadioOption}
                    changeRadio={this.changeHandler}
                    checkbox={cArr}
                    removeCheckbox={this.onRemoveCheckboxOption}
                    addCheckbox={this.onAddCheckboxOption}
                    changeCheckbox={this.changeHandler}
                    textbox={tArr}
                    textarea={txArr}
                    question={GetText('MYMD_QNSTITLE', mlarray)}
                    qnsplcholder={GetText('MYMD_QNSPLCHLOLDER', mlarray)}
                    anstypelbl={GetText('MYMD_ANSTYPE_LBL', mlarray)}
                    anstypedefault={GetText('MYMD_ANSTYPE_DEFAULT', mlarray)}
                    childaddbtn={GetText('MYMD_CHILD_ADDBTN', mlarray)}
                    childcancelbtn={GetText('MYMD_CHILD_CANCELBTN', mlarray)}
                />
            );
        });


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

            let rows = this.getStars(data.diff, "green");

            return (
                <div className="column padding-ryt">
                    <div className="extra center aligned">
                        <p className="head">{data.diff}</p>
                        <div data-rating={data.diff} className="ui star rating">
                            {rows}
                        </div>
                        <div className="title">{GetText('MYMD_OPT' + data.moodObj.mood, mlarray)}</div>
                    </div>
                </div>
            );
        });

        let worstthree = worstThreeAreas.map((data, key) => {

            let rows = this.getStars(data.diff, "red");

            return (
                <div className="column padding-ryt">
                    <div className="extra center aligned">
                        <p className="head">{data.diff}</p>
                        <div data-rating={data.diff} className="ui star rating">
                            {rows}
                        </div>
                        <div className="title">{GetText('MYMD_OPT' + data.moodObj.mood, mlarray)}</div>
                    </div>
                </div>
            );
        });

        let improvedareas;
        if(improvedAreas.length > 0) {
            improvedareas = improvedAreas.map((data, key) => {

                let rows = this.getStars(data.difference, "green");

                return (
                    <div className="column padding-ryt">
                        <div className="extra center aligned">
                            <p className="head">{data.difference}</p>
                            <div data-rating={data.difference} className="ui star rating">
                                {rows}
                            </div>
                            <div className="title">{GetText('MYMD_OPT' + data.mood, mlarray)}</div>
                        </div>
                    </div>
                );
            });
        } else {
            improvedareas = [
                <div className="column padding-ryt"></div>,
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
                        <div className="title">You don't have enough values to compare.</div>
                    </div>
                </div>,
                <div className="column padding-ryt"></div>
            ];
        }

        let worstareas;
        if(worstAreas.length > 0) {
            worstareas = worstAreas.map((data, key) => {

                let rows = this.getStars(data.difference, "red");

                return (
                    <div className="column padding-ryt">
                        <div className="extra center aligned">
                            <p className="head">{data.difference}</p>
                            <div data-rating={data.difference} className="ui star rating">
                                {rows}
                            </div>
                            <div className="title">{GetText('MYMD_OPT' + data.mood, mlarray)}</div>
                        </div>
                    </div>
                );
            });
        } else {
            worstareas = [
                <div className="column padding-ryt"></div>,
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
                        <div className="title">You don't have enough values to compare.</div>
                    </div>
                </div>,
                <div className="column padding-ryt"></div>
            ];
        }

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
                            <div className="title">{GetText('MYMD_OPT' + data.mood, mlarray)}</div>
                        </div>
                    </div>
                );
            });
        } else {
            topthreevscompany = [
                <div className="column padding-ryt"></div>,
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
                        <div className="title">{GetText('MYMD_HIGHERCAVERAGE_EMPTYMSG', mlarray)}</div>
                    </div>
                </div>,
                <div className="column padding-ryt"></div>
            ];
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
                            <div className="title">{GetText('MYMD_OPT' + data.mood, mlarray)}</div>
                        </div>
                    </div>
                );
            });
        } else {
            worstthreevscompany = [
                <div className="column padding-ryt"></div>,
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
                        <div className="title">{GetText('MYMD_LOWERCAVERAGE_EMPTYMSG', mlarray)}</div>
                    </div>
                </div>,
                <div className="column padding-ryt"></div>
            ];
        }
                        // End : MoodRatings

                        // Start : Quick Statistics
        let lastRatings = (QuickStatistics.getLastRatings(surveyresults)).reverse();
        let myEmployeeEngagement = QuickStatistics.getMyEmployeeEngagement(companysurvey, currentuserid);

        let tmanagers;
        if (engagedmanagers.length > 0) {
            tmanagers = engagedmanagers.map((data, index) => {
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
            tmanagers = (<span>Please add your manager through <a href="/myprofile">My Profile</a> page.</span>);
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
            //strokeColor: "rgba(151,187,205,1)",
            strokeColor: "#3499e0",
            pointColor: "#3499e0",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: ydata
        };

        let mooddata = {
            label: "Second Dataset",
            fillColor: "rgba(151,187,205,0.2)",
            //strokeColor: "rgba(200,127,105,1)",
            strokeColor: "#cb5234",
            pointColor: "#cb5234",
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
            myEngagement = (
                <div className="column ">
                    <div className="ui segment brdr">
                        <h2>{GetText('MYMD_E_ENGAGEMENT', mlarray)}</h2>
                        <HalfDaughnut datatext={myEmployeeEngagement} />
                    </div>
                </div>
            );
        }

        let blueLegend;
        if (graphengagement !== 'Mood') {
            blueLegend = [<label className="custom-lbl"><img src="/assets/images/blue-graph.png" /></label>,
            <label className="custom-lbl">{graphengagement}</label>
        ];
        }


        let engagementGraphTabContent = null;
        if (engagementgraphtab) {
            engagementGraphTabContent = [
                <div className="ui bottom attached segment brdr-none menu">
                    <div className="ui  column stackable grid container">
                        <div className="column  brdr-none padding-none">
                            <div className="ui segment brdr-none padding-none ">
                                <div className=" right menu mobile">
                                    <select className="ui dropdown search graphengagement" name="graphengagement" onChange={this.onChangeGraphEngagement.bind(this)} value={graphengagement}>
                                        <option value="mw_index">{GetText('MYMD_OPTMWINDEX', mlarray)}</option>
                                        <option value="Mood">{GetText('MYMD_OPTMOOD', mlarray)}</option>
                                        <option value="Meaning">{GetText('MYMD_OPTMEANING', mlarray)}</option>
                                        <option value="Expectations">{GetText('MYMD_OPTEXPECTATIONS', mlarray)}</option>
                                        <option value="Strengths">{GetText('MYMD_OPTSTRENGTHS', mlarray)}</option>
                                        <option value="Recognition">{GetText('MYMD_OPTRECOGNITION', mlarray)}</option>
                                        <option value="Development">{GetText('MYMD_OPTDEVELOPMENT', mlarray)}</option>
                                        <option value="Influence">{GetText('MYMD_OPTINFLUENCE', mlarray)}</option>
                                        <option value="Goals">{GetText('MYMD_OPTGOALS', mlarray)}</option>
                                        <option value="Team">{GetText('MYMD_OPTTEAM', mlarray)}</option>
                                        <option value="Friendship">{GetText('MYMD_OPTFRIENDSHIP', mlarray)}</option>
                                        <option value="Feedback">{GetText('MYMD_OPTFEEDBACK', mlarray)}</option>
                                        <option value="Opportunities">{GetText('MYMD_OPTOPPORTUNITIES', mlarray)}</option>
                                        <option value="Recommendation">{GetText('MYMD_OPTRECOMMENDATION', mlarray)}</option>
                                    </select>
                                    <select className="ui dropdown graphperiod" name="graphperiod" onChange={this.onChangeGraphPeriod} value={graphperiod}>
                                        <option value="all_time">{GetText('MYMD_OPTALLTIME', mlarray)}</option>
                                        <option value="last_12_months">{GetText('MYMD_OPTTWELVE', mlarray)}</option>
                                        <option value="last_6_ months">{GetText('MYMD_OPTSIX', mlarray)}</option>
                                        <option value="last_3_months">{GetText('MYMD_OPTTHREE', mlarray)}</option>
                                        <option value="last_month">{GetText('MYMD_OPTLASTMONTH', mlarray)}</option>
                                    </select>
                                </div>
                                <div className="clear"></div>
                                <div className="graph">
                                    <LineChart data={chartdata} options={chartoptions} width="800" height="250" redraw/>
                                    <div className="legend">
                                        <div className="legend-sub" style={{"width": "100%", "marginLeft": "38%"}}>
                                            <label className="custom-lbl"><img src="/assets/images/red.png" /></label>
                                            <label className="custom-lbl">Mood</label>
                                            {blueLegend}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,

                <div className="clear"></div>,
                <div className="ui two column stackable grid ">
                    <div className="six column row padding-container">
                        <div className="column">
                            <div className="ui segment gry">{GetText('MYMD_ATSTART', mlarray)} : {engagementStatitics.start}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">{GetText('MYMD_HIGHEST', mlarray)} : {engagementStatitics.highest}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">{GetText('MYMD_LOWEST', mlarray)} : {engagementStatitics.lowest}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">{GetText('MYMD_CURRENT', mlarray)} : {engagementStatitics.current}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">{GetText('MYMD_DAYS_CHANGE', mlarray)} : {engagementStatitics.thirtydayschange}</div>
                        </div>
                        <div className="column">
                            <div className="ui segment gry">{GetText('MYMD_WEEK_CHANGE', mlarray)} : {engagementStatitics.weekchange}</div>
                        </div>
                    </div>
                </div>,

                <div className="ui two column stackable grid ">
                    {myEngagement}
                    <div className="column">
                        <div className="ui segment brdr">
                            <h2>{GetText('MYMD_MOST_ENGAGING', mlarray)}</h2>
                            {tmanagers}
                        </div>
                    </div>
                </div>
            ];
        }

        let errorbox;
        if (errormessage !== '') {
            errorbox = (
                <div className="ui one column stackable grid container ">
                    <div className="column">
                        <div className="ui red message">{errormessage}</div>
                    </div>
                </div>
            );
        }

        let customSurveyTabContent=null;
        if (customsurveytab) {
            customSurveyTabContent = (
                <div className="ui bottom attached segment brdr-none menu minus-margin-top-20 ">
                    <div className="ui segment brdr-none padding-none width-rating  ">
                        <div className="clear"></div>
                        {statusmessage}
                        <div className="ui two column stackable grid container ">
                            <div className="column">
                                <h4 className="ui header ryt com">{GetText('MYMD_SGENERATION_TITLE', mlarray)}</h4>
                            </div>
                            <div className="column">
                                <div className="three  column">
                                    <div className="test-gen ui submit button" style={{"marginRight": "-28px"}}> <a href="/surveyforms">{GetText('MYMD_SLISTSBTN', mlarray)}</a></div>
                                </div>
                            </div>
                        </div>
                        <form id="surveyForm">
                            <div className="custom-box">
                                <div className="ui two column stackable grid survey">
                                    <div className="three wide column ">
                                        <label className="line-height">{GetText('MYMD_STITLE', mlarray)} :</label>
                                    </div>
                                    <div className="thirteen wide column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">
                                                <input type="text" ref="surveytitle" onChange={this.changeHandler.bind(this, 'formdata', 'surveytitle')} id="surveytitle" placeholder={GetText('MYMD_TITLE_PLCHOLDER', mlarray)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui two column stackable grid survey">
                                    <div className="three wide column ">
                                        <label className="line-height">{GetText('MYMD_SFREEZE_DATE', mlarray)} :</label>
                                    </div>
                                    <div className="thirteen wide column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">
                                                <input type="text" ref="freezedate" name="freezedate" id="freezedate" value={freezedate} placeholder="Pick a date"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui two column stackable grid survey">
                                    <div className="three wide column ">
                                        <label className="line-height"></label>
                                    </div>
                                    <div className="thirteen wide column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">
                                                <DatePicker minDate={today} onChange={this.onDateChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui two column stackable grid survey">
                                    <div className="three wide column ">
                                        <label className="line-height">{GetText('MYMD_TARGET_GROUP', mlarray)} :</label>
                                    </div>
                                    <div className="two wide column padin-lft">
                                        <div className="ui form options">
                                            <div className="inline fields">
                                                <div className="ui radio checkbox">
                                                    <input type="radio" name="targetgroup" value="organization" defaultChecked />
                                                    <label>{GetText('MYMD_TARGETORG', mlarray)}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ten wide column padin-lft">
                                        <div className="ui form options">
                                            <select className="ui dropdown" name="target_teamid">
                                                <option value="0">{GetText('MYMD_TORG_DEFAULT_OPTION', mlarray)}</option>
                                                {companyoption}
                                                {teamoption}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui two column stackable grid survey">
                                    <div className="three wide column padin-lft ">
                                        <label className="line-height"></label>
                                    </div>
                                    <div className="two wide column padin-lft">
                                        <div className="ui form ">
                                            <div className="inline fields">
                                                <div className="ui radio checkbox">
                                                    <input type="radio" name="targetgroup" value="survey" />
                                                    <label>{GetText('MYMD_TARGETSURVEY', mlarray)}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="two wide column padin-lft ">
                                        <div className="ui form options" style={{"maxWidth": "100%"}}>
                                            <input type="text" name="targetvalue" palceholher="" />
                                        </div>
                                    </div>
                                    <div className="one wide column padin-lft ">
                                        <div className="ui form options" style={{"paddingTop":"20px"}}>
                                            <label>%</label>
                                        </div>
                                    </div>
                                    <div className="four wide column padin-lft ">
                                        <div className="ui form options" style={{"maxWidth": "100%"}}>
                                            <select className="ui dropdown" name="targetlevel" style={{"maxWidth": "100%"}}>
                                                <option value="above">{GetText('MYMD_TSURVEY_DEFAULT_OPTION1', mlarray)}</option>
                                                <option value="below">{GetText('MYMD_TSURVEY_DEFAULT_OPTION2', mlarray)}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui two column stackable grid container ">
                                <div className="column">
                                    <h4 className="ui header ryt com">{GetText('MYMD_QNS_TITLE', mlarray)}</h4>
                                </div>
                                <div className="column"></div>
                            </div>

                            {contents}

                            {errorbox}

                            <div className="ui two column stackable grid survey test">
                                <div className="one wide column qst-mobile"></div>
                                <div className="fifteen wide column padin-lft">
                                    <div className="ui form options">
                                        <div className="ui form options">
                                            <div className="field">
                                                <button className="ui submit  button blue" onClick={this.onAddQuestion}>{GetText('MYMD_ADD_QNS', mlarray)}</button>
                                                <button className="ui submit button submitt" onClick={this.onSurveySubmit}>{GetText('MYMD_SUBMIT_SURVEY', mlarray)}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            );

        }

        let moodRatingsTabContent=null;
        if (moodratingstab) {
            moodRatingsTabContent = (
                <div className="ui bottom attached segment brdr-none menu minus-margin-top-20">
                    <div className="ui segment brdr-none padding-none width-rating">
                        <div className="clear"></div>
                        <div className="ui two cards column stackable">

                            <div className="ui card  box-gry">
                                <div className="content box-gry-border">
                                    <div className="header">{GetText('MYMD_TOPTHREEAREAS_HEADING', mlarray)}</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {topthree}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card box-gry">
                                <div className="content box-gry-border">
                                    <div className="header">{GetText('MYMD_WORSTTHREEAREAS_HEADING', mlarray)}</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container ">
                                        {worstthree}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">{GetText('MYMD_MOSTIMPROVEDAREAS_HEADING', mlarray)}</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {improvedareas}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">{GetText('MYMD_LEASTIMPROVEDAREAS_HEADING', mlarray)}</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {worstareas}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">{GetText('MYMD_HIGHERTHANCOMPANYAVERAGE_HEADING', mlarray)}</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {topthreevscompany}
                                    </div>
                                </div>
                            </div>

                            <div className="ui card  box-gry ">
                                <div className="content box-gry-border">
                                    <div className="header">{GetText('MYMD_LOWERTHANCOMPANYAVERAGE_HEADING', mlarray)}</div>
                                </div>
                                <div className="ui two column stackable grid  ">
                                    <div className="three column row padding-container  ">
                                        {worstthreevscompany}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="ui tabular menu tab two column">
                    <a className="item mobile active column" onClick={this.engagementGraphClick} href="#">{GetText('MYMD_EGRAPH', mlarray)}</a>
                    <a className="item mobile column" onClick={this.moodRatingsClick} href="#">{GetText('MYMD_MRATING', mlarray)}</a>
                </div>
                {engagementGraphTabContent}
                {moodRatingsTabContent}
                {customSurveyTabContent}
            </div>
        );
    }
}
