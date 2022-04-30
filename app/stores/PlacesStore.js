import PlacesActions from 'actions/PlacesActions';
import alt from 'altInstance';

/**
* PlacesStore
*/
class PlacesStore {

    constructor () {

        this.PlacesList     =  false;
        this.PlacesData     =  false;
        this.DataChange     =  false;
        this.hasError       =  false;
        this.message        =  false;
        this.ServerResponse =  false;

        this.bindListeners({
            handleAddPlaces: PlacesActions.ADDPLACES,
            handleGetPlaces: PlacesActions.GETPLACES,
            handleUpdatePlaces: PlacesActions.UPDATEPLACES,
            handleGetPlacesData: PlacesActions.GETPLACESDATA,
            handleDeletePlacesData: PlacesActions.DELETEPLACES
        });
    }

    handleAddPlaces (res) {
        this.message        =  res.message;
        this.hasError       =  !res.status;
        this.ServerResponse =  res;
        this.emitChange();
    }

    handleGetPlaces (res) {
        this.hasError     =  !res.status;
        if(this.hasError){
            this.message    =  res.message;
            this.PlacesList =  res.data;
        }else{
            this.PlacesList =  res.data;
        }
        this.emitChange();
    }

    handleGetPlacesData (res) {
        this.hasError     =  !res.status;
        if(this.hasError){
            this.message    =  res.message;
        }
        this.PlacesData =  res.data;
        this.emitChange();
    }

    handleUpdatePlaces (res) {
        this.hasError        =  !res.status;
        this.message         =  res.message;
        this.ServerResponse  =  res;
        this.emitChange();
    }

    handleDeletePlacesData (res) {
        this.hasError        =  !res.status;
        this.message         =  res.message;
        this.ServerResponse  =  res;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(PlacesStore, 'PlacesStore');
