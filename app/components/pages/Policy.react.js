import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Policy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            PLCY_TITLE: '',
            PLCY_PARA1: '',
            PLCY_PARA2: '',
            PLCY_PARA3: '',
            PLCY_PARA4: '',
            PLCY_PARA5: '',
            PLCY_PARA6: '',
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
        PageActions.getPage({page: 'policy', language: this.state.language});
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
            PLCY_TITLE: pagedata.PLCY_TITLE,
            PLCY_PARA1: pagedata.PLCY_PARA1,
            PLCY_PARA2: pagedata.PLCY_PARA2,
            PLCY_PARA3: pagedata.PLCY_PARA3,
            PLCY_PARA4: pagedata.PLCY_PARA4,
            PLCY_PARA5: pagedata.PLCY_PARA5,
            PLCY_PARA6: pagedata.PLCY_PARA6,
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

    onChangeTitle = (e) => {
        e.preventDefault();
        this.setState({ PLCY_TITLE: e.target.value });
    }

    onChangeParaOne = (e) => {
        e.preventDefault();
        this.setState({ PLCY_PARA1: e.target.value });
    }

    onChangeParaTwo = (e) => {
        e.preventDefault();
        this.setState({ PLCY_PARA2: e.target.value });
    }

    onChangeParaThree = (e) => {
        e.preventDefault();
        this.setState({ PLCY_PARA3: e.target.value });
    }

    onChangeParaFour = (e) => {
        e.preventDefault();
        this.setState({ PLCY_PARA4: e.target.value });
    }

    onChangeParaFive = (e) => {
        e.preventDefault();
        this.setState({ PLCY_PARA5: e.target.value });
    }

    onChangeParaSix = (e) => {
        e.preventDefault();
        this.setState({ PLCY_PARA6: e.target.value });
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
        let PLCY_TITLE = this.state.PLCY_TITLE;
        let PLCY_PARA1 = this.state.PLCY_PARA1;
        let PLCY_PARA2 = this.state.PLCY_PARA2;
        let PLCY_PARA3 = this.state.PLCY_PARA3;
        let PLCY_PARA4 = this.state.PLCY_PARA4;
        let PLCY_PARA5 = this.state.PLCY_PARA5;
        let PLCY_PARA6 = this.state.PLCY_PARA6;
        let ABT_LINK_ABOUT = this.state.ABT_LINK_ABOUT;
        let ABT_LINK_ANONYMITY = this.state.ABT_LINK_ANONYMITY;
        let ABT_LINK_TERMS = this.state.ABT_LINK_TERMS;
        let ABT_LINK_POLICY = this.state.ABT_LINK_POLICY;
        let ABT_LINK_CONTACT = this.state.ABT_LINK_CONTACT;
        let ABT_NAV_SIGNIN = this.state.ABT_NAV_SIGNIN;
        let ABT_NAV_REGISTER = this.state.ABT_NAV_REGISTER;


        return (
            <div className="ui container">
                <h4>Edit - Policy page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="policyForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>PLCY_TITLE</label>
                                <input className="form-control"
                                    name="PLCY_TITLE"
                                    type="text"
                                    value={PLCY_TITLE}
                                    onChange={this.onChangeTitle} />
                            </div>

                            <div className="field">
                                <label>PLCY_PARA1</label>
                                <textarea className="form-control"
                                    name="PLCY_PARA1"
                                    value={PLCY_PARA1}
                                    onChange={this.onChangeParaOne} >{PLCY_PARA1}</textarea>
                            </div>

                            <div className="field">
                                <label>PLCY_PARA2</label>
                                <textarea className="form-control"
                                    name="PLCY_PARA2"
                                    value={PLCY_PARA2}
                                    onChange={this.onChangeParaTwo} >{PLCY_PARA2}</textarea>
                            </div>

                            <div className="field">
                                <label>PLCY_PARA3</label>
                                <textarea className="form-control"
                                    name="PLCY_PARA3"
                                    value={PLCY_PARA3}
                                    onChange={this.onChangeParaThree} >{PLCY_PARA3}</textarea>
                            </div>

                            <div className="field">
                                <label>PLCY_PARA4</label>
                                <textarea className="form-control"
                                    name="PLCY_PARA4"
                                    value={PLCY_PARA4}
                                    onChange={this.onChangeParaFour} >{PLCY_PARA4}</textarea>
                            </div>

                            <div className="field">
                                <label>PLCY_PARA5</label>
                                <textarea className="form-control"
                                    name="PLCY_PARA5"
                                    value={PLCY_PARA5}
                                    onChange={this.onChangeParaFive} >{PLCY_PARA5}</textarea>
                            </div>

                            <div className="field">
                                <label>PLCY_PARA6</label>
                                <textarea className="form-control"
                                    name="PLCY_PARA6"
                                    value={PLCY_PARA6}
                                    onChange={this.onChangeParaSix} >{PLCY_PARA6}</textarea>
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
