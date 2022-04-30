import alt from 'altInstance';
import CommonAdminWebAPIUtils from 'utils/CommonAdminWebAPIUtils';

/**
* IndustryActions
*/
class IndustryActions {

    // add new industry
    addIndustry (data) {
        this.dispatch();
        CommonAdminWebAPIUtils.addIndustry(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.addindustry(response);
                if(response.status){
                    this.actions.getIndustries();
                }
            }
        }, () => {
        });
    }

    addindustry (response) {
        this.dispatch(response);
    }

    // Get all industries
    getIndustries (data) {
        this.dispatch();
        CommonAdminWebAPIUtils.getIndustries(data)
        .then((response, textStatus) => {
            this.actions.getindustries(response);
        }, () => {
        });
    }

    getindustries (response) {
        this.dispatch(response);
    }


    // update industry
    updateIndustry (data) {
        this.dispatch();
        CommonAdminWebAPIUtils.updateIndustry(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.updateindustry(response);
                this.actions.getIndustries();
            }
        }, () => {
        });
    }

    updateindustry (response) {
        this.dispatch(response);
    }

    // delete Industry
    deleteIndustry (data) {
        this.dispatch();
        CommonAdminWebAPIUtils.deleteIndustry(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.deleteindustry(response);
                this.actions.getIndustries();
            }
        }, () => {
        });
    }

    deleteindustry (response) {
        this.dispatch(response);
    }

}

export default alt.createActions(IndustryActions);
