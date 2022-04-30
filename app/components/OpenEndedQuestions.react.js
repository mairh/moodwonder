import React from 'react';
import getFormData from 'get-form-data';
import OpenEndedActions from 'actions/OpenEndedActions';
import OpenEndedStore from 'stores/OpenEndedStore';
import MoodRatings from 'utils/MoodRatings';
import SurveyStore from 'stores/SurveyStore';
import _ from 'underscore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class OpenEndedQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            surveyresults: SurveyStore.getState().surveyresults,
            multilang: MlangStore.getState().multilang,
            errormsg: '',
            popup: false
        };
    }

    componentDidMount() {
        if(typeof sessionStorage.getItem("engagementsurvey") === "undefined" || sessionStorage.getItem("engagementsurvey") == null || sessionStorage.getItem("engagementsurvey") == '' || sessionStorage.getItem("engagementsurvey") === undefined) {
            window.location.assign('/survey');
        }
        OpenEndedActions.getQuestions();
        OpenEndedStore.listen(this._onChange);
        SurveyStore.listen(this._onSurveyChange);
    }

    componentWillUnmount() {
        OpenEndedStore.unlisten(this._onChange);
        SurveyStore.unlisten(this._onSurveyChange);
    }

    _onChange = (state) => {
        this.setState({
            questions: OpenEndedStore.getState().questions
        });
    }

    _onSurveyChange = (state) => {
        this.setState({
            surveyresults: SurveyStore.getState().surveyresults
        });
    }

    onPopupClose = (e) => {
        e.preventDefault();
        this.setState({ popup : false });
        window.setTimeout(() => {
            window.location.assign('/mymood');
        });
    }

    onOpenEndedSurveySubmit = (e) => {
        e.preventDefault();
        let form = document.querySelector('#openEndedForm');
        let data = getFormData(form, {trim: true});
        let openended = openended || {};
        openended.most_improved_qone = data['most_improved_qone'];
        openended.most_improved_aone = data['most_improved_aone'];
        openended.most_improved_qtwo = data['most_improved_qtwo'];
        openended.most_improved_atwo = data['most_improved_atwo'];
        openended.most_improved_qthree = data['most_improved_qthree'];
        openended.most_improved_athree = data['most_improved_athree'];
        openended.least_improved_qone = data['least_improved_qone'];
        openended.least_improved_aone = data['least_improved_aone'];
        openended.least_improved_qtwo = data['least_improved_qtwo'];
        openended.least_improved_atwo = data['least_improved_atwo'];
        openended.least_improved_qthree = data['least_improved_qthree'];
        openended.least_improved_athree = data['least_improved_athree'];
        openended.most_improved_mood = data['most_improved_mood'];
        openended.least_improved_mood = data['least_improved_mood'];

        let errorFlag =  false;

        if((openended.most_improved_aone === '' || openended.most_improved_aone === null) &&
        (openended.most_improved_atwo === '' || openended.most_improved_atwo === null) &&
        (openended.most_improved_athree === '' || openended.most_improved_athree === null)) {
            errorFlag =  true;
        } else if ((openended.least_improved_aone === '' || openended.least_improved_aone === null) &&
        (openended.least_improved_atwo === '' || openended.least_improved_atwo === null) &&
        (openended.least_improved_athree === '' || openended.least_improved_athree === null)) {
            errorFlag =  true;
        }

        if (errorFlag) {
            this.setState({errormsg: "Error : Responses can't be blank. Please answer atleast one question from each section."});
        } else {
            OpenEndedActions.saveAnswers(openended);
            sessionStorage.setItem("engagementsurvey", '');
            this.setState({ popup : true });
        }
    }

    onOpenEndedSurveyCancel = (e) => {
        e.preventDefault();
        sessionStorage.setItem("engagementsurvey", '');
        window.location.assign('/mymood');
    }



    render() {

        let surveyresults = this.state.surveyresults;
        let errormsg = this.state.errormsg;
        let topThreeAreas = MoodRatings.getTopThreeAreas(surveyresults);
        let worstThreeAreas = MoodRatings.getWorstThreeAreas(surveyresults);
        let mlarray = this.state.multilang;

        // _.mixin( { multiplemax: function(list, field){

        //     let max = _.max(list, function(item){
        //         return item[field];
        //     });

        //     return _.filter(list, function(item){
        //         return item[field] === max[field];
        //     });
        // }});

        let trand;
        let hmood;
        let highests = _.first(topThreeAreas,1);
        if (highests.length > 0) {
            trand = Math.floor(Math.random() * (highests.length));
            hmood = highests[trand].moodObj.mood;
        } else {
            hmood = '';
        }

        // _.mixin( { multiplemin: function(list, field){

        //     let min = _.min(list, function(item){
        //         return item[field];
        //     });

        //     return _.filter(list, function(item){
        //         return item[field] === min[field];
        //     });
        // }});

        let wrand;
        let wmood;
        let lowests = _.first(worstThreeAreas,1);
        if (lowests.length > 0) {
            wrand = Math.floor(Math.random() * (lowests.length));
            wmood = lowests[wrand].moodObj.mood;
        } else {
            wmood = '';
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
                                    <label>Answers submitted successfully.</label>
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

        let errMsg;
        if (errormsg != '') {
            errMsg = (
                <div className="ui one column stackable grid container ">
                    <div className="column">
                        <div className="ui red message">{errormsg}</div>
                    </div>
                </div>
            );
        }

        let questions = (this.state.questions).map((question) => {
            return (
                <div className="ui two column stackable grid survey">

                    <div className="clear"></div>
                    <div className="ui one column stackable grid container ">
                        <div className="column">
                            <h4 className="ui header ryt com">{GetText('OPES_TOP_TITLE', mlarray)} - {GetText('OPES_' + hmood, mlarray)}<span style={{"fontSize":"14px"}}> ({GetText('OPES_OPTION', mlarray)})</span></h4>
                        </div>
                    </div>

                    <div className="one wide column qst-mobile">
                        <div className="ui grey circular label ">Q.1</div>
                    </div>
                    <div className="fifteen wide column padin-lft">
                        <div className="ui left pointing label "> <span className="qst-mobile-1">Q.1</span>{GetText('OPES_TOP_QNSONE', mlarray)} </div>
                        <div className="ui form options">
                            <div className="ui form options">
                                <div className="field">
                                    <input type="hidden" name="most_improved_mood" value={hmood} />
                                    <input type="hidden" name="most_improved_qone" value={GetText('OPES_TOP_QNSONE', mlarray)} />
                                    <textarea name="most_improved_aone" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="one wide column qst-mobile">
                        <div className="ui grey circular label ">Q.2</div>
                    </div>
                    <div className="fifteen wide column padin-lft">
                        <div className="ui left pointing label "> <span className="qst-mobile-1">Q.2</span>{GetText('OPES_TOP_QNSTWO', mlarray)} </div>
                        <div className="ui form options">
                            <div className="ui form options">
                                <div className="field">
                                    <input type="hidden" name="most_improved_qtwo" value={GetText('OPES_TOP_QNSTWO', mlarray)} />
                                    <textarea name="most_improved_atwo" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="one wide column qst-mobile">
                        <div className="ui grey circular label ">Q.3</div>
                    </div>
                    <div className="fifteen wide column padin-lft">
                        <div className="ui left pointing label "> <span className="qst-mobile-1">Q.3</span>{GetText('OPES_TOP_QNSTHREE', mlarray)} </div>
                        <div className="ui form options">
                            <div className="ui form options">
                                <div className="field">
                                    <input type="hidden" name="most_improved_qthree" value={GetText('OPES_TOP_QNSTHREE', mlarray)} />
                                    <textarea name="most_improved_athree" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="clear"></div>
                    <div className="ui one column stackable grid container ">
                        <div className="column">
                            <h4 className="ui header ryt com">{GetText('OPES_WORST_TITLE', mlarray)} - {GetText('OPES_' + wmood, mlarray)}<span style={{"fontSize":"14px"}}> ({GetText('OPES_OPTION', mlarray)})</span></h4>
                        </div>
                    </div>


                    <div className="one wide column qst-mobile">
                        <div className="ui grey circular label ">Q.1</div>
                    </div>
                    <div className="fifteen wide column padin-lft">
                        <div className="ui left pointing label "> <span className="qst-mobile-1">Q.1</span>{GetText('OPES_WORST_QNSONE', mlarray)} </div>
                        <div className="ui form options">
                            <div className="ui form options">
                                <div className="field">
                                    <input type="hidden" name="least_improved_mood" value={wmood} />
                                    <input type="hidden" name="least_improved_qone" value={GetText('OPES_WORST_QNSONE', mlarray)} />
                                    <textarea name="least_improved_aone" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="one wide column qst-mobile">
                        <div className="ui grey circular label ">Q.2</div>
                    </div>
                    <div className="fifteen wide column padin-lft">
                        <div className="ui left pointing label "> <span className="qst-mobile-1">0.2</span>{GetText('OPES_WORST_QNSTWO', mlarray)} </div>
                        <div className="ui form options">
                            <div className="ui form options">
                                <div className="field">
                                    <input type="hidden" name="least_improved_qtwo" value={GetText('OPES_WORST_QNSTWO', mlarray)} />
                                    <textarea name="least_improved_atwo" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="one wide column qst-mobile">
                        <div className="ui grey circular label ">Q.3</div>
                    </div>
                    <div className="fifteen wide column padin-lft">
                        <div className="ui left pointing label "> <span className="qst-mobile-1">Q.3</span>{GetText('OPES_WORST_QNSTHREE', mlarray)} </div>
                        <div className="ui form options">
                            <div className="ui form options">
                                <div className="field">
                                    <input type="hidden" name="least_improved_qthree" value={GetText('OPES_WORST_QNSTHREE', mlarray)} />
                                    <textarea name="least_improved_athree" rows="2"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="one wide column qst-mobile"></div>
                    <div className="fifteen wide column padin-lft">
                        <div className="ui left">{errMsg}</div>
                        <div className="ui form options">
                            <div className="ui form options">
                                <div className="field">
                                    <button className="ui submit  button cancel" onClick={this.onOpenEndedSurveyCancel}>{GetText('OPES_CANCEL_BTN', mlarray)}</button>
                                    <button className="ui submit button submitt" onClick={this.onOpenEndedSurveySubmit}>{GetText('OPES_SUBMIT_BTN', mlarray)}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        });

        return (
            <div className="ui segment brdr-none padding-none width-rating">
                {modal}
                <form id="openEndedForm">
                    {questions}
                </form>
            </div>
        );
    }
}
