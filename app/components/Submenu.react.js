import React from 'react';

/*
* Component for submenu
*
*/
export default class Submenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="pagination">
                <li><a href="/survey">Engagement Survey</a></li>
                <li><a href="/myprofile">My Profile</a></li>
                <li><a href="/mycompany">My Company</a></li>
                <li><a href="/mymanager">My Manager</a></li>
                <li><a href="/myteam">My Teams</a></li>
                <li><a href="/surveyforms">Custom survey</a></li>
                <li><a href="/mymood">My Mood</a></li>
                <li><a href="/employeeofthemonth">Employee of the month</a></li>
                <li><a href="/allemployees">Employees</a></li>
                <li><a href="/my_company">Company Statistics</a></li>
            </ul>
        );
    }
}
