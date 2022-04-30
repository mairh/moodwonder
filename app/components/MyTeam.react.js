import React from 'react';
import TeamActions from 'actions/TeamActions';
import TeamStore from 'stores/TeamStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class MyTeam extends React.Component {

    constructor (props) {
        super(props);
        mixins(Navigation, this);
        this.state = TeamStore.getState();
        this.state.multilang = MlangStore.getState().multilang;
        this.state.canSubmit  = false;
        this.state.canSubmitAddMember = true;
        this.state.CreateTeamForm = false;
        this.state.EditUI = false;
        this.validationErrors = {};
        this.addmember = { messages: [], serverresponse: {} };
    }

    componentDidMount () {
        TeamActions.getTeams();
        TeamStore.listen(this._onChange);
    }

    componentWillUnmount () {
        TeamStore.unlisten(this._onChange);
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    }

    _onChange = (state) => {

        this.addmember.messages       =  state.messages;
        this.addmember.serverresponse =  state.serverresponse;
        this.setState(state);
    }

    _onSaveSubmit = () => {
        let teamname = React.findDOMNode(this.refs.teamname).value.trim();
        TeamActions.createTeam({ teamname: teamname });
    }

    _onUpdateTeamName = (model) => {
        TeamActions.updateTeam(model);
    }

    _onAddMemberSubmit = (model) => {
        if(typeof model.membername === 'string'){
            model.membername = [model.membername];
        }
        TeamActions.addMemberToTeam(model);
    }

    onRemoveMember = (team_id, member_id,account_type) => {
        if (confirm("Are you sure you want to remove this user from your team ?") === true) {
            TeamActions.removeMemberFromTeam({ 'team_id': team_id, 'member_id': member_id, 'account_type': account_type });
        }
    }

    showCreateTeamForm = () => {
        this.setState({CreateTeamForm: true});
    }

    render() {

        let message;

        let messages;

        let teamUserList;

        let mlarray = this.state.multilang;

        if(this.state.hasTeam){

            teamUserList = this.state.teams.map((data, key) => {

                let members;
                members = data.members.map((mem, key) => {
                    return (
                        <div className="field ui  three column stackable grid sub">
                            <label className="column email">{mem.member_email}</label>
                            <label className="column">{mem.member_name}</label>
                            <a onClick={this.onRemoveMember.bind(this,data._id,mem._id,mem.usertype)} className="action column right">
                                <i className="trash outline icon"></i>
                            </a>
                        </div>
                    );
                });
                return [
                    <EditableMyTeam onSave={this._onUpdateTeamName} teamid={data._id} value={data.name} />,
                    <h4>{GetText('PRFL_TEAM_SUBORDINATES', mlarray)}</h4>,
                    <div className=" field">
                        {members}
                        <AddAnotherMember options={{team_id: data._id, onsave: this._onAddMemberSubmit, messages: this.addmember.messages, serverresponse: this.addmember.serverresponse}} />
                    </div>
                ];
            });
        }

        return (
            <div className="ui segment">
                {messages}
                {message}
                <h4 className="ui header ryt">MY TEAM</h4>
                <div className="ui small form team">
                    <h3 className="ui dividing header">{GetText('PRFL_TEAM_TOP_MSG', mlarray)}</h3>
                    <AddTeam />
                    {teamUserList}
                </div>
            </div>
        );
    }
}

class AddAnotherMember extends React.Component {

    constructor(props) {
        super(props);
        this.state =
        {
            showform: 'none',
            multilang: MlangStore.getState().multilang
        };
    }

