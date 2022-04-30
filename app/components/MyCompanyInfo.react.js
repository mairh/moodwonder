import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import PlacesActions from 'actions/PlacesActions';
import PlacesStore from 'stores/PlacesStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import _ from 'underscore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class MyCompanyInfo extends React.Component {

    constructor (props) {
        super(props);
        mixins(Navigation, this);
        this.state = UserStore.getState();
        this.state.multilang = MlangStore.getState().multilang;
        this.state.canSubmit = false;
        this.state.countries = [];
        this.state.countriesIntial = true;
        this.state.states = [];
        this.state.statesIntial = true;
        this.state.cities = [];
        this.state.citiesIntial = true;
        this.validationErrors = {};
    }

    componentDidMount () {
        UserActions.getcompanyinfo();
        UserStore.listen(this._onChange);
    }

    onChangeText = (e) => {
        let userDetailsTmp = this.state.userDetailsTmp;
        userDetailsTmp[e.target.name] = e.target.value;
        this.setState(userDetailsTmp);
    }

    componentWillUnmount () {
        UserStore.unlisten(this._onChange);
    }

    _onChange = (state) => {
        this.setState(state);
        if(this.state.countries.length <= 0 && this.state.userDetails.continent!==''){
            // Set country dropdown list / fetching country list
            this.onChangeContinent(this.state.userDetailsTmp.continent);
        }
        this.messageAutoClose(state);
    }

    onChangeIndustry = (e) => {
        let userDetailsTmp = this.state.userDetailsTmp;
        userDetailsTmp[e.target.name] = e.target.value;
        this.setState(userDetailsTmp);
    }

    onChangeContinent = (e) => {
        // Set country dropdown list / fetching country list
        let continent = e;
        try{
            continent = e.target.value;
        }catch(e){}

        // To set new value for continent dropdown list
        let userDetailsTmp = this.state.userDetailsTmp;
        userDetailsTmp.continent = continent;
        this.setState({ userDetailsTmp: userDetailsTmp });

        if(continent !== undefined){
            let arr = this.state.continents;
            let currentContinentObj = _.filter(arr, function(v) { return v.text === continent; });
            if(currentContinentObj.length>0){
                let currentContinent_id = currentContinentObj[0]._id;
                PlacesActions.getPlacesData({ _id: currentContinent_id, placeType: 'country' });
                PlacesStore.listen(this._onGetPlaces);
            }
        }
    }

    onChangeCountry = (e) => {
        let country = e;
        try{
            country = e.target.value;
        }catch(e){}

        let userDetailsTmp = this.state.userDetailsTmp;
        userDetailsTmp.country = country;
        this.setState({ userDetailsTmp: userDetailsTmp });

        let arr = this.state.countries;
        let currentCountryObj = _.filter(arr, function(v) { return v.text === country; });
        if(currentCountryObj.length>0){
            let currentCountryObj_id = currentCountryObj[0]._id;
            this.setState( { countriesIntial: false } );
            PlacesActions.getPlacesData({ _id: currentCountryObj_id, placeType: 'state' });
            PlacesStore.listen(this._onGetPlaces);
        }
    }

    onChangeStates = (e) => {
        let state = e;
        try{
            state = e.target.value;
        }catch(e){}

        let userDetailsTmp = this.state.userDetailsTmp;
        userDetailsTmp.state = state;
        this.setState({ userDetailsTmp: userDetailsTmp });

        let arr = this.state.states;
        let currentStateObj = _.filter(arr, function(v) { return v.text === state; });
        if(currentStateObj.length>0){
            let currentStateObj_id = currentStateObj[0]._id;
            this.setState( { statesIntial: false } );
            PlacesActions.getPlacesData({ _id: currentStateObj_id, placeType: 'city' });
            PlacesStore.listen(this._onGetPlaces);
        }
    }

    onChangeCities = (e) => {
        let city = e;
        try{
            city = e.target.value;
        }catch(e){}

        let userDetailsTmp = this.state.userDetailsTmp;
        userDetailsTmp.city = city;
        this.setState({ userDetailsTmp: userDetailsTmp });
    }

    handleDropDownChanage = (states,placeType,placeState) => {
        let places = states.PlacesData.places;
        let currentPlace = this.state.userDetails[placeType];
        let obj = {};
        obj[placeState] = places;
        this.setState(obj);

        if(this.placeMatch(currentPlace,places )){
            let userDetailsTmp = this.state.userDetailsTmp;
            userDetailsTmp[placeType] = currentPlace;
            this.setState({ userDetailsTmp: userDetailsTmp });
        }else{
            let userDetailsTmp = this.state.userDetailsTmp;
            userDetailsTmp[placeType] = '';
            this.setState({ userDetailsTmp: userDetailsTmp });
        }
    }

    placeMatch = (text,obj) => {
        let trn = false;
        obj.map((data, key) => {
            if(data.text === text){
                trn = true;
            }
        });
        return trn;
    }

    _onGetPlaces = (states) => {
        if(this.state.countriesIntial && this.state.states.length <= 0 && this.state.userDetailsTmp.country!==''){

            this.onChangeCountry(this.state.userDetailsTmp.country);
        }

        if(this.state.statesIntial && this.state.cities.length <= 0 && this.state.userDetailsTmp.state!==''){

            this.onChangeStates(this.state.userDetailsTmp.state);
        }

        if(states.PlacesData.placeType === 'country'){

            this.handleDropDownChanage(states,'country','countries');
        }

        if(states.PlacesData.placeType === 'state'){

            this.handleDropDownChanage(states,'state','states');
        }

        if(states.PlacesData.placeType === 'city'){

            this.handleDropDownChanage(states,'city','cities');
        }
    }

    formValidation = (model) => {
        let state = {};
        state.hasError = false;
        state.messages = [];
        this.setState(state);
        return (!state.hasError);
    }

    _onSaveSubmit = () => {
        let model = {};
        let refs = this.refs;
        for (let key in refs) {
            if (refs.hasOwnProperty(key)) {
                if(!refs[key].props.value){
                    refs[key].props.value = '';
                }
                model[key] = refs[key].props.value;
            }
        }
        if(this.formValidation(model)){
            console.log(model);
            UserActions.saveCompanyInfo(model);
        }
    }

    messageAutoClose = (state) => {
        try {
            if(state.messages.length > 0){
                setTimeout(function(){
                    this.setState({ messages: [] });
                }.bind(this),3000);
            }
        } catch (e) {}
    }

    render() {
        let message;
        let userInfo = this.state.userDetailsTmp;
        let mlarray = this.state.multilang;
        let multimessages;

        try {
            if (this.state.messages !== undefined && this.state.messages.length > 0) {
                multimessages = this.state.messages.map((mes, key) => {
                    return [<li>{mes}</li>];
                });
                message = (
                    <div className="ui error message segment">
                        <ul className="list">
                            {multimessages}
                        </ul>
                    </div>
                );
            }
        } catch (e) {}

        return (
            <div>
                <h4 className="ui header ryt">{GetText('MYCO_INFO_HEADING', mlarray)}</h4>
                {message}
                <div className="ui small form">
                    <form className="field">
                        <div className="field">
                            <input
                                ref="companyname"
                                name="companyname"
                                className="form-control"
                                value={userInfo.companyname}
                                placeholder={GetText('MYCO_INFO_PLCHLDR_COMPANYNAME', mlarray)}
                                validationError="Company name is required"
                                onChange={this.onChangeText}
                                required/>
                        </div>

                        <div className="field">
                            <select
                                ref="industry"
                                name="industry"
                                className="ui search dropdown"
                                value={userInfo.industry}
                                onChange={this.onChangeIndustry.bind(this)}
                                >
                                <option value="">{GetText('MYCO_INFO_PLCHLDR_INDUSTRY', mlarray)}</option>
                                {
                                    (this.state.industries !==undefined && this.state.industries.length > 0) ? (
                                        this.state.industries.map((data, key) => {
                                            return (<option value={data.name}>{data.name}</option>);
                                        })) : (<option>Other</option>)
                                    }
                                    <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="field">
                            <select
                                ref="continent"
                                name="continent"
                                className="ui search dropdown"
                                value={userInfo.continent}
                                onChange={this.onChangeContinent.bind(this)}
                                >
                                <option value="">{GetText('MYCO_INFO_PLCHLDR_CONTINENT', mlarray)}</option>
                                {
                                    (this.state.continents !==undefined && this.state.continents.length > 0) ? (
                                        this.state.continents.map((data, key) => {
                                            return (<option value={data.text}>{data.text}</option>);
                                        })) : (<option>Other</option>)
                                    }
                                    <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="field">
                            <select
                                ref="country"
                                name="country"
                                className="ui search dropdown"
                                onChange={this.onChangeCountry}
                                value={userInfo.country}
                                >
                                <option value="">{GetText('MYCO_INFO_PLCHLDR_COUNTRY', mlarray)}</option>
                                {
                                    (this.state.countries.length > 0) ? (
                                        this.state.countries.map((data, key) => {
                                            return (<option>{data.text}</option>);
                                        })) : null
                                    }
                            </select>
                        </div>

                        <div className="field">
                            <select
                                ref="state"
                                name="state"
                                className="ui search dropdown"
                                value={userInfo.state}
                                onChange={this.onChangeStates}
                                >
                                <option value="">{GetText('MYCO_INFO_PLCHLDR_STATE', mlarray)}</option>
                                {
                                    (this.state.states.length > 0) ? (
                                        this.state.states.map((data, key) => {
                                            return (<option>{data.text}</option>);
                                        })) : null
                                    }
                            </select>
                        </div>

                        <div className="field">
                            <select
                                ref="city"
                                name="city"
                                className="ui search dropdown"
                                value={userInfo.city}
                                onChange={this.onChangeCities}
                                >
                                <option value="">{GetText('MYCO_INFO_PLCHLDR_CITY', mlarray)}</option>
                                {
                                    (this.state.cities.length > 0) ? (
                                        this.state.cities.map((data, key) => {
                                            return (<option value={data.text}>{data.text}</option>);
                                        })) : null
                                    }
                            </select>
                        </div>

                        <div className="field">
                            <input
                                ref="address"
                                name="address"
                                className="form-control"
                                value={userInfo.address}
                                placeholder={GetText('MYCO_INFO_PLCHLDR_ADDRESS', mlarray)}
                                validationError="Address is required"
                                onChange={this.onChangeText}
                                required />
                        </div>

                        <div className="field">
                            <input
                                ref="website"
                                name="website"
                                className="form-control"
                                value={userInfo.website}
                                placeholder={GetText('MYCO_INFO_PLCHLDR_WEBSITE', mlarray)}
                                validationError="Website is required"
                                onChange={this.onChangeText}
                                required />
                        </div>

                        <div className="field">
                            <select
                                ref="companysize"
                                name="companysize"
                                className="ui search dropdown"
                                value={userInfo.companysize}
                                onChange={this.onChangeText}
                                >
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Big</option>
                            </select>
                        </div>

                        <button type="button" className="ui submit button submitt" onClick={this._onSaveSubmit}>{GetText('MYCO_INFO_SUBMIT', mlarray)}</button>
                    </form>
                </div>
            </div>
        );
    }
}

MyCompanyInfo.contextTypes = { router: React.PropTypes.func };
