import $ from 'jquery';

const utils = {

    createCustomSurveyForm: (data) => {
        return $.ajax({
            url: '/createsurveyform',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getMyCSurveyForms: () => {
        return $.ajax({
            url: '/getmysurveyforms',
            type: 'POST',
            contentType: 'application/json'
        });
    },

    getCustomSurveyForms: () => {
        return $.ajax({
            url: '/getsurveyforms',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    getMySurveyParticipation: (data) => {
        return $.ajax({
            url: '/getmysurveyparticipation',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    deleteForm: (id) => {
        return $.ajax({
            url: '/deleteform',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: id})
        });
    },

    getSurveyForm: (id) => {
        return $.ajax({
            url: '/getsurveyform',
            type: 'GET',
            //contentType: 'application/json',
            data: {id: id}
        });
    },

    saveSurveyResults: (data) => {
        return $.ajax({
            url: '/savesurveyresults',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getOrganization: () => {
        return $.ajax({
            url: '/getorganization',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    getSurveyResponses: (id) => {
        return $.ajax({
            url: '/getsurveyresponses',
            type: 'GET',
            contentType: 'application/json',
            data: {id: id}
        });
    }

};

export default utils;
