import React from 'react';
import RequireAuth from 'utils/requireAuth';
import PlacesActions from 'actions/PlacesActions';
import PlacesStore from 'stores/PlacesStore';

export default RequireAuth(class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = PlacesStore.getState();
        this.state.rows = [];
        this.state.currentPage = 0;
        this.state.totalPages = [];
        this.state.modal = false;
        this.state.PlacesList = false;
        this.hasData = false;
        this.rows = false;
        this.header = [];
        this.pagination = [];
        this.page = 0;
    }

    componentDidMount(){
        PlacesActions.getPlaces({ _id: this.props.params.id, placeType: 'country', page: 1 });
        PlacesStore.listen(this._onChange);
    }

    componentDidUpdate(){
        $('.menu .item').tab();
    }

    _onChange = (state) => {
        if(state.PlacesList.rows){
            this.pagination = state.PlacesList.pagination;
            state.rows = state.PlacesList.rows;
            if(this.state.ServerResponse){
                if(this.state.ServerResponse.message !== ''){
                    state.message = this.state.ServerResponse.message;
                }else{
                    state.message = '';
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
            PlacesActions.getPlaces({ placeType: 'country', _id: this.props.params.id, page: page });
        }
    }

    _onUpdateCountries = (model) => {
        model._id          =  model.teamid;
        model.continent_id =  this.props.params.id;
        model.place        =  model.teamname;
        model.placeType    =  'country';
        model.type         =  'updatecountry';
        PlacesActions.updatePlaces(model,this.props.params.id); // Second parameter used to fetch the updated list of countries
        PlacesStore.listen(this._onChange);
    }

    _onRemoveClick = (e) => {
        if(confirm('Are you sure ?')){
            let params = {
                _id: e.target.dataset.tag,
                placeType: 'country',
                type: 'deletecountry'
            };
            PlacesActions.deletePlaces(params,this.props.params.id); // Second parameter used to fetch the updated list of countries
            PlacesActions.getPlaces({ placeType: 'country', page: this.page });
        }
    }

    render() {
        let rows;
        let pagination;

        try
        {
            if(this.state.rows !== undefined && this.state.rows.length>0){
                rows = this.state.rows.map((row, key) => {
                    this.hasData = true;
                    return (
                        <tr key={key}>
                            <td><Editable onSave={this._onUpdateCountries} teamid={row._id} value={row.name} /></td>
                            <td><a href={ `/admin/states/${row._id}/${row.name}` } className="navigation__item">View states</a></td>
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
            }else{
                rows = (
                    <tr key="1">
                        <td colSpan="3" style={{'textAlign':'center'}}>No data</td>
                    </tr>
                );
            }
        }
        catch(err)
        {
            console.log(err);
        }

        return (
            <div className="ui container">
                <h1>All Countries under {this.props.params.continents}</h1>
                <div className="ui top attached tabular menu">
                    <a className="item active" data-tab="first">Add Country</a>
                    <a className="item" data-tab="second">List Countries</a>
                </div>
                <div className="ui bottom attached tab segment active" data-tab="first">
                    <AddCountries data={ {countinentID: this.props.params.id} }/>
                </div>
                <div className="ui bottom attached tab segment" data-tab="second">
                    <div>
                        <table className="ui celled table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>States</td>
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
        this.setState({ Edit: true, value: this.props.value });
    }

    onSaveClick = (teamname,teamid) => {
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

class AddCountries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.canSubmit = false;
    }

    _onChange = (state) => {
        this.setState(state);
        if(state.ServerResponse.status){
            React.findDOMNode(this.refs.country).value = '';
        }
    }

    _onChangeText = (e) => {
        if(e.target.value && e.target.value.trim() !== ''){
            this.setState({ canSubmit: true });
        }else{
            this.setState({ canSubmit: false });
        }
    }

    _onAddCountries = (e) => {
        let continentID = this.props.data.countinentID;
        let country = React.findDOMNode(this.refs.country).value.trim();
        PlacesActions.addPlaces({ _id: continentID, placeType: 'country', type: 'addcountry', action: 'add', place: country });
        PlacesStore.listen(this._onChange);
        e.preventDefault();
    }

    render() {
        return (
            <div className="form-group">
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form className="ui form" onSubmit={this._onAddCountries}>
                            <div className="field">
                                <label>Country name</label>
                                <input type="text" className="form-control"  onChange={this._onChangeText} ref="country" />
                            </div>
                            <div className="field">
                                <button type="button" className="ui blue button" onClick={this._onAddCountries} disabled={!this.state.canSubmit}>Submit</button>
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
