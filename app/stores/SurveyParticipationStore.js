import alt from 'altInstance';
import SurveyParticipationActions from 'actions/SurveyParticipationActions';

class SurveyParticipationStore {

    constructor () {

        this.mySurvey = [];

        this.bindListeners({
            handleMySurveyParticipation: SurveyParticipationActions.MYSURVEYPARTICIPATION
        });
    }

    handleMySurveyParticipation (data) {
        this.mySurvey = [];
        this.mySurvey = data;
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(SurveyParticipationStore, 'SurveyParticipationStore');
