import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/CommonAdminWebAPIUtils';

/**
* AdminTeamActions
*/
class AdminTeamActions {

    // Get all team from a company
    getAllTeams (data) {
        this.dispatch();
        AdminWebAPIUtils.getAllTeams(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setallteams(response);
            }
        }, () => {
        });
    }

    setallteams (response) {
        this.dispatch(response);
    }

    // search a team
    searchTeam (data) {
        this.dispatch();
        AdminWebAPIUtils.searchTeam(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setsearchteams(response);
            }
        }, () => {
        });
    }

    setsearchteams (response) {
        this.dispatch(response);
    }

}

export default alt.createActions(AdminTeamActions);
