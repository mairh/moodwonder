import React from 'react';
import EOTMActions from 'actions/EmployeeOfTheMonthActions';
import EOTMStore from 'stores/EmployeeOfTheMonthStore';
import UserStore from 'stores/UserStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class EmployeeOfTheMonth extends React.Component {

    constructor(props) {
        super(props);
        this.state = EOTMStore.getState();
        this.state.multilang = MlangStore.getState().multilang;
        this.filtered = [];
        this.ShowMoreStatus = true;
        this.mytotalvotes = 0;
        this.hasData = false;
        this.hasMoreData = false;
        this.last_id = '';
        this.search = false;
    }

    componentDidMount() {
        EOTMActions.getallemployees();
        EOTMStore.listen(this._onChange);
    }

    componentWillUnmount() {
        EOTMStore.unlisten(this._onChange);
    }

    _onChange = (state) => {
        if(this.ShowMoreStatus){
            this.ShowMoreStatus = false;
            state.employees.data.employees.map((data, key) => {
                this.filtered.push(data);
            });
            this.mytotalvotes = state.employees.data.mytotalvotes;
            this.hasData = state.hasEmployees;
            let last_employee = this.filtered[this.filtered.length-1];
            if( last_employee !== undefined && last_employee._id !== undefined && last_employee._id !== ''){
                this.last_id = last_employee._id;
            }
        }

        if(this.state.voteStatus && (!this.state.hasError)){
            this.filtered[this.state.votekey].myvote = true;
            this.filtered[this.state.votekey].votes++;
            this.mytotalvotes++;
            state.voteStatus = false;
            this._onPopClose();
        }
        if(this.state.ServerResponse && this.state.ServerResponse.messages !== '' && this.state.ServerResponse.callback === 'vote'){
            this._onPopClose();
        }

        // Set start/end date for employee of the month
        if(this.hasData){
            state.voteperiod = state.employees.data.voteperiod;
            this.hasMoreData = state.employees.data.hasMoreData;
        }
        this.setState(state);
        this.messageAutoClose(state);
    }

    _onPopClick = (emp_id,key) => {
        // key : vote widget unique key
        $( "body" ).addClass( "dimmed dimmable" );
        this.setState({
            modal:true,
            emp_id:emp_id,
            votekey: key
        });
    }

    _onPopClose = (emp_id) => {
        $( "body" ).removeClass( "dimmed dimmable" );
        this.setState({
            modal:false
        });
    }

    _onChangeComment = (e) => {
        if(e.target.value.trim() !== ''){
            this.setState({
                isNotValid: false
            });
        }else{
            this.setState({
                isNotValid: true
            });
        }
    }

    _onSearch = (e) => {
        let keyword = React.findDOMNode(this.refs.search).value.trim();
        if( keyword !== '' ){
            this.search = true;
            this.last_id = '';
            this.filtered = [];
            EOTMActions.getallemployees({ keyword: keyword });
            this.ShowMoreStatus = true;
        }
        if(e){
            e.preventDefault();
        }
    }

    showMoreUsers = () => {
        let keyword = React.findDOMNode(this.refs.search).value.trim();
        let obj = {};
        if( keyword !== '' ){
            obj.keyword = keyword;
        }
        if( this.last_id !== '' ){
            obj.last_id = this.last_id;
        }
        EOTMActions.getallemployees(obj);
        this.ShowMoreStatus = true;
    }

    // Function to sort the user list by the entered word in the search user text box
    // It is disabled now
    _onChangeSearch = (e) => {
        let text = e.target.value.trim();

        // fetch fresh data after clearing the search text box
        if( text === '' && this.search ){
            this.search = false;
            this.ShowMoreStatus = true;
            this.filtered = [];
            EOTMActions.getallemployees();
        }
    }

    _onVoteSubmit = (e) => {
        if(parseInt(this.mytotalvotes) < 5){
            let comment = React.findDOMNode(this.refs.comment).value.trim();
            EOTMActions.saveVote({ emp_id: this.state.emp_id, comment: comment, callback: 'vote' });
        }
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    render() {
        this.disableVote = true;

        let mlarray = this.state.multilang;

        let employees = '';
        let moreusers = null;
        if(this.state.hasEmployees){
            employees = this.filtered.map((data, key) => {

                if(this.mytotalvotes < 5 && !(data.disabled)){
                    this.disableVote = false;
                }

                return [
                    <VoteWidget
                        _id={data._id}
                        uid={this.state.employees.data.current_user_id}
                        photo={data.photo} name={data.name}
                        votes={data.votes}
                        active={data.myvote}
                        disabled={this.disableVote}
                        click={this._onPopClick}
                        index={key} />
                ];
            });
        }

        if(this.hasMoreData){
            moreusers = [<div className="ui horizontal divider"> <a onClick={this.showMoreUsers}>{GetText('EOM_SHOW_MORE', mlarray)}</a> </div>];
        }

        let message;
        if (this.state.message !== '' ) {
            message = (
                <div className="ui success message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        let modal;
        if(this.state.modal){
            modal = (
                <div className="ui dimmer modals page transition visible active">
                    <div className="ui active modal">
                        <i className="close icon" onClick={this._onPopClose} data-dismiss="modal"></i>
                        <div className="header">{GetText('EOM_POPUP_TITLE', mlarray)}</div>
                        <div className="ui segment">
                            <div className="ui small form">
                                <div className="field">
                                    <label> {GetText('EOM_POPUP_COMMENT', mlarray)}</label>
                                    <textarea className="form-control" rows="5" ref="comment" onChange={this._onChangeComment} ></textarea>
                                </div>
                                <button type="button" disabled={this.state.isNotValid} onClick={this._onVoteSubmit}    className="ui submit button submitt" >{GetText('EOM_POPUP_VOTE_BTN', mlarray)}</button>
                                <button type="button" onClick={this._onPopClose} className="ui submit button cancel" data-dismiss="modal">{GetText('EOM_POPUP_CLOSE_BTN', mlarray)}</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="ui main">
                <ProfileHeader data={{votes: this.mytotalvotes, voteperiod: this.state.voteperiod }}/>
                <div className="ui secondary menu account">
                    <div className="ui container">
                        <form className="ui right labeled left icon input" onSubmit={this._onSearch} >
                            <i className="search icon"></i>
                            <input type="text" ref="search" onChange={this._onChangeSearch} placeholder={GetText('EOM_SEARCH_PLACEHOLDER_1', mlarray)} />
                            <input type="submit" style={{'display': 'none'}} />
                            <a className="ui tag label" onClick={this._onSearch} > {GetText('EOM_SEARCH_BTN_1', mlarray)} </a>
                        </form>
                    </div>
                </div>
                <h4 className="ui header ryt">{GetText('EOM_TITLE_1', mlarray)}</h4>
                {message}
                <div className="ui link five cards stackable grid cast">
                    {employees}
                </div>
                {moreusers}
                {modal}
            </div>
        );
    }
}

class VoteWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            multilang: MlangStore.getState().multilang
        };
    }

    _onModalClick = () => {
        if(this.props.votes !== undefined){
            this.props.click(this.props._id,this.props.index);
        }
    }

    render() {
        let mlarray = this.state.multilang;

        let voteBtn = (
            <div onClick={this._onModalClick} className='extra content' >
                <i className="thumbs outline up icon"></i>
                {GetText('EOM_VOTE_BTN', mlarray)}
            </div>
        );

        if((this.props._id === this.props.uid) || this.props.disabled){
            voteBtn = (
                <div className='extra content disabled' >
                    <i className="thumbs outline up icon"></i>
                    {GetText('EOM_VOTE_BTN', mlarray)}
                </div>
            );
        }

        if(this.props.active){
            voteBtn = (
                <div className='extra content voted' >
                    <i className="thumbs outline up icon"></i>
                    {GetText('EOM_VOTE_BTN', mlarray)}
                </div>
            );
        }

        return (
            <div className="card">
                <div className="image">
                    <img src={this.props.photo} alt="Profile Photo"/>
                </div>
                <div className="content">
                    <div className="header"><a href={ `/publicprofile/${this.props._id}` } >{this.props.name}</a></div>
                    <div className="total-votes">
                        <p>{this.props.votes} {GetText('EOM_VOTECOUNT_TEXT', mlarray)}</p>
                    </div>
                </div>
                {voteBtn}
            </div>
        );
    }
}

