import _ from 'underscore';

const surveyparticipation = {

    totalCount: function (data) {
        return data.length;
    },

    surveyPercentage: function (data) {
        let totalcount = this.totalCount(data);
        let participated  = _.filter(data, function(v) { return v.status == 'participated'; }).length;
        return ((participated / totalcount) * 100).toFixed();
    }

};

export default surveyparticipation;
