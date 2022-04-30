import React from 'react';

export default class ParticipationGraph extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        $('#surveyParticipation').circliful();
    }

    render () {
        let sPercentage = this.props.percentage;
        console.log('sPercentage');
        console.log(sPercentage);
        let datatext = (sPercentage / 100) * 5;
        let datapercent = datatext * 20;

        return (
            <div id="surveyParticipation" data-dimension="250" data-text={datapercent} data-info="" data-width="45" data-fontsize="25" data-percent={datapercent} data-fgcolor="#cb5234" data-bgcolor="#eee" data-type="half" data-icon="fa-task"></div>
        );
    }
}
