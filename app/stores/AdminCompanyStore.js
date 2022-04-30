import AdminCompanyActions from 'actions/AdminCompanyActions';
import alt from 'altInstance';

/**
* AdminCompanyStore
*/
class AdminCompanyStore {

    constructor () {

        this.companyList = false;
        this.hasError = false;
        this.message = '';

        this.bindListeners({
            handleSetCompanyList: AdminCompanyActions.SETALLCOMPANYLIST
        });
    }

    handleSetCompanyList (res) {
        this.companyList = res.data;
        this.hasError = !res.status;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(AdminCompanyStore, 'AdminCompanyStore');
