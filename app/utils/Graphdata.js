import _ from 'underscore';

let data = [];
let period = 0;
let periodflag = 'month';

const graphdata = {

    getEngagementGraphData: function (graphperiod, engagementmood, surveyresults) {
        switch (graphperiod) {
        case 'all_time' :
            period = 0;
            periodflag = 'month';
            break;

        case 'last_12_months' :
            period = 12;
            periodflag = 'month';
            break;

        case 'last_6_ months' :
            period = 6;
            periodflag = 'month';
            break;

        case 'last_3_months' :
            period = 3;
            periodflag = 'month';
            break;

        case 'last_month' :
            period = 1;
            periodflag = 'month';
            break;

        case '30_days' :
            period = 30;
            periodflag = 'day';
            break;

        case 'week_change' :
            period = 7;
            periodflag = 'day';
            break;

        default :
            period = 0;
            periodflag = 'month';
            break;
        }

        if(period > 0) {
            surveyresults = this.filterByDate(period, surveyresults, periodflag);
        }

        if (engagementmood === 'mw_index') {

            let uniquedaterows = _(surveyresults).groupBy(function(surveyresult) {
                return surveyresult.created.d;
            });

            data = _(uniquedaterows).map(function(g, key) {
                return { created : { d: key},
                rating: ((_(g).reduce(function(m,x) { return m + x.rating; }, 0)) / 13).toFixed(1),
                sum: _(g).reduce(function(m,x) { return m + x.rating; }, 0) };
            });

        } else {
            data = _(surveyresults).where({mood: engagementmood});
        }

        return data;
    },

    filterByDate: function (months, rows, flag) {

        let today = new Date();
        let year = today.getFullYear();
        let month = ('0' + (today.getMonth() + 1)).slice(-2);
        let day = ('0' + today.getDate()).slice(-2);
        let datestring = year + '-' + month + '-' + day;

        let date = new Date(datestring);
        if (flag === 'month') {
            date.setMonth(date.getMonth() - months); // Subtracted number of months here.
        } else {
            date.setDate(date.getDate() - months); // Subtracted number of days here.
        }
        let ndate = new Date(date);

        let nyear = ndate.getFullYear();
        let nmonth = ('0' + (ndate.getMonth() + 1)).slice(-2);
        let nday = ('0' + ndate.getDate()).slice(-2);
        let ndatestring = nyear + '-' + nmonth + '-' + nday;

        return _.filter(rows, function(v) { return v.created.d >= ndatestring; });
    },

    getEngagementStatitics: function (period, mood, results) {

        let statitics = statitics || {};
        let resultrows = this.getEngagementGraphData(period, mood, results);

        let lowest = _.min(resultrows, function(o){return o.rating;});
        statitics.lowest = lowest.rating;

        let highest = _.max(resultrows, function(o){return o.rating;});
        statitics.highest = highest.rating;

        let current = _.sortBy(resultrows, function(o) { return o.created.d; }).reverse();
        for (let eCurrent of current) {
            statitics.current = eCurrent.rating;
            break;
        }

        let start = _.sortBy(resultrows, function(o) { return o.created.d; });
        for (let eStart of start) {
            statitics.start = eStart.rating;
            break;
        }

        statitics.thirtydayschange = this.getDaysChange('30_days', mood, results);

        statitics.weekchange = this.getDaysChange('week_change', mood, results);


        return statitics;
    },

    getDaysChange: function (period, mood, results) {
        let statitics = statitics || {};
        let resultrows = this.getEngagementGraphData(period, mood, results);
        let rows = _.sortBy(resultrows, function(o) { return o.created.d; });

        let length = rows.length - 1;
        let i = 0;
        for (let row of rows) {
            if(i === 0) {
                statitics.rate1 = row.rating;
            }
            if(i === length) {
                statitics.rate2 = row.rating;
            }
            i++;
        }

        return (statitics.rate2 - statitics.rate1).toFixed(1);

    }
};

export default graphdata;