    componentDidMount() {
        TeamStore.listen(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
        this.messageAutoClose(state);
    }

    componentWillReceiveProps(e) {
        // to set default
        let messages = ( this.props.options.messages ) ? this.props.options.messages : [];
        let serverresponse = ( this.props.options.serverresponse ) ? this.props.options.serverresponse : [];
        this.setState({Edit: false, value: this.props.value, messages: messages, serverresponse: serverresponse });
    }

    onShowFormClick = () => {
        this.setState({ showform: 'block' });
    }

    isValidEmailAddress = (emailAddress) => {
        let pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    }

    onSaveClick = (e) => {

        let memberemail = React.findDOMNode(this.refs.membername).value.trim();
        let team_id = this.props.options.team_id;
        // let feedback = this.props.options.onsave({ team_id: this.props.options.team_id, membername: membername });
        // callback is a unique string to identify the componet to display the message
        if(memberemail === ''){
            this.setState({ messages: ['Name is required'], serverresponse: { callback : this.props.options.team_id } });
        }
        else if(!this.isValidEmailAddress(memberemail))
        {
            this.setState({ messages: ['Invalid e-mail address'], serverresponse: { callback : this.props.options.team_id } });
        }
        else
        {
            let model = {
                callback: team_id,
                team_id: team_id,
                memberemail: memberemail
            };
            TeamActions.addMemberToTeam(model);
            React.findDOMNode(this.refs.membername).value = "";
        }
        e.preventDefault();
    }

    messageAutoClose = (state) => {
        if(state.messages[0] !== ''){
            setTimeout(function(){
                this.setState({ messages: [] });
            }.bind(this),3000);
        }
    }

    render() {

        let multimessages;

        let mlarray = this.state.multilang;

        if (this.state.messages  && this.state.messages[0] !== undefined && this.state.serverresponse.callback === this.props.options.team_id) {
            multimessages = this.state.messages.map((mes, key) => {
                return [<li>{mes}</li>];
            });
            multimessages = (
                <div className="ui error message segment">
                    <ul className="list">
                        {multimessages}
                    </ul>
                </div>
            );
        }

        return (
            <form  onSubmit={this.onSaveClick} >
                <h4  onClick={this.onShowFormClick}  className="ui dividing header"><a><i className="add circle icon large"></i></a>{GetText('PRFL_TEAM_ADD_ANOTHER', mlarray)}</h4>
                <div style={{ display: this.state.showform }}  className="form">
                    {multimessages}
                    <div className="field ui  two column stackable grid " >
                        <div className="column">
                            <label >{GetText('PRFL_TEAM_WRK_EML', mlarray)}</label>
                        </div>
                        <div className="column">
                            <input placeholder={GetText('PRFL_TEAM_WRK_EML', mlarray)} ref="membername" type="text" />
                        </div>
                    </div>
                    <h3 className="ui dividing header"> </h3>
                    <button type="submit" className="ui submit  button submitt">{GetText('PRFL_TEAM_SUBORDINATES_SAVE', mlarray)}</button>
                </div>
            </form>
        );
    }
}

class AddTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state =
        {
            showform: 'none',
            multilang: MlangStore.getState().multilang
        };
    }

    componentDidMount() {
        TeamStore.listen(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
        this.messageAutoClose(state);
        // clear text box after adding a new team
        if( state.serverresponse.callback === 'addteam' && state.serverresponse.status){
            React.findDOMNode(this.refs.teamname).value = '';
        }
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    onShowFormClick = () => {
        this.setState({ showform: 'block' });
    }

    _onSaveSubmit = (e) => {
        let teamname = React.findDOMNode(this.refs.teamname).value.trim();
        if(teamname !== ''){
            TeamActions.createTeam({ callback: 'addteam',teamname: teamname });
        }else{
            this.setState({ serverresponse: { callback: 'addteam' }, message: 'Team name is required' });
        }
        e.preventDefault();
    }

    render() {

        let messages;

        let mlarray = this.state.multilang;

        if ( this.state.message !== undefined && this.state.message !== '' && this.state.serverresponse.callback === 'addteam' ) {

            messages = (
                <div className="ui error message" style={{ display: 'block' }} >
                    {this.state.message}
                </div>
            );
        }

        let CreateTeamUI = [
            <h3 className="ui dividing header" >
                <i className="add user icon"></i>
                <label>{GetText('PRFL_TEAM_ADD_TEAM', mlarray)}</label>
                <a className="action"  onClick={this.onShowFormClick}>
                    <i className="write icon"></i>
                </a>
            </h3>,
            <form style={{ display: this.state.showform }} onSubmit={this._onSaveSubmit} className="form">
                {messages}
                <div className="field ui  two column stackable grid " >
                    <div className="column">
                        <label>{GetText('PRFL_TEAM_NAME', mlarray)}</label>
                    </div>
                    <div className="column">
                        <input placeholder={GetText('PRFL_TEAM_NAME', mlarray)} ref="teamname" type="text" />
                    </div>
                </div>
                <button type="submit" className="ui submit  button submitt">{GetText('PRFL_TEAM_SAVE', mlarray)}</button>
            </form>
        ];

        return (
            <div>
                {CreateTeamUI}
            </div>
        );
    }
}

class EditableMyTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state =
        {
            showform: 'none',
            value:props.value,
            multilang: MlangStore.getState().multilang,
            btnDisabled: true
        };
    }

    componentDidMount() {
        TeamStore.listen(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
        this.messageAutoClose(state);
    }

    componentWillReceiveProps(e) {
        // to set default
        this.setState({ value: this.props.value });
    }

    changeValue = (event) => {
        this.setState({value:event.target.value});
        if( event.target.value.trim() === this.props.value.trim() ){
            this.setState({
                btnDisabled: true
            });
        }else{
            this.setState({
                btnDisabled: false
            });
        }
    }

    onShowFormClick = () => {
        this.setState({ showform: 'block' });
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    onSaveClick = (e) => {
        let teamname = this.state.value;
        let teamid   = this.props.teamid;
        if(this.props.value !== this.state.value){
            if(teamname.trim() !== ''){
                this.setState({ btnDisabled: true });
                this.props.onSave({ callback: teamid,teamname: teamname.trim(),teamid: teamid});
            }else{
                this.setState({ serverresponse: { callback: this.props.teamid }, message: 'Team name is required' });
            }
        }
        e.preventDefault();
    }

    render() {

        let messages;

        let mlarray = this.state.multilang;

        if (this.state.message !== undefined && this.state.message !== '' && this.state.serverresponse.callback === this.props.teamid) {

            messages = (
                <div className="ui error message" style={{ display: 'block' }} >
                    {this.state.message}
                </div>
            );
        }

        return (
            <div>
                <h3 className="ui dividing header" >
                    <i className="add user icon"></i>
                    <label>{this.props.value}</label>
                    <a className="action"  onClick={this.onShowFormClick}>
                        <i className="write icon"></i>
                    </a>
                </h3>
                <form onSubmit={this.onSaveClick.bind(this)} style={{ display: this.state.showform }}  className="form">
                    {messages}
                    <div className="field ui  two column stackable grid " >
                        <div className="column">
                            <label>{GetText('PRFL_TEAM_NAME', mlarray)}</label>
                        </div>
                        <div className="column">
                            <input placeholder={GetText('PRFL_TEAM_NAME', mlarray)} ref="teamname" type="text"  onChange={this.changeValue} value={this.state.value} />
                        </div>
                    </div>
                    <button type="submit" disabled={this.state.btnDisabled} className="ui submit  button submitt">{GetText('PRFL_TEAM_SAVE', mlarray)} </button>
                </form>
            </div>
        );
    }
}

MyTeam.contextTypes = { router: React.PropTypes.func };
