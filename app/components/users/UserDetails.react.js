import React from 'react';
import RequireAuth from 'utils/requireAuth';
import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';
import DatePicker from 'react-date-picker';

export default RequireAuth(class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = AdminUserStore.getState();
    }

    componentDidMount(){
        let _id =  false;
        try{
            _id = this.props.params.uid;
        }catch(err){
            console.log(err);
        }
        if(_id){
            AdminUserActions.getUsersDetails({ _id: _id });
        }
        AdminUserStore.listen(this._onChange);
    }

    componentDidUpdate(){
        $('.menu .item').tab();
    }

    _onChange = (state) => {
        this.setState(state);
    }

    userStatusChange = (userstatus) => {
        let _id =  false;
        try{
            _id = this.props.params.uid;
        }catch(err){
            console.log(err);
        }
        if(_id){
            AdminUserActions.updateUserDetails({ _id: _id, userstatus: userstatus });
        }
    }

    onTabClick = (Tab) => {
        this.setState({ Tab: Tab });
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
        let userDetails;
        if(this.state.userDetails){

            let data = { status: false, onChangeFn: this.userStatusChange };
            if(this.state.userDetails.userstatus === 'Active'){
                data.status = true;
            }
            userDetails = (
                <div className="ui grid">
                    <div className="eight wide column"><img src={this.state.userDetails.profile_image} /></div>
                    <div className="eight wide column">First name : {this.state.userDetails.fname}</div>
                    <div className="eight wide column">Last name : {this.state.userDetails.lname}</div>
                    <div className="eight wide column">Work email : {this.state.userDetails.email}</div>
                    <div className="eight wide column">Language : {this.state.userDetails.language}</div>
                    <div className="eight wide column">Manager : {this.state.userDetails.mymanager}</div>
                    <div className="eight wide column">Report frequency : {this.state.userDetails.reportfrequency}</div>
                    <div className="eight wide column">User status : <ChangeUserStatus data={data} /> </div>
                    <div className="eight wide column"><a href={ `/admin/surveystatistics/${this.props.params.uid}` }>Survey Statistics</a></div>
                </div>
            );
        }

        let Tab = [];
        Tab[0] = userDetails;
        Tab[1] = [ <li>No data</li> ];

        try{
            Tab[1] = [ <OpenEndedQuestionsAnswers uid={this.props.params.uid} /> ];
        }catch(err){
            console.log(err);
        }

        return (
            <div className="ui container">
                <div className="ui grid page">
                    <div className="column">
                        <div className="ui segment">
                            {message}
                            <h1>Users</h1>
                            <div className="ui top attached tabular menu">
                                <a className="item active" data-tab="first">User Details</a>
                                <a className="item" data-tab="second">Responses for open ended questions</a>
                            </div>
                            <div className="ui bottom attached tab segment active" data-tab="first">
                                {Tab[0]}
                            </div>
                            <div className="ui bottom attached tab segment" data-tab="second">
                                {Tab[1]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

class ChangeUserStatus extends React.Component {

    constructor(props) {
        super(props);
        try{
            let checked = false;
            let statusText = 'Inactive';
            if(this.props.data.status){
                checked = true;
                statusText = 'Active';
            }
            this.state = {
                checked: checked,
                statusText: statusText
            };
        }catch(err){
            console.log(err);
        }
    }

    onChange = (e) => {
        if(this.state.checked){
            this.setState({
                checked: false,
                statusText: 'Inactive'
            });
        }else{
            this.setState({
                checked: true,
                statusText: 'Active'
            });
        }
        this.props.data.onChangeFn((!this.state.checked));
    }

    render() {
        return (
            <div>
                <input type="checkbox" name="userStatus" checked={this.state.checked} onChange={this.onChange} value={this.state.checked} />
                {this.state.statusText}
            </div>
        );
    }
}


class OpenEndedQuestionsAnswers extends React.Component {

    constructor(props) {
        super(props);
        this.list = [ <li>No data</li> ];
        try{
            this.state = {
                hasData:false
            };
        }catch(err){
            console.log(err);
        }
    }

    onData = (data) => {
        let res;
        if(data !== undefined){
            res = data.map((data, key) => {
                return [ <li key={key} className="eight wide column">{data.q} : {data.a}</li> ];
            });
        }else{
            res = [ <li className="eight wide column"> No record found </li> ];
        }
        this.list = res;
    }

    getAnswers = (date) => {
        let _id =  false;
        try{
            _id = this.props.uid;
        }catch(err){
            console.log(err);
        }
        let param = { _id: _id };
        if(date !== undefined){
            param = { _id: _id, date: date };
        }
        AdminUserActions.OpenEndedQuestionsAnswers(param);
    }

    componentDidMount(){
        this.getAnswers();
        AdminUserStore.listen(this._onChange);
    }

    _onChange = (state) => {
        if(state.openEnded){
            this.onData(state.openEnded);
            this.setState({hasData: true});
        }
    }

    render() {

        return (
            <div>
                <DatePicker onChange={this.getAnswers}/>
                <ul className="list-group">
                    {this.list}
                </ul>
            </div>
        );
    }
}
