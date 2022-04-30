var _ = require('underscore');
var mongoose = require('mongoose');
var EngagementArea = require('../models/engagementArea');
var EngagementResults = require('../models/engagementResults');
var User = require('../models/user');
var Team = require('../models/team');
var moment = require('moment')



exports.handleMyMood = function(req, res, next) {
  //console.log('handleMyMood');  
  //console.log(req.user);  
  if(req.user) {
      //console.log('log - 1');
      getLasteRatedMood(req.user._id, function(data) {
          if (data) {
              //console.log('log - 3');
              
              var today = new Date();
              var year = today.getFullYear();
              var month = ('0' + (today.getMonth() + 1)).slice( - 2);
              var day = ('0' + today.getDate()).slice( - 2);
              var hour = ('0' + today.getHours()).slice( - 2);
              var minutes = ('0' + today.getMinutes()).slice( - 2);
              var seconds = ('0' + today.getSeconds()).slice( - 2);
              var datestring = year + '-' + month + '-' + (day) + ' ' + hour + ':' + minutes + ':' + seconds;
              
              var now  = datestring;
              var then = data.created.d + ' ' + data.created.t;
              
              var ms = moment(now,"YYYY-MM-DD HH:mm:ss").diff(moment(then,"YYYY-MM-DD HH:mm:ss"));
              var d = moment.duration(ms);
              var h = Math.floor(d.asHours());
              if (h >= 24) {
                  //console.log('log - 4');
                  res.redirect('/survey');
              } else {
                  //console.log('log - 5');
                  next();
              }
                            
          } else {
              //console.log('log - 6');
              res.redirect('/survey');
          }
          
      });
      
  } else {
      //console.log('log - 2');
      res.redirect('/login');
  }
  

};

/**
 * GET /getEngagementSurvey
 */
exports.getEngagementSurvey = function (req, res) {

    EngagementArea.find({status: 'active'}).exec(function (err, lists) {
        if (!err) {
            res.json(lists);
        } else {
            console.log('Error in first query');
        }
    });
};


/**
 * POST /saveEngagementSurveyResult
 */
exports.saveEngagementSurveyResult_bk = function (req, res) {

    var qry = req.body;
    qry.user_id = req.user._id;
    if (req.user._id != '') {
        EngagementResults.create(qry, function (err, candies) {
            if (!err) {
            res.json({'status': true, 'message': 'Your mood is updated'});
            } else {
            res.json({'status': false, 'message': 'Error: something went wrong..'});
            }
        });
    } else {
        res.json({'status': false, 'message': 'Session expired.!'});
    }

};


function getEngagementResultsByDate(user_id, createddate, callback) {

    var condition = {'user_id': mongoose.Types.ObjectId(user_id), 'created.d': {$eq: createddate}};
    EngagementResults.find(condition).sort({_id: - 1}).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}

function checkHasEntry(user_id, callback) {

    var condition = {'user_id': mongoose.Types.ObjectId(user_id)};
    EngagementResults.find(condition).sort({_id: - 1}).lean().limit(13).exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}



/**
 * save survey results
 */
