import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

class MoodActions {

    addMood (data) {
        this.dispatch();
        UserWebAPIUtils.addMood(data)
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.addmoodsuccess(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    addmoodsuccess (data) {
        this.dispatch(data);
    }

    getMyMoods () {
        this.dispatch();
        UserWebAPIUtils.getMyMoods()
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.getmymoodssuccess(response.data);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    getmymoodssuccess (data) {
        this.dispatch(data);
    }


}

export default alt.createActions(MoodActions);
