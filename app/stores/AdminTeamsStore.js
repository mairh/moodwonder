import AdminTeamActions from 'actions/AdminTeamActions';
import alt from 'altInstance';

/**
* AdminTeamsStore
*/
class AdminTeamsStore {

    constructor () {

        this.TeamList       = false;
        this.SearchTeamList = false;
        this.hasError       = false;
        this.ServerResponse =  false;
        this.message        = '';

        this.bindListeners({
            handleSetAllTeams: AdminTeamActions.SETALLTEAMS,
            handleSetSearchTeams: AdminTeamActions.SETSEARCHTEAMS
        });
    }

    handleSetAllTeams (res) {
        this.TeamList = res.data;
        this.hasError = !res.status;
        this.emitChange();
    }

    handleSetSearchTeams (res) {
        this.SearchTeamList = res.data;
        this.hasError       = !res.status;
        this.ServerResponse = res;
        if(this.hasError){
            this.message = res.message;
        }
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(AdminTeamsStore, 'AdminTeamsStore');
