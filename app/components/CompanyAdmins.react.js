import React from 'react';
import RequireAuth from 'utils/requireAuth';
import AdminUserActions from 'actions/AdminUserActions';
import AdminUserStore from 'stores/AdminUserStore';

export default RequireAuth(class CompanyAdmins extends React.Component {

    constructor(props) {
        super(props);
        this.state = AdminUserStore.getState();
        this.state.rows = [];
        this.state.currentPage = 0;
        this.state.totalPages = [];
        this.state.modal = false;
        this.state.userTeams = false;
        this.hasData = false;
        this.rows = false;
        this.pagination = [];
        this.tableClass = '';
    }

    componentDidMount(){
        AdminUserActions.getAllUsers({ page: 1 });
        AdminUserStore.listen(this._onChange);
    }

    _onChange = (state) => {
        this.pagination = state.usersTable.pagination;
        state.rows = state.usersTable.rows;
        this.setState(state);
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

        try
        {
            if(this.state.rows){
                rows = this.state.rows.map((row, key) => {
                    this.hasData = true;
                    return (
                        <tr key={row._id}>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.usertype}</td>
                            <td>{(row.verifylink) ? 'Verified': 'Not verified'}</td>
                            <td>{row.country}</td>
                            <td>{row.domain_name}</td>
                            <td>{row.companyname}</td>
                            <td>{row.companysize}</td>
                            <td><ChangeUserStatus data={row} /></td>
                        </tr>
                    );
                });

                let pages = this.pagination.map((data, key) => {
                    return [<a className="item" onClick={this.onChangePage.bind(this,data.page)}>{data.text}</a>];
                });
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
                <h2>Company Admin</h2>
                <div>
                    <table className="ui celled table">
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Type</td>
                            <td>Verify Status</td>
                            <td>Country</td>
                            <td>Domain name</td>
                            <td>Company name</td>
                            <td>Company size</td>
                            <td>Admin</td>
                        </tr>
                        {rows}
                    </table>
                    {pagination}
                </div>
            </div>
        );
    }
});

class ChangeUserStatus extends React.Component {

    constructor(props) {
        super(props);
        try{
            if(this.props.data.company_admin){
                this.state = {
                    checked: true,
                    statusText: 'Active'
                };
            }else{
                this.state = {
                    checked: false,
                    statusText: 'Inactive'
                };
            }

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
        let company_admin = !this.state.checked;
        AdminUserActions.updateUserDetails({ _id: this.props.data._id, company_admin: company_admin ,action: 'change user type'});
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
