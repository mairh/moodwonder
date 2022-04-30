import $ from 'jquery';

const utils = {

    addEngagement: (data) => {
        return $.ajax({
            url: '/addengagement',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    editEngagement: (id, data) => {
        return $.ajax({
            url: '/editengagement',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: id, data: JSON.stringify(data)})
        });
    },

    getEngagements: () => {
        return $.ajax({
            url: '/getengagementareas',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    deleteEngagement: (id) => {
        return $.ajax({
            url: '/deleteengagement',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: id})
        });
    }

};

export default utils;
