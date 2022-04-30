import $ from 'jquery';

const utils = {
    /*
    * @param {Object} payload to be sent to server
    * @return {Promise}
    */

    getAllUsers: (data) => {
        return $.ajax({
            url: '/getallusers',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },
    getUser: (data) => {
        return $.ajax({
            url: '/getuser',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },
    updateUser: (data) => {
        return $.ajax({
            url: '/updateuser',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },
    getUserTeams: (data) => {
        return $.ajax({
            url: '/getuserteamsbyid',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },
    getOpenEndedQuestionsAnswers: (data) => {
        return $.ajax({
            url: '/getopenended',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getAllCompanies: (data) => {
        return $.ajax({
            url: '/getallcompanies',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getAllTeams: (data) => {
        return $.ajax({
            url: '/getallteamsbycompany',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getTeamsMembers: (data) => {
        return $.ajax({
            url: '/getallteamsmembers',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    searchTeam: (data) => {
        return $.ajax({
            url: '/searchteam',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    addIndustry: (data) => {
        return $.ajax({
            url: '/addindustry',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getIndustries: (data) => {
        return $.ajax({
            url: '/getindustries',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    updateIndustry: (data) => {
        return $.ajax({
            url: '/updateindustry',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    deleteIndustry: (data) => {
        return $.ajax({
            url: '/deleteindustry',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    addPlaces: (data) => {
        return $.ajax({
            url: '/addplaces',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getPlaces: (data) => {
        return $.ajax({
            url: '/getplaces',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    updatePlaces: (data) => {
        return $.ajax({
            url: '/updateplaces',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    deletePlaces: (data) => {
        return $.ajax({
            url: '/deleteplaces',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getPlacesData: (data) => {
        return $.ajax({
            url: '/getplacesdata',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    }

};

export default utils;