exports.saveEngagementSurveyResult = function (req, res) {
        
        var results = req.body;
        var surveyresults = results.surveyresult;
        var ratingtype = results.type;
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice( - 2);
        var day = ('0' + today.getDate()).slice( - 2);
        var hour = ('0' + today.getHours()).slice( - 2);
        var minutes = ('0' + today.getMinutes()).slice( - 2);
        var seconds = ('0' + today.getSeconds()).slice( - 2);
        var datestring = year + '-' + month + '-' + (day);
        var timestring = hour + ':' + minutes + ':' + seconds;
        var user_id = mongoose.Types.ObjectId(req.user._id);
        var created = created || {};
        created.d = datestring;
        created.t = timestring;
        var length = surveyresults.length;
        var response = {};
        
        if (ratingtype == "engagement") {
            getEngagementResultsByDate(user_id, datestring, function (data) {

                if (data.length > 0) {
                    var condition = {'user_id': mongoose.Types.ObjectId(user_id), 'created.d': {$eq: datestring}};
                    EngagementResults.remove(condition).exec(function (err) {
                        if (!err) {}
                    });
                }

                for (var i = 0; i < length; i++) {
                    var row = {};
                    row.user_id = mongoose.Types.ObjectId(req.user._id);
                    row.mood = surveyresults[i]['mood'];
                    row.rating = surveyresults[i]['rating'];
                    row.comment_title = surveyresults[i]['comment_title'];
                    row.comment = surveyresults[i]['comment'];
                    row.created = created;

                    EngagementResults.create(row, function (err, item) {
                        if (!err) {
                            response.status = true;
                        } else {
                            response.status = false;
                        }
                    });
                }

                res.send({status: true});
                res.end();
            });

        } else if (ratingtype == "moodrate") {
            checkHasEntry(user_id, function (data) {
                
                if (data.length > 0) {
                    
                    var mood = surveyresults.filter(function(row) { return row.mood == "Mood"; });
                    
                    for (var i = 0; i < data.length; i++) {
                        
                        if (data[i]['mood'] == mood[0].mood) {
                            data[i]['rating'] = mood[0].rating;
                        }
                        //data[i]['_id'] = mongoose.Types.ObjectId(data[i]['_id']);
                        data[i]['comment_title'] = mood[0].comment_title;
                        data[i]['comment'] = mood[0].comment;
                        data[i]['created'] = created;
                    
                        var condition = { _id: mongoose.Types.ObjectId(data[i]['_id']) };
                        var options = { multi: false };
                        EngagementResults.update(condition, data[i], options, function (err) {
                            if (!err) {
                            } else {
                                console.log(err);
                            }
                        });  
                        
                    }
                    
                } else {
                    for (var i = 0; i < length; i++) {
                        var row = {};
                        row.user_id = mongoose.Types.ObjectId(req.user._id);
                        row.mood = surveyresults[i]['mood'];
                        row.rating = surveyresults[i]['rating'];
                        row.comment_title = surveyresults[i]['comment_title'];
                        row.comment = surveyresults[i]['comment'];
                        row.created = created;

                        EngagementResults.create(row, function (err, item) {
                            if (!err) {
                                response.status = true;
                            } else {
                                response.status = false;
                            }
                        });
                        
                    }
                }

                res.send({status: true});
                res.end();
            });
        }
};


function getLasteRatedMood(user_id, callback) {
    // Last rated mood 
    EngagementResults.findOne({user_id: user_id, mood: 'Mood'}).sort({_id: - 1}).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}


exports.getLastSurvey = function (req, res) {

var user_id = mongoose.Types.ObjectId(req.user._id);
        var condition = {user_id: user_id};
        var orderby = {_id: - 1}; // -1: DESC; 1: ASC
        var limit = 13;
        getLasteRatedMood(user_id, function (lastmood) {

        EngagementResults.find(condition).sort(orderby).limit(limit).exec(function (err, rows) {
        var response = {};
                if (!err) {
        response.status = 'success';
                response.data = rows;
                response.lastmood = lastmood;
        } else {
        response.status = 'failure';
                response.data = [];
                response.lastmood = [];
                console.log('Error in getLastSurvey');
        }
        res.send(response);
                res.end();
        });
        });
};

exports.getSurveyResults = function (req, res) {
    
    try {
        
        var user_id = ( req.query.user_id !== undefined && req.query.user_id !== 'undefined' && req.query.user_id !== '' ) ? req.query.user_id: req.user._id;
        user_id = mongoose.Types.ObjectId(user_id);
         
        var condition = {user_id: user_id};
        var orderby = {_id: 1}; // -1: DESC; 1: ASC

        getLasteRatedMood(user_id, function (lastmood) {

            EngagementResults.find(condition).sort(orderby).exec(function (err, rows) {
                var response = {};
                if (!err) {
                    response.status = 'success';
                    response.data = rows;
                    response.lastmood = lastmood;
                } else {
                    response.status = 'failure';
                    response.data = [];
                    response.lastmood = [];
                    console.log('Error in getLastSurvey');
                }
                res.send(response);
                res.end();
            });
        });
        
    } catch(e) {
        console.log(e);
        res.send({ status: 'error' });
        res.end();
    }
};

function getUsersByCompany(companyid, callback) {
    
    User.find({company_id: companyid}).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}

