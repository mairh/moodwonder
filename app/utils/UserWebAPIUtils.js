import $ from 'jquery';
import request from 'superagent';

const utils = {
    /*
    * @param {Object} payload to be sent to server
    * @return {Promise}
    */
    manuallogin: (data) => {
        return $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    /*
    * User signup with e-mail id verification
    */
    usersignupstep1: (data) => {
        return $.ajax({
            url: '/usersignupstep1',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    /*
    * Creating password after verification
    */
    usersignupstep2: (data) => {
        return $.ajax({
            url: '/usersignupstep2',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    /*
    * @return {Promise}
    */
    logout: () => {
        return $.ajax({
            url: '/logout',
            type: 'GET'
        });
    },

    /*
    * @param {Object} payload to be sent to server
    * @return {Promise}
    */
    signup: (data) => {
        return $.ajax({
            url: '/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    /*
    * Get user info if logged in
    * @return {Promise}
    */
    userinfo: (type) => {
        return $.ajax({
            url: '/userinfo?type=' + type,
            type: 'GET'
        });
    },

    getCurrentUserId: () => {
        return $.ajax({
            url: '/userinfo?type=user',
            type: 'GET'
        });
    },

    /*
    * Ajaxcall for save user details
    */
    saveUserDetails: (data) => {
        return $.ajax({
            url: '/saveuserdetails',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    /*
    * Ajaxcall for update user photo
    */
    updateUserPhoto: (file, _this) => {

        let req = request.post('/updateuserphoto');
        req
        .part()
        .set('Content-Disposition', 'attachment; name="profilephoto"; filename="'+file.name+'"')
        .set('Content-Type', file.type)
        .write(file);

        req.end(function(res){
            _this.actions.updateuserphotosuccess(res);
        });
    },

    /*
    * Ajaxcall for save manager details
    */
    saveManagerDetails: (data) => {
        return $.ajax({
            url: '/savemanagerdetails',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    /*
    * Ajaxcall for save company details
    */
    saveCompanyDetails: (data) => {
        return $.ajax({
            url: '/savecompanydetails',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    /*
    * Add mood rating
    */
    addMood: (data) => {
        return $.ajax({
            url: '/addmood',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data)
        });
    },

    /*
    * Get user moods
    */
    getMyMoods: () => {
        return $.ajax({
            url: '/mymoods',
            type: 'GET',
            contentType: 'application/json'
        });
    }

};

export default utils;
