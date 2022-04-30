import $ from 'jquery';

const utils = {

    getQuestions: () => {
        return $.ajax({
            url: '/openendedquestions',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    saveAnswers: (data) => { console.log('data');console.log(data);
        return $.ajax({
            url: '/saveopenendedsurvey',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    getMembers: () => {
        return $.ajax({
            url: '/getmembers',
            type: 'POST',
            contentType: 'application/json'
        });
    },

    getAnswers: (area, mood) => {
        return $.ajax({
            url: '/getanswers',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({area: area, mood : mood})
        });
    }

};

export default utils;
