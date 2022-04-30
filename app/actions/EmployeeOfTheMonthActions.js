import alt from 'altInstance';
import CommonWebAPIUtils from 'utils/CommonWebAPIUtils';

class EmployeeOfTheMonthActions {

    getallemployees(data) {
        this.dispatch();
        CommonWebAPIUtils.getAllEmployees(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getemployees(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    getemployees(data)
    {
        this.dispatch(data);
    }

    getallvotes(data) {
        this.dispatch();
        CommonWebAPIUtils.getAllVotes(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getvotes(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    getvotes(data)
    {
        this.dispatch(data);
    }

    saveVote(data) {
        this.dispatch();
        CommonWebAPIUtils.saveVote(data)
        .then((response) => {
            if (response) {
                this.actions.savevotesuccess(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    savevotesuccess(response)
    {
        this.dispatch(response);
    }

    chooseEOTM(data) {
        this.dispatch();
        CommonWebAPIUtils.chooseEOTM(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.setemployeeofthemonth(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    setemployeeofthemonth(data)
    {
        this.dispatch(data);
    }

    getempmonthreview(data) {
        this.dispatch();
        CommonWebAPIUtils.getEmpMonthView(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getempview(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    getempview(data)
    {
        this.dispatch(data);
    }

}

export default alt.createActions(EmployeeOfTheMonthActions);
