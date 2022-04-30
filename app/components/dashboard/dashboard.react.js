import React from 'react';
import RequireAuth from 'utils/requireAuth';

export default RequireAuth(class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ui container">
                <h2>Admin dashboard</h2>
            </div>
        );
    }
});
