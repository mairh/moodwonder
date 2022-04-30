import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Anonymity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            AMTY_BNNR_TITLE: '',
            AMTY_TITLE: '',
            AMTY_PARA1: '',
            AMTY_PARA2: '',
            AMTY_PARA_LI1: '',
            AMTY_PARA_LI2: '',
            AMTY_PARA_LI3: '',
            AMTY_PARA3: '',
            AMTY_PARA4: '',
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
        PageActions.getPage({page: 'anonymity', language: this.state.language});
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
            AMTY_BNNR_TITLE: pagedata.AMTY_BNNR_TITLE,
            AMTY_TITLE: pagedata.AMTY_TITLE,
            AMTY_PARA1: pagedata.AMTY_PARA1,
            AMTY_PARA2: pagedata.AMTY_PARA2,
            AMTY_PARA_LI1: pagedata.AMTY_PARA_LI1,
            AMTY_PARA_LI2: pagedata.AMTY_PARA_LI2,
            AMTY_PARA_LI3: pagedata.AMTY_PARA_LI3,
            AMTY_PARA3: pagedata.AMTY_PARA3,
            AMTY_PARA4: pagedata.AMTY_PARA4,
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

    onSubmitAnonymity = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeBannerTitle = (e) => {
        e.preventDefault();
        this.setState({ AMTY_BNNR_TITLE: e.target.value });
    }

    onChangeBannerStarted = (e) => {
        e.preventDefault();
        this.setState({ AMTY_TITLE: e.target.value });
    }

    onChangeParaOne = (e) => {
        e.preventDefault();
        this.setState({ AMTY_PARA1: e.target.value });
    }

    onChangeParaTwo = (e) => {
        e.preventDefault();
        this.setState({ AMTY_PARA2: e.target.value });
    }

    onChangeParaLineOne = (e) => {
        e.preventDefault();
        this.setState({ AMTY_PARA_LI1: e.target.value });
    }

    onChangeParaLineTwo = (e) => {
        e.preventDefault();
        this.setState({ AMTY_PARA_LI2: e.target.value });
    }

    onChangeParaLineThree = (e) => {
        e.preventDefault();
        this.setState({ AMTY_PARA_LI3: e.target.value });
    }

    onChangeParaThree = (e) => {
        e.preventDefault();
        this.setState({ AMTY_PARA3: e.target.value });
    }

    onChangeParaFour = (e) => {
        e.preventDefault();
        this.setState({ AMTY_PARA4: e.target.value });
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
        let AMTY_BNNR_TITLE = this.state.AMTY_BNNR_TITLE;
        let AMTY_TITLE = this.state.AMTY_TITLE;
        let AMTY_PARA1 = this.state.AMTY_PARA1;
        let AMTY_PARA2 = this.state.AMTY_PARA2;
        let AMTY_PARA_LI1 = this.state.AMTY_PARA_LI1;
        let AMTY_PARA_LI2 = this.state.AMTY_PARA_LI2;
        let AMTY_PARA_LI3 = this.state.AMTY_PARA_LI3;
        let AMTY_PARA3 = this.state.AMTY_PARA3;
        let AMTY_PARA4 = this.state.AMTY_PARA4;
        let ABT_LINK_ABOUT = this.state.ABT_LINK_ABOUT;
        let ABT_LINK_ANONYMITY = this.state.ABT_LINK_ANONYMITY;
        let ABT_LINK_TERMS = this.state.ABT_LINK_TERMS;
        let ABT_LINK_POLICY = this.state.ABT_LINK_POLICY;
        let ABT_LINK_CONTACT = this.state.ABT_LINK_CONTACT;
        let ABT_NAV_SIGNIN = this.state.ABT_NAV_SIGNIN;
        let ABT_NAV_REGISTER = this.state.ABT_NAV_REGISTER;


        return (
            <div className="ui container">
                <h4>Edit - Anonymity page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="anonymityForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>AMTY_BNNR_TITLE</label>
                                <input className="form-control"
                                    name="AMTY_BNNR_TITLE"
                                    type="text"
                                    value={AMTY_BNNR_TITLE}
                                    onChange={this.onChangeBannerTitle} />
                            </div>
                            <div className="field">
                                <label>AMTY_TITLE</label>
                                <input className="form-control"
                                    type="text"
                                    name="AMTY_TITLE"
                                    value={AMTY_TITLE}
                                    onChange={this.onChangeBannerStarted} />
                            </div>

                            <div className="field">
                                <label>AMTY_PARA1</label>
                                <textarea className="form-control"
                                    name="AMTY_PARA1"
                                    value={AMTY_PARA1}
                                    onChange={this.onChangeParaOne} >{AMTY_PARA1}</textarea>
                            </div>

                            <div className="field">
                                <label>AMTY_PARA2</label>
                                <textarea className="form-control"
                                    name="AMTY_PARA2"
                                    value={AMTY_PARA2}
                                    onChange={this.onChangeParaTwo} >{AMTY_PARA2}</textarea>
                            </div>

                            <div className="field">
                                <label>AMTY_PARA_LI1</label>
                                <textarea className="form-control"
                                    name="AMTY_PARA_LI1"
                                    value={AMTY_PARA_LI1}
                                    onChange={this.onChangeParaLineOne} >{AMTY_PARA_LI1}</textarea>
                            </div>

                            <div className="field">
                                <label>AMTY_PARA_LI2</label>
                                <textarea className="form-control"
                                    name="AMTY_PARA_LI2"
                                    value={AMTY_PARA_LI2}
                                    onChange={this.onChangeParaLineTwo} >{AMTY_PARA_LI2}</textarea>
                            </div>

                            <div className="field">
                                <label>AMTY_PARA_LI3</label>
                                <textarea className="form-control"
                                    name="AMTY_PARA_LI3"
                                    value={AMTY_PARA_LI3}
                                    onChange={this.onChangeParaLineThree} >{AMTY_PARA_LI3}</textarea>
                            </div>

                            <div className="field">
                                <label>AMTY_PARA3</label>
                                <textarea className="form-control"
                                    name="AMTY_PARA3"
                                    value={AMTY_PARA3}
                                    onChange={this.onChangeParaThree} >{AMTY_PARA3}</textarea>
                            </div>

                            <div className="field">
                                <label>AMTY_PARA4</label>
                                <textarea className="form-control"
                                    name="AMTY_PARA4"
                                    value={AMTY_PARA4}
                                    onChange={this.onChangeParaFour} >{AMTY_PARA4}</textarea>
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
                                <button className="ui blue button" onClick={this.onSubmitAnonymity}>Submit</button>
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
