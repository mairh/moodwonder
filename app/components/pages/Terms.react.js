import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Terms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            TRMS_TITLE: '',
            TRMS_DES: '',
            TRMS_SEC1_T1: '',
            TRMS_SEC1_P1: '',
            TRMS_SEC1_P2: '',
            TRMS_SEC2_T1: '',
            TRMS_SEC2_P1: '',
            TRMS_SEC3_T1: '',
            TRMS_SEC3_P1: '',
            TRMS_SEC4_T1: '',
            TRMS_SEC4_P1: '',
            TRMS_SEC5_T1: '',
            TRMS_SEC5_P1: '',
            TRMS_SEC6_T1: '',
            TRMS_SEC6_P1: '',
            TRMS_SEC7_T1: '',
            TRMS_SEC7_P1: '',
            TRMS_SEC8_T1: '',
            TRMS_SEC8_P1: '',
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
        PageActions.getPage({page: 'terms', language: this.state.language});
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
            TRMS_TITLE: pagedata.TRMS_TITLE,
            TRMS_DES: pagedata.TRMS_DES,
            TRMS_SEC1_T1: pagedata.TRMS_SEC1_T1,
            TRMS_SEC1_P1: pagedata.TRMS_SEC1_P1,
            TRMS_SEC1_P2: pagedata.TRMS_SEC1_P2,
            TRMS_SEC2_T1: pagedata.TRMS_SEC2_T1,
            TRMS_SEC2_P1: pagedata.TRMS_SEC2_P1,
            TRMS_SEC3_T1: pagedata.TRMS_SEC3_T1,
            TRMS_SEC3_P1: pagedata.TRMS_SEC3_P1,
            TRMS_SEC4_T1: pagedata.TRMS_SEC4_T1,
            TRMS_SEC4_P1: pagedata.TRMS_SEC4_P1,
            TRMS_SEC5_T1: pagedata.TRMS_SEC5_T1,
            TRMS_SEC5_P1: pagedata.TRMS_SEC5_P1,
            TRMS_SEC6_T1: pagedata.TRMS_SEC6_T1,
            TRMS_SEC6_P1: pagedata.TRMS_SEC6_P1,
            TRMS_SEC7_T1: pagedata.TRMS_SEC7_T1,
            TRMS_SEC7_P1: pagedata.TRMS_SEC7_P1,
            TRMS_SEC8_T1: pagedata.TRMS_SEC8_T1,
            TRMS_SEC8_P1: pagedata.TRMS_SEC8_P1,
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

    onSubmitTerms = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeBannerTitle = (e) => {
        e.preventDefault();
        this.setState({ TRMS_TITLE: e.target.value });
    }

    onChangeDes = (e) => {
        e.preventDefault();
        this.setState({ TRMS_DES: e.target.value });
    }

    onChangeTitleOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC1_T1: e.target.value });
    }

    onChangeParaOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC1_P1: e.target.value });
    }

    onChangeSecOneParaTwo = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC1_P2: e.target.value });
    }

    onChangeSecTwoTitle = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC2_T1: e.target.value });
    }

    onChangeSecTwoParaOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC2_P1: e.target.value });
    }

    onChangeSecThreeTitle = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC3_T1: e.target.value });
    }

    onChangeSecThreeParaOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC3_P1: e.target.value });
    }

    onChangeSecFourTitle = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC4_T1: e.target.value });
    }

    onChangeSecFourParaOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC4_P1: e.target.value });
    }

    onChangeSecFiveTitle = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC5_T1: e.target.value });
    }

    onChangeSecFiveParaOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC5_P1: e.target.value });
    }

    onChangeSecSixTitle = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC6_T1: e.target.value });
    }

    onChangeSecSixParaOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC6_P1: e.target.value });
    }

    onChangeSecSevenTitle = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC7_T1: e.target.value });
    }

    onChangeSecSevenParaOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC7_P1: e.target.value });
    }

    onChangeSecEightTitle = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC8_T1: e.target.value });
    }

    onChangeSecEightParaOne = (e) => {
        e.preventDefault();
        this.setState({ TRMS_SEC8_P1: e.target.value });
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
        let TRMS_TITLE = this.state.TRMS_TITLE;
        let TRMS_DES = this.state.TRMS_DES;
        let TRMS_SEC1_T1 = this.state.TRMS_SEC1_T1;
        let TRMS_SEC1_P1 = this.state.TRMS_SEC1_P1;
        let TRMS_SEC1_P2 = this.state.TRMS_SEC1_P2;
        let TRMS_SEC2_T1 = this.state.TRMS_SEC2_T1;
        let TRMS_SEC2_P1 = this.state.TRMS_SEC2_P1;
        let TRMS_SEC3_T1 = this.state.TRMS_SEC3_T1;
        let TRMS_SEC3_P1 = this.state.TRMS_SEC3_P1;
        let TRMS_SEC4_T1 = this.state.TRMS_SEC4_T1;
        let TRMS_SEC4_P1 = this.state.TRMS_SEC4_P1;
        let TRMS_SEC5_T1 = this.state.TRMS_SEC5_T1;
        let TRMS_SEC5_P1 = this.state.TRMS_SEC5_P1;
        let TRMS_SEC6_T1 = this.state.TRMS_SEC6_T1;
        let TRMS_SEC6_P1 = this.state.TRMS_SEC6_P1;
        let TRMS_SEC7_T1 = this.state.TRMS_SEC7_T1;
        let TRMS_SEC7_P1 = this.state.TRMS_SEC7_P1;
        let TRMS_SEC8_T1 = this.state.TRMS_SEC8_T1;
        let TRMS_SEC8_P1 = this.state.TRMS_SEC8_P1;
        let ABT_LINK_ABOUT = this.state.ABT_LINK_ABOUT;
        let ABT_LINK_ANONYMITY = this.state.ABT_LINK_ANONYMITY;
        let ABT_LINK_TERMS = this.state.ABT_LINK_TERMS;
        let ABT_LINK_POLICY = this.state.ABT_LINK_POLICY;
        let ABT_LINK_CONTACT = this.state.ABT_LINK_CONTACT;
        let ABT_NAV_SIGNIN = this.state.ABT_NAV_SIGNIN;
        let ABT_NAV_REGISTER = this.state.ABT_NAV_REGISTER;


        return (
            <div className="ui container">
                <h4>Edit - Terms page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="termsForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>TRMS_TITLE</label>
                                <input className="form-control"
                                    name="TRMS_TITLE"
                                    type="text"
                                    value={TRMS_TITLE}
                                    onChange={this.onChangeBannerTitle} />
                            </div>

                            <div className="field">
                                <label>TRMS_DES</label>
                                <textarea className="form-control"
                                    name="TRMS_DES"
                                    value={TRMS_DES}
                                    onChange={this.onChangeDes} >{TRMS_DES}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC1_T1</label>
                                <input className="form-control"
                                    name="TRMS_SEC1_T1"
                                    type="text"
                                    value={TRMS_SEC1_T1}
                                    onChange={this.onChangeTitleOne} />
                            </div>

                            <div className="field">
                                <label>TRMS_SEC1_P1</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC1_P1"
                                    value={TRMS_SEC1_P1}
                                    onChange={this.onChangeParaOne} >{TRMS_SEC1_P1}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC1_P2</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC1_P2"
                                    value={TRMS_SEC1_P2}
                                    onChange={this.onChangeSecOneParaTwo} >{TRMS_SEC1_P2}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC2_T1</label>
                                <input className="form-control"
                                    name="TRMS_SEC2_T1"
                                    type="text"
                                    value={TRMS_SEC2_T1}
                                    onChange={this.onChangeSecTwoTitle} />
                            </div>

                            <div className="field">
                                <label>TRMS_SEC2_P1</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC2_P1"
                                    value={TRMS_SEC2_P1}
                                    onChange={this.onChangeSecTwoParaOne} >{TRMS_SEC2_P1}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC3_T1</label>
                                <input className="form-control"
                                    name="TRMS_SEC3_T1"
                                    type="text"
                                    value={TRMS_SEC3_T1}
                                    onChange={this.onChangeSecThreeTitle} />
                            </div>

                            <div className="field">
                                <label>TRMS_SEC3_P1</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC3_P1"
                                    value={TRMS_SEC3_P1}
                                    onChange={this.onChangeSecThreeParaOne} >{TRMS_SEC3_P1}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC4_T1</label>
                                <input className="form-control"
                                    name="TRMS_SEC4_T1"
                                    type="text"
                                    value={TRMS_SEC4_T1}
                                    onChange={this.onChangeSecFourTitle} />
                            </div>

                            <div className="field">
                                <label>TRMS_SEC4_P1</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC4_P1"
                                    value={TRMS_SEC4_P1}
                                    onChange={this.onChangeSecFourParaOne} >{TRMS_SEC4_P1}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC5_T1</label>
                                <input className="form-control"
                                    name="TRMS_SEC5_T1"
                                    type="text"
                                    value={TRMS_SEC5_T1}
                                    onChange={this.onChangeSecFiveTitle} />
                            </div>

                            <div className="field">
                                <label>TRMS_SEC5_P1</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC5_P1"
                                    value={TRMS_SEC5_P1}
                                    onChange={this.onChangeSecFiveParaOne} >{TRMS_SEC5_P1}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC6_T1</label>
                                <input className="form-control"
                                    name="TRMS_SEC6_T1"
                                    type="text"
                                    value={TRMS_SEC6_T1}
                                    onChange={this.onChangeSecSixTitle} />
                            </div>

                            <div className="field">
                                <label>TRMS_SEC6_P1</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC6_P1"
                                    value={TRMS_SEC6_P1}
                                    onChange={this.onChangeSecSixParaOne} >{TRMS_SEC6_P1}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC7_T1</label>
                                <input className="form-control"
                                    name="TRMS_SEC7_T1"
                                    type="text"
                                    value={TRMS_SEC7_T1}
                                    onChange={this.onChangeSecSevenTitle} />
                            </div>

                            <div className="field">
                                <label>TRMS_SEC7_P1</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC7_P1"
                                    value={TRMS_SEC7_P1}
                                    onChange={this.onChangeSecSevenParaOne} >{TRMS_SEC7_P1}</textarea>
                            </div>

                            <div className="field">
                                <label>TRMS_SEC8_T1</label>
                                <input className="form-control"
                                    name="TRMS_SEC8_T1"
                                    type="text"
                                    value={TRMS_SEC8_T1}
                                    onChange={this.onChangeSecEightTitle} />
                            </div>

                            <div className="field">
                                <label>TRMS_SEC8_P1</label>
                                <textarea className="form-control"
                                    name="TRMS_SEC8_P1"
                                    value={TRMS_SEC8_P1}
                                    onChange={this.onChangeSecEightParaOne} >{TRMS_SEC8_P1}</textarea>
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
                                <button className="ui blue button" onClick={this.onSubmitTerms}>Submit</button>
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
