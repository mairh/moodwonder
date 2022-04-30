import OpenEndedActions from 'actions/OpenEndedActions';
import alt from 'altInstance';


class OpenEndedStore {

    constructor () {
        this.questions = [];
        this.savesurveyflag = false;
        this.members = [];
        this.answers = [];

        this.bindListeners({
            handleQuestions: OpenEndedActions.GETQUESTIONS,
            handleSaveAnswers: OpenEndedActions.SAVEANSWERS,
            handleMembers: OpenEndedActions.GETMEMBERS,
            handleAnswers: OpenEndedActions.GETANSWERS
        });
    }

    handleQuestions (response) {
        this.questions = [];
        this.questions = response;
        this.emitChange();
    }

    handleSaveAnswers (response) {
        this.savesurveyflag = true;
        this.emitChange();
    }

    handleMembers (response) {
        this.members = [];
        this.members = response;
        this.emitChange();
    }

    handleAnswers (response) {
        this.answers = [];
        this.answers = response;
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(OpenEndedStore, 'OpenEndedStore');
