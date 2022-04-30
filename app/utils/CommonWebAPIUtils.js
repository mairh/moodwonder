import $ from 'jquery';

const utils = {
    /*
    * @param {Object} payload to be sent to server
    * @return {Promise}
    */

    createMyTeam: (data) => {
        return $.ajax({
            url: '/createteam',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    updateMyTeam: (data) => {
        return $.ajax({
            url: '/updateteam',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getMyTeams: (data) => {
        return $.ajax({
            url: '/getmyteams',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({})
        });
    },

    addMemberToMyTeam: (data) => {
        return $.ajax({
            url: '/addmembertoteam',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    removeMemberFromMyTeam: (data) => {
        return $.ajax({
            url: '/removememberfromteam',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    inviteSignup: (data) => {
        return $.ajax({
            url: '/invitesignup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    inviteAnonymously: (data) => {
        return $.ajax({
            url: '/inviteanonymously',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getAllEmployees: (data) => {
        return $.ajax({
            url: '/getallemployees',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getAllVotes: (data) => {
        return $.ajax({
            url: '/getemployeevotes',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    saveVote: (data) => {
        return $.ajax({
            url: '/postvote',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getEmpMonthView: (data) => {
        return $.ajax({
            url: '/getempmonthview',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    chooseEOTM: (data) => {
        return $.ajax({
            url: '/chooseemployeeofthemonth',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    requestDemo: (data) => {
        return $.ajax({
            url: '/requestdemo',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    }
};

export default utils;
