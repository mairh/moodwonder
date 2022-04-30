import AppActions from 'actions/AppActions';
import alt from 'altInstance';

/**
* AppStore
*/
class AppStore {

    constructor () {

        if(typeof sessionStorage !== 'undefined'){
            this.isAuthenticated = (sessionStorage.getItem('isAuthenticated') === "true");
            if(sessionStorage.getItem('currentUser')){
                let currentUser      = JSON.parse(sessionStorage.getItem('currentUser'));
                this.userType        = currentUser.user.usertype;
            }
        }else{
            this.isAuthenticated = false;
            this.userType        = false;
        }
        this.isServerCallWaiting = false;
        this.hasError            = false;
        this.bindListeners({
            handleCheckUser: AppActions.CHECKUSER
        });
    }


    handleCheckUser () {
        if(typeof sessionStorage !== 'undefined'){
            this.isAuthenticated = (sessionStorage.getItem('isAuthenticated') === "true");
        }
        this.isLogginWaiting = false;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(AppStore, 'AppStore');
