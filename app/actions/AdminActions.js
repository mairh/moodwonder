import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/AdminWebAPIUtils';

class AdminActions {

    /**
    * Login function
    */
    login (data) {
        this.dispatch();
        AdminWebAPIUtils.login(data)
        .then((response, textStatus) => {
            if (response.status === 'success') {
                // Dispatch another event for successful login
                this.actions.loginsuccess(response);
            } else if (response.status === 'failure') {
                this.actions.loginfailure(response);
            }
        }, () => {
            // Dispatch another event for a bad login
        });
    }

    loginsuccess (response) {
        this.dispatch(response);
    }

    loginfailure (response) {
        this.dispatch(response);
    }

    logout () {
        this.dispatch();
        AdminWebAPIUtils.logout()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                // Dispatch another event for successful login
                this.actions.logoutsuccess();
            }
        }, () => {
            // Dispatch another event for a bad login
        });
    }

    logoutsuccess () {
        this.dispatch();
    }

}

export default alt.createActions(AdminActions);
