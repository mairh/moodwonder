import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class PublicProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            PUBLIC_PROFILE_VOTE_BTN: '',
            PUBLIC_PROFILE_VOTES: '',
            PUBLIC_PROFILE_MANAGERS: '',
            PUBLIC_PROFILE_SURVEYS_PARTICIPATED: '',
            PUBLIC_PROFILE_TEAMS: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'publicprofile', language: this.state.language});
    }

    componentWillUnmount() {
        PageStore.unlisten(this._onChange);
    }

    _onChange = () => {
        this.setState({
            pagedata: PageStore.getState().pagedata
        });

        let pagedata = this.state.pagedata;
        this.setState({
            PUBLIC_PROFILE_VOTE_BTN: pagedata.PUBLIC_PROFILE_VOTE_BTN,
            PUBLIC_PROFILE_VOTES: pagedata.PUBLIC_PROFILE_VOTES,
            PUBLIC_PROFILE_MANAGERS: pagedata.PUBLIC_PROFILE_MANAGERS,
            PUBLIC_PROFILE_SURVEYS_PARTICIPATED: pagedata.PUBLIC_PROFILE_SURVEYS_PARTICIPATED,
            PUBLIC_PROFILE_TEAMS: pagedata.PUBLIC_PROFILE_TEAMS
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitPublicProfile = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    publicProfileVoteBtn = (e) => {
        e.preventDefault();
        this.setState({ PUBLIC_PROFILE_VOTE_BTN: e.target.value });
    }
    publicProfileVotes = (e) => {
        e.preventDefault();
        this.setState({ PUBLIC_PROFILE_VOTES: e.target.value });
    }
    publicProfileManagers = (e) => {
        e.preventDefault();
        this.setState({ PUBLIC_PROFILE_MANAGERS: e.target.value });
    }
    publicProfileSurveysParticipated = (e) => {
        e.preventDefault();
        this.setState({ PUBLIC_PROFILE_SURVEYS_PARTICIPATED: e.target.value });
    }
    publicProfileTeams = (e) => {
        e.preventDefault();
        this.setState({ PUBLIC_PROFILE_TEAMS: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let PUBLIC_PROFILE_VOTE_BTN = this.state.PUBLIC_PROFILE_VOTE_BTN;
        let PUBLIC_PROFILE_VOTES = this.state.PUBLIC_PROFILE_VOTES;
        let PUBLIC_PROFILE_MANAGERS = this.state.PUBLIC_PROFILE_MANAGERS;
        let PUBLIC_PROFILE_SURVEYS_PARTICIPATED = this.state.PUBLIC_PROFILE_SURVEYS_PARTICIPATED;
        let PUBLIC_PROFILE_TEAMS = this.state.PUBLIC_PROFILE_TEAMS;


        return (
            <div className="ui container">
                <h4>Edit - Public Profile page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="publicProfileForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>PUBLIC_PROFILE_VOTE_BTN</label>
                                <input className="form-control"
                                    name="PUBLIC_PROFILE_VOTE_BTN"
                                    type="text"
                                    value={PUBLIC_PROFILE_VOTE_BTN}
                                    onChange={this.publicProfileVoteBtn} />
                            </div>
                            <div className="field">
                                <label>PUBLIC_PROFILE_VOTES</label>
                                <input className="form-control"
                                    name="PUBLIC_PROFILE_VOTES"
                                    type="text"
                                    value={PUBLIC_PROFILE_VOTES}
                                    onChange={this.publicProfileVotes} />
                            </div>
                            <div className="field">
                                <label>PUBLIC_PROFILE_MANAGERS</label>
                                <input className="form-control"
                                    name="PUBLIC_PROFILE_MANAGERS"
                                    type="text"
                                    value={PUBLIC_PROFILE_MANAGERS}
                                    onChange={this.publicProfileManagers} />
                            </div>
                            <div className="field">
                                <label>PUBLIC_PROFILE_SURVEYS_PARTICIPATED</label>
                                <input className="form-control"
                                    name="PUBLIC_PROFILE_SURVEYS_PARTICIPATED"
                                    type="text"
                                    value={PUBLIC_PROFILE_SURVEYS_PARTICIPATED}
                                    onChange={this.publicProfileSurveysParticipated} />
                            </div>
                            <div className="field">
                                <label>PUBLIC_PROFILE_TEAMS</label>
                                <input className="form-control"
                                    name="PUBLIC_PROFILE_TEAMS"
                                    type="text"
                                    value={PUBLIC_PROFILE_TEAMS}
                                    onChange={this.publicProfileTeams} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitPublicProfile}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>
            </div>
        );
    }

}
