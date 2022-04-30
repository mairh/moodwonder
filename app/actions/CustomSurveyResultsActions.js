import alt from 'altInstance';
import CustomSurveyWebAPIUtils from 'utils/CustomSurveyWebAPIUtils';

class CustomSurveyResultsActions {

    getSurveyForm () {
        this.dispatch();
        CustomSurveyWebAPIUtils.getSurveyForm()
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.handlesurveyform(response.form);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    handlesurveyform (data) {
        this.dispatch(data);
    }

    saveSurveyResults (data) {
        this.dispatch();
        CustomSurveyWebAPIUtils.saveSurveyResults(data)
        .then((response, textStatus) => {
            this.actions.handlesurveyresults(true);
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    handlesurveyresults (data) {
        this.dispatch(data);
    }

    getSurveyResponses (id) {
        this.dispatch();
        CustomSurveyWebAPIUtils.getSurveyResponses(id)
        .then((response, textStatus) => {
            if (response.status === true) {
                this.actions.handlesurveyresponses(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    handlesurveyresponses (data) {
        this.dispatch(data);
    }

}

export default alt.createActions(CustomSurveyResultsActions);
