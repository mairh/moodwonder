import alt from 'altInstance';
import CommonWebAPIUtils from 'utils/CommonWebAPIUtils';

/**
* HomePageActions
*/
class HomePageActions {

    // request Demo
    requestDemo (data) {
        this.dispatch();
        CommonWebAPIUtils.requestDemo(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.requestdemosuccess(response);
            }
        }, () => {
        });
    }

    // response handler for requestDemo()
    requestdemosuccess (response) {
        this.dispatch(response);
    }
}

export default alt.createActions(HomePageActions);
