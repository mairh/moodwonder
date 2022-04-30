import TeamActions from 'actions/TeamActions';
import alt from 'altInstance';

/**
* TeamStore
*/
class TeamStore {

    constructor () {

        this.isServerCallWaiting    =    true;
        this.hasError               =    false;
        this.hasTeam                =    false;
        this.teams                  =    {};
        this.message                =    '';
        this.messages               =    [];
        this.serverresponse         =    [];
        this.canSubmit              =    false;

        this.bindListeners({
            handleCreateTeamSuccess: TeamActions.CREATETEAMSUCCESS,
            handleUpdateTeamSuccess: TeamActions.UPDATETEAMSUCCESS,
            handleGetTeamSuccess: TeamActions.GETTEAMSUCCESS,
            handleAddMemberSuccess: TeamActions.MEMBERADDSUCCESS,
            handleRemoveMemberSuccess: TeamActions.MEMBERREMOVESUCCESS
        });
    }

    handleAddMemberSuccess (response) {
        this.isServerCallWaiting    =    false;
        this.hasError               =    !response.status;
        this.message                =    response.message;
        this.messages               =    response.messages;
        this.serverresponse         =    response;
        this.emitChange();
    }

    handleCreateTeamSuccess (response) {
        this.isServerCallWaiting    =    false;
        this.hasError               =    !response.status;
        this.message                =    response.message;
        this.serverresponse         =    response;
        this.emitChange();
    }

    handleUpdateTeamSuccess (response) {
        this.isServerCallWaiting    =    false;
        this.hasError               =    !response.status;
        this.message                =    response.message;
        this.serverresponse         =    response;
        this.emitChange();
    }

    handleGetTeamSuccess (response) {
        this.isServerCallWaiting    =    false;
        this.hasError               =    !response.status;
        this.hasTeam                =     response.status;
        if( this.hasError ||  !this.hasTeam ){
            this.message            =    response.message;
        }
        this.teams                  =    response.data;
        this.emitChange();
    }

    handleRemoveMemberSuccess (response) {
        this.isServerCallWaiting    =    false;
        this.hasError               =    !response.status;
        this.message                =    response.message;
        this.emitChange();
    }

}

// Export newly created Store
export default alt.createStore(TeamStore, 'TeamStore');
