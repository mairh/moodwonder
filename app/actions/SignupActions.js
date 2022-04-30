import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

/**
* SignupActions
*/
class SignupActions {

    /**
    *function to collect details from users
    */
    usersignupstep1 (data) {
        this.dispatch();
        UserWebAPIUtils.usersignupstep1(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                // Dispatch another event for successful login
                this.actions.signupfeedback(response);
            }
        }, () => {
            // Dispatch another event for a bad login
        });
    }

    signupfeedback (response) {
        this.dispatch(response);
    }
}

export default alt.createActions(SignupActions);
