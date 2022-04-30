import alt from 'altInstance';
import NotificationRulesWebAPIUtils from 'utils/NotificationRulesWebAPIUtils';

class NotificationRulesActions {

    getRules () {
        this.dispatch();
        NotificationRulesWebAPIUtils.getRules()
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.getrulessuccess(response.rules);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    getrulessuccess (data) {
        this.dispatch(data);
    }

    editRule (id, data) {
        this.dispatch();
        NotificationRulesWebAPIUtils.editRule(id, data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.editrulesuccess(true);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    editrulesuccess (data) {
        this.dispatch(data);
    }

    deleteRule (id) {
        this.dispatch();
        NotificationRulesWebAPIUtils.deleteRule(id)
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.deleterulesuccess(id);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    deleterulesuccess (id) {
        this.dispatch(id);
    }

}

export default alt.createActions(NotificationRulesActions);
