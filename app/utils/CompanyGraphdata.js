import _ from 'underscore';

let data = [];

const compnaygraphdata = {

    getEngagementGraphData: function (engagementmood, surveyresults) {

        if (engagementmood === 'mw_index') {

            let uniquedaterows = _(surveyresults).groupBy(function(surveyresult) {
                return surveyresult.created.d;
            });
            data = _(uniquedaterows).map(function(g, key) {
                return { created : { d: key},
                len : g.length,
                //rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / 13).toFixed(1),
                rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / (13 * (g.length / 13))).toFixed(1),
                sum: _(g).reduce(function(m,x) { return m + x.rating; }, 0) };
            });

        } else {

            let sresults = _(surveyresults).where({mood: engagementmood});

            let uniquedaterows = _(sresults).groupBy(function(surveyresult) {
                return surveyresult.created.d;
            });

            data = _(uniquedaterows).map(function(g, key) {
                return { created : { d: key},
                len : g.length,
                rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / (g.length)).toFixed(1),
                sum: _(g).reduce(function(m,x) { return m + x.rating; }, 0) };
            });
        }

        data = _.sortBy(data, function(o) { return o.created.d; });
        return data;
    },

    getMyEngagementData: function (engagementmood, surveyresults, uid) {

        let rows = _(surveyresults).where({user_id: uid});
        if (engagementmood === 'mw_index') {

            let uniquedaterows = _(rows).groupBy(function(row) {
                return row.created.d;
            });
            data = _(uniquedaterows).map(function(g, key) {

                return { created : { d: key},
                rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / 13).toFixed(1),
                sum: _(g).reduce(function(m,x) { return m + x.rating; }, 0) };
            });

        } else {
            data = _(rows).where({mood: engagementmood});
        }

        data = _.sortBy(data, function(o) { return o.created.d; });
        return data;
    },

    getTeamEngagementGraphData: function (engagementmood, surveyresults, memberids) {

        surveyresults = _.filter(surveyresults, function(a){
            return _.find(memberids, function(b){
                return b._id === a.user_id;
            });
        });

        if (engagementmood === 'mw_index') {

            let uniquedaterows = _(surveyresults).groupBy(function(surveyresult) {
                return surveyresult.created.d;
            });
            data = _(uniquedaterows).map(function(g, key) {
                return { created : { d: key},
                len : g.length,
                //rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / 13).toFixed(1),
                rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / (13 * (g.length / 13))).toFixed(1),
                sum: _(g).reduce(function(m,x) { return m + x.rating; }, 0) };
            });

        } else {

            let sresults = _(surveyresults).where({mood: engagementmood});

            let uniquedaterows = _(sresults).groupBy(function(surveyresult) {
                return surveyresult.created.d;
            });

            data = _(uniquedaterows).map(function(g, key) {
                return { created : { d: key},
                len : g.length,
                rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / (g.length)).toFixed(1),
                sum: _(g).reduce(function(m,x) { return m + x.rating; }, 0) };
            });
        }

        data = _.sortBy(data, function(o) { return o.created.d; });
        return data;
    }

};

export default compnaygraphdata;
