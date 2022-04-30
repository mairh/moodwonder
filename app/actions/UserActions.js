import alt from 'altInstance';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';
import Cookie from 'utils/Cookie';

/**
* UserActions
*/
class UserActions {

    // login function
    manuallogin (data) {
        this.dispatch();
        UserWebAPIUtils.manuallogin(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                // Dispatch another event for successful login
                if(response.status && response.user.language) {
                    Cookie.setCookie('lang', response.user.language, 30);
                }
                this.actions.loginresponse(response);
            }
        }, () => {
            // Dispatch another event for a bad login
        });
    }

    // Keep this function name in lower case, otherwise it will not be available in 'Store'
    loginresponse (response) {

        this.dispatch(response);
    }

    // Save user details
    saveUserInfo (data) {
        this.dispatch();
        UserWebAPIUtils.saveUserDetails(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.saveuserdetailssuccess(response);
                this.actions.getuserinfo();
            }
        }, () => {
        });
    }


    saveuserdetailssuccess (response) {
        this.dispatch(response);
    }

    // Update user image
    updateUserImage (data) {
        this.dispatch();
        UserWebAPIUtils.updateUserPhoto(data, this);
    }


    updateuserphotosuccess (response) {
        this.dispatch(response);
    }

    // Save user details
    saveManagerInfo (data) {
        this.dispatch();
        UserWebAPIUtils.saveManagerDetails(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.savemanagerdetailssuccess(response);
                this.actions.getuserinfo();
            }
        }, () => {
        });
    }

    savemanagerdetailssuccess (response) {
        this.dispatch(response);
    }

    // Save company details
    saveCompanyInfo (data) {
        this.dispatch();
        UserWebAPIUtils.saveCompanyDetails(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.savecompanysuccess(response);
            }
        }, () => {
        });
    }

    savecompanysuccess (response) {
        this.dispatch(response);
    }

    // Get user details
    getuserinfo () {
        this.dispatch();
        UserWebAPIUtils.userinfo()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.userinfosuccess(response);
            }
        }, () => {
        });
    }

    userinfosuccess (response) {
        this.dispatch(response);
    }

    // Get user details
    getcompanyinfo () {
        this.dispatch();
        UserWebAPIUtils.userinfo('company')
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.companyinfosuccess(response);
            }
        }, () => {
        });
    }

    companyinfosuccess (response) {
        this.dispatch(response);
    }

    // Get user details
    getCurrentUserId () {
        this.dispatch();
        UserWebAPIUtils.getCurrentUserId()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getcurrentuserid(response);
            }
        }, () => {
        });
    }

    getcurrentuserid (response) {
        this.dispatch(response);
    }

    // logout function
    logout () {
        this.dispatch();
        UserWebAPIUtils.logout()
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

    // Get user details for leftbar
    getUserData () {
        this.dispatch();
        UserWebAPIUtils.userinfo()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.userdatasuccess(response);
            }
        }, () => {
        });
    }

    userdatasuccess (response) {
        //this.dispatch(response);
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(response);
            });
        } else {
            this.dispatch(response);
        }
    }
}

export default alt.createActions(UserActions);
