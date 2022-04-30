import React from 'react';

export default class ProfileLeft extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let index = this.props.pid;
        let uname = this.props.uname;
        let profileimg = this.props.profileimg;
        let plink = this.props.plink;
        let logoutlink = this.props.logoutlink;
        let uid = this.props.uid;

        return (
            <div id={index} key={index} className="profile item">
                <img id={index} key={index} className="ui mini image leftnav" src={profileimg} />
                <div className="ui dropdown">
                    <span id="userfullname" >{uname}</span>
                    <i className="angle down icon"></i>
                    <div className="menu">
                        <div className="item drop-down-item"><a id={index} key={index} href={ `/publicprofile/${uid}` } style={{"color":"#555459 !important"}}>{plink}</a></div>
                        <div className="item drop-down-item"><a href="/logout" style={{"color":"#555459 !important"}}>{logoutlink}</a></div>
                    </div>
                </div>
            </div>
        );
    }
}
