import React from 'react';

export default class Checkbox extends React.Component {

    constructor (props) {
        super(props);
    }

    onRemoveCheckboxOption = (e) => {
        e.preventDefault();
        this.props.removeCheckbox(e, this);
    }

    changeHandler = (key, formdata, field) => {
        this.props.changeCheckbox(key, formdata, field);
    }

    render () {
        let cid = this.props.cid;
        let formdata = this.props.formdata;
        let childcancelbtn = this.props.childcancelbtn;
        let index = cid;

        let cValue = '';
        if (typeof formdata === 'undefined') {
            cValue = '';
        } else {
            cValue = formdata[index];
        }
        return (
            <div id={index} key={index} className="inline fields">
                <div className="field four wide column"></div>
                <div className="field ">
                    <input
                        type="text"
                        ref={index}
                        value={cValue}
                        onChange={this.changeHandler.bind(this, 'formdata', index)}
                        name={index} id={index}
                        placeholder=""/>
                </div>
                <div className="field ">
                    <a href="#" id={index} onClick={this.onRemoveCheckboxOption} className="ui submit  button cancel">{childcancelbtn}</a>
                </div>
            </div>
        );
    }
}
