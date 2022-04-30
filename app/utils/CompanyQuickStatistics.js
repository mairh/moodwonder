import _ from 'underscore';

const companyquickstatistics = {

    getLastRatings: function (surveyresults) {
        return _.first(_.sortBy(surveyresults, function(o) { return o._id; }).reverse(),13);
    },

    getLastMonthResponses: function (companysurvey) {
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

        let results = _.filter(companysurvey, function(v) { return v.created.d >= ndatestring; });
        let uGroupResults = _(results).groupBy(function(result) {
            return result.mood;
        });

        return _.map(uGroupResults.Mood, function(n, i) { return i; }).length;

    },

    getNumberOfResponses: function (esurveyresults) {
        let uGroupResults = _(esurveyresults).groupBy(function(result) {
            return result.mood;
        });

        return _.map(uGroupResults.Mood, function(n, i) { return i; }).length;

    },

    getCompanyEmployeeEngagement: function (companysurvey) {

        let len = ((companysurvey.length) / 13);

        let sum = 0;
        for(let u of companysurvey) {
            sum = sum + u.rating;
        }

        return ((sum/(13 * len)).toFixed(1));
    },

    getEmployeeAtRisk: function (companysurvey) {

        let uGroupResults = _(companysurvey).groupBy(function(result) {
            return result.user_id;
        });

        let uData = _(uGroupResults).map(function(g, key) {
            let latest =  _.first(_.sortBy(g, function(o) { return o._id; }).reverse(),13);
            return {
                user_id: key,
                avg : ((_(latest).reduce(function(m,x) { return m + x.rating; }, 0))/13).toFixed(1)
            };
        });

        let employee = 0;
        for (let u of uData) {
            if(u.avg < 3.5) {
                employee++;
            }
        }

        return employee;
    },

    getTimeSinceLastPosted: function (companysurvey) {

        let lastPost = _.first(_.sortBy(companysurvey, function(o) { return o._id; }).reverse(), 1);
        let postid = _(lastPost).map(function(g, key) {
            return g._id;
        });

        let montharray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

        function countup(yr, m, d, h, min, sec) {
            let timeArr = [];
            let today = new Date();
            let todayy = today.getYear();
            if (todayy < 1000) {
                todayy += 1900;
            }
            let todaym = today.getMonth();
            let todayd = today.getDate();
            let todayh = today.getHours();
            let todaymin = today.getMinutes();
            let todaysec = today.getSeconds();
            let todaystring = montharray[todaym] + " " + todayd + ", " + todayy + " " + todayh + ":" + todaymin + ":" + todaysec;
            let futurestring = montharray[m] + " " + d + ", " + yr + " " + h + ":" + min + ":" + sec;
            //let dd = Date.parse(futurestring) - Date.parse(todaystring);
            let dd = Date.parse(todaystring) - Date.parse(futurestring);
            let dday = Math.floor(dd / (60 * 60 * 1000 * 24) * 1);
            let dhour = Math.floor((dd % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
            let dmin = Math.floor(((dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
            // let dsec = Math.floor((((dd % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);

            //return dday + " day(s), " + dhour + " hour(s), " + dmin + " minute(s)";
            timeArr['day'] = dday;
            timeArr['hour'] = dhour;
            timeArr['min'] = dmin;

            return timeArr;
        }

        let timestamp = postid.toString().substring(0,8);
        let pDate = new Date( parseInt( timestamp, 16 ) * 1000 );
        let pYear = pDate.getYear();
        if (pYear < 1000) {
            pYear += 1900;
        }
        let pMonth = pDate.getMonth();
        let pDay = pDate.getDate();
        let pHour = pDate.getHours();
        let pMin = pDate.getMinutes();
        let pSec = pDate.getSeconds();

        if (postid) {
            return countup(pYear, pMonth, pDay, pHour, pMin, pSec);
        } else {
            return "No posts.";
        }
    }

};

export default companyquickstatistics;
