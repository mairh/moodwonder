import React from 'react';
import SurveyActions from 'actions/SurveyActions';
import SurveyStore from 'stores/SurveyStore';
import Sliderrow from 'components/SliderRow.react';
import getFormData from 'get-form-data';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class Survey extends React.Component {

    constructor(props) {
        super(props);
        this.state = SurveyStore.getState();
        this.state.multilang = MlangStore.getState().multilang;
    }

    componentDidMount() {
        SurveyActions.getEngagementSurvey();
        SurveyStore.listen(this._onChange);
        SurveyActions.getLastSurvey();
        MlangStore.listen(this._onMLChange);
    }

    componentWillUnmount() {
        SurveyStore.unlisten(this._onChange);
        MlangStore.unlisten(this._onMLChange);
    }

    _onChange = (state) => {
        this.setState(state);
        if(this.state.savedstatus) {
            window.location.assign('/openendedsurvey');
        }
    }

    _onMLChange = () => {
        this.setState({
            multilang: MlangStore.getState().multilang
        });
    }

    _onSurveySubmit = () => {
        let form = document.querySelector('#engagementForm');
        let formData = getFormData(form, {trim: true});
        let moodrow = moodrow || {};

        moodrow.type = 'engagement';
        const surveyResult = this.state.questions.map((data, key) => {
            let rating = formData[data.mood];
            return { 'mood': data.mood, 'rating': rating, 'comment_title': '', 'comment': '' };
        });
        moodrow.surveyresult = surveyResult;
        SurveyActions.saveEngagementSurvey(moodrow);
        sessionStorage.setItem("engagementsurvey", "true");
    }

    render() {

        let items = '';
        let message = '';
        let slno = 1;
        let lastsurvey = this.state.lastsurvey;
        let lastrated = '';
        let mlarray = this.state.multilang;


        if(this.state.hasQuestions){
            items = this.state.questions.map((data, key) => {
                for (let i = 0; i < lastsurvey.length; i++) {
                    let surveydetail = lastsurvey[i];
                    if (surveydetail.mood === data.mood) {
                        lastrated = surveydetail.rating;
                    }
                }

                return (
                    <Sliderrow slno={slno++} mood={data.mood} description={data.description} lastrated={lastrated} />
                );
            });
        }

        if (this.state.hasError) {
            message = (
                <div className="alert alert-warning">
                    {this.state.message}
                </div>
            );
        }
        else if (this.state.message !== '') {
            message = (
                <div className="alert alert-info">
                    {this.state.message}
                </div>
            );
        }

        let submitButton = '';
        if(items){
            submitButton = (
                <button type="button" className="ui submit button submitt" onClick={this._onSurveySubmit}>{GetText('SRVY_SUBMIT_BTN', mlarray)}</button>
            );
        }

        let sTitle = (<h3 className="ui header ryt com">{GetText('SRVY_TITLE', mlarray)}</h3>);

        return (
            <div className="ui segment brdr-none padding-none width-rating">
                <div className="clear"></div>
                <div className="ui two column stackable grid container ">
                    <div className="column">
                        {sTitle}
                    </div>
                </div>
                {message}
                <form id="engagementForm">
                    <div className="ui column stackable  container survey-test survey-mw">
                        {items}
                        {submitButton}
                    </div>
                </form>
            </div>
        );
    }

}
