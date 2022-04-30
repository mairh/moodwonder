import alt from 'altInstance';
import CommonWebAPIUtils from 'utils/CommonWebAPIUtils';

/**
* InviteActions
*/
class InviteActions {

    // Invite People
    invitePeople (data) {
        this.dispatch();
        CommonWebAPIUtils.inviteSignup(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.invitesignupsuccess(response);
            }
        }, () => {
        });
    }

    // response handler for inviteSignup()
    invitesignupsuccess (response) {
        this.dispatch(response);
    }

    // Invite People Anonymously
    invitePeopleAnonymously (data) {
        this.dispatch();
        CommonWebAPIUtils.inviteAnonymously(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.inviteanonymouslysuccess(response);
            }
        }, () => {
        });
    }

    inviteanonymouslysuccess (response) {
        this.dispatch(response);
    }
}

export default alt.createActions(InviteActions);
