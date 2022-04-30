import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            ABT_BNNR_TITLE : '',
            ABT_BNNR_STARTED: '',
            ABT_ABOUTUS: '',
            ABT_ABTUS_PARA1: '',
            ABT_ABTUS_PARA2: '',
            ABT_ABTUS_PARA3: '',
            ABT_ABTUS_PARA4: '',
            ABT_ABTUS_PARA5: '',
            ABT_PEOPLE_BEHIND: '',
            ABT_PPL_BHD_DES: '',
            ABT_LINK_ABOUT: '',
            ABT_LINK_ANONYMITY: '',
            ABT_LINK_TERMS: '',
            ABT_LINK_POLICY: '',
            ABT_LINK_CONTACT: '',
            ABT_NAV_SIGNIN: '',
            ABT_NAV_REGISTER: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'about', language: this.state.language});
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
            ABT_BNNR_TITLE: pagedata.ABT_BNNR_TITLE,
            ABT_BNNR_STARTED: pagedata.ABT_BNNR_STARTED,
            ABT_ABOUTUS: pagedata.ABT_ABOUTUS,
            ABT_ABTUS_PARA1: pagedata.ABT_ABTUS_PARA1,
            ABT_ABTUS_PARA2: pagedata.ABT_ABTUS_PARA2,
            ABT_ABTUS_PARA3: pagedata.ABT_ABTUS_PARA3,
            ABT_ABTUS_PARA4: pagedata.ABT_ABTUS_PARA4,
            ABT_ABTUS_PARA5: pagedata.ABT_ABTUS_PARA5,
            ABT_PEOPLE_BEHIND: pagedata.ABT_PEOPLE_BEHIND,
            ABT_PPL_BHD_DES: pagedata.ABT_PPL_BHD_DES,
            ABT_LINK_ABOUT: pagedata.ABT_LINK_ABOUT,
            ABT_LINK_ANONYMITY: pagedata.ABT_LINK_ANONYMITY,
            ABT_LINK_TERMS: pagedata.ABT_LINK_TERMS,
            ABT_LINK_POLICY: pagedata.ABT_LINK_POLICY,
            ABT_LINK_CONTACT: pagedata.ABT_LINK_CONTACT,
            ABT_NAV_SIGNIN: pagedata.ABT_NAV_SIGNIN,
            ABT_NAV_REGISTER: pagedata.ABT_NAV_REGISTER
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitAbout = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeBannerTitle = (e) => {
        e.preventDefault();
        this.setState({ ABT_BNNR_TITLE: e.target.value });
    }

    onChangeBannerStarted = (e) => {
        e.preventDefault();
        this.setState({ ABT_BNNR_STARTED: e.target.value });
    }

    onChangeAboutus = (e) => {
        e.preventDefault();
        this.setState({ ABT_ABOUTUS: e.target.value });
    }

    onChangeParaOne = (e) => {
        e.preventDefault();
        this.setState({ ABT_ABTUS_PARA1: e.target.value });
    }

    onChangeParaTwo = (e) => {
        e.preventDefault();
        this.setState({ ABT_ABTUS_PARA2: e.target.value });
    }

    onChangeParaThree = (e) => {
        e.preventDefault();
        this.setState({ ABT_ABTUS_PARA3: e.target.value });
    }

    onChangeParaFour = (e) => {
        e.preventDefault();
        this.setState({ ABT_ABTUS_PARA4: e.target.value });
    }

    onChangeParaFive = (e) => {
        e.preventDefault();
        this.setState({ ABT_ABTUS_PARA5: e.target.value });
    }

    onChangePeopleBehind = (e) => {
        e.preventDefault();
        this.setState({ ABT_PEOPLE_BEHIND: e.target.value });
    }

    onChangePeopleBehindDes = (e) => {
        e.preventDefault();
        this.setState({ ABT_PPL_BHD_DES: e.target.value });
    }

    onChangeAboutLink = (e) => {
        e.preventDefault();
        this.setState({ ABT_LINK_ABOUT: e.target.value });
    }

    onChangeAnonymityLink = (e) => {
        e.preventDefault();
        this.setState({ ABT_LINK_ANONYMITY: e.target.value });
    }

    onChangeTermsLink = (e) => {
        e.preventDefault();
        this.setState({ ABT_LINK_TERMS: e.target.value });
    }

    onChangePolicyLink = (e) => {
        e.preventDefault();
        this.setState({ ABT_LINK_POLICY: e.target.value });
    }

    onChangeContactLink = (e) => {
        e.preventDefault();
        this.setState({ ABT_LINK_CONTACT: e.target.value });
    }

    onChangeNavSignin = (e) => {
        e.preventDefault();
        this.setState({ ABT_NAV_SIGNIN: e.target.value });
    }

    onChangeNavRegister = (e) => {
        e.preventDefault();
        this.setState({ ABT_NAV_REGISTER: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let ABT_BNNR_TITLE = this.state.ABT_BNNR_TITLE;
        let ABT_BNNR_STARTED = this.state.ABT_BNNR_STARTED;
        let ABT_ABOUTUS = this.state.ABT_ABOUTUS;
        let ABT_ABTUS_PARA1 = this.state.ABT_ABTUS_PARA1;
        let ABT_ABTUS_PARA2 = this.state.ABT_ABTUS_PARA2;
        let ABT_ABTUS_PARA3 = this.state.ABT_ABTUS_PARA3;
        let ABT_ABTUS_PARA4 = this.state.ABT_ABTUS_PARA4;
        let ABT_ABTUS_PARA5 = this.state.ABT_ABTUS_PARA5;
        let ABT_PEOPLE_BEHIND = this.state.ABT_PEOPLE_BEHIND;
        let ABT_PPL_BHD_DES = this.state.ABT_PPL_BHD_DES;
        let ABT_LINK_ABOUT = this.state.ABT_LINK_ABOUT;
        let ABT_LINK_ANONYMITY = this.state.ABT_LINK_ANONYMITY;
        let ABT_LINK_TERMS = this.state.ABT_LINK_TERMS;
        let ABT_LINK_POLICY = this.state.ABT_LINK_POLICY;
        let ABT_LINK_CONTACT = this.state.ABT_LINK_CONTACT;
        let ABT_NAV_SIGNIN = this.state.ABT_NAV_SIGNIN;
        let ABT_NAV_REGISTER = this.state.ABT_NAV_REGISTER;


        return (
            <div className="ui container">
                <h4>Edit - About page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="aboutForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>ABT_BNNR_TITLE</label>
                                <input className="form-control"
                                    name="ABT_BNNR_TITLE"
                                    type="text"
                                    value={ABT_BNNR_TITLE}
                                    onChange={this.onChangeBannerTitle} />
                            </div>
                            <div className="field">
                                <label>ABT_BNNR_STARTED</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_BNNR_STARTED"
                                    value={ABT_BNNR_STARTED}
                                    onChange={this.onChangeBannerStarted} />
                            </div>

                            <div className="field">
                                <label>ABT_ABOUTUS</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_ABOUTUS"
                                    value={ABT_ABOUTUS}
                                    onChange={this.onChangeAboutus} />
                            </div>

                            <div className="field">
                                <label>ABT_ABTUS_PARA1</label>
                                <textarea className="form-control"
                                    name="ABT_ABTUS_PARA1"
                                    value={ABT_ABTUS_PARA1}
                                    onChange={this.onChangeParaOne} >{ABT_ABTUS_PARA1}</textarea>
                            </div>

                            <div className="field">
                                <label>ABT_ABTUS_PARA2</label>
                                <textarea className="form-control"
                                    name="ABT_ABTUS_PARA2"
                                    value={ABT_ABTUS_PARA2}
                                    onChange={this.onChangeParaTwo} >{ABT_ABTUS_PARA2}</textarea>
                            </div>

                            <div className="field">
                                <label>ABT_ABTUS_PARA3</label>
                                <textarea className="form-control"
                                    name="ABT_ABTUS_PARA3"
                                    value={ABT_ABTUS_PARA3}
                                    onChange={this.onChangeParaThree} >{ABT_ABTUS_PARA3}</textarea>
                            </div>

                            <div className="field">
                                <label>ABT_ABTUS_PARA4</label>
                                <textarea className="form-control"
                                    name="ABT_ABTUS_PARA4"
                                    value={ABT_ABTUS_PARA4}
                                    onChange={this.onChangeParaFour} >{ABT_ABTUS_PARA4}</textarea>
                            </div>

                            <div className="field">
                                <label>ABT_ABTUS_PARA5</label>
                                <textarea className="form-control"
                                    name="ABT_ABTUS_PARA5"
                                    value={ABT_ABTUS_PARA5}
                                    onChange={this.onChangeParaFive} >{ABT_ABTUS_PARA5}</textarea>
                            </div>

                            <div className="field">
                                <label>ABT_PEOPLE_BEHIND</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_PEOPLE_BEHIND"
                                    value={ABT_PEOPLE_BEHIND}
                                    onChange={this.onChangePeopleBehind} />
                            </div>

                            <div className="field">
                                <label>ABT_PPL_BHD_DES</label>
                                <textarea className="form-control"
                                    name="ABT_PPL_BHD_DES"
                                    value={ABT_PPL_BHD_DES}
                                    onChange={this.onChangePeopleBehindDes} >{ABT_PPL_BHD_DES}</textarea>
                            </div>

                            <div className="field">
                                <label>ABT_LINK_ABOUT</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_LINK_ABOUT"
                                    value={ABT_LINK_ABOUT}
                                    onChange={this.onChangeAboutLink} />
                            </div>

                            <div className="field">
                                <label>ABT_LINK_ANONYMITY</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_LINK_ANONYMITY"
                                    value={ABT_LINK_ANONYMITY}
                                    onChange={this.onChangeAnonymityLink} />
                            </div>

                            <div className="field">
                                <label>ABT_LINK_TERMS</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_LINK_TERMS"
                                    value={ABT_LINK_TERMS}
                                    onChange={this.onChangeTermsLink} />
                            </div>

                            <div className="field">
                                <label>ABT_LINK_POLICY</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_LINK_POLICY"
                                    value={ABT_LINK_POLICY}
                                    onChange={this.onChangePolicyLink} />
                            </div>

                            <div className="field">
                                <label>ABT_LINK_CONTACT</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_LINK_CONTACT"
                                    value={ABT_LINK_CONTACT}
                                    onChange={this.onChangeContactLink} />
                            </div>

                            <div className="field">
                                <label>ABT_NAV_SIGNIN</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_NAV_SIGNIN"
                                    value={ABT_NAV_SIGNIN}
                                    onChange={this.onChangeNavSignin} />
                            </div>

                            <div className="field">
                                <label>ABT_NAV_REGISTER</label>
                                <input className="form-control"
                                    type="text"
                                    name="ABT_NAV_REGISTER"
                                    value={ABT_NAV_REGISTER}
                                    onChange={this.onChangeNavRegister} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitAbout}>Submit</button>
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
