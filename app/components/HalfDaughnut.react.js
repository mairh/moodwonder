import React from 'react';

export default class HalfDaughnut extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount () {
        $('#employeeAvgEngagement').circliful();
    }

    render () {
        let datatext = this.props.datatext;
        let datapercent = parseInt(datatext * 20);

        return (
            <div id="employeeAvgEngagement" data-dimension="250" data-text={datatext} data-info="" data-width="45" data-fontsize="25" data-percent={datapercent} data-fgcolor="#cb5234" data-bgcolor="#eee" data-type="half" data-icon="fa-task"></div>
        );
    }
}
