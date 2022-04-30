import React from 'react';
import RequireAuth from 'utils/requireAuth';
import AdminCompanyActions from 'actions/AdminCompanyActions';
import AdminCompanyStore from 'stores/AdminCompanyStore';

import AdminTeamActions from 'actions/AdminTeamActions';
import AdminTeamsStore from 'stores/AdminTeamsStore';

import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';

export default RequireAuth(class AllTeams extends React.Component {
    constructor(props) {
        super(props);
        this.state = AdminCompanyStore.getState();
        this.state.rows = [];
        this.state.currentPage = 0;
        this.state.totalPages = [];
        this.state.modal = false;
        this.state.PlacesList = false;
        this.state.userTeams = false;
        this.state.btnDisabled = true;

        this.hasData = false;
        this.rows = false;
        this.header = [];
        this.pagination = [];
        this.page = 0;
        this.company_id = false;
    }

    componentDidMount(){
        AdminCompanyActions.getAllCompanies({});
        AdminCompanyStore.listen(this._setCompanyList);
        AdminUserStore.listen(this._setUserTeamList);
    }

    _setCompanyList = (state) => {
        // console.log(state);
        this.setState(state);
    }

    _setUserTeamList = (state) => {
        console.log(state);
        this.setState({ userTeams: state.userTeams });
    }

    _onCompanyChange = (e) => {
        // console.log(e.target.value);
        if(e.target.value !== ''){
            this.company_id = e.target.value;
            AdminTeamActions.getAllTeams({ company_id: e.target.value, page: this.page });
            AdminTeamsStore.listen(this._setTeams);
        }
    }

    _setTeams = (state) => {
        if(state.TeamList){
            this.pagination = state.TeamList.pagination;
            state.rows = state.TeamList.rows;
            if(this.state.ServerResponse){
                if(this.state.ServerResponse.message !== ''){
                    state.message = this.state.ServerResponse.message;
                }
            }
            this.setState(state);
            this.messageAutoClose(state);
        }else{
            this.setState(state);
        }
    }

    _setTeamSearch = (state) => {
        if(state.SearchTeamList){
            this.s_pagination = state.SearchTeamList.pagination;
            state.s_rows = state.SearchTeamList.rows;
            if(this.state.ServerResponse){
                if(this.state.ServerResponse.message !== ''){
                    state.message = this.state.ServerResponse.message;
                }
            }
            this.setState(state);
            this.messageAutoClose(state);
        }else{
            this.setState(state);
        }
    }

    componentDidUpdate(){
        $('.menu .item').tab();
    }

    // Example Pagination
    // http://carlosrocha.github.io/react-data-components/
    onChangePage = (page) => {
        this.page = page;
        if(page){
            AdminTeamActions.getAllTeams({ company_id: this.company_id, page: page });
        }
    }

    _onTeamSearch = (e) => {
        let teamSearchText = React.findDOMNode(this.refs.teamsearch).value.trim();
        AdminTeamActions.searchTeam({ teamname: teamSearchText, callback: 'teamsearch' });
        AdminTeamsStore.listen(this._setTeamSearch);
        e.preventDefault();
    }

    _onPopClick = (e) => {
        if(e.target.dataset.tag !== ''){
            AdminUserActions.getTeamsMembers({ _id: e.target.dataset.tag });
        }
        this.setState({
            modal:true
        });
    }

    _onPopClose = (emp_id) => {
        this.setState({
            modal:false
        });
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    changeValue = (event) => {

        let btnDisabled = true;
        if(event.target.value.trim() !== ''){
            btnDisabled = false;
        }
        this.setState({ btnDisabled: btnDisabled });
    }

    render() {

        console.log(this.state);
        let rows;
        let s_rows;
        let s_pagination;
        let pagination;
        let message_tab_1;
        let message_tab_2;
        let companylist;
        if(this.state.companyList){
            companylist = this.state.companyList.map((data, key) => {
                return [<option value={data._id}>{data.companyname+ '-' +data.domain_name}</option>];
            });
        }

        if (this.state.hasError && this.state.ServerResponse.callback === 'teamsearch') {
            message_tab_2 = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        try
        {
            if(this.state.rows !== undefined){
                rows = this.state.rows.map((row, key) => {
                    // console.log(row);
                    this.hasData = true;
                    return (
                        <tr key={row._id}>
                            <td>{row.name}</td>
                            <td><a data-tag={row._id} onClick={this._onPopClick}  className="navigation__item">Show team members</a></td>
                        </tr>
                    );
                });

                let pages = this.pagination.map((data, key) => {
                    return [<a className="item" onClick={this.onChangePage.bind(this,data.page)}>{data.text}</a>];
                });
                //console.log(this.pagination);
                pagination = (
                    <div className="ui pagination menu">
                        {pages}
                    </div>
                );
            }
        }
        catch(err)
        {
            console.log(err);
        }

        try
        {
            if(this.state.s_rows !== undefined){
                s_rows = this.state.s_rows.map((row, key) => {
                    // console.log(row);
                    this.hasData = true;
                    return (
                        <tr key={row._id}>
                            <td>{row.teamname}</td>
                            <td><a data-tag={row._id} onClick={this._onPopClick}  className="navigation__item">Show team members</a></td>
                            <td>{row.companyname}</td>
                            <td>{row.domain_name}</td>
                        </tr>
                    );
                });

                let pages = this.s_pagination.map((data, key) => {
                    return [<a className="item" onClick={this.onChangePage.bind(this,data.page)}>{data.text}</a>];
                });
                //console.log(this.pagination);
                s_pagination = (
                    <div className="ui pagination menu">
                        {pages}
                    </div>
                );
            }
        }
        catch(err)
        {
            console.log(err);
        }

        let teamUserList;
        if(this.state.userTeams){
            teamUserList = this.state.userTeams.map((data, key) => {

                let members = [<div className="alert alert-info">{this.state.message}</div>];
                if(data.members.length>0){
                    members = data.members.map((mem, key) => {
                        return (
                            <div className="ui grid">
                                <div className="ten wide column">{mem.member_email}</div>
                                <div className="six wide column">{mem.member_name}</div>
                            </div>
                        );
                    });
                }
                return members;
            });
        }

        let modal;
        if(this.state.modal){
            modal = (
                <div className="ui dimmer modals page transition visible active">
                    <div className="ui active modal" id="myModal" role="dialog">
                        <i className="close icon" onClick={this._onPopClose} ></i>
                        <div className="header">Teams</div>
                        <div className="html ui top attached segment">
                            {teamUserList}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="ui container">
                <h1>All Teams</h1>
                <div className="ui top attached tabular menu">
                    <a className="item active" data-tab="first">Teams</a>
                    <a className="item" data-tab="second">Search Teams</a>
                </div>
                <div className="ui bottom attached tab segment active" data-tab="first">
                    {message_tab_1}
                    <div className="ui two column stackable grid container" >
                        <div className="column" >
                            <form className="ui form" >
                                <select className="ui search dropdown" onChange={this._onCompanyChange} >
                                    <option value="">-- Select a company --</option>
                                    {companylist}
                                </select>
                            </form>
                        </div>
                        <table className="ui celled table">
                            <tr>
                                <td>Team name</td>
                                <td>Actions</td>
                            </tr>
                            {rows}
                        </table>
                        {pagination}
                    </div>
                </div>
                <div className="ui bottom attached tab segment" data-tab="second">
                    {message_tab_2}
                    <div className="ui three column stackable grid container" >
                        <form className="ui form column" onSubmit={this._onTeamSearch}>
                            <div className="field" >
                                <input type="text" ref="teamsearch" onChange={this.changeValue} className="form-control" placeholder="Search a team" />
                            </div>
                            <div className="field" >
                                <button className="ui blue button" disabled={this.state.btnDisabled} >Search</button>
                            </div>
                        </form>
                        <table className="ui celled table">
                            <tr>
                                <td>Team name</td>
                                <td>Action</td>
                                <td>Company</td>
                                <td>Domain name</td>
                            </tr>
                            {s_rows}
                        </table>
                        {s_pagination}
                    </div>
                </div>
                {modal}
            </div>
        );
    }
});
