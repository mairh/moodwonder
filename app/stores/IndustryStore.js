import IndustryActions from 'actions/IndustryActions';
import alt from 'altInstance';

/**
* IndustryStore
*/
class IndustryStore {

    constructor () {

        this.IndustryList   =  false;
        this.DataChange     =  false;
        this.hasError       =  false;
        this.message        =  false;
        this.ServerResponse =  false;

        this.bindListeners({
            handleAddIndustry: IndustryActions.ADDINDUSTRY,
            handleGetIndustries: IndustryActions.GETINDUSTRIES,
            handleUpdateIndustry: IndustryActions.UPDATEINDUSTRY,
            handleDeleteIndustry: IndustryActions.DELETEINDUSTRY
        });
    }

    handleAddIndustry (res) {
        this.message  =  res.message;
        this.hasError =  !res.status;
        this.ServerResponse =  res;
        this.emitChange();
    }

    handleGetIndustries (res) {
        console.log(res);
        this.hasError     =  !res.status;
        if(this.hasError){
            this.message    =  res.message;
            this.IndustryList =  [];
        }else{
            this.IndustryList =  res.data;
        }
        this.ServerResponse =  res;
        this.emitChange();
    }

    handleUpdateIndustry (res) {
        //console.log(res);
        this.message        =  res.message;
        this.hasError       =  !res.status;
        this.ServerResponse =  res;
        this.emitChange();
    }

    handleDeleteIndustry (res) {
        //console.log(res);
        this.message  =  res.message;
        this.hasError =  !res.status;
        this.ServerResponse =  res;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(IndustryStore, 'IndustryStore');
