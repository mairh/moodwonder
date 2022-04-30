import React from 'react';
import { Link } from 'react-router';
import RequireAuth from 'utils/requireAuth';
import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';

export default RequireAuth(class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = AdminUserStore.getState();
        this.state.rows = [];
        this.state.currentPage = 0;
        this.state.totalPages = [];
        this.state.modal = false;
        this.state.userTeams = false;
        this.state.popup = false;
        this.hasData = false;
        this.rows = false;
        this.header = [];
        this.pagination = [];
    }

    componentDidMount(){
        AdminUserActions.getAllUsers({ page: 1 });
        AdminUserStore.listen(this._onChange);
    }

    _onPopClick = (e) => {
        if(e.target.dataset.tag !== ''){
            AdminUserActions.getUsersTeams({ _id: e.target.dataset.tag });
        }
    }

    _onPopClose = (emp_id) => {
        this.setState({
            ServerResponse:false,
            popup:false
        });
    }

    _onChange = (state) => {

        this.pagination = state.usersTable.pagination;
        state.rows = state.usersTable.rows;
        this.setState(state);
        if(this.state.popup && this.state.ServerResponse && this.state.ServerResponse.type ==='usersInTeams'){
            let _this = this;
            let onHide = function(){ _this._onPopClose(); };
            $('.ui.modal').modal({onHide,detachable: false}).modal('show');
        }
    }
    // Example Pagination
    // http://carlosrocha.github.io/react-data-components/
    onChangePage = (page) => {
        if(page){
            AdminUserActions.getAllUsers({ page: page });
        }
    }

    render() {

        let rows;
        let pagination;
        let teamUserList;
        if(this.state.userTeams){
            teamUserList = this.state.userTeams.map((data, key) => {

                let members;
                members = data.members.map((mem, key) => {
                    return (
                        <div className="row" key={key}>
                            <div className="col-sm-6">{mem.member_email}</div>
                            <div className="col-sm-4">{mem.member_name}</div>
                        </div>
                    );
                });
                return [
                    <div className="list-group-item" key={data._id+1}>
                        {data.name}
                    </div>,
                    <div className="list-group-item" key={data._id+2}>
                        <div className="row">
                            <div className="col-sm-4"><h4>SUBORDINATES</h4></div>
                        </div>
                        {members}
                    </div>
                ];
            });
        }

        try
        {
            if(this.state.rows !== undefined){
                rows = this.state.rows.map((row, key) => {
                    // console.log(row);

                    let usertype = row.usertype;
                    if( row.usertype === 'manager'){
                        usertype = ( <a data-tag={row._id} onClick={this._onPopClick} className="navigation__item">{row.usertype}</a> );
                    }

                    this.hasData = true;
                    return (
                        <tr key={row._id}>
                            <td><Link to={ `/admin/userdetails/${row._id}` } className="navigation__item">{row.name}</Link></td>
                            <td>{row.email}</td>
                            <td>{usertype}</td>
                            <td>{(row.verifylink) ? 'Verified': 'Not verified'}</td>
                            <td>{row.country}</td>
                            <td>{row.domain_name}</td>
                            <td>{row.companyname}</td>
                            <td>{row.companysize}</td>
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

        return (
            <div className="ui container">
                <h2>All Users</h2>
                <div>
                    <table className="ui celled table">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Type</td>
                                <td>Verify Status</td>
                                <td>Country</td>
                                <td>Domain name</td>
                                <td>Company name</td>
                                <td>Company size</td>
                            </tr>
                            {rows}
                        </tbody>
                    </table>
                    {pagination}
                </div>
                <div className="ui modal">
                    <i className="close icon"></i>
                    <div className="header">Message</div>
                    <div className="content">
                        {teamUserList}
                    </div>
                </div>
            </div>
        );
    }
});
