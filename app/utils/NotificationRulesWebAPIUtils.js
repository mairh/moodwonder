import $ from 'jquery';

const utils = {

    getRules: () => {
        return $.ajax({
            url: '/getrules',
            type: 'GET',
            contentType: 'application/json'
        });
    },

    editRule: (id, data) => {
        return $.ajax({
            url: '/editrule',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: id, data: JSON.stringify(data)})
        });
    },

    deleteRule: (id) => {
        return $.ajax({
            url: '/deleterule',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({id: id})
        });
    }
};

export default utils;
