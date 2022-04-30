import InviteActions from 'actions/InviteActions';
import alt from 'altInstance';

/**
* InviteStore
*/
class InviteStore {

    constructor () {

        this.isServerCallWaiting    =    true;
        this.hasError               =    false;
        this.message                =    '';
        this.canSubmit              =    false;

        this.bindListeners({
            handleInviteSignupSuccess: InviteActions.INVITESIGNUPSUCCESS,
            handleInviteAnonymouslySuccess: InviteActions.INVITEANONYMOUSLYSUCCESS
        });
    }

    handleInviteSignupSuccess (response) {
        console.log(response);
        this.isServerCallWaiting    =    false;
        this.hasError               =    !response.status;
        this.message                =    response.message;
        this.emitChange();
    }

    handleInviteAnonymouslySuccess (response) {
        console.log(response);
        this.isServerCallWaiting    =    false;
        this.hasError               =    !response.status;
        this.message                =    response.message;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(InviteStore, 'InviteStore');
