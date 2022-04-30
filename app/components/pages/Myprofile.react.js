import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Myprofile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            PRFL_TAB_MYPROFILE: '',
            PRFL_TAB_MYMANAGER: '',
            PRFL_TAB_MYTEAM: '',
            PRFL_EDIT_PROFILE: '',
            PRFL_SUMMARY: '',
            PRFL_SMMRY_TITLE: '',
            PRFL_PERSONAL_INFO: '',
            PRFL_PINFO_FNAME: '',
            PRFL_PINFO_LNAME: '',
            PRFL_PINFO_CHANGE_PSWD: '',
            PRFL_PINFO_CNFM_PSWD: '',
            PRFL_GENERAL_INFO: '',
            PRFL_GINFO_WRK_EMAIL: '',
            PRFL_GINFO_LNG: '',
            PRFL_GINFO_RPT_FRQ: '',
            PRFL_MNGR_MYMANAGER: '',
            PRFL_MNGR_TOP_MSG: '',
            PRFL_MNGR_ROL: '',
            PRFL_MNGR_EMAIL: '',
            PRFL_MNGR_CHNG_MNGR: '',
            PRFL_MNGR_CANCEL: '',
            PRFL_MNGR_SUBMIT: '',
            PRFL_TEAM_TOP_MSG: '',
            PRFL_TEAM_ADD_TEAM: '',
            PRFL_TEAM_NAME: '',
            PRFL_TEAM_SAVE: '',
            PRFL_TEAM_SUBORDINATES: '',
            PRFL_TEAM_ADD_ANOTHER: '',
            PRFL_TEAM_WRK_EML: '',
            PRFL_TEAM_SUBORDINATES_SAVE: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'myprofile', language: this.state.language});
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
            PRFL_TAB_MYPROFILE: pagedata.PRFL_TAB_MYPROFILE,
            PRFL_TAB_MYMANAGER: pagedata.PRFL_TAB_MYMANAGER,
            PRFL_TAB_MYTEAM: pagedata.PRFL_TAB_MYTEAM,
            PRFL_EDIT_PROFILE: pagedata.PRFL_EDIT_PROFILE,
            PRFL_SUMMARY: pagedata.PRFL_SUMMARY,
            PRFL_SMMRY_TITLE: pagedata.PRFL_SMMRY_TITLE,
            PRFL_PERSONAL_INFO: pagedata.PRFL_PERSONAL_INFO,
            PRFL_PINFO_FNAME: pagedata.PRFL_PINFO_FNAME,
            PRFL_PINFO_LNAME: pagedata.PRFL_PINFO_LNAME,
            PRFL_PINFO_CHANGE_PSWD: pagedata.PRFL_PINFO_CHANGE_PSWD,
            PRFL_PINFO_CNFM_PSWD: pagedata.PRFL_PINFO_CNFM_PSWD,
            PRFL_GENERAL_INFO: pagedata.PRFL_GENERAL_INFO,
            PRFL_GINFO_WRK_EMAIL: pagedata.PRFL_GINFO_WRK_EMAIL,
            PRFL_GINFO_LNG: pagedata.PRFL_GINFO_LNG,
            PRFL_GINFO_RPT_FRQ: pagedata.PRFL_GINFO_RPT_FRQ,
            PRFL_MNGR_MYMANAGER: pagedata.PRFL_MNGR_MYMANAGER,
            PRFL_MNGR_TOP_MSG: pagedata.PRFL_MNGR_TOP_MSG,
            PRFL_MNGR_ROL: pagedata.PRFL_MNGR_ROL,
            PRFL_MNGR_EMAIL: pagedata.PRFL_MNGR_EMAIL,
            PRFL_MNGR_CHNG_MNGR: pagedata.PRFL_MNGR_CHNG_MNGR,
            PRFL_MNGR_CANCEL: pagedata.PRFL_MNGR_CANCEL,
            PRFL_MNGR_SUBMIT: pagedata.PRFL_MNGR_SUBMIT,
            PRFL_TEAM_TOP_MSG: pagedata.PRFL_TEAM_TOP_MSG,
            PRFL_TEAM_ADD_TEAM: pagedata.PRFL_TEAM_ADD_TEAM,
            PRFL_TEAM_NAME: pagedata.PRFL_TEAM_NAME,
            PRFL_TEAM_SAVE: pagedata.PRFL_TEAM_SAVE,
            PRFL_TEAM_SUBORDINATES: pagedata.PRFL_TEAM_SUBORDINATES,
            PRFL_TEAM_ADD_ANOTHER: pagedata.PRFL_TEAM_ADD_ANOTHER,
            PRFL_TEAM_WRK_EML: pagedata.PRFL_TEAM_WRK_EML,
            PRFL_TEAM_SUBORDINATES_SAVE: pagedata.PRFL_TEAM_SUBORDINATES_SAVE
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitMyprofile = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    prflTabMyprofile = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TAB_MYPROFILE: e.target.value });
    }
    prflTabMymanager = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TAB_MYMANAGER: e.target.value });
    }
    prflTabMyteam = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TAB_MYTEAM: e.target.value });
    }
    prflEditProfile = (e) => {
        e.preventDefault();
        this.setState({ PRFL_EDIT_PROFILE: e.target.value });
    }
    prflSummary = (e) => {
        e.preventDefault();
        this.setState({ PRFL_SUMMARY: e.target.value });
    }
    prflSummaryTitle = (e) => {
        e.preventDefault();
        this.setState({ PRFL_SMMRY_TITLE: e.target.value });
    }
    prflPersonalInfo = (e) => {
        e.preventDefault();
        this.setState({ PRFL_PERSONAL_INFO: e.target.value });
    }
    prflInfoFname = (e) => {
        e.preventDefault();
        this.setState({ PRFL_PINFO_FNAME: e.target.value });
    }
    prflInfoLname = (e) => {
        e.preventDefault();
        this.setState({ PRFL_PINFO_LNAME: e.target.value });
    }
    prflInfoChangePassword = (e) => {
        e.preventDefault();
        this.setState({ PRFL_PINFO_CHANGE_PSWD: e.target.value });
    }
    prflInfoConfirmPassword = (e) => {
        e.preventDefault();
        this.setState({ PRFL_PINFO_CNFM_PSWD: e.target.value });
    }
    prflGeneralInfo = (e) => {
        e.preventDefault();
        this.setState({ PRFL_GENERAL_INFO: e.target.value });
    }
    prflInfoWorkEmail = (e) => {
        e.preventDefault();
        this.setState({ PRFL_GINFO_WRK_EMAIL: e.target.value });
    }
    prflInfoLng = (e) => {
        e.preventDefault();
        this.setState({ PRFL_GINFO_LNG: e.target.value });
    }
    prflInfoRptFrq = (e) => {
        e.preventDefault();
        this.setState({ PRFL_GINFO_RPT_FRQ: e.target.value });
    }
    prflMngrMymanager = (e) => {
        e.preventDefault();
        this.setState({ PRFL_MNGR_MYMANAGER: e.target.value });
    }
    prflMngrTopMsg = (e) => {
        e.preventDefault();
        this.setState({ PRFL_MNGR_TOP_MSG: e.target.value });
    }
    prflMngrRol = (e) => {
        e.preventDefault();
        this.setState({ PRFL_MNGR_ROL: e.target.value });
    }
    prflMngrEmail = (e) => {
        e.preventDefault();
        this.setState({ PRFL_MNGR_EMAIL: e.target.value });
    }
    prflMngrChngMngr = (e) => {
        e.preventDefault();
        this.setState({ PRFL_MNGR_CHNG_MNGR: e.target.value });
    }
    prflMngrCancel = (e) => {
        e.preventDefault();
        this.setState({ PRFL_MNGR_CANCEL: e.target.value });
    }
    prflMngrSubmit = (e) => {
        e.preventDefault();
        this.setState({ PRFL_MNGR_SUBMIT: e.target.value });
    }
    prflTeamTopMsg = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TEAM_TOP_MSG: e.target.value });
    }
    prflTeamAddTeam = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TEAM_ADD_TEAM: e.target.value });
    }
    prflTeamName = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TEAM_NAME: e.target.value });
    }
    prflTeamSave = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TEAM_SAVE: e.target.value });
    }
    prflTeamSubordinates = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TEAM_SUBORDINATES: e.target.value });
    }
    prflTeamAddAnother = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TEAM_ADD_ANOTHER: e.target.value });
    }
    prflTeamWorkEml = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TEAM_WRK_EML: e.target.value });
    }
    prflTeamSubsSave = (e) => {
        e.preventDefault();
        this.setState({ PRFL_TEAM_SUBORDINATES_SAVE: e.target.value });
    }


    render() {

        let pagedata = this.state.pagedata;
        let PRFL_TAB_MYPROFILE = this.state.PRFL_TAB_MYPROFILE;
        let PRFL_TAB_MYMANAGER = this.state.PRFL_TAB_MYMANAGER;
        let PRFL_TAB_MYTEAM = this.state.PRFL_TAB_MYTEAM;
        let PRFL_EDIT_PROFILE = this.state.PRFL_EDIT_PROFILE;
        let PRFL_SUMMARY = this.state.PRFL_SUMMARY;
        let PRFL_SMMRY_TITLE = this.state.PRFL_SMMRY_TITLE;
        let PRFL_PERSONAL_INFO = this.state.PRFL_PERSONAL_INFO;
        let PRFL_PINFO_FNAME = this.state.PRFL_PINFO_FNAME;
        let PRFL_PINFO_LNAME = this.state.PRFL_PINFO_LNAME;
        let PRFL_PINFO_CHANGE_PSWD = this.state.PRFL_PINFO_CHANGE_PSWD;
        let PRFL_PINFO_CNFM_PSWD = this.state.PRFL_PINFO_CNFM_PSWD;
        let PRFL_GENERAL_INFO = this.state.PRFL_GENERAL_INFO;
        let PRFL_GINFO_WRK_EMAIL = this.state.PRFL_GINFO_WRK_EMAIL;
        let PRFL_GINFO_LNG = this.state.PRFL_GINFO_LNG;
        let PRFL_GINFO_RPT_FRQ = this.state.PRFL_GINFO_RPT_FRQ;
        let PRFL_MNGR_MYMANAGER = this.state.PRFL_MNGR_MYMANAGER;
        let PRFL_MNGR_TOP_MSG = this.state.PRFL_MNGR_TOP_MSG;
        let PRFL_MNGR_ROL = this.state.PRFL_MNGR_ROL;
        let PRFL_MNGR_EMAIL = this.state.PRFL_MNGR_EMAIL;
        let PRFL_MNGR_CHNG_MNGR = this.state.PRFL_MNGR_CHNG_MNGR;
        let PRFL_MNGR_CANCEL = this.state.PRFL_MNGR_CANCEL;
        let PRFL_MNGR_SUBMIT = this.state.PRFL_MNGR_SUBMIT;
        let PRFL_TEAM_TOP_MSG = this.state.PRFL_TEAM_TOP_MSG;
        let PRFL_TEAM_ADD_TEAM = this.state.PRFL_TEAM_ADD_TEAM;
        let PRFL_TEAM_NAME = this.state.PRFL_TEAM_NAME;
        let PRFL_TEAM_SAVE = this.state.PRFL_TEAM_SAVE;
        let PRFL_TEAM_SUBORDINATES = this.state.PRFL_TEAM_SUBORDINATES;
        let PRFL_TEAM_ADD_ANOTHER = this.state.PRFL_TEAM_ADD_ANOTHER;
        let PRFL_TEAM_WRK_EML = this.state.PRFL_TEAM_WRK_EML;
        let PRFL_TEAM_SUBORDINATES_SAVE = this.state.PRFL_TEAM_SUBORDINATES_SAVE;

        return (
            <div className="ui container">
                <h4>Edit - My profile page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="myprofileForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>PRFL_TAB_MYPROFILE</label>
                                <input className="form-control"
                                    name="PRFL_TAB_MYPROFILE"
                                    type="text"
                                    value={PRFL_TAB_MYPROFILE}
                                    onChange={this.prflTabMyprofile} />
                            </div>
                            <div className="field">
                                <label>PRFL_TAB_MYMANAGER</label>
                                <input className="form-control"
                                    name="PRFL_TAB_MYMANAGER"
                                    type="text"
                                    value={PRFL_TAB_MYMANAGER}
                                    onChange={this.prflTabMymanager} />
                            </div>
                            <div className="field">
                                <label>PRFL_TAB_MYTEAM</label>
                                <input className="form-control"
                                    name="PRFL_TAB_MYTEAM"
                                    type="text"
                                    value={PRFL_TAB_MYTEAM}
                                    onChange={this.prflTabMyteam} />
                            </div>
                            <div className="field">
                                <label>PRFL_EDIT_PROFILE</label>
                                <input className="form-control"
                                    name="PRFL_EDIT_PROFILE"
                                    type="text"
                                    value={PRFL_EDIT_PROFILE}
                                    onChange={this.prflEditProfile} />
                            </div>
                            <div className="field">
                                <label>PRFL_SUMMARY</label>
                                <input className="form-control"
                                    name="PRFL_SUMMARY"
                                    type="text"
                                    value={PRFL_SUMMARY}
                                    onChange={this.prflSummary} />
                            </div>
                            <div className="field">
                                <label>PRFL_SMMRY_TITLE</label>
                                <input className="form-control"
                                    name="PRFL_SMMRY_TITLE"
                                    type="text"
                                    value={PRFL_SMMRY_TITLE}
                                    onChange={this.prflSummaryTitle} />
                            </div>
                            <div className="field">
                                <label>PRFL_PERSONAL_INFO</label>
                                <input className="form-control"
                                    name="PRFL_PERSONAL_INFO"
                                    type="text"
                                    value={PRFL_PERSONAL_INFO}
                                    onChange={this.prflPersonalInfo} />
                            </div>
                            <div className="field">
                                <label>PRFL_PINFO_FNAME</label>
                                <input className="form-control"
                                    name="PRFL_PINFO_FNAME"
                                    type="text"
                                    value={PRFL_PINFO_FNAME}
                                    onChange={this.prflInfoFname} />
                            </div>
                            <div className="field">
                                <label>PRFL_PINFO_LNAME</label>
                                <input className="form-control"
                                    name="PRFL_PINFO_LNAME"
                                    type="text"
                                    value={PRFL_PINFO_LNAME}
                                    onChange={this.prflInfoLname} />
                            </div>
                            <div className="field">
                                <label>PRFL_PINFO_CHANGE_PSWD</label>
                                <input className="form-control"
                                    name="PRFL_PINFO_CHANGE_PSWD"
                                    type="text"
                                    value={PRFL_PINFO_CHANGE_PSWD}
                                    onChange={this.prflInfoChangePassword} />
                            </div>
                            <div className="field">
                                <label>PRFL_PINFO_CNFM_PSWD</label>
                                <input className="form-control"
                                    name="PRFL_PINFO_CNFM_PSWD"
                                    type="text"
                                    value={PRFL_PINFO_CNFM_PSWD}
                                    onChange={this.prflInfoConfirmPassword} />
                            </div>
                            <div className="field">
                                <label>PRFL_GENERAL_INFO</label>
                                <input className="form-control"
                                    name="PRFL_GENERAL_INFO"
                                    type="text"
                                    value={PRFL_GENERAL_INFO}
                                    onChange={this.prflGeneralInfo} />
                            </div>
                            <div className="field">
                                <label>PRFL_GINFO_WRK_EMAIL</label>
                                <input className="form-control"
                                    name="PRFL_GINFO_WRK_EMAIL"
                                    type="text"
                                    value={PRFL_GINFO_WRK_EMAIL}
                                    onChange={this.prflInfoWorkEmail} />
                            </div>
                            <div className="field">
                                <label>PRFL_GINFO_LNG</label>
                                <input className="form-control"
                                    name="PRFL_GINFO_LNG"
                                    type="text"
                                    value={PRFL_GINFO_LNG}
                                    onChange={this.prflInfoLng} />
                            </div>
                            <div className="field">
                                <label>PRFL_GINFO_RPT_FRQ</label>
                                <input className="form-control"
                                    name="PRFL_GINFO_RPT_FRQ"
                                    type="text"
                                    value={PRFL_GINFO_RPT_FRQ}
                                    onChange={this.prflInfoRptFrq} />
                            </div>
                            <div className="field">
                                <label>PRFL_MNGR_MYMANAGER</label>
                                <input className="form-control"
                                    name="PRFL_MNGR_MYMANAGER"
                                    type="text"
                                    value={PRFL_MNGR_MYMANAGER}
                                    onChange={this.prflMngrMymanager} />
                            </div>
                            <div className="field">
                                <label>PRFL_MNGR_TOP_MSG</label>
                                <input className="form-control"
                                    name="PRFL_MNGR_TOP_MSG"
                                    type="text"
                                    value={PRFL_MNGR_TOP_MSG}
                                    onChange={this.prflMngrTopMsg} />
                            </div>
                            <div className="field">
                                <label>PRFL_MNGR_ROL</label>
                                <input className="form-control"
                                    name="PRFL_MNGR_ROL"
                                    type="text"
                                    value={PRFL_MNGR_ROL}
                                    onChange={this.prflMngrRol} />
                            </div>
                            <div className="field">
                                <label>PRFL_MNGR_EMAIL</label>
                                <input className="form-control"
                                    name="PRFL_MNGR_EMAIL"
                                    type="text"
                                    value={PRFL_MNGR_EMAIL}
                                    onChange={this.prflMngrEmail} />
                            </div>
                            <div className="field">
                                <label>PRFL_MNGR_CHNG_MNGR</label>
                                <input className="form-control"
                                    name="PRFL_MNGR_CHNG_MNGR"
                                    type="text"
                                    value={PRFL_MNGR_CHNG_MNGR}
                                    onChange={this.prflMngrChngMngr} />
                            </div>
                            <div className="field">
                                <label>PRFL_MNGR_CANCEL</label>
                                <input className="form-control"
                                    name="PRFL_MNGR_CANCEL"
                                    type="text"
                                    value={PRFL_MNGR_CANCEL}
                                    onChange={this.prflMngrCancel} />
                            </div>
                            <div className="field">
                                <label>PRFL_MNGR_SUBMIT</label>
                                <input className="form-control"
                                    name="PRFL_MNGR_SUBMIT"
                                    type="text"
                                    value={PRFL_MNGR_SUBMIT}
                                    onChange={this.prflMngrSubmit} />
                            </div>
                            <div className="field">
                                <label>PRFL_TEAM_TOP_MSG</label>
                                <input className="form-control"
                                    name="PRFL_TEAM_TOP_MSG"
                                    type="text"
                                    value={PRFL_TEAM_TOP_MSG}
                                    onChange={this.prflTeamTopMsg} />
                            </div>
                            <div className="field">
                                <label>PRFL_TEAM_ADD_TEAM</label>
                                <input className="form-control"
                                    name="PRFL_TEAM_ADD_TEAM"
                                    type="text"
                                    value={PRFL_TEAM_ADD_TEAM}
                                    onChange={this.prflTeamAddTeam} />
                            </div>
                            <div className="field">
                                <label>PRFL_TEAM_NAME</label>
                                <input className="form-control"
                                    name="PRFL_TEAM_NAME"
                                    type="text"
                                    value={PRFL_TEAM_NAME}
                                    onChange={this.prflTeamName} />
                            </div>
                            <div className="field">
                                <label>PRFL_TEAM_SAVE</label>
                                <input className="form-control"
                                    name="PRFL_TEAM_SAVE"
                                    type="text"
                                    value={PRFL_TEAM_SAVE}
                                    onChange={this.prflTeamSave} />
                            </div>
                            <div className="field">
                                <label>PRFL_TEAM_SUBORDINATES</label>
                                <input className="form-control"
                                    name="PRFL_TEAM_SUBORDINATES"
                                    type="text"
                                    value={PRFL_TEAM_SUBORDINATES}
                                    onChange={this.prflTeamSubordinates} />
                            </div>
                            <div className="field">
                                <label>PRFL_TEAM_ADD_ANOTHER</label>
                                <input className="form-control"
                                    name="PRFL_TEAM_ADD_ANOTHER"
                                    type="text"
                                    value={PRFL_TEAM_ADD_ANOTHER}
                                    onChange={this.prflTeamAddAnother} />
                            </div>
                            <div className="field">
                                <label>PRFL_TEAM_WRK_EML</label>
                                <input className="form-control"
                                    name="PRFL_TEAM_WRK_EML"
                                    type="text"
                                    value={PRFL_TEAM_WRK_EML}
                                    onChange={this.prflTeamWorkEml} />
                            </div>
                            <div className="field">
                                <label>PRFL_TEAM_SUBORDINATES_SAVE</label>
                                <input className="form-control"
                                    name="PRFL_TEAM_SUBORDINATES_SAVE"
                                    type="text"
                                    value={PRFL_TEAM_SUBORDINATES_SAVE}
                                    onChange={this.prflTeamSubsSave} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitMyprofile}>Submit</button>
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
