import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/CommonAdminWebAPIUtils';

/**
* PlacesActions
*/
class PlacesActions {

    // add new places
    addPlaces (data) {
        this.dispatch();
        AdminWebAPIUtils.addPlaces(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.addplaces(response);
                this.actions.getPlaces(data);
            }
        }, () => {
        });
    }

    addplaces (response) {
        this.dispatch(response);
    }

    // add new continent
    getPlaces (data) {
        //console.log(data);
        this.dispatch();
        AdminWebAPIUtils.getPlaces(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                //console.log(response);
                this.actions.getplaces(response);
                // this.actions.getcontinents();
            }
        }, () => {
        });
    }

    getplaces (response) {
        //console.log(response);
        this.dispatch(response);
    }

    // update places
    updatePlaces (data,_id) {
        this.dispatch();
        AdminWebAPIUtils.updatePlaces(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.updateplaces(response);

                // No need to fech new list if response.status is false
                if(response.status){
                    // only using `placeType` param - Fetching new list after the update
                    if(data.placeType === 'country' || data.placeType === 'state' || data.placeType === 'city'){
                        data._id = _id;
                        this.actions.getPlaces(data);
                    }else{
                        this.actions.getPlaces(data);
                    }
                }
            }
        }, () => {
        });
    }

    updateplaces (response) {
        this.dispatch(response);
    }

    // delete Places
    deletePlaces (data,_id) {
        this.dispatch();
        AdminWebAPIUtils.deletePlaces(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.deleteplaces(response);
                if(data.placeType === 'country' || data.placeType === 'state' || data.placeType === 'city'){
                    data._id = _id;
                    this.actions.getPlaces(data);
                }else{
                    this.actions.getPlaces(data);
                }
            }
        }, () => {
        });
    }

    deleteplaces (response) {
        this.dispatch(response);
    }

    // get places like coutry, state, city
    getPlacesData (data) {
        //this.dispatch();
        AdminWebAPIUtils.getPlacesData(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getplacesdata(response);
            }
        }, () => {
        });
    }

    getplacesdata (response) {
        this.dispatch(response);
    }

}

export default alt.createActions(PlacesActions);
