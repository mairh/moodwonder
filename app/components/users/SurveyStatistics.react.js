import React from 'react';
import RequireAuth from 'utils/requireAuth';
import AdminUserStore from 'stores/AdminUserStore';
import UsersSurveyStatistics from 'components/users/UsersSurveyStatistics.react';

export default RequireAuth(class SurveyStatistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = AdminUserStore.getState();
    }

    _onChange = (state) => {
        this.setState(state);
    }

    render() {

        let message;
        if (this.state.hasError && this.state.message !== '' ) {
            message = (
                <div className={ (this.state.hasError) ? 'alert alert-warning' : 'alert alert-info' }>
                    {this.state.message}
                </div>
            );
        }

        return (
            <div className="container">
                {message}
                <h1>MoodWonder Survey Statistics</h1>
                <UsersSurveyStatistics user_id={this.props.params.uid} />
            </div>
        );
    }
});
