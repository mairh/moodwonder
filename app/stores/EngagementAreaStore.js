import Immutable from 'immutable';
import EngagementAreaActions from 'actions/EngagementAreaActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import EngagementAreaWebAPIUtils from 'utils/EngagementAreaWebAPIUtils';
import alt from 'altInstance';

class EngagementAreaStore {

    constructor () {

        this.engagementareas = []; //Immutable.Map({});
        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleAddEngagement: EngagementAreaActions.ADDENGAGEMENTSUCCESS,
            handleEditEngagement: EngagementAreaActions.EDITENGAGEMENTSUCCESS,
            handleDeleteEngagement: EngagementAreaActions.DELETEENGAGEMENTSUCCESS,
            handleGetEngagements: EngagementAreaActions.GETENGAGEMENTSSUCCESS
        });
    }

    bootstrap () {
        if (!Immutable.OrderedMap.isOrderedMap(this.engagementareas)) {
            this.engagementareas = fromJSOrdered(this.engagementareas);
        }
    }

    handleAddEngagement (data) {
        if(data) {
            EngagementAreaWebAPIUtils.getEngagements()
            .then((response, textStatus) => {
                if (response.status === 'success') {
                    this.engagementareas = [];
                    this.engagementareas = response.engagementareas;
                    this.emitChange();
                }
            }, () => {
                // Dispatch another event for a bad request
            });
        }
    }

    handleEditEngagement (data) {
        if(data) {
            EngagementAreaWebAPIUtils.getEngagements()
            .then((response, textStatus) => {
                if (response.status === 'success') {
                    this.engagementareas = [];
                    this.engagementareas = response.engagementareas;
                    this.emitChange();
                }
            }, () => {
                // Dispatch another event for a bad request
            });
        }
    }

    handleGetEngagements (data) {
        this.engagementareas = data;
        this.emitChange();
    }

    handleDeleteEngagement (id) {
        if(id) {
            let engagementareas = this.engagementareas;
            for (let i = 0; i < engagementareas.length; i++) {
                let engagementarea = engagementareas[i];
                if (engagementarea._id === id) {
                    engagementareas.splice(i, 1);
                    this.engagementareas = [];
                    this.engagementareas = engagementareas;
                }
            }
        }
        this.emitChange();
    }

}

export default alt.createStore(EngagementAreaStore, 'EngagementAreaStore');
