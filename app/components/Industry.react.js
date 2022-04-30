import React from 'react';
import RequireAuth from 'utils/requireAuth';
import IndustryActions from 'actions/IndustryActions';
import IndustryStore from 'stores/IndustryStore';

export default RequireAuth(class Industry extends React.Component {
    constructor(props) {
        super(props);
        this.state = IndustryStore.getState();
        this.state.rows = [];
        this.state.currentPage = 0;
        this.state.totalPages = [];
        this.state.modal = false;
        this.state.IndustryList = false;
        this.hasData = false;
        this.rows = false;
        this.header = [];
        this.pagination = [];
        this.page = 0;
    }

    componentDidMount(){
        IndustryActions.getIndustries({ page: 1 });
        IndustryStore.listen(this._onChange);
    }

    componentDidUpdate(){
        $('.menu .item').tab();
    }

    _onChange = (state) => {
        if(state.IndustryList.rows){
            this.pagination = state.IndustryList.pagination;
            state.rows = state.IndustryList.rows;
            if(this.state.ServerResponse && !this.state.ServerResponse.status){
                if(this.state.ServerResponse.type === 'industrylist' && this.state.ServerResponse.message !== ''){
                    state.message = this.state.ServerResponse.message;
                }
            }
            this.setState(state);
        }else{
            state.rows = [];
            this.setState(state);
        }
        if(this.state.message.trim() !==''){
            console.log(this.state.message);
            $('#msg').text(this.state.message);
            $('.ui.modal').modal('show');
        }
    }

    // Example Pagination
    // http://carlosrocha.github.io/react-data-components/
    onChangePage = (page) => {
        this.page = page;
        if(page){
            IndustryActions.getIndustries({ page: page });
        }
    }

    _onUpdateIndustry = (model) => {
        try{
            model.callback = model.teamid;
            model.type = 'updateindustry';
            IndustryActions.updateIndustry(model);
            IndustryStore.listen(this._onChange);
        }catch(e){
            console.log('Error in _onUpdateIndustry');
        }
    }

    _onRemoveClick = (e) => {
        IndustryActions.deleteIndustry({ _id: e.target.dataset.tag, type: 'deleteindustry' });
        IndustryActions.getIndustries({ page: this.page });
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                console.log('timeout');
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    render() {

        let rows = (
            <tr>
                <td colSpan="2" style={{'textAlign':'center'}}>No data</td>
            </tr>
        );
        let pagination;

        try
        {
            if(this.state.rows !== undefined && this.state.rows.length>0){
                rows = this.state.rows.map((row, key) => {
                    this.hasData = true;
                    return (
                        <tr key={row._id}>
                            <td><Editable onSave={this._onUpdateIndustry} teamid={row._id} value={row.name} /></td>
                            <td><button type="button" data-tag={row._id} onClick={this._onRemoveClick} className="btn btn-default" >Delete</button></td>
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
                <h1>Industries</h1>
                <div className="ui top attached tabular menu">
                    <a className="item active" data-tab="first">Add Industry</a>
                    <a className="item" data-tab="second">All Industries</a>
                </div>
                <div className="ui bottom attached tab segment active" data-tab="first">
                    <AddIndustry />
                </div>
                <div className="ui bottom attached tab segment" data-tab="second">
                    <div>
                        <table className="ui celled table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>Actions</td>
                                </tr>
                                {rows}
                            </tbody>
                        </table>
                        {pagination}
                    </div>
                </div>
                <div className="ui modal">
                    <i className="close icon"></i>
                    <div className="header">Message</div>
                    <div className="content" id="msg"></div>
                </div>
            </div>
        );
    }
});

class Editable extends React.Component {

    constructor(props) {
        super(props);
        this.state =
        {
            Edit: false,
            value:props.value,
            btnDisabled: true
        };
    }

    componentWillReceiveProps(e) {
        // to set default
        this.setState({Edit: false, value: this.props.value });
    }

    changeValue = (event) => {
        let btnDisabled = true;
        if(this.props.value !== event.target.value){
            btnDisabled = false;
        }
        this.setState({value:event.target.value, btnDisabled: btnDisabled});
    }

    onEditClick = () => {
        this.setState({Edit: true, value: this.props.value });
    }

    onSaveClick = (teamname,teamid) => {
        console.log(teamname);
        console.log(teamid);
        if(this.props.value !== this.state.value && teamname.trim() !== ''){
            this.props.onSave({teamname:teamname,teamid:teamid});
        }
    }

    render() {

        let buttonlabel = 'Edit';

        let inputORLable = (
            <label htmlFor="email">{this.props.value}</label>
        );

        let actionButton = (
            <button type="button" className="btn btn-default" onClick={this.onEditClick} >{buttonlabel}</button>
        );

        if(this.state.Edit){
            buttonlabel  = 'Save';
            inputORLable = (
                <input type="text" className="form-control" ref="email"  onChange={this.changeValue} value={this.state.value} />
            );

            actionButton = (
                <button type="button" disabled={this.state.btnDisabled} className="btn btn-default" onClick={this.onSaveClick.bind(this,this.state.value,this.props.teamid)} >{buttonlabel}</button>
            );
        }

        return (
            <div className="row">
                {inputORLable}
                {actionButton}
            </div>
        );
    }
}

class AddIndustry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.canSubmit = false;
    }

    _onChange = (state) => {
        if(state.ServerResponse && state.ServerResponse.type === 'addindustry'){
            this.setState(state);
            if(state.ServerResponse.status){
                React.findDOMNode(this.refs.industry).value = '';
            }
        }
    }

    _onChangeText = (e) => {
        if(e.target.value && e.target.value.trim() !== ''){
            this.setState({ canSubmit: true });
        }
    }

    _onAddIndustry = (e) => {
        let industry = React.findDOMNode(this.refs.industry).value.trim();
        IndustryActions.addIndustry({ name: industry, type: 'addindustry' });
        IndustryStore.listen(this._onChange);
        e.preventDefault();
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    render() {

        return (
            <div className="form-group">
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form className="ui form" onSubmit={this._onAddIndustry}>
                            <div className="field">
                                <label>Industry name</label>
                                <input type="text" className="form-control"  onChange={this._onChangeText} ref="industry" />
                            </div>
                            <div className="field">
                                <button type="button" className="ui blue button" onClick={this._onAddIndustry} disabled={!this.state.canSubmit}>Submit</button>
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
