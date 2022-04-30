import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Invitepeople extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            INP_TITLE: '',
            INP_DESCRIPTION: '',
            INP_PLCHOLDER: '',
            INP_INVITEBTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'invitepeople', language: this.state.language});
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
            INP_TITLE: pagedata.INP_TITLE,
            INP_DESCRIPTION: pagedata.INP_DESCRIPTION,
            INP_PLCHOLDER: pagedata.INP_PLCHOLDER,
            INP_INVITEBTN: pagedata.INP_INVITEBTN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitInvitePeople = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    inpTitle = (e) => {
        e.preventDefault();
        this.setState({ INP_TITLE: e.target.value });
    }
    inpDescription = (e) => {
        e.preventDefault();
        this.setState({ INP_DESCRIPTION: e.target.value });
    }
    inpPlcHolder = (e) => {
        e.preventDefault();
        this.setState({ INP_PLCHOLDER: e.target.value });
    }
    inpInviteBtn = (e) => {
        e.preventDefault();
        this.setState({ INP_INVITEBTN: e.target.value });
    }


    render() {

        let pagedata = this.state.pagedata;
        let INP_TITLE = this.state.INP_TITLE;
        let INP_DESCRIPTION = this.state.INP_DESCRIPTION;
        let INP_PLCHOLDER = this.state.INP_PLCHOLDER;
        let INP_INVITEBTN = this.state.INP_INVITEBTN;


        return (
            <div className="ui container">
                <h4>Edit - Invite people page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="invitepeopleForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>INP_TITLE</label>
                                <input className="form-control"
                                    name="INP_TITLE"
                                    type="text"
                                    value={INP_TITLE}
                                    onChange={this.inpTitle} />
                            </div>
                            <div className="field">
                                <label>INP_DESCRIPTION</label>
                                <input className="form-control"
                                    name="INP_DESCRIPTION"
                                    type="text"
                                    value={INP_DESCRIPTION}
                                    onChange={this.inpDescription} />
                            </div>
                            <div className="field">
                                <label>INP_PLCHOLDER</label>
                                <input className="form-control"
                                    name="INP_PLCHOLDER"
                                    type="text"
                                    value={INP_PLCHOLDER}
                                    onChange={this.inpPlcHolder} />
                            </div>
                            <div className="field">
                                <label>INP_INVITEBTN</label>
                                <input className="form-control"
                                    name="INP_INVITEBTN"
                                    type="text"
                                    value={INP_INVITEBTN}
                                    onChange={this.inpInviteBtn} />
                            </div>


                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitInvitePeople}>Submit</button>
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
