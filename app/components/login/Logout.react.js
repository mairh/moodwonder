import React from 'react';
import RequireAuth from 'utils/requireAuth';

export default RequireAuth(class Logout extends React.Component {
    render() {
        return (
            <div className="logout">
                <h3 className="logout__header">You have been logged out.</h3>
            </div>
        );
    }
});
