import React from 'react';
import getFormData from 'get-form-data';
import _ from 'underscore';
import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyStore from 'stores/CustomSurveyStore';
import UserStore from 'stores/UserStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class Takesurvey extends React.Component {

    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.state = CustomSurveyStore.getState();
        this.state.popup = false;
        this.state.errormessage = '';
        this.state.multilang = MlangStore.getState().multilang;
    }

    componentDidMount() {
        let id = this.props.params.key;
        CustomSurveyActions.getSurveyForm(id);
        CustomSurveyStore.listen(this._onChange);
        UserStore.listen(this._onUserDataChange);
    }

    componentWillUnmount() {
        CustomSurveyStore.unlisten(this._onChange);
        UserStore.unlisten(this._onUserDataChange);
    }

    componentDidUpdate () {
        window.setTimeout(() => {
            if (this.state.errormessage !== '') {
                this.setState({errormessage: ''});
            }
        }, 4000);
    }

    _onChange = () => {
        this.setState({
            form: CustomSurveyStore.getState().form
        });
    }

    _onUserDataChange = (state) => {
        this.setState(state);
    }

    onPopupClose = (e) => {
        e.preventDefault();
        this.setState({ popup : false });
        let user = this.state.userData;
        window.setTimeout(() => {
            if(typeof user !== 'undefined' && user.usertype === 'manager') {
                window.location.assign('/surveyforms');
            } else {
                window.location.assign('/viewsurvey');
            }
        });
    }

    onCancelSurvey = (e) => {
        e.preventDefault();
        document.getElementById("surveyForm").reset();
    }

    onSubmitSurvey = (e) => {
        try {
            e.preventDefault();
            let formData = document.querySelector('#surveyForm');
            let data = getFormData(formData, {trim: true});
            let surveyResults = [];
            let form = this.state.form;
            let qcount = _.size(form.questions);
            let ansCheck = [];

            for(let i = 1; i <= qcount; i++){
                let survey = survey || {};
                survey.survey_id = data.surveyid;
                survey.question_id = data['questionid_' + i];
                survey.question = data['question_' + i];
                survey.answertype = data['answer_type_' + i];
                survey.answers = [];
                let options = {};
                if(data['answer_type_' + i] === 'checkbox') {
                    if (data.hasOwnProperty('answer_' + i + '_[]')) {
                        for(let answer of data['answer_' + i + '_[]']){
                            options = {};
                            options.option = answer;
                            survey.answers.push(options);
                            if ((answer !== null) && (answer !== undefined) && (answer !== "")) {
                                ansCheck.push(answer);
                            }
                        }
                    }
                } else {
                    options.option = data['answer_' + i];
                    survey.answers.push(options);
                    if ((data['answer_' + i] !== null) && (data['answer_' + i] !== undefined) && (data['answer_' + i] !== "")) {
                        ansCheck.push(data['answer_' + i]);
                    }
                }
                surveyResults.push(JSON.stringify(survey));
            }

            if (ansCheck.length == 0) {
                this.setState({errormessage: 'Please answer atleast one question.'});
            } else {
                let results = {};
                results.surveyresults = surveyResults;
                CustomSurveyResultsActions.saveSurveyResults(results);
                this.setState({popup: true});
            }

        } catch (e) {}
    }

    getTodaysDate = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        return (year + '-' + month + '-' + day);
    }

    render() {
        let form = this.state.form;
        let errormessage = this.state.errormessage;
        let mlarray = this.state.multilang;
        let questions = [];
        let fields = '';
        let qcount = _.size(form.questions);

        let today = this.getTodaysDate();

        for(let i = 0; i < qcount; i++ ){
            questions.push(form.questions[i]);
        }

        let qno = 0;
        fields = questions.map((question) => {
            qno++;
            let answers = question.answers;
            let ans = '';

            switch(question.answertype){
            case 'radio':
                ans = answers.map((answer) => {
                    return (
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name={'answer_' + qno} value={answer.option} />
                                <label>{answer.option}</label>
                            </div>
                        </div>
                    );
                });
                break;

            case 'checkbox':
                ans = answers.map((answer) => {
                    return (
                        <div className="field">
                            <div className="ui checkbox">
                                <input type="checkbox" value={answer.option} name={'answer_' + qno + '_[]'} />
                                <label>{answer.option}</label>
                            </div>
                        </div>
                    );
                });
                break;

            case 'textbox':
                ans = (
                    <input type="text" name={'answer_' + qno} />
                );
                break;

            case 'textarea':
                ans = (
                    <div className="field">
                        <textarea name={'answer_' + qno} rows="2"></textarea>
                    </div>
                );
                break;

            default: break;
            }

            let ansoptions = '';
            if(question.answertype === 'radio' || question.answertype === 'checkbox') {
                ansoptions = (
                    <div className="inline">
                        {ans}
                    </div>
                );
            } else {
                ansoptions = ans;
            }

            return ([
                <div className="one wide column qst-mobile" id={qno}>
                    <div className="ui grey circular label"> Q.{qno}</div>
                    <input type="hidden" name={'questionid_' + qno} value={question.question_id} />
                    <input type="hidden" name={'question_' + qno} value={question.question} />
                    <input type="hidden" name={'answer_type_' + qno} value={question.answertype} />
                </div>,

                <div className="fifteen wide column padin-lft">
                    <div className="ui left pointing label"> <span className="qst-mobile-1">Q.{qno}</span> {question.question} </div>
                    <div className="ui form options" style={{"maxWidth":"100%"}}>
                        <div className="ui form options" style={{"maxWidth":"100%"}}>
                            {ansoptions}
                        </div>
                    </div>
                </div>
            ]);
        });

        let modal;
        if(this.state.popup){
            modal = (
                <div className="ui dimmer modals page transition visible active">
                    <div className="ui active modal">
                        <i className="close icon" onClick={this.onPopupClose} data-dismiss="modal"></i>
                        <div className="ui segment" style={{"textAlign" : "center"}}>
                            <div className="ui small">
                                <div className="field">
                                    <label>Survey submitted successfully.</label>
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

        let content = '';
        if (today > form.freezedate) {
            content = (
                <div className="ui two column stackable grid survey">
                    <div className="one wide column qst-mobile"></div>
                    <div className="fifteen wide column padin-lft">
                        <div className="ui form options">
                            <div className="ui form options">
                                <div className="field">
                                    <label>Survey expired.</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else {
            content = (
                <form id="surveyForm">
                    <input type="hidden" name="surveyid" value={form._id} />
                    <input type="hidden" name="surveytitle" value={form.surveytitle} />

                    <div className="ui two column stackable grid survey">
                        {fields}
                        {errorbox}
                        <div className="one wide column qst-mobile"></div>
                        <div className="fifteen wide column padin-lft">
                            <div className="ui form options">
                                <div className="ui form options">
                                    <div className="field">
                                        <button className="ui submit  button cancel" onClick={this.onCancelSurvey}>{GetText('TSVY_CANCEL_BTN', mlarray)}</button>
                                        <button className="ui submit button submitt" onClick={this.onSubmitSurvey}>{GetText('TSVY_SUBMIT_BTN', mlarray)}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            );
        }

        return (
            <div className="ui segment brdr-none padding-none width-rating  ">
                <div className="clear"></div>
                {modal}
                <div className="ui two column stackable grid container ">
                    <div className="column">
                        <h4 className="ui header ryt com">{form.surveytitle}</h4>
                    </div>
                    <div className="column"></div>
                </div>
                {content}
            </div>
        );
    }
}
