import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

/**
* CreatePswdActions
*/
class CreatePswdActions {

    /**
    *function to collect details from users
    */
    usersignupstep2 (data) {
        this.dispatch();
        UserWebAPIUtils.usersignupstep2(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                // Dispatch another event for successful login
                this.actions.signupstep2feedback(response);
            }
        }, () => {
            // Dispatch another event for a bad login
        });
    }

    signupstep2feedback (response) {
        this.dispatch(response);
    }
}

export default alt.createActions(CreatePswdActions);
