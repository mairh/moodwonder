import alt from 'altInstance';
import EngagementAreaWebAPIUtils from 'utils/EngagementAreaWebAPIUtils';

class EngagementAreaActions {

    addEngagement (data) {
        this.dispatch();
        EngagementAreaWebAPIUtils.addEngagement(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.addengagementsuccess(true);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    addengagementsuccess (data) {
        this.dispatch(data);
    }

    editEngagement (id, data) {
        this.dispatch();
        EngagementAreaWebAPIUtils.editEngagement(id, data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.editengagementsuccess(true);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    editengagementsuccess (data) {
        this.dispatch(data);
    }

    getEngagements () {
        this.dispatch();
        EngagementAreaWebAPIUtils.getEngagements()
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.getengagementssuccess(response.engagementareas);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    getengagementssuccess (data) {
        this.dispatch(data);
    }

    deleteEngagement (id) {
        this.dispatch();
        EngagementAreaWebAPIUtils.deleteEngagement(id)
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.deleteengagementsuccess(id);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    deleteengagementsuccess (id) {
        this.dispatch(id);
    }

}

export default alt.createActions(EngagementAreaActions);
