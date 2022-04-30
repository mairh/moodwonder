import React from 'react';
import { RouteHandler } from 'react-router';
// import Navigation from 'components/Navigation.react';
import AdminNavigation from 'components/AdminNavigation.react';

export default class Admin extends React.Component {
    render() {
        return (
            <div>
                <AdminNavigation />
                <RouteHandler />
            </div>
        );
    }
}
