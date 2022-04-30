import _ from 'underscore';

const moodratings = {

    getCompanyMoodAvg: function (surveyresults) {

        let cGroupResults = _(surveyresults).groupBy(function(result) {
            return result.mood;
        });

        let cCount = _.countBy(surveyresults,'mood').Mood;
        let cData = _(cGroupResults).map(function(g, key) {
            return { mood : key,
                avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/cCount).toFixed(1),
                sum: (_(g).reduce(function(m,x) { return m + x.rating; }, 0)).toFixed(1)
            };
        });

        return _.sortBy(cData, function(o) { return o.avg; }).reverse();
    },

    getTopThreeAreas: function (surveyresults) {

        return _.first(this.getCompanyMoodAvg(surveyresults), 3);
    },

    getWorstThreeAreas: function (surveyresults) {

        return _.last(this.getCompanyMoodAvg(surveyresults), 3);
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

    companyImprovedAreaCalulation: function (lastMonthData) {

        let data = _.sortBy(lastMonthData, function(o) { return o.created.d; }).reverse();
        let groupedResults = _(data).groupBy(function(result) {
            return result.created.d;
        });

        let gData = _(groupedResults).map(function(g, key) {
            let gByMood = _(g).groupBy(function(result) {
                return result.mood;
            });

            let row = _(gByMood).map(function(g, key) {
                return { mood : key,
                    avg : ((_(g).reduce(function(m,x) { return m + x.rating; }, 0))/(g.length)).toFixed(1),
                    count: g.length,
                    date: _(g).reduce(function(m,x) { return x.created.d; }, 0),
                    sum: (_(g).reduce(function(m,x) { return m + x.rating; }, 0)).toFixed(1)
                };
            });
            return row;
        });

        let first = gData[0];
        let last = gData[(gData.length) - 1];
        let final = [];

        for (let i in first) {
            let temp = {};
            temp.mood = first[i].mood;
            temp.count = first[i].count;
            temp.date = first[i].date;
            temp.sum = first[i].sum;
            temp.avg = (last[i].avg - first[i].avg).toFixed(1);
            final.push(temp);
        }

        return _.sortBy(final, function(o) { return o.avg; }).reverse();

    },

    getCompanyMostImprovedAreas: function (surveyresults) {

        let results = this.getLastMonthData(surveyresults);
        if ((results.length / 13) > 1) {
            let improvedareas = this.companyImprovedAreaCalulation(results);
            return _.first(improvedareas, 3);
        } else {
            return [];
        }

    },

    getCompanyWorstImprovedAreas: function (surveyresults) {

        let results = this.getLastMonthData(surveyresults);
        if ((results.length / 13) > 1) {
            let improvedareas = this.companyImprovedAreaCalulation(results);
            return _.last(improvedareas, 3);
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
