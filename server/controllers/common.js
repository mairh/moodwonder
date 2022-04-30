var Places   = require('../models/place');
var Industry = require('../models/industry');
var ObjectId = require('mongoose').Types.ObjectId;
var nodemailer = require("nodemailer");
var emailTemplate = require('../email/emailtemplates');
var config = require('../config/config');

/**
 *  JSON response format
 */
var response = {};
response.status = false;
response.message = 'Error';

var hasValue = function(val){
    if(val !== undefined && val !== ''){
        return true;
    }else{
        return false;
    }
}

/**
 * handleMycompany
 */
exports.handleMycompany = function(req, res, next) {

    Places.Continent.find({}, function (err, document) {
        var continents = [];
        if(document){
            document.map(function (data, key){
                continents[key] = { _id: data._id ,text: data.name };
            });
        }

        req.body.continents = continents;
        req.body.industries = [];
        Industry.find({},function (err, documents) {
            if(documents != null){
                req.body.industries = documents;
            }
            // going to * route handler
            next();
        });
    });
};

/**
 * addIndustry
 */
exports.addIndustry = function(req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';
    response.type    = req.body.type;

    var name = req.body.name;
    
    if(name !== undefined && name !== ''){
        Industry.findOne({ name: { $regex : new RegExp('^'+name+ '$','i') } }).exec(function (err, industrydoc) {
            if(!err){

                console.log('industrydoc');
                console.log(industrydoc);
                if(industrydoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{
                    industry = new Industry({ name: name });
                    industry.save(function (err, newdoc) {
                        if(!err){
                            response.status = true;
                            response.message = 'Industry added..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{
                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }

};
/**
 * getIndustry
 */
exports.getIndustry = function (req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    response.type = 'industrylist';

    var condition = {};
    // How many adjacent pages should be shown on each side?
    var adjacents = 3;
    
    /* 
       First get total number of rows in data table. 
       If you have a WHERE clause in your query, make sure you mirror it here.
    */
    var total_pages = 0;
    var find_rows = false;

    Industry.count({}, function(err, c) {
        total_pages = c;
        if(total_pages){
            var start = 0;
            var limit = 10                              //how many items to show per page
            // console.log(req.body);
            var page = req.body.page;
            // console.log(typeof page);
            if(page){
                start = (page - 1) * limit;             //first item to display on this page
            }
            /* Get data. */
            Industry.find({}).skip(start).limit(limit).exec(function (err, lists) {
                if (!err) {

                    // Setup page vars for display.
                    if (page == 0) page = 1;                    //if no page var is given, default to 1.
                    prev = page - 1;                            //previous page is page - 1
                    next = page + 1;                            //next page is page + 1
                    lastpage = Math.ceil(total_pages/limit);    //lastpage is = total pages / items per page, rounded up.
                    lpm1 = lastpage - 1;                        //last page minus 1

                    // Now we apply our rules and draw the pagination object. 
                    // We're actually saving the code to a variable in case we want to draw it more than once.
                    pagination = [];
                    if(lastpage > 1)
                    {
                        //previous button
                        if (page > 1){
                            pagination.push({ page: prev, text: 'previous' });
                        }else{
                            pagination.push({ page: false, text: 'previous' });
                        }
                        
                        //pages
                        if (lastpage < 7 + (adjacents * 2))    //not enough pages to bother breaking it up
                        {    
                            for (counter = 1; counter <= lastpage; counter++)
                            {
                                if (counter == page){
                                    pagination.push({ page: false, text: counter });
                                }else{
                                    pagination.push({ page: counter, text: counter });
                                }
                            }
                        }
                        else if(lastpage > 5 + (adjacents * 2))    //enough pages to hide some
                        {
                            //close to beginning; only hide later pages
                            if(page < 1 + (adjacents * 2))
                            {
                                for (counter = 1; counter < 4 + (adjacents * 2); counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                                pagination.push({ page: false, text: '..........' });
                                pagination.push({ page: lpm1, text: lpm1 });
                                pagination.push({ page: lastpage, text: lastpage });
                            }
                            //in middle; hide some front and some back
                            else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
                            {
                                pagination.push({ page: 1, text: 1 });
                                pagination.push({ page: 2, text: 2 });
                                pagination.push({ page: false, text: '..........' });
                                for (counter = page - adjacents; counter <= page + adjacents; counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                                pagination.push({ page: false, text: '..........' });
                                pagination.push({ page: lpm1, text: lpm1 });
                                pagination.push({ page: lastpage, text: lastpage });
                            }
                            //close to end; only hide early pages
                            else
                            {
                                pagination.push({ page: 1, text: 1 });
                                pagination.push({ page: 2, text: 2 });
                                pagination.push({ page: false, text: '..........' });
                                for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                            }
                        }
                        
                        //next button
                        if (page < counter - 1){
                            pagination.push({ page: next, text: 'next' });
                        }else{
                            pagination.push({ page: false, text: 'next' });
                        }
                    }

                    response.status = true;
                    response.message = 'success';
                    // formatting user data for table
                    var data          = {};
                    data.rows         = new Array(lists.length);
                    data.pagination   = pagination;
                    data.class = "table";
                    if(lists !== null){
                        var counter = 0;
                        lists.map(function(item, key){

                            data.rows[key] =  {
                                _id: item._id,
                                name: item.name
                            };
                        });
                    }
                    response.data = data;
                    res.json(response);
                }
                else
                {
                    res.json(response);
                }
            });
        }else{
            response.message = 'No data';
            res.json(response);
        }
    });
};
/**
 * updateIndustry
 */
exports.updateIndustry = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    response.callback = req.body.callback;
    response.type = req.body.type;

    var name = req.body.teamname;
    var _id = req.body.teamid;
    var hasName = (name !== undefined && name !== '');
    var hasId = (_id !== undefined && _id !== '');

    if(hasName && hasId){
        Industry.findOne({ name: { $regex : new RegExp(name,'i') } }).exec(function (err, industrydoc) {
            if(!err){
                if(industrydoc !==null){

                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: name };
                    Industry.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'Industry updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }

};

/**
 * delete Industry
 */
exports.deleteIndustry = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    response.callback = req.body.callback;
    response.type = req.body.type;

    var _id = req.body._id;
    var hasId = (_id !== undefined && _id !== '');

    if(hasId){
        Industry.remove({ _id: new ObjectId(_id) }).exec(function (err, industrydoc) {

            if(!err){

                response.status = true;
                response.message = 'Industry deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }
};

/**
 * add Places
 */
exports.addPlaces = function(req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';
    response.type    = req.body.type;

    var place     =   (req.body.place) ? req.body.place.trim():req.body.place;
    var placeType =   req.body.placeType;
    var action    =   req.body.action;
    var _id       =   (req.body._id) ? req.body._id.trim():req.body._id;

    // to add continent
    if( hasValue(place) && hasValue(placeType) && placeType === 'continent' ){

        Places.Continent.findOne({ name: { $regex : new RegExp('^'+place+ '$','i') } }).exec(function (err, continentdoc) {
            if(!err){

                if(continentdoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{
                    continent = new Places.Continent({ name: place });
                    continent.save(function (err, newdoc) {
                        if(!err){
                            response.status = true;
                            response.message = 'new record added..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{
                res.send(response);
                res.end();
            }
        });

    }else if( hasValue(place) && hasValue(placeType) && hasValue(_id) && placeType === 'country' ){

        Places.Country.findOne({ continent_id: _id, name: { $regex : new RegExp('^'+place+ '$','i') } }).exec(function (err, countrydoc) {
            if(!err){

                if(countrydoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{
                    country = new Places.Country({ continent_id: _id, name: place });
                    country.save(function (err, newdoc) {
                        if(!err){
                            response.status = true;
                            response.message = 'new record added..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{
                res.send(response);
                res.end();
            }
        });
    }else if( hasValue(place) && hasValue(placeType) && hasValue(_id) && placeType === 'state' ){

        Places.State.findOne({ country_id: _id, name: { $regex : new RegExp('^'+place+ '$','i') } }).exec(function (err, statedoc) {
            if(!err){

                if(statedoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{
                    state = new Places.State({ country_id: _id, name: place });
                    state.save(function (err, newdoc) {
                        if(!err){
                            response.status = true;
                            response.message = 'new record added..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{
                res.send(response);
                res.end();
            }
        });
    }else if( hasValue(place) && hasValue(placeType) && hasValue(_id) && placeType === 'city' ){

        Places.City.findOne({ state_id: _id, name: { $regex : new RegExp('^'+place+ '$','i') } }).exec(function (err, statedoc) {
            if(!err){

                if(statedoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{
                    city = new Places.City({ state_id: _id, name: place });
                    city.save(function (err, newdoc) {
                        if(!err){
                            response.status = true;
                            response.message = 'new record added..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{
                res.send(response);
                res.end();
            }
        });
    }
};

/**
 * get Places
 */
exports.getPlaces = function(req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

    var placeType =   req.body.placeType;
    var _id       =   req.body._id;


    var getPaginatedContent = function(collectionObj, condition){

        if(!condition){
            condition = {};
        }
        // How many adjacent pages should be shown on each side?
        var adjacents = 3;

        /* 
           First get total number of rows in data table. 
           If you have a WHERE clause in your query, make sure you mirror it here.
        */
        var total_pages = 0;
        var find_rows = false;

        collectionObj.count(condition , function(err, c) {
            total_pages = c;
            if(total_pages){
                // console.log(total_pages);
                var start = 0;
                var limit = 10;                              //how many items to show per page
                // console.log(req.body);
                var page = req.body.page;
                // console.log(typeof page);
                if(page){
                    start = (page - 1) * limit;             //first item to display on this page
                }
                /* Get data. */
                collectionObj.find(condition).skip(start).limit(limit).exec(function (err, lists) {
                    if (!err) {

                        // Setup page vars for display.
                        if (page == 0) page = 1;                    //if no page var is given, default to 1.
                        prev = page - 1;                            //previous page is page - 1
                        next = page + 1;                            //next page is page + 1
                        lastpage = Math.ceil(total_pages/limit);    //lastpage is = total pages / items per page, rounded up.
                        lpm1 = lastpage - 1;                        //last page minus 1

                        // Now we apply our rules and draw the pagination object. 
                        // We're actually saving the code to a variable in case we want to draw it more than once.
                        pagination = [];
                        if(lastpage > 1)
                        {
                            //previous button
                            if (page > 1){
                                pagination.push({ page: prev, text: 'previous' });
                            }else{
                                pagination.push({ page: false, text: 'previous' });
                            }
                            
                            //pages
                            if (lastpage < 7 + (adjacents * 2))    //not enough pages to bother breaking it up
                            {    
                                for (counter = 1; counter <= lastpage; counter++)
                                {
                                    if (counter == page){
                                        pagination.push({ page: false, text: counter });
                                    }else{
                                        pagination.push({ page: counter, text: counter });
                                    }
                                }
                            }
                            else if(lastpage > 5 + (adjacents * 2))    //enough pages to hide some
                            {
                                //close to beginning; only hide later pages
                                if(page < 1 + (adjacents * 2))
                                {
                                    for (counter = 1; counter < 4 + (adjacents * 2); counter++)
                                    {
                                        if (counter == page){
                                            pagination.push({ page: false, text: counter });
                                        }else{
                                            pagination.push({ page: counter, text: counter });
                                        }
                                    }
                                    pagination.push({ page: false, text: '..........' });
                                    pagination.push({ page: lpm1, text: lpm1 });
                                    pagination.push({ page: lastpage, text: lastpage });
                                }
                                //in middle; hide some front and some back
                                else if(lastpage - (adjacents * 2) > page && page > (adjacents * 2))
                                {
                                    pagination.push({ page: 1, text: 1 });
                                    pagination.push({ page: 2, text: 2 });
                                    pagination.push({ page: false, text: '..........' });
                                    for (counter = page - adjacents; counter <= page + adjacents; counter++)
                                    {
                                        if (counter == page){
                                            pagination.push({ page: false, text: counter });
                                        }else{
                                            pagination.push({ page: counter, text: counter });
                                        }
                                    }
                                    pagination.push({ page: false, text: '..........' });
                                    pagination.push({ page: lpm1, text: lpm1 });
                                    pagination.push({ page: lastpage, text: lastpage });
                                }
                                //close to end; only hide early pages
                                else
                                {
                                    pagination.push({ page: 1, text: 1 });
                                    pagination.push({ page: 2, text: 2 });
                                    pagination.push({ page: false, text: '..........' });
                                    for (counter = lastpage - (2 + (adjacents * 2)); counter <= lastpage; counter++)
                                    {
                                        if (counter == page){
                                            pagination.push({ page: false, text: counter });
                                        }else{
                                            pagination.push({ page: counter, text: counter });
                                        }
                                    }
                                }
                            }
                            
                            //next button
                            if (page < counter - 1){
                                pagination.push({ page: next, text: 'next' });
                            }else{
                                pagination.push({ page: false, text: 'next' });
                            }
                        }

                        response.status = true;
                        response.message = 'success';
                        // formatting user data for table
                        var data          = {};
                        data.rows         = new Array(lists.length);
                        data.pagination   = pagination;
                        data.class = "table";
                        if(lists !== null){
                            var counter = 0;
                            lists.map(function(item, key){

                                data.rows[key] =  item;
                            });
                        }
                        response.data = data;
                        res.json(response);
                    }
                    else
                    {
                        res.json(response);
                    }
                });
            }else{
                response.data = false;
                response.message = 'No data';
                res.json(response);
            }
        });
    }

    if( hasValue(placeType) && placeType === 'continent' ){

        getPaginatedContent(Places.Continent,{});

    }else if( hasValue(placeType) && placeType === 'country' && hasValue(_id) ){

        getPaginatedContent(Places.Country,{ continent_id: _id });

    }else if( hasValue(placeType) && placeType === 'state' && hasValue(_id) ){

        getPaginatedContent(Places.State,{ country_id: _id });

    }else if( hasValue(placeType) && placeType === 'city' && hasValue(_id) ){

        getPaginatedContent(Places.City, { state_id: _id });

    }

};

/**
 * updatePlaces
 */
exports.updatePlaces = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    response.callback = req.body.callback;
    response.type = req.body.type;

    var place         =   (req.body.place) ? req.body.place.trim():req.body.place;
    var placeType     =   req.body.placeType;
    var _id           =   (req.body._id) ? req.body._id.trim():req.body._id;
    var continent_id  =   (req.body.continent_id) ? req.body.continent_id.trim():req.body.continent_id;
    var country_id    =   (req.body.country_id) ? req.body.country_id.trim():req.body.country_id;
    var state_id      =   (req.body.state_id) ? req.body.state_id.trim():req.body.state_id;

    if( hasValue(place) && hasValue(_id) && hasValue(placeType) && placeType === 'continent' ){

        Places.Continent.findOne({ name: { $regex : new RegExp('^'+place+ '$','i') } }).exec(function (err, continentdoc) {
            if(!err){

                if(continentdoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: place };
                    Places.Continent.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'record updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if( hasValue(place) && hasValue(_id) && hasValue(continent_id) && hasValue(placeType) && placeType === 'country' ){

        Places.Country.findOne({ name: { $regex : new RegExp('^'+place+ '$','i') } , continent_id: continent_id }).exec(function (err, countrydoc) {
            if(!err){
                console.log(countrydoc);
                if(countrydoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: place };
                    Places.Country.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'record updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if( hasValue(place) && hasValue(_id) && hasValue(country_id) && hasValue(placeType) && placeType === 'state' ){

        Places.State.findOne({ name: { $regex : new RegExp('^'+place+ '$','i') }, country_id: country_id }).exec(function (err, statedoc) {

            console.log({ name: { $regex : new RegExp('^'+place+ '$','i') }, country_id: country_id });
            if(!err){

                if(statedoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: place };
                    Places.State.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'record updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if( hasValue(place) && hasValue(_id) && hasValue(state_id) && hasValue(placeType) && placeType === 'city' ){

        Places.City.findOne({ name: { $regex : new RegExp('^'+place+ '$','i') }, state_id: state_id }).exec(function (err, statedoc) {
            if(!err){

                if(statedoc !==null){
                    response.message = 'Already Exist..';
                    res.send(response);
                    res.end();
                }else{

                    var where  = { _id: new ObjectId(_id) };
                    var update = { name: place };
                    Places.City.update(where,update,function (err, doc) {
                        if(!err){
                            response.status = true;
                            response.message = 'record updated..';
                            res.send(response);
                            res.end();
                        }else{
                            res.send(response);
                            res.end();
                        }
                    });
                }
            }else{

                res.send(response);
                res.end();
            }
        });
    }else{
        res.send(response);
        res.end();
    }

};
/**
 * delete Places
 */
exports.deletePlaces = function(req, res) {

    var response = {};
    response.status = false;
    response.message = 'Error';
    response.callback = req.body.callback;
    response.type = req.body.type;

    var _id  = req.body._id;
    var placeType = req.body.placeType;

    if(hasValue(_id) && hasValue(placeType) && placeType === 'continent'){

        Places.Continent.remove({ _id: new ObjectId(_id) }).exec(function (err, industrydoc) {

            if(!err){

                response.status = true;
                response.message = 'Deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if(hasValue(_id) && hasValue(placeType) && placeType === 'country'){

        var where = { _id: new ObjectId(_id) };

        Places.Country.remove(where).exec(function (err, placeDoc) {

            if(!err){

                response.status = true;
                response.message = 'Deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if(hasValue(_id) && hasValue(placeType) && placeType === 'state'){

        var where = { _id: new ObjectId(_id) };

        Places.State.remove(where).exec(function (err, placeDoc) {

            if(!err){

                response.status = true;
                response.message = 'Deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }else if(hasValue(_id) && hasValue(placeType) && placeType === 'city'){

        var where = { _id: new ObjectId(_id) };

        Places.City.remove(where).exec(function (err, placeDoc) {

            if(!err){

                response.status = true;
                response.message = 'Deleted..';
                res.send(response);
                res.end();
            }else{

                res.send(response);
                res.end();
            }
        });
    }
    else{
        res.send(response);
        res.end();
    }
};

/**
 * get Places Data
 */
exports.getPlacesData = function(req, res) {

    var response     = {};
    response.status  = false;
    response.message = 'Error';

    var modifyData = function(list){
        var data = [{ _id: 1,  text: 'Other'}];
        list.map(function(row, key){
            data[key] = { _id: row._id,  text: row.name};
        });
        return data;
    }

    var placeType =   req.body.placeType;
    var _id       =   req.body._id;

    if( hasValue(placeType) && placeType === 'continent' ){

        Places.Continent.find({}).exec(function (err, list) {
            if(!err){
                response.status  = true;
                response.message = 'success';
                response.data    = {};
                response.data.places    = modifyData(list);
                response.data.placeType = placeType;
                res.send(response);
                res.end();
            }else{
                res.send(response);
                res.end();
            }
        });
    }else if( hasValue(placeType) && placeType === 'country' && hasValue(_id) ){

        var condition = { continent_id: _id };
        Places.Country.find(condition).exec(function (err, list) {
            if(!err){
                response.status  = true;
                response.message = 'success';
                response.data    = {};
                response.data.places    = modifyData(list);
                response.data.placeType = placeType;
                res.send(response);
                res.end();
            }else{
                res.send(response);
                res.end();
            }
        });
    }else if( hasValue(placeType) && placeType === 'state' && hasValue(_id) ){

        var condition = { country_id: _id };
        Places.State.find(condition).exec(function (err, list) {
            if(!err){
                response.status  = true;
                response.message = 'success';
                response.data    = {};
                response.data.places    = modifyData(list);
                response.data.placeType = placeType;
                res.send(response);
                res.end();
            }else{
                res.send(response);
                res.end();
            }
        });
    }else if( hasValue(placeType) && placeType === 'city' && hasValue(_id) ){

        var condition = { state_id: _id };
        Places.City.find(condition).exec(function (err, list) {
            if(!err){
                response.status  = true;
                response.message = 'success';
                response.data    = {};
                response.data.places    = modifyData(list);
                response.data.placeType = placeType;
                res.send(response);
                res.end();
            }else{
                res.send(response);
                res.end();
            }
        });
    }

};

/**
 * get Places Data
**/
exports.requestDemo = function(req, res) {
    var response     = {};
    response.status  = false;
    response.messages = ['Error'];

    var transporter = nodemailer.createTransport();
    var body = "<br><table> "+
                "<tr> <td colspan='2'>"+req.body.name+" has requested for a demo through MoodWonder. Here are the details.</td> </tr>"+
                "<tr> <td>Email</td> <td>: "+req.body.email+"</td> </tr>"+
                "<tr> <td>Mobile</td> <td>: "+req.body.mobile+"</td> </tr>"+
                "<tr> <td>Message</td> <td>: "+req.body.text+"</td> </tr>"+
                "</table>";
    body = emailTemplate.general(body);

    var mailOptions = {
        from: config.fromEmail,
        to: config.adminemail,
        subject: 'MoodWonder demo request',
        html: body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.send(response);
            res.end();
        }else{
            console.log('Message sent: ' + info.response);
            response.status  = true;
            response.messages = ['We will get back to you soon !'];
            res.send(response);
            res.end();
        }
    });
};
