import EmployeeOfTheMonthActions from 'actions/EmployeeOfTheMonthActions';
import alt from 'altInstance';

class EmployeeOfTheMonthStore {

    constructor () {

        // All employees
        this.employees    =   {};
        this.employeeVotes=   {};
        this.hasEmployees =   false;
        // record of a single employee
        this.employee     =   {};
        this.hasEmployee  =   false;
        this.hasError     =   false;
        this.modal        =   false;
        this.emp_id       =   0;
        this.isNotValid   =   true;
        this.voteStatus   =   false;
        this.awardStatus  =   false;
        this.voteperiod   =   false;
        this.message      =   '';
        this.ServerResponse =  false;

        this.bindListeners({
            handleGetEmployees: EmployeeOfTheMonthActions.GETEMPLOYEES,
            handleSetEOTM: EmployeeOfTheMonthActions.SETEMPLOYEEOFTHEMONTH,
            handleGetEMPView: EmployeeOfTheMonthActions.GETEMPVIEW,
            handleSaveVote: EmployeeOfTheMonthActions.SAVEVOTESUCCESS,
            handleGetVotes: EmployeeOfTheMonthActions.GETVOTES
        });
    }

    handleGetEmployees (data) {
        console.log('handleGetEmployees');
        this.employees = data;
        if(data.data.awardStatus){
            this.awardStatus = true;
        }
        this.hasEmployees = true;
        this.emitChange();
    }

    handleGetVotes (response) {
        console.log('handleGetVotes');
        this.employeeVotes = response;
        this.emitChange();
    }

    handleSaveVote (response) {
        console.log('handleSaveVote');
        this.message = response.message;
        this.hasError = !response.status;
        this.ServerResponse = response;
        this.modal = false;
        this.voteStatus = true;
        this.emitChange();
    }

    handleSetEOTM (data) {
        console.log('handleSetEOTM');
        this.message = data.message;
        if(data.status){
            this.awardStatus = true;
        }
        this.hasError = !data.status;
        this.hasEmployees = true;
        this.modalBox = false;
        this.emitChange();
    }

    handleGetEMPView (data) {
        console.log('handleGetEMPView');
        this.employee = data;
        this.modalBox = true;
        this.hasEmployee = true;
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(EmployeeOfTheMonthStore, 'EmployeeOfTheMonthStore');
