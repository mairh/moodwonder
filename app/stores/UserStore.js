import Immutable from 'immutable';
import UserActions from 'actions/UserActions';
import alt from 'altInstance';

/**
* UserStore
*/
class UserStore {

    constructor () {

        this.user = Immutable.Map({});
        this.isLogginWaiting = false;
        this.isServerCallWaiting = true;
        this.hasError = false;
        this.hasErrorMessage = false;
        this.userDetails = {
            'fname': '', 'lname': '', 'email': '', 'language': '',
            'reportfrequency': '', 'password': '', 'companyname': '', 'industry': '',
            'continent': '', 'country': '', 'state': '', 'profile_image': '',
            'city': '', 'address': '', 'website': '', 'companysize': ''
        };
        this.userDetailsTmp = this.userDetails ;
        this.profile_image = false;
        this.message = '';
        this.isLoggedIn = false;
        this.canSubmit = false;
        this.userData = [];
        this.loggeduserid = '';
        this.ServerResponse =  false;

        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleLoginAttempt: UserActions.MANUALLOGIN,
            handleLoginResponse: UserActions.LOGINRESPONSE,
            handleLogoutAttempt: UserActions.LOGOUT,
            handleUserInfoSuccess: UserActions.USERINFOSUCCESS,
            handleCompanyInfoSuccess: UserActions.COMPANYINFOSUCCESS,
            handleSaveUserDetailsSuccess: UserActions.SAVEUSERDETAILSSUCCESS,
            handleUpdateUserPhotoSuccess: UserActions.UPDATEUSERPHOTOSUCCESS,
            handleSaveManagerDetailsSuccess: UserActions.SAVEMANAGERDETAILSSUCCESS,
            handleSaveCompanySuccess: UserActions.SAVECOMPANYSUCCESS,
            handleLogoutSuccess: UserActions.LOGOUTSUCCESS,
            handleUserDataSuccess: UserActions.USERDATASUCCESS,
            handleCurrentUserIdSuccess: UserActions.GETCURRENTUSERID
        });
    }

    bootstrap () {
        if (!Immutable.Map.isMap(this.user)) {
            this.user = Immutable.fromJS(this.user);
        }
    }

    handleLoginAttempt () {
        this.isLogginWaiting = true;
        this.emitChange();
    }

    handleLoginResponse (response) {
        this.isLogginWaiting = false;
        this.message = response.message;
        this.isLoggedIn = response.status;
        this.hasErrorMessage = !response.status;
        if(this.isLoggedIn) {
            sessionStorage.setItem('isAuthenticated', true);
            sessionStorage.setItem('currentUser', JSON.stringify(response));
        }
        this.emitChange();
    }

    handleSaveUserDetailsSuccess (response) {
        console.log('handleSaveUserDetailsSuccess');
        console.log(response);
        this.isServerCallWaiting = false;
        this.hasError = !response.status;
        this.message = response.message;
        this.updateType = response.type;
        this.ServerResponse = response;
        if((!this.hasError) && response.type === 'summary'){
            this.summaryEdit = false;
        }
        if((!this.hasError) && response.type === 'personalinfo'){
            this.personalInfoEdit = false;
        }
        if((!this.hasError) && response.type === 'generalinfo'){
            this.generalInfoEdit = false;
        }
        this.emitChange();
    }

    handleUpdateUserPhotoSuccess (response) {
        this.isServerCallWaiting = false;
        this.hasError = !response.status;
        this.message = response.message;
        this.emitChange();
    }

    handleSaveManagerDetailsSuccess (response) {
        this.isServerCallWaiting = false;
        this.hasError = !response.status;
        this.updateType = response.type;
        this.message = response.message;
        this.emitChange();
    }

    handleSaveCompanySuccess (response) {
        this.isServerCallWaiting = false;
        this.hasError = !response.status;
        this.message  = response.message;
        this.messages = response.messages;
        this.emitChange();
    }

    handleUserInfoSuccess (response) {
        console.log('handleUserInfoSuccess');
        console.log(response);
        this.isServerCallWaiting = false;
        this.hasError = !response.status;
        if (!this.hasError) {
            this.userDetails = response.data;
            let v1 = JSON.parse(JSON.stringify(response.data));
            this.userData = v1;
            this.userDetailsTmp = response.data;
            this.profile_image = response.data.profile_image;
        }else{
            this.message = response.message;
        }
        this.emitChange();
    }

    handleUserDataSuccess (response) {
        this.isServerCallWaiting = false;
        this.hasError = !response.status;
        if (!this.hasError) {
            this.userData = response.data;
        }else{
            this.message = response.message;
        }
        this.emitChange();
    }

    handleCompanyInfoSuccess (response) {
        this.isServerCallWaiting = false;
        this.hasError = !response.status;
        this.message = response.message;
        if (!this.hasError) {
            this.userDetails = response.data;
            this.userDetailsTmp = response.data;
            // To ignore initial message
            this.message = '';
        }
        this.emitChange();
    }

    handleLogoutAttempt () {
        this.isLogginWaiting = true;
        this.emitChange();
    }

    handleLogoutSuccess () {
        this.isLogginWaiting = false;
        this.isLoggedIn = false;
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('currentUser');
        this.emitChange();
    }

    handleCurrentUserIdSuccess (data) {
        this.loggeduserid = data._id;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(UserStore, 'UserStore');
