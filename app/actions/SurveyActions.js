import alt from 'altInstance';
import SurveyWebAPIUtils from 'utils/SurveyWebAPIUtils';

class SurveyActions {

    getEngagementSurvey() {
        this.dispatch();
        SurveyWebAPIUtils.getEngagementSurvey()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.getquestions(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    getquestions(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    saveEngagementSurvey(surveyResult) {
        this.dispatch();
        SurveyWebAPIUtils.saveEngagementSurveyResult(surveyResult)
        .then((response) => {
            if (response) {
                this.actions.savesurveysuccess(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    savesurveysuccess(response)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(response);
            });
        } else {
            this.dispatch(response);
        }
        //this.dispatch(response);
    }

    getLastSurvey(data) {
        this.dispatch();
        SurveyWebAPIUtils.getLastSurvey(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.lastsurveysuccess(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    lastsurveysuccess(response)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(response);
            });
        } else {
            this.dispatch(response);
        }
        //this.dispatch(response);
    }

    getEngagementResults(data) {
        this.dispatch();
        SurveyWebAPIUtils.getEngagementResults(data)
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.engagementresultssuccess(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    engagementresultssuccess(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    getResultsByCompany() {
        this.dispatch();
        SurveyWebAPIUtils.getResultsByCompany()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.resultsbycompany(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    resultsbycompany(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    getResultsByIndustry() {
        this.dispatch();
        SurveyWebAPIUtils.getResultsByIndustry()
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.resultsbyindustry(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    resultsbyindustry(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    getResultsByCountry() {
        this.dispatch();
        SurveyWebAPIUtils.getResultsByCountry()
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.resultsbycountry(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    resultsbycountry(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    getMostEngagingManagers() {
        this.dispatch();
        SurveyWebAPIUtils.getMostEngagingManagers()
        .then((response, textStatus) => {
            if (response.status === 'success') {
                this.actions.mostengagingmanagers(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    mostengagingmanagers(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    //Start: Company statistics.
    getCompanyData() {
        this.dispatch();
        SurveyWebAPIUtils.getCompanyData()
        .then((response, textStatus) => {
            if (textStatus === 'success') {
                this.actions.companydata(response);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    companydata(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    getMyTeams() {
        this.dispatch();
        SurveyWebAPIUtils.getMyTeams()
        .then((response, textStatus) => {
            if (response.status) {
                //console.log('teams');
                //console.log(JSON.stringify(response.data));
                this.actions.myteams(response.data);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    myteams(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    getTeamsByMember() {
        this.dispatch();
        SurveyWebAPIUtils.getTeamsByMember()
        .then((response, textStatus) => {
            if (response.status) {
                //console.log('teams');
                //console.log(JSON.stringify(response.data));
                this.actions.teamsbymember(response.data);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    teamsbymember(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

    getCompanyDetails() {
        this.dispatch();
        SurveyWebAPIUtils.getCompanyDetails()
        .then((response, textStatus) => {
            if (response.status) {
                //console.log('teams');
                //console.log(JSON.stringify(response.data));
                this.actions.companydetails(response.data);
            }
        }, () => {
            // Dispatch another event for a bad request
        });
    }

    companydetails(data)
    {
        if (alt.dispatcher.$Dispatcher_isDispatching) {
            window.setTimeout(() => {
                this.dispatch(data);
            });
        } else {
            this.dispatch(data);
        }
        //this.dispatch(data);
    }

}

export default alt.createActions(SurveyActions);
