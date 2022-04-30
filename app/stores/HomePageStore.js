import HomePageActions from 'actions/HomePageActions';
import alt from 'altInstance';

/**
* HomePageStore
*/
class HomePageStore {

    constructor () {
        this.isServerCallWaiting    =    true;
        this.hasErrorMessage        =    false;
        this.responseStatus         =    false;
        this.messages               =    [];
        this.canSubmit              =    false;

        this.bindListeners({
            requestDemoSuccess: HomePageActions.REQUESTDEMOSUCCESS
        });
    }

    requestDemoSuccess (response) {
        console.log(response);
        this.isServerCallWaiting    =    false;
        this.responseStatus         =    response.status;
        this.hasErrorMessage        =    !response.status;
        this.messages               =    response.messages;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(HomePageStore, 'HomePageStore');
