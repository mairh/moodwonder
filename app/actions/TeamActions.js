import alt from 'altInstance';
import CommonWebAPIUtils from 'utils/CommonWebAPIUtils';

/**
* TeamActions
*/
class TeamActions {

    // Create Team
    createTeam (data) {
        this.dispatch();
        CommonWebAPIUtils.createMyTeam(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.createteamsuccess(response);
                this.actions.getTeams ();
            }
        }, () => {
        });
    }

    // response handler for createTeam()
    createteamsuccess (response) {
        this.dispatch(response);
    }

    // Update team name
    updateTeam (data) {
        this.dispatch();
        CommonWebAPIUtils.updateMyTeam(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.updateteamsuccess(response);
                this.actions.getTeams ();
            }
        }, () => {
        });
    }

    // response handler for updateTeam()
    updateteamsuccess (response) {
        this.dispatch(response);
    }

    // Get My Teams
    getTeams (data) {
        this.dispatch();
        CommonWebAPIUtils.getMyTeams(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getteamsuccess(response);
            }
        }, () => {
        });
    }

    // response handler for getTeams()
    getteamsuccess (response) {
        this.dispatch(response);
    }

    // To add a member To my team
    addMemberToTeam (data) {
        this.dispatch();
        CommonWebAPIUtils.addMemberToMyTeam(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getTeams ();
                this.actions.memberaddsuccess(response);
            }
        }, () => {
        });
    }

    // response handler for memberaddsuccess()
    memberaddsuccess (response) {
        this.dispatch(response);
    }

    // To remove a member from my team
    removeMemberFromTeam (data) {
        this.dispatch();
        CommonWebAPIUtils.removeMemberFromMyTeam(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getTeams ();
                this.actions.memberremovesuccess(response);
            }
        }, () => {
        });
    }

    // response handler for memberremovesuccess()
    memberremovesuccess (response) {
        this.dispatch(response);
    }

}

export default alt.createActions(TeamActions);
