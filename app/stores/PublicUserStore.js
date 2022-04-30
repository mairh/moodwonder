import PublicUserActions from 'actions/PublicUserActions';
import alt from 'altInstance';

/**
* PublicUserStore
*/
class PublicUserStore {

    constructor () {

        this.publicuser = false;
        this.hasError = false;

        this.bindListeners({
            handlePublicUserInfoSuccess: PublicUserActions.PUBLICUSERINFO
        });
    }

    handlePublicUserInfoSuccess (response) {
        this.publicuser = response.publicuser;
        this.hasError   = !response.status;
        this.messages   = response.messages;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(PublicUserStore, 'PublicUserStore');
