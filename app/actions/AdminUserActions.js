import alt from 'altInstance';
import AdminWebAPIUtils from 'utils/CommonAdminWebAPIUtils';

/**
* AdminUserActions
*/
class AdminUserActions {

    // Get all users in the database
    getAllUsers (data) {
        this.dispatch();
        AdminWebAPIUtils.getAllUsers(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setalluserdetails(response);
            }
        }, () => {
        });
    }

    setalluserdetails (response) {
        this.dispatch(response);
    }

    // Get details of a user
    getUsersDetails (uid) {
        this.dispatch();
        AdminWebAPIUtils.getUser(uid)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setuserdetails(response);
            }
        }, () => {
        });
    }

    setuserdetails (response) {
        this.dispatch(response);
    }

    // Get details of a user
    updateUserDetails (data) {
        this.dispatch();
        AdminWebAPIUtils.updateUser(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.updateuserdetails(response);
            }
        }, () => {
        });
    }

    updateuserdetails (response) {
        this.dispatch(response);
    }

    // Get team details of a user
    getUsersTeams (data) {
        this.dispatch();
        AdminWebAPIUtils.getUserTeams(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setuserteams(response);
            }
        }, () => {
        });
    }

    setuserteams (response) {
        this.dispatch(response);
    }

    // Getanswer of open ended questions
    OpenEndedQuestionsAnswers (data) {
        this.dispatch();
        AdminWebAPIUtils.getOpenEndedQuestionsAnswers(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setopenended(response);
            }
        }, () => {
        });
    }

    setopenended (response) {
        this.dispatch(response);
    }

    // Get all team members
    getTeamsMembers (data) {
        this.dispatch();
        AdminWebAPIUtils.getTeamsMembers(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setuserteams(response);
            }
        }, () => {
        });
    }
    //searchTeam
}

export default alt.createActions(AdminUserActions);
