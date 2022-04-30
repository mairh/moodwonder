import React from 'react';
import AdminWebAPIUtils from 'utils/AdminWebAPIUtils';

const requireAuth = (Component) => {
    return class Authenticated extends React.Component {
        static willTransitionTo(transition, params, query, callback) {
            if (typeof window !== 'undefined') {
                AdminWebAPIUtils.loggedin().done((response) => {
                    if (!response.authenticated && response.role !== "ADMIN") {
                        localStorage.setItem('isAuth', "false");
                        transition.redirect('/admin', {}, {});
                    } else {
                        localStorage.setItem('isAuth', "true");
                    }
                    callback();
                });

            } else {
                callback();
            }
        }

        render() {
            return <Component {...this.props}/>;
        }
    };
};

export default requireAuth;
