import CreatePswdActions from 'actions/CreatePswdActions';
import alt from 'altInstance';

/**
* CreatePswdStore
*/
class CreatePswdStore {

    constructor () {
        this.user      =   {};
        this.message   =   '';
        this.hasError  =   false;
        this.responseStatus =   false;
        this.noPswdForm =   false;
        this.bindListeners({
            handleSignupStep2Feedback: CreatePswdActions.SIGNUPSTEP2FEEDBACK
        });
    }

    handleSignupStep2Feedback (response) {
        this.message = response.message;
        this.hasError = !response.status;
        this.responseStatus = response.status;
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(CreatePswdStore, 'CreatePswdStore');
