import Immutable from 'immutable';
import { fromJSOrdered } from 'utils/immutableHelpers';
import MoodActions from 'actions/MoodActions';
import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

class MoodStore {

    constructor () {
        this.moodstatus = false;
        this.moods = [];
        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleAddMood: MoodActions.ADDMOODSUCCESS,
            handleGetMyMoods: MoodActions.GETMYMOODSSUCCESS
        });
    }

    bootstrap () {
        if (!Immutable.OrderedMap.isOrderedMap(this.moods)) {
            this.moods = fromJSOrdered(this.moods);
        }
    }

    handleAddMood (res) {
        if(res.status) {
            UserWebAPIUtils.getMyMoods()
            .then((response, textStatus) => {
                if (response.status === 'success') {
                    this.moodstatus = true;
                    this.moods = response.data;
                    this.emitChange();
                }
            }, () => {
                // Dispatch another event for a bad request
            });
        }
    }

    handleGetMyMoods (data) {
        this.moods = data;
        this.emitChange();
    }


}

// Export our newly created Store
export default alt.createStore(MoodStore, 'MoodStore');
