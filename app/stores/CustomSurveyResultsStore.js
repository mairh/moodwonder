import CustomSurveyResultsActions from 'actions/CustomSurveyResultsActions';
import alt from 'altInstance';

class CustomSurveyResultsStore {

    constructor() {

        this.status = false;
        this.surveyform = [];
        this.users = [];
        this.surveyresponses = [];

        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleSurveyResponses: CustomSurveyResultsActions.HANDLESURVEYRESPONSES
        });
    }

    bootstrap() {}

    handleSurveyResponses(response) {
        this.surveyform = response.surveyform;
        this.users = response.users;
        this.surveyresponses = response.surveyresponses;
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(CustomSurveyResultsStore, 'CustomSurveyResultsStore');