function getCompanyData(ids , currentUserId, callback) {
    
    var orderby = {_id: 1}; // -1: DESC; 1: ASC
    EngagementResults.find({user_id: { $in: ids }}).sort(orderby).lean().exec(function (err, rows) {
            var response = {};
            if (!err) {
                response.status = 'success';
                response.currentuser = currentUserId;
                response.data = rows;
                response.totalcompanyusers = ids.length;
            } else {
                response.status = 'failure';
                response.data = [];
                response.currentuser = currentUserId;
                response.totalcompanyusers = ids.length;
                console.log('Error in getResultsByComapny');
            }
            callback(response);
    });
}


function getResultsByUserId(uid, callback) {

    var user_id = mongoose.Types.ObjectId(uid);
    var condition = {user_id: user_id};
    EngagementResults.find(condition).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}

exports.getResultsByComapny = function (req, res) {
    
    var currentUser = req.user;
    var companyid = currentUser.company_id;
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    

    getUsersByCompany(companyid, function (docs) {

        var ids = _(docs).map(function (g, key) {
            return g._id;
        });
        
        getCompanyData(ids, req.user._id, function (results) {
            
            res.send(results);
            res.end();
        });
    
    });

};


function getUsersByIndustry(industry, company, callback) {
    var condition = {company_info: {$elemMatch: {companyname: company, industry: industry}}};
    
    User.find(condition).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}


exports.getResultsByIndustry = function (req, res) {
    
    var currentUser = req.user;
    var company = currentUser.company_info[0].companyname;
    var industry = currentUser.company_info[0].industry;
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    var orderby = {_id: 1}; // -1: DESC; 1: ASC

    getUsersByIndustry(industry, company, function (docs) {

        var ids = _(docs).map(function (g, key) {
            return g._id;
        });
        
        EngagementResults.find({user_id: { $in: ids }}).sort(orderby).lean().exec(function (err, rows) {
            var response = {};
            if (!err) {
                response.status = 'success';
                response.currentuser = req.user._id;
                response.data = rows;
            } else {
                response.status = 'failure';
                response.data = [];
                response.currentuser = req.user._id;
                console.log('Error in getResultsByIndustry');
            }
            res.send(response);
            res.end();
        });
    
    
    });

};


function getUsersByCountry(country, company, callback) {
    var condition = {company_info: {$elemMatch: {companyname: company, country: country}}};
    
    User.find(condition).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}


exports.getResultsByCountry = function (req, res) {

    var currentUser = req.user;
    var company = currentUser.company_info[0].companyname;
    var country = currentUser.company_info[0].country;
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    var orderby = {_id: 1}; // -1: DESC; 1: ASC

    getUsersByCountry(country, company, function (docs) {

        var ids = _(docs).map(function (g, key) {
            return g._id;
        });
        
        EngagementResults.find({user_id: { $in: ids }}).sort(orderby).lean().exec(function (err, rows) {
            var response = {};
            if (!err) {
                response.status = 'success';
                response.currentuser = req.user._id;
                response.data = rows;
            } else {
                response.status = 'failure';
                response.data = [];
                response.currentuser = req.user._id;
                console.log('Error in getResultsByCountry');
            }
            res.send(response);
            res.end();
        });
    
    
    });

};


// Engaging Managers

function getManagersByCompany(companyid, callback) {
    var condition = {usertype: 'manager', company_id: companyid};
    
    User.find(condition).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}

function getManagerSubordinates(docs, callback) {
    
    var managerIds = _(docs).map(function (g, key) {
            return mongoose.Types.ObjectId(g._id);
        });
        
    var condition = {manager_id: { $in: managerIds }};
    
    Team.find(condition).lean().exec(function (err, rows) {
        if (rows != 'undefined') {
            callback(rows);
        }
    });
   
}

function getSubordinatesEngagements(docs, memberids, callback) {
    
    var sIds = [];
    for (var dkey in memberids) {
        var subordinates = memberids[dkey].subordinates; 
        for (var skey in subordinates) {
            if(sIds.indexOf(subordinates[skey]) < 0) {
                sIds.push(subordinates[skey]);
            }
        }
    }
    
    var userIds = [];
    for (var id in sIds) {
        userIds.push(mongoose.Types.ObjectId(sIds[id]));
    }

    var condition = {user_id: { $in: userIds}};
    EngagementResults.find(condition).lean().exec(function (err, rows) {
        if (rows != 'undefined') {
            callback(rows);
        }
    });
   
}


