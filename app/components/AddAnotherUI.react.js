import React from 'react';
import getFormData from 'get-form-data';
/*
* Component for AddAnotherUI
*
*/
export default class AddAnotherUI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter : 1,
            message : ""
        };
    }

    addNewTextBox = () => {
        let count = this.state.counter;
        count++;
        this.setState({counter: count });
    }

    formSubmit = (fmid) => {
        let form  =  document.querySelector(('#surveyForm'+fmid));
        let data  =  getFormData(form, {trim: true});
        let error =  false;

        if(typeof data.membername === 'string'){
            data.membername = [data.membername];
        }

        if(typeof data.membername === 'object' ){
            data.membername.map((value, key) => {
                if( value.trim() === '' ) {
                    error = true;
                }
            });
        }

        if(error) {
            this.setState({ message: "please fill the required fields" });
        }else {
            this.props.onSave(data);
        }

    }

    render() {

        let textboxes = [];
        let dropdown;
        let message;

        let options;
        if(this.props.data){

            options = this.props.data.map((value,key) => {
                return [ <option value={value._id}>{value.name}</option> ];
            });

            dropdown = (
                <div className="form-group">
                    <select className="ui search dropdown" ref="team_id" name="team_id">
                        <option value="">Select a team</option>
                        {options}
                    </select>
                </div>
            );
        }

        if (this.state.message !== '' ) {
            message = (
                <div className="alert alert-info">
                    {this.state.message}
                </div>
            );
        }

        for (let i=0; i < this.state.counter; i++) {
            textboxes.push(<RemovableTextbox/>);
        }
        let fmid = "surveyForm"+this.props.id;

        return (
            <div className="row">
                {message}
                <div className="col-sm-6">
                    <form role="form" id={fmid}>
                        {dropdown}
                        {textboxes}
                        <button type="button" onClick={this.formSubmit.bind(this,this.props.id)} className="btn btn-default">Submit</button>
                    </form>
                </div>
                <div className="col-sm-6">
                    <button type="button" onClick={this.addNewTextBox} className="btn btn-default">+</button>
                </div>
            </div>
        );
    }
}

class RemovableTextbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ui : true
        };
    }

    removeTextBox = () => {
        this.setState({ui: false });
    }

    render() {
        let textbox = (<div></div>);
        if(this.state.ui){
            textbox = (
                <div className="form-group">
                    <input type="text" className="form-control" ref="membername" name="membername" placeholder="Enter work email..."/>
                    <button type="button" onClick={this.removeTextBox} className="btn btn-default">-</button>
                </div>
            );
        }
        return (textbox);
    }
}
