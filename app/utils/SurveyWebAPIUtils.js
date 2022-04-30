import $ from 'jquery';

const utils = {

    getEngagementSurvey: () => {
        return $.ajax({
            url: '/getengagementsurvey',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    saveEngagementSurveyResult: (surveyResult) => {
        return $.ajax({
            url: '/saveengagementsurveyresult',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(surveyResult)
        });
    },

    getLastSurvey: () => {
        return $.ajax({
            url: '/getlastengagementsurvey',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    getEngagementResults: (user_id) => {
        return $.ajax({
            url: '/getengagementresults?user_id='+user_id,
            type: 'GET',
            contentType: 'application/json'
        });
    },

    getResultsByCompany: () => {
        return $.ajax({
            url: '/getresultsbycompany',
            type: 'POST',
            contentType: 'application/json'
        });
    },

    getResultsByIndustry: () => {
        return $.ajax({
            url: '/getresultsbyindustry',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    getResultsByCountry: () => {
        return $.ajax({
            url: '/getresultsbycountry',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    getMostEngagingManagers: () => {
        return $.ajax({
            url: '/getengagingmanagers',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    //Start: Company statistics.
    getCompanyData: () => {
        return $.ajax({
            url: '/getcompanydata',
            type: 'POST',
            contentType: 'application/json'
        });
    },

    getMyTeams: () => {
        return $.ajax({
            url: '/getownteams',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    getTeamsByMember: () => {
        return $.ajax({
            url: '/getteamsbymember',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    getCompanyDetails: () => {
        return $.ajax({
            url: '/getcompanydetails',
            type: 'GET',
            contentType: 'application/json'
        });
    }

};

export default utils;
