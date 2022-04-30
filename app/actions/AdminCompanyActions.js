import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/CommonAdminWebAPIUtils';

/**
* AdminCompanyActions
*/
class AdminCompanyActions {

    // Get all users in the database
    getAllCompanies () {
        this.dispatch();
        AdminWebAPIUtils.getAllCompanies()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setallcompanylist(response);
            }
        }, () => {
        });
    }

    setallcompanylist (response) {
        this.dispatch(response);
    }

}

export default alt.createActions(AdminCompanyActions);
