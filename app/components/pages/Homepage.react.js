import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            HOM_SIGN_IN: '',
            HOM_REGISTER: '',
            HOM_SGN_WORK_EMAIL: '',
            HOM_GET_STARTED: '',
            HOM_NO_CREDIT_CARD: '',
            HOM_1_TITLE_1: '',
            HOM_1_SUBTITLE_1: '',
            HOM_2_TITLE_1: '',
            HOM_2_TITLE_2: '',
            HOM_2_ITEM_1: '',
            HOM_2_ITEM_2: '',
            HOM_2_ITEM_3: '',
            HOM_3_TITLE_1: '',
            HOM_3_BOX_1_TITLE_1: '',
            HOM_3_BOX_1_CONTENT: '',
            HOM_3_BOX_2_TITLE_1: '',
            HOM_3_BOX_2_CONTENT: '',
            HOM_3_BOX_3_TITLE_1: '',
            HOM_3_BOX_3_CONTENT: '',
            HOM_3_BOX_4_TITLE_1: '',
            HOM_3_BOX_4_CONTENT: '',
            HOM_4_TITLE_1: '',
            HOM_4_BOX_1_TITLE_1: '',
            HOM_4_BOX_1_CONTENT: '',
            HOM_4_BOX_2_TITLE_1: '',
            HOM_4_BOX_2_CONTENT: '',
            HOM_4_BOX_3_TITLE_1: '',
            HOM_4_BOX_3_CONTENT: '',
            HOM_4_BOX_4_TITLE_1: '',
            HOM_4_BOX_4_CONTENT: '',
            HOM_5_TITLE_1: '',
            HOM_5_BOX_1_TITLE_1: '',
            HOM_5_BOX_1_CONTENT: '',
            HOM_5_BOX_2_TITLE_1: '',
            HOM_5_BOX_2_CONTENT: '',
            HOM_5_BOX_3_TITLE_1: '',
            HOM_5_BOX_3_CONTENT: '',
            HOM_5_BOX_4_TITLE_1: '',
            HOM_5_BOX_4_CONTENT: '',
            HOM_6_TITLE_1: '',
            HOM_7_TITLE: '',
            HOM_7_NAME: '',
            HOM_7_EMAIL: '',
            HOM_7_MOBILE: '',
            HOM_7_LOOKING_FOR: '',
            HOM_7_SUBMIT: '',
            HOM_FOOTER_ABOUT: '',
            HOM_FOOTER_ANONYMITY: '',
            HOM_FOOTER_TERMS: '',
            HOM_FOOTER_POLICY: '',
            HOM_FOOTER_CONTACT: ''
        };
    }


    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'home', language: this.state.language});
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
            HOM_SIGN_IN: pagedata.HOM_SIGN_IN,
            HOM_REGISTER: pagedata.HOM_REGISTER,
            HOM_SGN_WORK_EMAIL: pagedata.HOM_SGN_WORK_EMAIL,
            HOM_GET_STARTED: pagedata.HOM_GET_STARTED,
            HOM_NO_CREDIT_CARD: pagedata.HOM_NO_CREDIT_CARD,
            HOM_1_TITLE_1: pagedata.HOM_1_TITLE_1,
            HOM_1_SUBTITLE_1: pagedata.HOM_1_SUBTITLE_1,
            HOM_2_TITLE_1: pagedata.HOM_2_TITLE_1,
            HOM_2_TITLE_2: pagedata.HOM_2_TITLE_2,
            HOM_2_ITEM_1: pagedata.HOM_2_ITEM_1,
            HOM_2_ITEM_2: pagedata.HOM_2_ITEM_2,
            HOM_2_ITEM_3: pagedata.HOM_2_ITEM_3,
            HOM_3_TITLE_1: pagedata.HOM_3_TITLE_1,
            HOM_3_BOX_1_TITLE_1: pagedata.HOM_3_BOX_1_TITLE_1,
            HOM_3_BOX_1_CONTENT: pagedata.HOM_3_BOX_1_CONTENT,
            HOM_3_BOX_2_TITLE_1: pagedata.HOM_3_BOX_2_TITLE_1,
            HOM_3_BOX_2_CONTENT: pagedata.HOM_3_BOX_2_CONTENT,
            HOM_3_BOX_3_TITLE_1: pagedata.HOM_3_BOX_3_TITLE_1,
            HOM_3_BOX_3_CONTENT: pagedata.HOM_3_BOX_3_CONTENT,
            HOM_3_BOX_4_TITLE_1: pagedata.HOM_3_BOX_4_TITLE_1,
            HOM_3_BOX_4_CONTENT: pagedata.HOM_3_BOX_4_CONTENT,
            HOM_4_TITLE_1: pagedata.HOM_4_TITLE_1,
            HOM_4_BOX_1_TITLE_1: pagedata.HOM_4_BOX_1_TITLE_1,
            HOM_4_BOX_1_CONTENT: pagedata.HOM_4_BOX_1_CONTENT,
            HOM_4_BOX_2_TITLE_1: pagedata.HOM_4_BOX_2_TITLE_1,
            HOM_4_BOX_2_CONTENT: pagedata.HOM_4_BOX_2_CONTENT,
            HOM_4_BOX_3_TITLE_1: pagedata.HOM_4_BOX_3_TITLE_1,
            HOM_4_BOX_3_CONTENT: pagedata.HOM_4_BOX_3_CONTENT,
            HOM_4_BOX_4_TITLE_1: pagedata.HOM_4_BOX_4_TITLE_1,
            HOM_4_BOX_4_CONTENT: pagedata.HOM_4_BOX_4_CONTENT,
            HOM_5_TITLE_1: pagedata.HOM_5_TITLE_1,
            HOM_5_BOX_1_TITLE_1: pagedata.HOM_5_BOX_1_TITLE_1,
            HOM_5_BOX_1_CONTENT: pagedata.HOM_5_BOX_1_CONTENT,
            HOM_5_BOX_2_TITLE_1: pagedata.HOM_5_BOX_2_TITLE_1,
            HOM_5_BOX_2_CONTENT: pagedata.HOM_5_BOX_2_CONTENT,
            HOM_5_BOX_3_TITLE_1: pagedata.HOM_5_BOX_3_TITLE_1,
            HOM_5_BOX_3_CONTENT: pagedata.HOM_5_BOX_3_CONTENT,
            HOM_5_BOX_4_TITLE_1: pagedata.HOM_5_BOX_4_TITLE_1,
            HOM_5_BOX_4_CONTENT: pagedata.HOM_5_BOX_4_CONTENT,
            HOM_6_TITLE_1: pagedata.HOM_6_TITLE_1,
            HOM_7_TITLE: pagedata.HOM_7_TITLE,
            HOM_7_NAME: pagedata.HOM_7_NAME,
            HOM_7_EMAIL: pagedata.HOM_7_EMAIL,
            HOM_7_MOBILE: pagedata.HOM_7_MOBILE,
            HOM_7_LOOKING_FOR: pagedata.HOM_7_LOOKING_FOR,
            HOM_7_SUBMIT: pagedata.HOM_7_SUBMIT,
            HOM_FOOTER_ABOUT: pagedata.HOM_FOOTER_ABOUT,
            HOM_FOOTER_ANONYMITY: pagedata.HOM_FOOTER_ANONYMITY,
            HOM_FOOTER_TERMS: pagedata.HOM_FOOTER_TERMS,
            HOM_FOOTER_POLICY: pagedata.HOM_FOOTER_POLICY,
            HOM_FOOTER_CONTACT: pagedata.HOM_FOOTER_CONTACT
        });
    }

    onSubmitHome = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    homSignIn = (e) => {
        e.preventDefault();
        this.setState({ HOM_SIGN_IN: e.target.value });
    }
    homRegister = (e) => {
        e.preventDefault();
        this.setState({ HOM_REGISTER: e.target.value });
    }
    homSgnWorkEmail = (e) => {
        e.preventDefault();
        this.setState({ HOM_SGN_WORK_EMAIL: e.target.value });
    }
    homGetStarted = (e) => {
        e.preventDefault();
        this.setState({ HOM_GET_STARTED: e.target.value });
    }
    homNoCreditCard = (e) => {
        e.preventDefault();
        this.setState({ HOM_NO_CREDIT_CARD: e.target.value });
    }
    homOneTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_1_TITLE_1: e.target.value });
    }
    homOneSubTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_1_SUBTITLE_1: e.target.value });
    }
    homTwoTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_2_TITLE_1: e.target.value });
    }
    homTwoTitleTwo = (e) => {
        e.preventDefault();
        this.setState({ HOM_2_TITLE_2: e.target.value });
    }
    homTwoItemOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_2_ITEM_1: e.target.value });
    }
    homTwoItemTwo = (e) => {
        e.preventDefault();
        this.setState({ HOM_2_ITEM_2: e.target.value });
    }
    homTwoItemThree = (e) => {
        e.preventDefault();
        this.setState({ HOM_2_ITEM_3: e.target.value });
    }
    homThreeTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_TITLE_1: e.target.value });
    }
    homThreeBoxOneTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_BOX_1_TITLE_1: e.target.value });
    }
    homThreeBoxOneContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_BOX_1_CONTENT: e.target.value });
    }
    homThreeBoxTwoTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_BOX_2_TITLE_1: e.target.value });
    }
    homThreeBoxTwoContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_BOX_2_CONTENT: e.target.value });
    }
    homThreeBoxThreeTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_BOX_3_TITLE_1: e.target.value });
    }
    homThreeBoxThreeContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_BOX_3_CONTENT: e.target.value });
    }
    homThreeBoxFourTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_BOX_4_TITLE_1: e.target.value });
    }
    homThreeBoxFourContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_3_BOX_4_CONTENT: e.target.value });
    }
    homFourTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_TITLE_1: e.target.value });
    }
    homFourBoxOneTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_BOX_1_TITLE_1: e.target.value });
    }
    homFourBoxOneContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_BOX_1_CONTENT: e.target.value });
    }
    homFourBoxTwoTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_BOX_2_TITLE_1: e.target.value });
    }
    homFourBoxTwoContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_BOX_2_CONTENT: e.target.value });
    }
    homFourBoxThreeTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_BOX_3_TITLE_1: e.target.value });
    }
    homFourBoxThreeContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_BOX_3_CONTENT: e.target.value });
    }
    homFourBoxFourTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_BOX_4_TITLE_1: e.target.value });
    }
    homFourBoxFourContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_4_BOX_4_CONTENT: e.target.value });
    }
    homFiveTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_TITLE_1: e.target.value });
    }
    homFiveBoxOneTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_BOX_1_TITLE_1: e.target.value });
    }
    homFiveBoxOneContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_BOX_1_CONTENT: e.target.value });
    }
    homFiveBoxTwoTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_BOX_2_TITLE_1: e.target.value });
    }
    homFiveBoxTwoContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_BOX_2_CONTENT: e.target.value });
    }
    homFiveBoxThreeTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_BOX_3_TITLE_1: e.target.value });
    }
    homFiveBoxThreeContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_BOX_3_CONTENT: e.target.value });
    }
    homFiveBoxFourTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_BOX_4_TITLE_1: e.target.value });
    }
    homFiveBoxFourContent = (e) => {
        e.preventDefault();
        this.setState({ HOM_5_BOX_4_CONTENT: e.target.value });
    }
    homSixTitleOne = (e) => {
        e.preventDefault();
        this.setState({ HOM_6_TITLE_1: e.target.value });
    }
    homSevenTitle = (e) => {
        e.preventDefault();
        this.setState({ HOM_7_TITLE: e.target.value });
    }
    homSevenName = (e) => {
        e.preventDefault();
        this.setState({ HOM_7_NAME: e.target.value });
    }
    homSevenEmail = (e) => {
        e.preventDefault();
        this.setState({ HOM_7_EMAIL: e.target.value });
    }
    homSevenMobile = (e) => {
        e.preventDefault();
        this.setState({ HOM_7_MOBILE: e.target.value });
    }
    homSevenLookingFor = (e) => {
        e.preventDefault();
        this.setState({ HOM_7_LOOKING_FOR: e.target.value });
    }
    homSevenSubmit = (e) => {
        e.preventDefault();
        this.setState({ HOM_7_SUBMIT: e.target.value });
    }
    homFooterAbout = (e) => {
        e.preventDefault();
        this.setState({ HOM_FOOTER_ABOUT: e.target.value });
    }
    homFooterAnonymity = (e) => {
        e.preventDefault();
        this.setState({ HOM_FOOTER_ANONYMITY: e.target.value });
    }
    homFooterTerms = (e) => {
        e.preventDefault();
        this.setState({ HOM_FOOTER_TERMS: e.target.value });
    }
    homFooterPolicy = (e) => {
        e.preventDefault();
        this.setState({ HOM_FOOTER_POLICY: e.target.value });
    }
    homFooterContact = (e) => {
        e.preventDefault();
        this.setState({ HOM_FOOTER_CONTACT: e.target.value });
    }


    render() {

        let pagedata = this.state.pagedata;
        let HOM_SIGN_IN = this.state.HOM_SIGN_IN;
        let HOM_REGISTER = this.state.HOM_REGISTER;
        let HOM_SGN_WORK_EMAIL = this.state.HOM_SGN_WORK_EMAIL;
        let HOM_GET_STARTED = this.state.HOM_GET_STARTED;
        let HOM_NO_CREDIT_CARD = this.state.HOM_NO_CREDIT_CARD;
        let HOM_1_TITLE_1 = this.state.HOM_1_TITLE_1;
        let HOM_1_SUBTITLE_1 = this.state.HOM_1_SUBTITLE_1;
        let HOM_2_TITLE_1 = this.state.HOM_2_TITLE_1;
        let HOM_2_TITLE_2 = this.state.HOM_2_TITLE_2;
        let HOM_2_ITEM_1 = this.state.HOM_2_ITEM_1;
        let HOM_2_ITEM_2 = this.state.HOM_2_ITEM_2;
        let HOM_2_ITEM_3 = this.state.HOM_2_ITEM_3;
        let HOM_3_TITLE_1 = this.state.HOM_3_TITLE_1;
        let HOM_3_BOX_1_TITLE_1 = this.state.HOM_3_BOX_1_TITLE_1;
        let HOM_3_BOX_1_CONTENT = this.state.HOM_3_BOX_1_CONTENT;
        let HOM_3_BOX_2_TITLE_1 = this.state.HOM_3_BOX_2_TITLE_1;
        let HOM_3_BOX_2_CONTENT = this.state.HOM_3_BOX_2_CONTENT;
        let HOM_3_BOX_3_TITLE_1 = this.state.HOM_3_BOX_3_TITLE_1;
        let HOM_3_BOX_3_CONTENT = this.state.HOM_3_BOX_3_CONTENT;
        let HOM_3_BOX_4_TITLE_1 = this.state.HOM_3_BOX_4_TITLE_1;
        let HOM_3_BOX_4_CONTENT = this.state.HOM_3_BOX_4_CONTENT;
        let HOM_4_TITLE_1 = this.state.HOM_4_TITLE_1;
        let HOM_4_BOX_1_TITLE_1 = this.state.HOM_4_BOX_1_TITLE_1;
        let HOM_4_BOX_1_CONTENT = this.state.HOM_4_BOX_1_CONTENT;
        let HOM_4_BOX_2_TITLE_1 = this.state.HOM_4_BOX_2_TITLE_1;
        let HOM_4_BOX_2_CONTENT = this.state.HOM_4_BOX_2_CONTENT;
        let HOM_4_BOX_3_TITLE_1 = this.state.HOM_4_BOX_3_TITLE_1;
        let HOM_4_BOX_3_CONTENT = this.state.HOM_4_BOX_3_CONTENT;
        let HOM_4_BOX_4_TITLE_1 = this.state.HOM_4_BOX_4_TITLE_1;
        let HOM_4_BOX_4_CONTENT = this.state.HOM_4_BOX_4_CONTENT;
        let HOM_5_TITLE_1 = this.state.HOM_5_TITLE_1;
        let HOM_5_BOX_1_TITLE_1 = this.state.HOM_5_BOX_1_TITLE_1;
        let HOM_5_BOX_1_CONTENT = this.state.HOM_5_BOX_1_CONTENT;
        let HOM_5_BOX_2_TITLE_1 = this.state.HOM_5_BOX_2_TITLE_1;
        let HOM_5_BOX_2_CONTENT = this.state.HOM_5_BOX_2_CONTENT;
        let HOM_5_BOX_3_TITLE_1 = this.state.HOM_5_BOX_3_TITLE_1;
        let HOM_5_BOX_3_CONTENT = this.state.HOM_5_BOX_3_CONTENT;
        let HOM_5_BOX_4_TITLE_1 = this.state.HOM_5_BOX_4_TITLE_1;
        let HOM_5_BOX_4_CONTENT = this.state.HOM_5_BOX_4_CONTENT;
        let HOM_6_TITLE_1 = this.state.HOM_6_TITLE_1;
        let HOM_7_TITLE = this.state.HOM_7_TITLE;
        let HOM_7_NAME = this.state.HOM_7_NAME;
        let HOM_7_EMAIL = this.state.HOM_7_EMAIL;
        let HOM_7_MOBILE = this.state.HOM_7_MOBILE;
        let HOM_7_LOOKING_FOR = this.state.HOM_7_LOOKING_FOR;
        let HOM_7_SUBMIT = this.state.HOM_7_SUBMIT;
        let HOM_FOOTER_ABOUT = this.state.HOM_FOOTER_ABOUT;
        let HOM_FOOTER_ANONYMITY = this.state.HOM_FOOTER_ANONYMITY;
        let HOM_FOOTER_TERMS = this.state.HOM_FOOTER_TERMS;
        let HOM_FOOTER_POLICY = this.state.HOM_FOOTER_POLICY;
        let HOM_FOOTER_CONTACT = this.state.HOM_FOOTER_CONTACT;



        return (
            <div className="ui container">
                <h4>Edit - Home page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="homeForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>HOM_SIGN_IN</label>
                                <input type="text"
                                    name="HOM_SIGN_IN"
                                    className="form-control"
                                    value={HOM_SIGN_IN}
                                    onChange={this.homSignIn} />
                            </div>
                            <div className="field">
                                <label>HOM_REGISTER</label>
                                <input type="text"
                                    name="HOM_REGISTER"
                                    className="form-control"
                                    value={HOM_REGISTER}
                                    onChange={this.homRegister} />
                            </div>
                            <div className="field">
                                <label>HOM_SGN_WORK_EMAIL</label>
                                <input type="text"
                                    name="HOM_SGN_WORK_EMAIL"
                                    className="form-control"
                                    value={HOM_SGN_WORK_EMAIL}
                                    onChange={this.homSgnWorkEmail} />
                            </div>
                            <div className="field">
                                <label>HOM_GET_STARTED</label>
                                <input type="text"
                                    name="HOM_GET_STARTED"
                                    className="form-control"
                                    value={HOM_GET_STARTED}
                                    onChange={this.homGetStarted} />
                            </div>
                            <div className="field">
                                <label>HOM_NO_CREDIT_CARD</label>
                                <input type="text"
                                    name="HOM_NO_CREDIT_CARD"
                                    className="form-control"
                                    value={HOM_NO_CREDIT_CARD}
                                    onChange={this.homNoCreditCard} />
                            </div>
                            <div className="field">
                                <label>HOM_1_TITLE_1</label>
                                <input type="text"
                                    name="HOM_1_TITLE_1"
                                    className="form-control"
                                    value={HOM_1_TITLE_1}
                                    onChange={this.homOneTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_1_SUBTITLE_1</label>
                                <input type="text"
                                    name="HOM_1_SUBTITLE_1"
                                    className="form-control"
                                    value={HOM_1_SUBTITLE_1}
                                    onChange={this.homOneSubTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_2_TITLE_1</label>
                                <input type="text"
                                    name="HOM_2_TITLE_1"
                                    className="form-control"
                                    value={HOM_2_TITLE_1}
                                    onChange={this.homTwoTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_2_TITLE_2</label>
                                <textarea className="form-control"
                                    name="HOM_2_TITLE_2"
                                    value={HOM_2_TITLE_2}
                                    onChange={this.homTwoTitleTwo} >{HOM_2_TITLE_2}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_2_ITEM_1</label>
                                <textarea className="form-control"
                                    name="HOM_2_ITEM_1"
                                    value={HOM_2_ITEM_1}
                                    onChange={this.homTwoItemOne} >{HOM_2_ITEM_1}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_2_ITEM_2</label>
                                <textarea className="form-control"
                                    name="HOM_2_ITEM_2"
                                    value={HOM_2_ITEM_2}
                                    onChange={this.homTwoItemTwo} >{HOM_2_ITEM_2}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_2_ITEM_3</label>
                                <textarea className="form-control"
                                    name="HOM_2_ITEM_3"
                                    value={HOM_2_ITEM_3}
                                    onChange={this.homTwoItemThree} >{HOM_2_ITEM_3}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_3_TITLE_1</label>
                                <input type="text"
                                    name="HOM_3_TITLE_1"
                                    className="form-control"
                                    value={HOM_3_TITLE_1}
                                    onChange={this.homThreeTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_3_BOX_1_TITLE_1</label>
                                <input type="text"
                                    name="HOM_3_BOX_1_TITLE_1"
                                    className="form-control"
                                    value={HOM_3_BOX_1_TITLE_1}
                                    onChange={this.homThreeBoxOneTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_3_BOX_1_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_3_BOX_1_CONTENT"
                                    value={HOM_3_BOX_1_CONTENT}
                                    onChange={this.homThreeBoxOneContent} >{HOM_3_BOX_1_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_3_BOX_2_TITLE_1</label>
                                <input type="text"
                                    name="HOM_3_BOX_2_TITLE_1"
                                    className="form-control"
                                    value={HOM_3_BOX_2_TITLE_1}
                                    onChange={this.homThreeBoxTwoTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_3_BOX_2_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_3_BOX_2_CONTENT"
                                    value={HOM_3_BOX_2_CONTENT}
                                    onChange={this.homThreeBoxTwoContent} >{HOM_3_BOX_2_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_3_BOX_3_TITLE_1</label>
                                <input type="text"
                                    name="HOM_3_BOX_3_TITLE_1"
                                    className="form-control"
                                    value={HOM_3_BOX_3_TITLE_1}
                                    onChange={this.homThreeBoxThreeTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_3_BOX_3_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_3_BOX_3_CONTENT"
                                    value={HOM_3_BOX_3_CONTENT}
                                    onChange={this.homThreeBoxThreeContent} >{HOM_3_BOX_3_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_3_BOX_4_TITLE_1</label>
                                <input type="text"
                                    name="HOM_3_BOX_4_TITLE_1"
                                    className="form-control"
                                    value={HOM_3_BOX_4_TITLE_1}
                                    onChange={this.homThreeBoxFourTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_3_BOX_4_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_3_BOX_4_CONTENT"
                                    value={HOM_3_BOX_4_CONTENT}
                                    onChange={this.homThreeBoxFourContent} >{HOM_3_BOX_4_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_4_TITLE_1</label>
                                <input type="text"
                                    name="HOM_4_TITLE_1"
                                    className="form-control"
                                    value={HOM_4_TITLE_1}
                                    onChange={this.homFourTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_4_BOX_1_TITLE_1</label>
                                <input type="text"
                                    name="HOM_4_BOX_1_TITLE_1"
                                    className="form-control"
                                    value={HOM_4_BOX_1_TITLE_1}
                                    onChange={this.homFourBoxOneTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_4_BOX_1_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_4_BOX_1_CONTENT"
                                    value={HOM_4_BOX_1_CONTENT}
                                    onChange={this.homFourBoxOneContent} >{HOM_4_BOX_1_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_4_BOX_2_TITLE_1</label>
                                <input type="text"
                                    name="HOM_4_BOX_2_TITLE_1"
                                    className="form-control"
                                    value={HOM_4_BOX_2_TITLE_1}
                                    onChange={this.homFourBoxTwoTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_4_BOX_2_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_4_BOX_2_CONTENT"
                                    value={HOM_4_BOX_2_CONTENT}
                                    onChange={this.homFourBoxTwoContent} >{HOM_4_BOX_2_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_4_BOX_3_TITLE_1</label>
                                <input type="text"
                                    name="HOM_4_BOX_3_TITLE_1"
                                    className="form-control"
                                    value={HOM_4_BOX_3_TITLE_1}
                                    onChange={this.homFourBoxThreeTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_4_BOX_3_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_4_BOX_3_CONTENT"
                                    value={HOM_4_BOX_3_CONTENT}
                                    onChange={this.homFourBoxThreeContent} >{HOM_4_BOX_3_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_4_BOX_4_TITLE_1</label>
                                <input type="text"
                                    name="HOM_4_BOX_4_TITLE_1"
                                    className="form-control"
                                    value={HOM_4_BOX_4_TITLE_1}
                                    onChange={this.homFourBoxFourTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_4_BOX_4_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_4_BOX_4_CONTENT"
                                    value={HOM_4_BOX_4_CONTENT}
                                    onChange={this.homFourBoxFourContent} >{HOM_4_BOX_4_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_5_TITLE_1</label>
                                <input type="text"
                                    name="HOM_5_TITLE_1"
                                    className="form-control"
                                    value={HOM_5_TITLE_1}
                                    onChange={this.homFiveTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_5_BOX_1_TITLE_1</label>
                                <input type="text"
                                    name="HOM_5_BOX_1_TITLE_1"
                                    className="form-control"
                                    value={HOM_5_BOX_1_TITLE_1}
                                    onChange={this.homFiveBoxOneTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_5_BOX_1_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_5_BOX_1_CONTENT"
                                    value={HOM_5_BOX_1_CONTENT}
                                    onChange={this.homFiveBoxOneContent} >{HOM_5_BOX_1_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_5_BOX_2_TITLE_1</label>
                                <input type="text"
                                    name="HOM_5_BOX_2_TITLE_1"
                                    className="form-control"
                                    value={HOM_5_BOX_2_TITLE_1}
                                    onChange={this.homFiveBoxTwoTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_5_BOX_2_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_5_BOX_2_CONTENT"
                                    value={HOM_5_BOX_2_CONTENT}
                                    onChange={this.homFiveBoxTwoContent} >{HOM_5_BOX_2_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_5_BOX_3_TITLE_1</label>
                                <input type="text"
                                    name="HOM_5_BOX_3_TITLE_1"
                                    className="form-control"
                                    value={HOM_5_BOX_3_TITLE_1}
                                    onChange={this.homFiveBoxThreeTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_5_BOX_3_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_5_BOX_3_CONTENT"
                                    value={HOM_5_BOX_3_CONTENT}
                                    onChange={this.homFiveBoxThreeContent} >{HOM_5_BOX_3_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_5_BOX_4_TITLE_1</label>
                                <input type="text"
                                    name="HOM_5_BOX_4_TITLE_1"
                                    className="form-control"
                                    value={HOM_5_BOX_4_TITLE_1}
                                    onChange={this.homFiveBoxFourTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_5_BOX_4_CONTENT</label>
                                <textarea className="form-control"
                                    name="HOM_5_BOX_4_CONTENT"
                                    value={HOM_5_BOX_4_CONTENT}
                                    onChange={this.homFiveBoxFourContent} >{HOM_5_BOX_4_CONTENT}</textarea>
                            </div>
                            <div className="field">
                                <label>HOM_6_TITLE_1</label>
                                <input type="text"
                                    name="HOM_6_TITLE_1"
                                    className="form-control"
                                    value={HOM_6_TITLE_1}
                                    onChange={this.homSixTitleOne} />
                            </div>
                            <div className="field">
                                <label>HOM_7_TITLE</label>
                                <input type="text"
                                    name="HOM_7_TITLE"
                                    className="form-control"
                                    value={HOM_7_TITLE}
                                    onChange={this.homSevenTitle} />
                            </div>
                            <div className="field">
                                <label>HOM_7_NAME</label>
                                <input type="text"
                                    name="HOM_7_NAME"
                                    className="form-control"
                                    value={HOM_7_NAME}
                                    onChange={this.homSevenName} />
                            </div>
                            <div className="field">
                                <label>HOM_7_EMAIL</label>
                                <input type="text"
                                    name="HOM_7_EMAIL"
                                    className="form-control"
                                    value={HOM_7_EMAIL}
                                    onChange={this.homSevenEmail} />
                            </div>
                            <div className="field">
                                <label>HOM_7_MOBILE</label>
                                <input type="text"
                                    name="HOM_7_MOBILE"
                                    className="form-control"
                                    value={HOM_7_MOBILE}
                                    onChange={this.homSevenMobile} />
                            </div>
                            <div className="field">
                                <label>HOM_7_LOOKING_FOR</label>
                                <input type="text"
                                    name="HOM_7_LOOKING_FOR"
                                    className="form-control"
                                    value={HOM_7_LOOKING_FOR}
                                    onChange={this.homSevenLookingFor} />
                            </div>
                            <div className="field">
                                <label>HOM_7_SUBMIT</label>
                                <input type="text"
                                    name="HOM_7_SUBMIT"
                                    className="form-control"
                                    value={HOM_7_SUBMIT}
                                    onChange={this.homSevenSubmit} />
                            </div>
                            <div className="field">
                                <label>HOM_FOOTER_ABOUT</label>
                                <input type="text"
                                    name="HOM_FOOTER_ABOUT"
                                    className="form-control"
                                    value={HOM_FOOTER_ABOUT}
                                    onChange={this.homFooterAbout} />
                            </div>
                            <div className="field">
                                <label>HOM_FOOTER_ANONYMITY</label>
                                <input type="text"
                                    name="HOM_FOOTER_ANONYMITY"
                                    className="form-control"
                                    value={HOM_FOOTER_ANONYMITY}
                                    onChange={this.homFooterAnonymity} />
                            </div>
                            <div className="field">
                                <label>HOM_FOOTER_TERMS</label>
                                <input type="text"
                                    name="HOM_FOOTER_TERMS"
                                    className="form-control"
                                    value={HOM_FOOTER_TERMS}
                                    onChange={this.homFooterTerms} />
                            </div>
                            <div className="field">
                                <label>HOM_FOOTER_POLICY</label>
                                <input type="text"
                                    name="HOM_FOOTER_POLICY"
                                    className="form-control"
                                    value={HOM_FOOTER_POLICY}
                                    onChange={this.homFooterPolicy} />
                            </div>
                            <div className="field">
                                <label>HOM_FOOTER_CONTACT</label>
                                <input type="text"
                                    name="HOM_FOOTER_CONTACT"
                                    className="form-control"
                                    value={HOM_FOOTER_CONTACT}
                                    onChange={this.homFooterContact} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitHome}>Update</button>
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
