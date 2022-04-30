import React from 'react';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import MyManager from 'components/MyManager.react';
import MyTeam from 'components/MyTeam.react';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class MyProfile extends React.Component {

    constructor (props) {
        super(props);
        mixins(Navigation, this);
        this.state = UserStore.getState();
        this.state.multilang = MlangStore.getState().multilang;
        this.state.canSubmit       =  false;
        this.state.summaryEdit     =  false;
        this.state.personalInfo    =  false;
        this.state.generalInfoEdit =  false;
        this.validationErrors      =  {};
        this.fileupload            =  {};
    }

    componentDidMount () {
        UserActions.getuserinfo();
        UserStore.listen(this._onChange);

        let _this = this;

        $(function() {

            let options = {
                multiple: false,
                multipart: true,
                maxUploads: 2,
                maxSize: 6000,
                queue: false,
                allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
                accept: 'image/*',
                debug: false,
                hoverClass: 'btn-hover',
                focusClass: 'active',
                disabledClass: 'disabled',
                responseType: 'json',
                onSubmit: function(filename, ext) {
                }
            };

            // updateuserphoto
            let change_banner_image = document.getElementById('change_banner_image');
            let change_profile_image = document.getElementById('change_profile_image');
            options.url  = '/updateuserphoto';
            options.name = 'profilephoto';
            options.button = change_profile_image;
            options.onComplete = function(file, response, btn) {
                _this.fileUploadSuccessProfile(response);
            };
            _this.fileupload.updateuserphoto = new ss.SimpleUpload(options);
            _this.fileupload.updateuserphoto._input.title = 'Upload profile image';

            // updateuserbanner
            options.url  = '/updateuserbanner';
            options.name = 'bannerimage';
            options.button = change_banner_image;
            options.onComplete = function(file, response, btn) {
                _this.fileUploadSuccessBanner(response);
            };
            _this.fileupload.updateuserbanner = new ss.SimpleUpload(options);
            _this.fileupload.updateuserbanner._input.title = 'Upload cover image';
        });
    }

    componentWillUnmount () {
        UserStore.unlisten(this._onChange);
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }

    disableButton = () => {
        this.setState({canSubmit: false});
    }

    onTabClick = (Tab) => {
        this.setState({ Tab: Tab });
    }

    fileUploadSuccessProfile = (response) => {
        let userDetails = this.state.userDetails;
        if(response.status){
            userDetails.profile_image = response.image;
            userDetails.profileimage_status = true;
            this.setState({ userDetails: userDetails });
        }
    }

    fileUploadSuccessBanner = (response) => {
        let userDetails = this.state.userDetails;
        if(response.status){
            userDetails.cover_image = response.image;
            userDetails.cover_image_status = true;
            this.setState({ userDetails: userDetails });
        }
    }

    _onChange = (state) => {
        this.setState(state);
        this.messageAutoClose(state);
        if(this.state.ServerResponse && this.state.ServerResponse.action && this.state.ServerResponse.action === 'reload'){
            // To realod the page after changing the language
            window.location.reload();
        }
    }

    _onSaveSubmit = (model) => {
        UserActions.saveUserInfo(model);
    }

    _onSaveSummary = (model) => {
        let summary = document.getElementById('summary').value;
        if(summary !== ''){
            this._onSaveSubmit({ summary: summary, type: 'summary'});
        }
    }

    onEditSummaryClick = () => {
        this.setState({ summaryEdit: true, summary: this.state.userDetails.summary });
    }

    onCancelEditSummaryClick = () => {
        this.setState({ summaryEdit: false });
    }

    _onChangeSummary = (event) => {
        this.setState({summary: event.target.value});
    }

    _onSavePersonalInfo = (model) => {
        let fname     =  document.getElementById('fname').value;
        let lname     =  document.getElementById('lname').value;
        let password  =  document.getElementById('password').value;
        let cpassword =  document.getElementById('cpassword').value;

        let validation = true;
        if(password.trim() !== '' || cpassword.trim() !== '' ){
            if(password !== cpassword){
                this.setState({ message: 'New Password and Confirm Password are not equal.', updateType: 'personalinfo' });
                validation = false;
            }else if(password.length <= 6){
                this.setState({ message: 'Password length should be at least 7 characters', updateType: 'personalinfo' });
                validation = false;
            }
        }
        if(validation){
            this._onSaveSubmit({ fname: fname, lname: lname, password: password, cpassword: cpassword, type: 'personalinfo'});
        }
    }

    onEditPersonalInfoClick = () => {
        this.setState({ personalInfoEdit: true, summary: this.state.userDetails.summary });
    }

    onCancelEditPersonalInfoClick = () => {
        let state = this.state.userDetails;
        state.fname = this.state.userData.fname;
        state.lname = this.state.userData.lname;
        this.setState({ userDetails: state, personalInfoEdit: false , message: '' });
    }

    _onChangePersonalInfo = (event) => {
        let userDetails = this.state.userDetails;

        if(event.target.id === 'fname'){
            userDetails.fname = event.target.value;
            this.setState({ userDetails: userDetails });
        }

        if(event.target.id === 'lname'){
            userDetails.lname = event.target.value;
            this.setState({ userDetails: userDetails });
        }
    }

    _onSaveGeneralInfo = (model) => {
        let email             =  this.state.userDetails.email;
        let reportfrequency   =  document.getElementById('reportfrequency').value;
        let language          =  document.getElementById('language').value;

        if(email === '' ){
            this.setState({ message: 'Email required', updateType: 'generalinfo' });
        }else if( reportfrequency === '' ){
            this.setState({ message: 'Report frequency required', updateType: 'generalinfo' });
        }else if( language === '' ){
            this.setState({ message: 'language required', updateType: 'generalinfo' });
        }else{
            this._onSaveSubmit({ email: email, report_frequency: reportfrequency, language: language, type: 'generalinfo'});
        }
    }

    onEditGeneralInfoClick = () => {
        this.setState({ generalInfoEdit: true });
    }

    onCancelEditGeneralInfoClick = () => {
        let state = this.state.userDetails;
        state.email = this.state.userData.email;
        state.language = this.state.userData.language;
        state.reportfrequency = this.state.userData.reportfrequency;
        this.setState({ userDetails: state, generalInfoEdit: false , message: '' });
    }

    _onChangeGeneralInfo = (event) => {
        let userDetails = this.state.userDetails;

        if(event.target.id === 'language'){
            userDetails.language = event.target.value;
            this.setState({ userDetails: userDetails });
        }

        if(event.target.id === 'reportfrequency'){
            userDetails.reportfrequency = event.target.value;
            this.setState({ userDetails: userDetails });
        }
    }

    messageAutoClose = (state) => {
        if(state.message !== ''){
            setTimeout(function(){
                this.setState({ message: '' });
            }.bind(this),3000);
        }
    }

    render() {
        let userInfo = this.state.userDetails;
        let summarymessage = null;
        let personalinfomessage = null;
        let generalinfomessage = null;
        let mlarray = this.state.multilang;

        if(userInfo && userInfo.profileimage_status){
            this.fileupload.updateuserphoto._input.title = 'Change profile image';
        }

        if(userInfo && userInfo.cover_image_status){
            this.fileupload.updateuserbanner._input.title = 'Change cover image';
        }

        if (this.state.message !== '' && this.state.updateType === 'summary' ) {
            summarymessage = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }

        if (this.state.message !== '' && this.state.updateType === 'personalinfo' ) {
            personalinfomessage = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
            //console.log(document.getElementById("userfullname"));
            document.getElementById("userfullname").innerHTML = userInfo.fname+" "+userInfo.lname;
        }

        if (this.state.message !== '' && this.state.updateType === 'generalinfo' ) {
            generalinfomessage = (
                <div className="ui error message segment">
                    <ul className="list">
                        <li>{this.state.message}</li>
                    </ul>
                </div>
            );
        }


        // Manage user summary
        let summaryForm = [
            <h3 className="ui dividing header">
                <i className="file text outline icon"></i> {GetText('PRFL_SUMMARY', mlarray)}
                    <a className="action"><i onClick={this.onEditSummaryClick} className="write icon"></i></a>
                </h3>,
                {summarymessage},
            <p>{userInfo.summary}</p>
        ];

        if(this.state.summaryEdit){
            summaryForm = (
                <div>
                    <h3 className="ui dividing header">
                        <i className="file text outline icon"></i> {GetText('PRFL_SUMMARY', mlarray)}
                        </h3>
                        <div className="field">
                            {summarymessage}
                            <label>{GetText('PRFL_SMMRY_TITLE', mlarray)}</label>
                            <textarea id="summary" name="summary" onChange={this._onChangeSummary} value={this.state.summary}></textarea>
                        </div>
                        <div className="ui submit  button cancel" onClick={this.onCancelEditSummaryClick} >{GetText('PRFL_MNGR_CANCEL', mlarray)}</div>
                        <div className="ui submit button submitt" onClick={this._onSaveSummary.bind(this)} >{GetText('PRFL_MNGR_SUBMIT', mlarray)}</div>
                    </div>
                );
        }

        // Manage user personal info
        let personalInfoForm = (
            <div>
                <h3 className="ui dividing header">
                    <i className="user icon"></i> {GetText('PRFL_PERSONAL_INFO', mlarray)}
                        <a className="action"><i onClick={this.onEditPersonalInfoClick} className="write icon"></i></a>
                    </h3>
                    <div className=" field">
                        {personalinfomessage}
                        <div className="field ui two column stackable grid container">
                            <label className="column">{GetText('PRFL_PINFO_FNAME', mlarray)}</label>
                            <label className="column">{userInfo.fname}</label>
                        </div>
                        <div className="field ui two column stackable grid container">
                            <label className="column">{GetText('PRFL_PINFO_LNAME', mlarray)}</label>
                            <label className="column">{userInfo.lname}</label>
                        </div>
                        <div className="field ui two column stackable grid container">
                            <label className="column">{GetText('PRFL_PINFO_CHANGE_PSWD', mlarray)}</label>
                            <label className="column">* * * * * * * *</label>
                        </div>
                        <div className="field ui two column stackable grid container">
                            <label className="column">{GetText('PRFL_PINFO_CNFM_PSWD', mlarray)}</label>
                            <label className="column">* * * * * * * *</label>
                        </div>
                    </div>
                </div>
            );

        if(this.state.personalInfoEdit){
            personalInfoForm = (
                <div>
                    <h3 className="ui dividing header"><i className="user icon"></i>{GetText('PRFL_PERSONAL_INFO', mlarray)}</h3>
                    <div className=" field">
                        {personalinfomessage}
                        <div className="field">
                            <label>{GetText('PRFL_PINFO_FNAME', mlarray)}</label>
                            <input placeholder={GetText('PRFL_PINFO_FNAME', mlarray)} onChange={this._onChangePersonalInfo} id="fname" value={userInfo.fname} type="text"  autoComplete="off" />
                        </div>
                        <div className="field">
                            <label>{GetText('PRFL_PINFO_LNAME', mlarray)}</label>
                            <input placeholder={GetText('PRFL_PINFO_LNAME', mlarray)} onChange={this._onChangePersonalInfo} id="lname" value={userInfo.lname} type="text"  autoComplete="off" />
                        </div>
                        <div className="field">
                            <label>{GetText('PRFL_PINFO_CHANGE_PSWD', mlarray)}</label>
                            <input placeholder={GetText('PRFL_PINFO_CHANGE_PSWD', mlarray)} id="password" type="password"  autoComplete="off" />
                        </div>
                        <div className="field">
                            <label>{GetText('PRFL_PINFO_CNFM_PSWD', mlarray)}</label>
                            <input placeholder={GetText('PRFL_PINFO_CNFM_PSWD', mlarray)} id="cpassword" type="Password"  autoComplete="off" />
                        </div>
                    </div>
                    <div className="ui submit  button cancel" onClick={this.onCancelEditPersonalInfoClick} >{GetText('PRFL_MNGR_CANCEL', mlarray)}</div>
                    <div className="ui submit button submitt" onClick={this._onSavePersonalInfo.bind(this)} >{GetText('PRFL_MNGR_SUBMIT', mlarray)}</div>
                </div>
            );
        }

        // Manage user general info
        let generalInfoForm = (
            <div>
                <h3 className="ui dividing header">
                    <i className="setting icon"></i> {GetText('PRFL_GENERAL_INFO', mlarray)}
                        <a className="action"><i onClick={this.onEditGeneralInfoClick} className="write icon"></i></a>
                    </h3>
                    <div className=" field">
                        {generalinfomessage}
                        <div className="field ui two column stackable grid container">
                            <label className="column">{GetText('PRFL_GINFO_WRK_EMAIL', mlarray)}</label>
                            <label className="column">{userInfo.email}</label>
                        </div>
                        <div className="field ui two column stackable grid container">
                            <label className="column">{GetText('PRFL_GINFO_LNG', mlarray)}</label>
                            <label className="column">{userInfo.language}</label>
                        </div>
                        <div className="field ui two column stackable grid container">
                            <label className="column">{GetText('PRFL_GINFO_RPT_FRQ', mlarray)}</label>
                            <label className="column">{userInfo.reportfrequency}</label>
                        </div>
                    </div>
                </div>
            );

        if(this.state.generalInfoEdit){
            generalInfoForm = (
                <div>
                    <h3 className="ui dividing header"><i className="setting icon"></i>{GetText('PRFL_GENERAL_INFO', mlarray)}</h3>
                    <div className="field">
                        {generalinfomessage}
                        <div className="field">
                            <label>{GetText('PRFL_GINFO_WRK_EMAIL', mlarray)}*</label>
                            <input placeholder="Work Email" disabled onChange={this._onChangeGenerallInfo} id="email" value={userInfo.email} type="text" />
                        </div>
                        <div className="field">
                            <label>{GetText('PRFL_GINFO_LNG', mlarray)}*</label>
                            <select className="ui dropdown" onChange={this._onChangeGeneralInfo} id="language" value={userInfo.language} >
                                <option value="">Language</option>
                                <option value="EN">EN</option>
                                <option value="FI">FI</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>{GetText('PRFL_GINFO_RPT_FRQ', mlarray)}</label>
                            <select className="ui search dropdown"  onChange={this._onChangeGeneralInfo} id="reportfrequency" value={userInfo.reportfrequency} >
                                <option value="">Report Frequency</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Never">Never</option>
                            </select>
                        </div>
                    </div>
                    <div className="ui submit  button cancel" onClick={this.onCancelEditGeneralInfoClick} >{GetText('PRFL_MNGR_CANCEL', mlarray)}</div>
                    <div className="ui submit button submitt" onClick={this._onSaveGeneralInfo.bind(this)} >{GetText('PRFL_MNGR_SUBMIT', mlarray)}</div>
                </div>
            );
        }

        let activeTab = [];
        activeTab[0] = ['none'];
        activeTab[1] = ['none'];
        activeTab[2] = ['none'];

        if( this.state.Tab !== undefined ){
            activeTab[this.state.Tab] = 'block';
        }else{
            activeTab[0] = 'block';
        }

        return (
            <div>
                <div className="ui  margin-grid ">
                    <div className="column profile-cover" style={{ backgroundImage: 'url(' + userInfo.cover_image + ')' }}>
                        <div className="dp-container">
                            <img className="ui tiny circular image dp" id="change_profile_image" src={userInfo.profile_image} alt="" />
                            <a className="action act-cover-image"><i id="change_banner_image" className="write icon"></i></a>
                            <div className="title">
                                <h3>{userInfo.fname}</h3>
                                <span className="text-shadow">{userInfo.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui secondary  menu account">
                    <a  onClick={this.onTabClick.bind(this,0)}  className=" act-menu active item" style={{"padding":"0 10px!important"}}>
                        <i className="file image outline icon"></i> {GetText('PRFL_TAB_MYPROFILE', mlarray)}
                    </a>
                    <a  onClick={this.onTabClick.bind(this,1)}  className="act-menu item" style={{"padding":"0 10px!important"}}>
                        <i className="user icon"></i> {GetText('PRFL_TAB_MYMANAGER', mlarray)}
                    </a>
                    <a  onClick={this.onTabClick.bind(this,2)}  className=" act-menu item" style={{"padding":"0 10px!important"}}>
                        <i className="users icon"></i> {GetText('PRFL_TAB_MYTEAM', mlarray)}
                    </a>
                </div>
                <div className="ui two column stackable grid">

                    <div className="ten wide column" style={{ "display": activeTab[0] }}>
                        <div className="ui segment">
                            <h4 className="ui header ryt">{GetText('PRFL_EDIT_PROFILE', mlarray)}</h4>
                            <div className="ui small form">

                                {summaryForm}

                                {personalInfoForm}

                                {generalInfoForm}

                            </div>
                        </div>
                    </div>

                    <div className="ten wide column" style={{ "display": activeTab[1] }}>
                        <MyManager />
                    </div>

                    <div className="ten wide column" style={{ "display": activeTab[2] }}>
                        <MyTeam />
                    </div>

                </div>
            </div>
        );
    }
}

MyProfile.contextTypes = { router: React.PropTypes.func };
