import Immutable from 'immutable';
import NotificationRulesActions from 'actions/NotificationRulesActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import NotificationRulesWebAPIUtils from 'utils/NotificationRulesWebAPIUtils';
import alt from 'altInstance';

class NotificationRulesStore {

    constructor () {

        this.rules = []; //Immutable.Map({});
        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleGetRules: NotificationRulesActions.GETRULESSUCCESS,
            handleEditRule: NotificationRulesActions.EDITRULESUCCESS,
            handleDeleteRule: NotificationRulesActions.DELETERULESUCCESS
        });
    }

    bootstrap () {
        if (!Immutable.OrderedMap.isOrderedMap(this.rules)) {
            this.rules = fromJSOrdered(this.rules);
        }
    }

    handleGetRules (data) {
        this.rules = data;
        this.emitChange();
    }

    handleEditRule (data) {
        if(data) {
            NotificationRulesWebAPIUtils.getRules()
            .then((response, textStatus) => {
                if (response.status === 'success') {
                    this.rules = [];
                    this.rules = response.rules;
                    this.emitChange();
                }
            }, () => {
                // Dispatch another event for a bad request
            });
        }
    }

    handleDeleteRule (id) {
        if(id) {
            let rules = this.rules;
            for (let i = 0; i < rules.length; i++) {
                let rule = rules[i];
                if (rule._id === id) {
                    rules.splice(i, 1);
                    this.rules = [];
                    this.rules = rules;
                }
            }
        }
        this.emitChange();
    }



}

export default alt.createStore(NotificationRulesStore, 'NotificationRulesStore');
