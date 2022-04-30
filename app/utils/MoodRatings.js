import _ from 'underscore';

const moodratings = {

    processAreasSurvey: function(surveyresults){
        let sortByDate = _.sortBy(surveyresults, function(o) { return o.created.d; }).reverse();  //sort by created desc
        let groups  =  _.groupBy(sortByDate,function(o){return o.mood;});  //group results by mood
        let areasList = [];
        _.map(groups, function(group,i){
            let t = _.first(group,2);
            if(t.length >= 2 ){
                areasList.push({'moodObj':t[0],'diff':parseFloat(t[0].rating-t[1].rating).toFixed(1)});
            }else{
                areasList.push({'moodObj':t[0],'diff':parseFloat(t[0].rating).toFixed(1)});
            }
        });
        return areasList;
    },

    getTopThreeAreas: function (surveyresults) {
        let areasList= this.processAreasSurvey(surveyresults);
        let sortAreaBydiff = _.sortBy(areasList, function(o) { return -o.diff; }); //sort by rating diff desc
        let topthree = _.first(sortAreaBydiff,3);
        return topthree;
    },

    getWorstThreeAreas: function (surveyresults) {
        let areasList= this.processAreasSurvey(surveyresults);
        let sortAreaBydiff = _.sortBy(areasList, function(o) { return -o.diff; }).reverse(); //sort by rating diff asc
        let worstthree = _.first(sortAreaBydiff,3);
        return worstthree;
    },

    getLastMonthData: function (surveyresults) {
        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let datestring = year + '-' + month + '-' + day;

        let date = new Date(datestring);
        date.setMonth(date.getMonth() - 1);

        let ndate = new Date(date);
        let nyear = ndate.getFullYear();
        let nmonth = ('0' + (ndate.getMonth() + 1)).slice(-2);
        let nday = ('0' + ndate.getDate()).slice(-2);
        let ndatestring = nyear + '-' + nmonth + '-' + nday;

        let results = _.filter(surveyresults, function(v) { return v.created.d >= ndatestring; });
        return results;
    },

    getMostImprovedAreas: function (surveyresults) {

        let results = this.getLastMonthData(surveyresults);
        if ((results.length / 13) > 1) {
            let sortedArray = _.sortBy(results, function(o) { return o.rating;}).reverse();
            let groupedArray = _(sortedArray).groupBy(function(surveyresult) { return surveyresult.mood; });

            let data = _(groupedArray).map(function(g, key) {
                let mtop = _.sortBy(g, function(o) { return o.created.d; });
                let difference = (mtop[mtop.length -1].rating - mtop[0].rating).toFixed(1);
                let mood = mtop[0].mood;
                return {mood : mood, difference: difference};
            });

            let finalArray = _.sortBy(data, function(o) { return o.difference;}).reverse();
            let improvedareas = _.first(_.uniq(finalArray, function(row) { return row.difference; }),3);
            return improvedareas;
        } else {
            return [];
        }

    },

    getWorstImprovedAreas: function (surveyresults) {

        let results = this.getLastMonthData(surveyresults);
        if ((results.length / 13) > 1) {
            let sortedArray = _.sortBy(results, function(o) { return o.rating;});
            let groupedArray = _(sortedArray).groupBy(function(surveyresult) { return surveyresult.mood; });

            let data = _(groupedArray).map(function(g, key) {
                let mtop = _.sortBy(g, function(o) { return o.created.d; });
                let difference = (mtop[mtop.length -1].rating - mtop[0].rating).toFixed(1);
                let mood = mtop[0].mood;
                return {mood : mood, difference: difference};
            });

            let finalArray = _.sortBy(data, function(o) { return o.difference;});
            let improvedareas = _.first(_.uniq(finalArray, function(row) { return row.difference; }),3);
            return improvedareas;
        } else {
            return [];
        }

    },

    getAreasVsCompany: function (companysurvey, uid, mode) {

        //Start: Find User Avg
        let userresults = _(companysurvey).where({user_id: uid});
        let uCount = _.countBy(userresults,'mood').Mood;
        let uGroupResults = _(userresults).groupBy(function(result) {
            return result.mood;
        });
        let uData = _(uGroupResults).map(function(g, key) {
            return {    mood : key,
                avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/uCount).toFixed(1),
                sum: (_(g).reduce(function(m,x) { return m + x.rating; }, 0)).toFixed(1)
            };
        });
        //End: Find User Avg

        //Start: Find Company Avg
        let cCount = _.countBy(companysurvey,'mood').Mood;
        let cGroupResults = _(companysurvey).groupBy(function(result) {
            return result.mood;
        });
        let cData = _(cGroupResults).map(function(g, key) {
            return {    mood : key,
                avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/cCount).toFixed(1),
                sum: (_(g).reduce(function(m,x) { return m + x.rating; }, 0)).toFixed(1)
            };
        });
        //End: Find Company Avg

        let _topThree = [];
        let _worstThree = [];

        for (let u of uData) {
            for (let c of cData) {
                if(u.mood === c.mood) {
                    if(u.avg > c.avg) {
                        _topThree.push(u);
                    } else if (u.avg < c.avg) {
                        _worstThree.push(u);
                    }
                }
            }
        }

        if (mode === "_TOP") {
            return _.first(_.sortBy(_topThree, function(o) { return o.avg; }).reverse(), 3);
        } else if (mode === "_WORST") {
            return _.first(_.sortBy(_worstThree, function(o) { return o.avg; }), 3);
        }

    },

    getMeVsIndustry: function (industrysurvey, uid) {

        let userresults = _(industrysurvey).where({user_id: uid});
        let uCount = _.countBy(userresults,'mood').Mood;
        let uGroupResults = _(userresults).groupBy(function(result) {
            return result.mood;
        });
        let uData = _(uGroupResults).map(function(g, key) {
            return {
                mood : key,
                avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/uCount).toFixed(1),
                sum: (_(g).reduce(function(m,x) { return m + x.rating; }, 0)).toFixed(1)
            };
        });

        let cCount = _.countBy(industrysurvey,'mood').Mood;
        let cGroupResults = _(industrysurvey).groupBy(function(result) {
            return result.mood;
        });
        let cData = _(cGroupResults).map(function(g, key) {
            return {
                mood : key,
                avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/cCount).toFixed(1),
                sum: (_(g).reduce(function(m,x) { return m + x.rating; }, 0)).toFixed(1)
            };
        });

        let _INUSTRYDIFF = [];

        for (let u of uData) {
            for (let c of cData) {
                if(u.mood === c.mood) {
                    u.diff = (u.avg - c.avg).toFixed(1);
                    _INUSTRYDIFF.push(u);
                }
            }
        }

        return _.sortBy(_INUSTRYDIFF, function(o) { return o.diff; }).reverse();

    },

    getMeVsCountry: function (countrysurvey, uid) {

        let userresults = _(countrysurvey).where({user_id: uid});
        let uCount = _.countBy(userresults,'mood').Mood;
        let uGroupResults = _(userresults).groupBy(function(result) {
            return result.mood;
        });
        let uData = _(uGroupResults).map(function(g, key) {
            return {
                mood : key,
                avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/uCount).toFixed(1),
                sum: (_(g).reduce(function(m,x) { return m + x.rating; }, 0)).toFixed(1)
            };
        });

        let cCount = _.countBy(countrysurvey,'mood').Mood;
        let cGroupResults = _(countrysurvey).groupBy(function(result) {
            return result.mood;
        });
        let cData = _(cGroupResults).map(function(g, key) {
            return {
                mood : key,
                avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/cCount).toFixed(1),
                sum: (_(g).reduce(function(m,x) { return m + x.rating; }, 0)).toFixed(1)
            };
        });

        let countryDiff = [];

        for (let u of uData) {
            for (let c of cData) {
                if(u.mood === c.mood) {
                    u.diff = (u.avg - c.avg).toFixed(1);
                    countryDiff.push(u);
                }
            }
        }

        return _.sortBy(countryDiff, function(o) { return o.diff; }).reverse();
    }

};

export default moodratings;
