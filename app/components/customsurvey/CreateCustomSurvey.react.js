require('react-date-picker/base.css');
require('react-date-picker/theme/hackerone.css');
import React from 'react';
import DatePicker from 'react-date-picker';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import Question from 'components/customsurvey/Question.react';
import getFormData from 'get-form-data';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class CreateCustomSurvey extends React.Component {

    constructor(props) {
        super(props);
        this.state = CustomSurveyStore.getState();
        this.state = {
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
            freezedate: '',
            today: '',
            organization: [],
            errormessage: '',
            multilang: MlangStore.getState().multilang,
            popup: false
        };
    }

    componentDidMount() {
        MlangStore.listen(this._onMLChange);

        let today = new Date();
        let yToday = today.getFullYear();
        let mToday = ('0' + (today.getMonth() + 1)).slice(-2);
        let dToday = ('0' + today.getDate()).slice(-2);
        today = yToday + '-' + mToday + '-' + dToday;

        CustomSurveyActions.getOrganization();
        CustomSurveyStore.listen(this._onChange);
        this.setState({freezedate: today});
        this.setState({today: today});
    }

    componentDidUpdate () {
        window.setTimeout(() => {
            if (this.state.errormessage !== '') {
                this.setState({errormessage: ''});
            }
        }, 4000);
    }

    componentWillUnmount() {
        this.setState({qIndex: this.state.qIndex + 1});
        CustomSurveyStore.unlisten(this._onChange);
        MlangStore.unlisten(this._onMLChange);
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

    onPopupClose = (e) => {
        e.preventDefault();
        this.setState({ popup : false });
        window.setTimeout(() => {
            window.location.reload();
        });
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
                survey.targetmood = data['targetmood'];
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
                    if((key.search(rString) !== -1) || (key.search(cString) !== -1)) {
                        aTemp.option = data[key];
                        qTemp.answers.push(aTemp);
                    }
                    if((key.search(tString) !== -1) || (key.search(txString) !== -1)) {
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
                this.setState({errormessage: 'Please select a team or company.'});
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
                            if((key.search(rString) !== -1)) {
                                if (data[key] === '' || data[key] === null) {
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
                                //if (data[key][0] === '' || data[key][0] === null) {
                                if (data[key] === '' || data[key] === null) {
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
                this.setState({ popup : true });
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

    render() {
        let errormessage = this.state.errormessage;
        let mlarray = this.state.multilang;

        //Start : Custom survey
        let squestions = this.state.squestions;
        let radio = this.state.radio;
        let checkbox = this.state.checkbox;
        let textbox = this.state.textbox;
        let textarea = this.state.textarea;
        let freezedate = this.state.freezedate;
        let today = this.state.today;
        let organization = this.state.organization;

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
                    childcancelbtn={GetText('MYMD_CHILD_CANCELBTN', mlarray)}/>
            );
        });
        //End : Custom survey

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

        let modal;
        if(this.state.popup){
            modal = (
                <div className="ui dimmer modals page transition visible active">
                    <div className="ui active modal">
                        <i className="close icon" onClick={this.onPopupClose} data-dismiss="modal"></i>
                        <div className="ui segment" style={{"textAlign" : "center"}}>
                            <div className="ui small">
                                <div className="field">
                                    <label>Survey created successfully.</label>
                                </div>
                                <div className="field"><br/></div>
                                <div className="field">
                                    <button type="button" onClick={this.onPopupClose} className="ui submit button cancel" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const customSurveyTabContent = [
            <div className="ui segment brdr-none padding-none width-rating  ">
                <div className="clear"></div>
                {modal}
                <div className="ui two column stackable grid container ">
                    <div className="column">
                        <h4 className="ui header ryt com">{GetText('MYMD_SGENERATION_TITLE', mlarray)}</h4>
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
                            <div className="ten wide column padin-lft ">
                                <div className="ui form options">
                                    <select className="ui dropdown" name="targetlevel">
                                        <option value="above">{GetText('MYMD_TSURVEY_DEFAULT_OPTION1', mlarray)}</option>
                                        <option value="below">{GetText('MYMD_TSURVEY_DEFAULT_OPTION2', mlarray)}</option>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ten wide column padin-lft ">
                                <div className="ui form options">
                                    <input type="text" name="targetvalue" palceholher="" style={{"float":"left", "width":"90%"}}/>
                                    <label style={{"float":"right", "width":"10%", "padding":"8px"}}>%</label>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ten wide column padin-lft ">
                                <div className="ui form options">
                                    <select className="ui dropdown" name="targetmood">
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
        ];

        return (
            <div>
                <div className="ui tabular menu tab two column">
                    <a className="item mobile active column" href="/customsurvey">Create new survey</a>
                    <a className="item mobile column" href="/surveyforms">My surveys</a>
                    <a className="item mobile column" href="/viewsurvey">Participate in survey</a>
                </div>
                {customSurveyTabContent}
            </div>
        );
    }
}
