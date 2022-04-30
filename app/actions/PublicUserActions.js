import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
/**
* PublicUserActions
*/
class PublicUserActions {

    // Get user details for leftbar
    getPublicUserData () {
        this.dispatch();
        UserWebAPIUtils.publicuserinfo()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.publicuserinfosuccess(response);
            }
        }, () => {
        });
    }

    publicuserinfo (response) {
        this.dispatch(response);
    }
}

export default alt.createActions(PublicUserActions);
