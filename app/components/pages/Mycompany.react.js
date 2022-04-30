import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Mycompany extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            MYCO_EGRAPH: '',
            MYCO_CRATING: '',
            MYCO_COMPANYINFO: '',
            MYCO_TITLE: '',
            MYCO_OPTMWINDEX: '',
            MYCO_OPTMOOD: '',
            MYCO_OPTMEANING: '',
            MYCO_OPTEXPECTATIONS: '',
            MYCO_OPTSTRENGTHS: '',
            MYCO_OPTRECOGNITION: '',
            MYCO_OPTDEVELOPMENT: '',
            MYCO_OPTINFLUENCE: '',
            MYCO_OPTGOALS: '',
            MYCO_OPTTEAM: '',
            MYCO_OPTFRIENDSHIP: '',
            MYCO_OPTFEEDBACK: '',
            MYCO_OPTOPPORTUNITIES: '',
            MYCO_OPTRECOMMENDATION: '',
            MYCO_MYSELF: '',
            MYCO_HEADING_TOPTHREE: '',
            MYCO_HEADING_WORSTTHREE: '',
            MYCO_HEADING_MOSTIMPROVED: '',
            MYCO_HEADING_LEASTIMPROVED: '',
            MYCO_INFO_HEADING: '',
            MYCO_INFO_SUBMIT: '',
            MYCO_INFO_PLCHLDR_COMPANYNAME : '',
            MYCO_INFO_PLCHLDR_INDUSTRY : '',
            MYCO_INFO_PLCHLDR_CONTINENT : '',
            MYCO_INFO_PLCHLDR_COUNTRY : '',
            MYCO_INFO_PLCHLDR_STATE : '',
            MYCO_INFO_PLCHLDR_CITY : '',
            MYCO_INFO_PLCHLDR_ADDRESS : '',
            MYCO_INFO_PLCHLDR_WEBSITE : ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'mycompany', language: this.state.language});
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
            MYCO_EGRAPH: pagedata.MYCO_EGRAPH,
            MYCO_CRATING: pagedata.MYCO_CRATING,
            MYCO_COMPANYINFO: pagedata.MYCO_COMPANYINFO,
            MYCO_TITLE: pagedata.MYCO_TITLE,
            MYCO_OPTMWINDEX: pagedata.MYCO_OPTMWINDEX,
            MYCO_OPTMOOD: pagedata.MYCO_OPTMOOD,
            MYCO_OPTMEANING: pagedata.MYCO_OPTMEANING,
            MYCO_OPTEXPECTATIONS: pagedata.MYCO_OPTEXPECTATIONS,
            MYCO_OPTSTRENGTHS: pagedata.MYCO_OPTSTRENGTHS,
            MYCO_OPTRECOGNITION: pagedata.MYCO_OPTRECOGNITION,
            MYCO_OPTDEVELOPMENT: pagedata.MYCO_OPTDEVELOPMENT,
            MYCO_OPTINFLUENCE: pagedata.MYCO_OPTINFLUENCE,
            MYCO_OPTGOALS: pagedata.MYCO_OPTGOALS,
            MYCO_OPTTEAM: pagedata.MYCO_OPTTEAM,
            MYCO_OPTFRIENDSHIP: pagedata.MYCO_OPTFRIENDSHIP,
            MYCO_OPTFEEDBACK: pagedata.MYCO_OPTFEEDBACK,
            MYCO_OPTOPPORTUNITIES: pagedata.MYCO_OPTOPPORTUNITIES,
            MYCO_OPTRECOMMENDATION: pagedata.MYCO_OPTRECOMMENDATION,
            MYCO_MYSELF: pagedata.MYCO_MYSELF,
            MYCO_HEADING_TOPTHREE: pagedata.MYCO_HEADING_TOPTHREE,
            MYCO_HEADING_WORSTTHREE: pagedata.MYCO_HEADING_WORSTTHREE,
            MYCO_HEADING_MOSTIMPROVED: pagedata.MYCO_HEADING_MOSTIMPROVED,
            MYCO_HEADING_LEASTIMPROVED: pagedata.MYCO_HEADING_LEASTIMPROVED,
            MYCO_INFO_HEADING: pagedata.MYCO_INFO_HEADING,
            MYCO_INFO_SUBMIT: pagedata.MYCO_INFO_SUBMIT,
            MYCO_INFO_PLCHLDR_COMPANYNAME: pagedata.MYCO_INFO_PLCHLDR_COMPANYNAME,
            MYCO_INFO_PLCHLDR_INDUSTRY: pagedata.MYCO_INFO_PLCHLDR_INDUSTRY,
            MYCO_INFO_PLCHLDR_CONTINENT: pagedata.MYCO_INFO_PLCHLDR_CONTINENT,
            MYCO_INFO_PLCHLDR_COUNTRY: pagedata.MYCO_INFO_PLCHLDR_COUNTRY,
            MYCO_INFO_PLCHLDR_STATE: pagedata.MYCO_INFO_PLCHLDR_STATE,
            MYCO_INFO_PLCHLDR_CITY: pagedata.MYCO_INFO_PLCHLDR_CITY,
            MYCO_INFO_PLCHLDR_ADDRESS: pagedata.MYCO_INFO_PLCHLDR_ADDRESS,
            MYCO_INFO_PLCHLDR_WEBSITE: pagedata.MYCO_INFO_PLCHLDR_WEBSITE
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitMycompany = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeEgraph = (e) => {
        e.preventDefault();
        this.setState({ MYCO_EGRAPH: e.target.value });
    }
    onChangeCrating = (e) => {
        e.preventDefault();
        this.setState({ MYCO_CRATING: e.target.value });
    }
    onChangeCompanyInfo = (e) => {
        e.preventDefault();
        this.setState({ MYCO_COMPANYINFO: e.target.value });
    }
    onChangeTitle = (e) => {
        e.preventDefault();
        this.setState({ MYCO_TITLE: e.target.value });
    }
    onChangeMwindex = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTMWINDEX: e.target.value });
    }
    onChangeMood = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTMOOD: e.target.value });
    }
    onChangeMeaning = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTMEANING: e.target.value });
    }
    onChangeExpectations = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTEXPECTATIONS: e.target.value });
    }
    onChangeStrengths = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTSTRENGTHS: e.target.value });
    }
    onChangeRecognition = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTRECOGNITION: e.target.value });
    }
    onChangeDevelopment = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTDEVELOPMENT: e.target.value });
    }
    onChangeInfluence = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTINFLUENCE: e.target.value });
    }
    onChangeGoals = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTGOALS: e.target.value });
    }
    onChangeTeam = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTTEAM: e.target.value });
    }
    onChangeFrienship = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTFRIENDSHIP: e.target.value });
    }
    onChangeFeedback = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTFEEDBACK: e.target.value });
    }
    onChangeOpportunities = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTOPPORTUNITIES: e.target.value });
    }
    onChangeRecommendation = (e) => {
        e.preventDefault();
        this.setState({ MYCO_OPTRECOMMENDATION: e.target.value });
    }
    onChangeMyself = (e) => {
        e.preventDefault();
        this.setState({ MYCO_MYSELF: e.target.value });
    }
    onChangeHeadingTopThree = (e) => {
        e.preventDefault();
        this.setState({ MYCO_HEADING_TOPTHREE: e.target.value });
    }
    onChangeHeadingWorstThree = (e) => {
        e.preventDefault();
        this.setState({ MYCO_HEADING_WORSTTHREE: e.target.value });
    }
    onChangeHeadingMostImp = (e) => {
        e.preventDefault();
        this.setState({ MYCO_HEADING_MOSTIMPROVED: e.target.value });
    }
    onChangeHeadingLeastImp = (e) => {
        e.preventDefault();
        this.setState({ MYCO_HEADING_LEASTIMPROVED: e.target.value });
    }
    onChangeInfoHeading = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_HEADING: e.target.value });
    }
    onChangeInfoSubmit = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_SUBMIT: e.target.value });
    }
    mycoInfoPlchldrCompanyname = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_PLCHLDR_COMPANYNAME: e.target.value });
    }
    mycoInfoPlchldrIndustry = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_PLCHLDR_INDUSTRY: e.target.value });
    }
    mycoInfoPlchldrContinent = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_PLCHLDR_CONTINENT: e.target.value });
    }
    mycoInfoPlchldrCountry = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_PLCHLDR_COUNTRY: e.target.value });
    }
    mycoInfoPlchldrState = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_PLCHLDR_STATE: e.target.value });
    }
    mycoInfoPlchldrCity = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_PLCHLDR_CITY: e.target.value });
    }
    mycoInfoPlchldrAddress = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_PLCHLDR_ADDRESS: e.target.value });
    }
    mycoInfoPlchldrWebsite = (e) => {
        e.preventDefault();
        this.setState({ MYCO_INFO_PLCHLDR_WEBSITE: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let MYCO_EGRAPH = this.state.MYCO_EGRAPH;
        let MYCO_CRATING = this.state.MYCO_CRATING;
        let MYCO_COMPANYINFO = this.state.MYCO_COMPANYINFO;
        let MYCO_TITLE = this.state.MYCO_TITLE;
        let MYCO_OPTMWINDEX = this.state.MYCO_OPTMWINDEX;
        let MYCO_OPTMOOD = this.state.MYCO_OPTMOOD;
        let MYCO_OPTMEANING = this.state.MYCO_OPTMEANING;
        let MYCO_OPTEXPECTATIONS = this.state.MYCO_OPTEXPECTATIONS;
        let MYCO_OPTSTRENGTHS = this.state.MYCO_OPTSTRENGTHS;
        let MYCO_OPTRECOGNITION = this.state.MYCO_OPTRECOGNITION;
        let MYCO_OPTDEVELOPMENT = this.state.MYCO_OPTDEVELOPMENT;
        let MYCO_OPTINFLUENCE = this.state.MYCO_OPTINFLUENCE;
        let MYCO_OPTGOALS = this.state.MYCO_OPTGOALS;
        let MYCO_OPTTEAM = this.state.MYCO_OPTTEAM;
        let MYCO_OPTFRIENDSHIP = this.state.MYCO_OPTFRIENDSHIP;
        let MYCO_OPTFEEDBACK = this.state.MYCO_OPTFEEDBACK;
        let MYCO_OPTOPPORTUNITIES = this.state.MYCO_OPTOPPORTUNITIES;
        let MYCO_OPTRECOMMENDATION = this.state.MYCO_OPTRECOMMENDATION;
        let MYCO_MYSELF = this.state.MYCO_MYSELF;
        let MYCO_HEADING_TOPTHREE = this.state.MYCO_HEADING_TOPTHREE;
        let MYCO_HEADING_WORSTTHREE = this.state.MYCO_HEADING_WORSTTHREE;
        let MYCO_HEADING_MOSTIMPROVED = this.state.MYCO_HEADING_MOSTIMPROVED;
        let MYCO_HEADING_LEASTIMPROVED = this.state.MYCO_HEADING_LEASTIMPROVED;
        let MYCO_INFO_HEADING = this.state.MYCO_INFO_HEADING;
        let MYCO_INFO_SUBMIT = this.state.MYCO_INFO_SUBMIT;
        let MYCO_INFO_PLCHLDR_COMPANYNAME = this.state.MYCO_INFO_PLCHLDR_COMPANYNAME;
        let MYCO_INFO_PLCHLDR_INDUSTRY = this.state.MYCO_INFO_PLCHLDR_INDUSTRY;
        let MYCO_INFO_PLCHLDR_CONTINENT = this.state.MYCO_INFO_PLCHLDR_CONTINENT;
        let MYCO_INFO_PLCHLDR_COUNTRY = this.state.MYCO_INFO_PLCHLDR_COUNTRY;
        let MYCO_INFO_PLCHLDR_STATE = this.state.MYCO_INFO_PLCHLDR_STATE;
        let MYCO_INFO_PLCHLDR_CITY = this.state.MYCO_INFO_PLCHLDR_CITY;
        let MYCO_INFO_PLCHLDR_ADDRESS = this.state.MYCO_INFO_PLCHLDR_ADDRESS;
        let MYCO_INFO_PLCHLDR_WEBSITE = this.state.MYCO_INFO_PLCHLDR_WEBSITE;



        return (
            <div className="ui container">
                <h4>Edit - My company page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="mycompanyForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>MYCO_EGRAPH</label>
                                <input className="form-control"
                                    name="MYCO_EGRAPH"
                                    type="text"
                                    value={MYCO_EGRAPH}
                                    onChange={this.onChangeEgraph} />
                            </div>
                            <div className="field">
                                <label>MYCO_CRATING</label>
                                <input className="form-control"
                                    name="MYCO_CRATING"
                                    type="text"
                                    value={MYCO_CRATING}
                                    onChange={this.onChangeCrating} />
                            </div>
                            <div className="field">
                                <label>MYCO_COMPANYINFO</label>
                                <input className="form-control"
                                    name="MYCO_COMPANYINFO"
                                    type="text"
                                    value={MYCO_COMPANYINFO}
                                    onChange={this.onChangeCompanyInfo} />
                            </div>
                            <div className="field">
                                <label>MYCO_TITLE</label>
                                <input className="form-control"
                                    name="MYCO_TITLE"
                                    type="text"
                                    value={MYCO_TITLE}
                                    onChange={this.onChangeTitle} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTMWINDEX</label>
                                <input className="form-control"
                                    name="MYCO_OPTMWINDEX"
                                    type="text"
                                    value={MYCO_OPTMWINDEX}
                                    onChange={this.onChangeMwindex} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTMOOD</label>
                                <input className="form-control"
                                    name="MYCO_OPTMOOD"
                                    type="text"
                                    value={MYCO_OPTMOOD}
                                    onChange={this.onChangeMood} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTMEANING</label>
                                <input className="form-control"
                                    name="MYCO_OPTMEANING"
                                    type="text"
                                    value={MYCO_OPTMEANING}
                                    onChange={this.onChangeMeaning} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTEXPECTATIONS</label>
                                <input className="form-control"
                                    name="MYCO_OPTEXPECTATIONS"
                                    type="text"
                                    value={MYCO_OPTEXPECTATIONS}
                                    onChange={this.onChangeExpectations} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTSTRENGTHS</label>
                                <input className="form-control"
                                    name="MYCO_OPTSTRENGTHS"
                                    type="text"
                                    value={MYCO_OPTSTRENGTHS}
                                    onChange={this.onChangeStrengths} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTRECOGNITION</label>
                                <input className="form-control"
                                    name="MYCO_OPTRECOGNITION"
                                    type="text"
                                    value={MYCO_OPTRECOGNITION}
                                    onChange={this.onChangeRecognition} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTDEVELOPMENT</label>
                                <input className="form-control"
                                    name="MYCO_OPTDEVELOPMENT"
                                    type="text"
                                    value={MYCO_OPTDEVELOPMENT}
                                    onChange={this.onChangeDevelopment} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTINFLUENCE</label>
                                <input className="form-control"
                                    name="MYCO_OPTINFLUENCE"
                                    type="text"
                                    value={MYCO_OPTINFLUENCE}
                                    onChange={this.onChangeInfluence} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTGOALS</label>
                                <input className="form-control"
                                    name="MYCO_OPTGOALS"
                                    type="text"
                                    value={MYCO_OPTGOALS}
                                    onChange={this.onChangeGoals} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTTEAM</label>
                                <input className="form-control"
                                    name="MYCO_OPTTEAM"
                                    type="text"
                                    value={MYCO_OPTTEAM}
                                    onChange={this.onChangeTeam} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTFRIENDSHIP</label>
                                <input className="form-control"
                                    name="MYCO_OPTFRIENDSHIP"
                                    type="text"
                                    value={MYCO_OPTFRIENDSHIP}
                                    onChange={this.onChangeFrienship} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTFEEDBACK</label>
                                <input className="form-control"
                                    name="MYCO_OPTFEEDBACK"
                                    type="text"
                                    value={MYCO_OPTFEEDBACK}
                                    onChange={this.onChangeFeedback} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTOPPORTUNITIES</label>
                                <input className="form-control"
                                    name="MYCO_OPTOPPORTUNITIES"
                                    type="text"
                                    value={MYCO_OPTOPPORTUNITIES}
                                    onChange={this.onChangeOpportunities} />
                            </div>
                            <div className="field">
                                <label>MYCO_OPTRECOMMENDATION</label>
                                <input className="form-control"
                                    name="MYCO_OPTRECOMMENDATION"
                                    type="text"
                                    value={MYCO_OPTRECOMMENDATION}
                                    onChange={this.onChangeRecommendation} />
                            </div>
                            <div className="field">
                                <label>MYCO_MYSELF</label>
                                <input className="form-control"
                                    name="MYCO_MYSELF"
                                    type="text"
                                    value={MYCO_MYSELF}
                                    onChange={this.onChangeMyself} />
                            </div>
                            <div className="field">
                                <label>MYCO_HEADING_TOPTHREE</label>
                                <input className="form-control"
                                    name="MYCO_HEADING_TOPTHREE"
                                    type="text"
                                    value={MYCO_HEADING_TOPTHREE}
                                    onChange={this.onChangeHeadingTopThree} />
                            </div>
                            <div className="field">
                                <label>MYCO_HEADING_WORSTTHREE</label>
                                <input className="form-control"
                                    name="MYCO_HEADING_WORSTTHREE"
                                    type="text"
                                    value={MYCO_HEADING_WORSTTHREE}
                                    onChange={this.onChangeHeadingWorstThree} />
                            </div>
                            <div className="field">
                                <label>MYCO_HEADING_MOSTIMPROVED</label>
                                <input className="form-control"
                                    name="MYCO_HEADING_MOSTIMPROVED"
                                    type="text"
                                    value={MYCO_HEADING_MOSTIMPROVED}
                                    onChange={this.onChangeHeadingMostImp} />
                            </div>
                            <div className="field">
                                <label>MYCO_HEADING_LEASTIMPROVED</label>
                                <input className="form-control"
                                    name="MYCO_HEADING_LEASTIMPROVED"
                                    type="text"
                                    value={MYCO_HEADING_LEASTIMPROVED}
                                    onChange={this.onChangeHeadingLeastImp} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_HEADING</label>
                                <input className="form-control"
                                    name="MYCO_INFO_HEADING"
                                    type="text"
                                    value={MYCO_INFO_HEADING}
                                    onChange={this.onChangeInfoHeading} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_SUBMIT</label>
                                <input className="form-control"
                                    name="MYCO_INFO_SUBMIT"
                                    type="text"
                                    value={MYCO_INFO_SUBMIT}
                                    onChange={this.onChangeInfoSubmit} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_PLCHLDR_COMPANYNAME</label>
                                <input className="form-control"
                                    name="MYCO_INFO_PLCHLDR_COMPANYNAME"
                                    type="text"
                                    value={MYCO_INFO_PLCHLDR_COMPANYNAME}
                                    onChange={this.mycoInfoPlchldrCompanyname} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_PLCHLDR_INDUSTRY</label>
                                <input className="form-control"
                                    name="MYCO_INFO_PLCHLDR_INDUSTRY"
                                    type="text"
                                    value={MYCO_INFO_PLCHLDR_INDUSTRY}
                                    onChange={this.mycoInfoPlchldrIndustry} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_PLCHLDR_CONTINENT</label>
                                <input className="form-control"
                                    name="MYCO_INFO_PLCHLDR_CONTINENT"
                                    type="text"
                                    value={MYCO_INFO_PLCHLDR_CONTINENT}
                                    onChange={this.mycoInfoPlchldrContinent} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_PLCHLDR_COUNTRY</label>
                                <input className="form-control"
                                    name="MYCO_INFO_PLCHLDR_COUNTRY"
                                    type="text"
                                    value={MYCO_INFO_PLCHLDR_COUNTRY}
                                    onChange={this.mycoInfoPlchldrCountry} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_PLCHLDR_STATE</label>
                                <input className="form-control"
                                    name="MYCO_INFO_PLCHLDR_STATE"
                                    type="text"
                                    value={MYCO_INFO_PLCHLDR_STATE}
                                    onChange={this.mycoInfoPlchldrState} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_PLCHLDR_CITY</label>
                                <input className="form-control"
                                    name="MYCO_INFO_PLCHLDR_CITY"
                                    type="text"
                                    value={MYCO_INFO_PLCHLDR_CITY}
                                    onChange={this.mycoInfoPlchldrCity} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_PLCHLDR_ADDRESS</label>
                                <input className="form-control"
                                    name="MYCO_INFO_PLCHLDR_ADDRESS"
                                    type="text"
                                    value={MYCO_INFO_PLCHLDR_ADDRESS}
                                    onChange={this.mycoInfoPlchldrAddress} />
                            </div>
                            <div className="field">
                                <label>MYCO_INFO_PLCHLDR_WEBSITE</label>
                                <input className="form-control"
                                    name="MYCO_INFO_PLCHLDR_WEBSITE"
                                    type="text"
                                    value={MYCO_INFO_PLCHLDR_WEBSITE}
                                    onChange={this.mycoInfoPlchldrWebsite} />
                            </div>


                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitMycompany}>Submit</button>
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
