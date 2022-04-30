import $ from 'jquery';

const utils = {

    login: (data) => {
        return $.ajax({
            url: '/adminlogin',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    logout: () => {
        return $.ajax({
            url: '/adminlogout',
            type: 'GET'
        });
    },

    authSession: () => {
        let isAuth = localStorage.getItem('isAuth');
        if (isAuth !== "true") {
            return false;
        } else {
            return true;
        }
    },

    loggedin: () => {
        return $.ajax({
            url: '/loggedin',
            type: 'GET'
        });
    }

};

export default utils;