exports.getMostEngagingManagers = function (req, res) {

    var currentUser = req.user;
    var companyid = currentUser.company_id;
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    var orderby = {_id: 1}; // -1: DESC; 1: ASC

    getManagersByCompany(companyid, function (docs) {
        
        var ids = _(docs).map(function (g, key) {
            return g._id;
        });
        
        getManagerSubordinates(docs, function (subordinates) {
            
            var memberids = _(subordinates).map(function (g, key) {
                
                var sIds = [];
                var members  = g.member_ids;
                for (var mkey in members) {
                    sIds.push((members[mkey]._id).toString());
                }
                var result =  {
                    manager: (g.manager_id).toString(),
                    subordinates: sIds
                };

                return result;
            });
            
            getSubordinatesEngagements(docs, memberids, function (engagements) {
                
                var eGroupResults = _(engagements).groupBy(function(result) {
                    return result.user_id;
                });

                var eData = _(eGroupResults).map(function(g, key) {
                    var eCount =  g.length;
                    return {   user_id: key,
                               count: eCount,
                               avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/( 13 * (eCount / 13)) ).toFixed(1)
                           };
                });
                        
                var sorted = _.first(_(eData).sortBy(function(data){return data.avg;}).reverse(),3);
                
                //Start : Mapping docs, memberids and sorted
                var mostEngaged = [];
                for (var d in docs) {
                    
                    var _docs = docs[d];
                    var temp = {};
                    if (_docs.firstname === '' || _docs.firstname === undefined) {
                        temp.name = _docs.email;
                    } else {
                        temp.name = _docs.firstname + ' ' + _docs.lastname;
                    }
                    
                    for (var m in memberids) {
                        var _member = memberids[m];
                        if(_docs._id == _member.manager) {
                            temp.manager = _member.manager;
                            temp.subordinates = _member.subordinates;
                            var sIds = _member.subordinates;
                            var len = sIds.length;
                            temp.totalsubordinates = len;
                            var sum = 0;
                            
                            for (var s in sIds) {
                                var _sid = sIds[s];
                                
                                for (var u in sorted) {
                                    var _user = sorted[u];
                                    if(_sid === _user.user_id) {
                                        sum = (parseFloat(sum) + parseFloat(_user.avg));     
                                    }
                                }
                                
                            }
                            
                            temp.sum = sum;
                            temp.avg = (parseFloat(sum)/parseFloat(len));
                        }
                    }
                    mostEngaged.push(temp);
                }
                
                //mostEngaged = _(mostEngaged).sortBy(function(data){return data.avg;}).reverse();
                mostEngaged = _.first(_(mostEngaged).sortBy(function(data){return data.avg;}).reverse(),3);
                
                var response = {};
                if (mostEngaged.length > 0) {
                    response.status = 'success';
                    response.data = mostEngaged;
                } else {
                    response.status = 'failure';
                    response.data = [];
                    console.log('Error in get most engaged managers');
                }
                
                res.send(response);
                res.end();
            });
            
        });
        
    });

};


// Start : Company statistics
function getCompanyESurveyUsers(companyid, currentUser, callback) {
    
    User.find({company_id: companyid}).lean().exec(function (err, docs) {
        if (docs != 'undefined') {
            callback(docs);
        }
    });
}

function getCompanyESurvey(employees, currentUser, callback) {
    
        var ids = _(employees).map(function (employee, key) {
            return employee._id;
        });
        
        EngagementResults.find({user_id: { $in: ids }}).sort({_id: -1}).lean().exec(function (err, rows) {
            var response = {};
            if (!err) {
                response.status = 'success';
                response.currentuser = currentUser._id;
                response.data = rows;
            } else {
                response.status = 'failure';
                response.data = [];
                response.currentuser = currentUser._id;
                console.log('Error in getCompanyESurvey');
            }
            callback(response);
        });
}

exports.getCompanyStatisticsData = function (req, res) {
    
    var currentUser = req.user;
    //var company = currentUser.company_info[0].companyname;
    var companyid = currentUser.company_id;
    var user_id = mongoose.Types.ObjectId(req.user._id);
    var condition = {user_id: user_id};
    
    getCompanyESurveyUsers(companyid, currentUser, function (employees) {

        getCompanyESurvey(employees, currentUser, function (results) {
            var response = {};
            response.data = results;
            response.totalemployees = employees.length;
            res.send(response);
            res.end();
        });
    
    });

};
