import SignupActions from 'actions/SignupActions';
import alt from 'altInstance';

/**
* SignupStore
*/
class SignupStore {

    constructor () {
        this.user = {};
        this.isSignupWaiting = false;
        this.message = '';
        this.hasErrorMessage = false;
        this.messages = [];
        this.isRegistered = false;
        this.canSubmit = false;
        this.inviteEmail = '';
        this.notificationReact = {
            message: 'Invalid E-mail!',
            action: 'X',
            isActive: false,
            dismissAfter: 10000,
            style: {
                bar: {
                    backgroundColor: 'rgb(97, 172, 234)',
                    bottom: '50%'
                },
                action: {
                    color: 'rgb(20, 27, 32)'
                }
            }
        };
        this.bindListeners({
            handleSignupFeedback: SignupActions.SIGNUPFEEDBACK,
            handleSignupAttempt: SignupActions.USERSIGNUPSTEP1
        });
    }

    handleSignupAttempt () {
        this.isSignupWaiting = true;
        this.emitChange();
    }

    handleSignupFeedback (response) {
        this.isSignupWaiting = false;
        this.message = response.message;
        this.isRegistered = response.status;
        this.hasErrorMessage = !response.status;
        if (this.message !== '') {
            this.notificationReact.message = this.message;
            this.notificationReact.isActive = true;
        }
        if (response.messages !== undefined && response.messages.constructor === Array) {
            this.messages = response.messages;
        }
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(SignupStore, 'SignupStore');
