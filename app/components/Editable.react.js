import React from 'react';
/*
* Component for Editable UI
*
*/
export default class Editable extends React.Component {

    constructor(props) {
        super(props);
        this.state =
        {
            Edit: false,
            value:props.value,
            btnDisabled: true
        };
    }

    componentWillReceiveProps(e) {
        // to set default
        this.setState({Edit: false, value: this.props.value });
    }

    changeValue = (event) => {
        let btnDisabled = true;
        if(this.props.value !== event.target.value){
            btnDisabled = false;
        }
        this.setState({value:event.target.value, btnDisabled: btnDisabled});
    }

    onEditClick = () => {
        this.setState({Edit: true, value: this.props.value });
    }

    onSaveClick = (teamname,teamid) => {
        console.log(teamname);
        console.log(teamid);
        if(this.props.value !== this.state.value && teamname.trim() !== ''){
            this.props.onSave({teamname:teamname,teamid:teamid});
        }
    }

    render() {

        let buttonlabel = 'Edit';

        let inputORLable = (
            <label htmlFor="email">{this.props.value}</label>
        );

        let actionButton = (
            <button type="button" className="btn btn-default" onClick={this.onEditClick} >{buttonlabel}</button>
        );

        if(this.state.Edit){
            buttonlabel  = 'Save';
            inputORLable = (
                <input type="text" className="form-control" ref="email"  onChange={this.changeValue} value={this.state.value} />
            );

            actionButton = (
                <button type="button" disabled={this.state.btnDisabled} className="btn btn-default" onClick={this.onSaveClick.bind(this,this.state.value,this.props.teamid)} >{buttonlabel}</button>
            );
        }

        return (
            <div className="row">
                {inputORLable}
                {actionButton}
            </div>
        );
    }
}