class ProfileHeader extends React.Component {

    constructor(props) {

        super(props);
        this.state = UserStore.getState();
        this.state.multilang = MlangStore.getState().multilang;
    }
    componentDidMount () {
        UserStore.listen(this._onChange);
    }
    componentWillReceiveProps (prop) {
        this._onChange(prop.data);
    }
    _onChange = (state) => {
        this.setState(state);
    }
    render() {

        let text = null;
        let voteperiod = null;
        let mlarray = this.state.multilang;

        if(this.state.votes !== undefined) {
            let votecount = ( 5 - this.state.votes );
            let votecountmsg = GetText('EOM_VOTE_COUNT_MESSAGE', mlarray);
            text = [<p className="votes"> { votecountmsg.replace("VOTECOUNT", votecount) } </p>];
        }
        if(this.state.voteperiod !== undefined) {
            voteperiod = [<p className="votes"> {GetText('EOM_VOTE_PERIOD', mlarray)} : { this.state.voteperiod.start } - { this.state.voteperiod.end } </p>];
        }

        return (
            <div className="ui margin-grid ">
                <div className="column profile-cover" style={{ backgroundImage: 'url('+this.state.userData.cover_image+')'}}>
                    <div className="dp-container">
                        <img className="ui tiny circular image dp" src={this.state.userData.profile_image} alt=""/>
                        <a href="#" className="action act-cover-image"></a>
                        <div className="title">
                            <h3>{this.state.userData.fname} {this.state.userData.lname}</h3>
                            <span className="text-shadow">{this.state.userData.email} </span>
                            {text}
                            {voteperiod}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
