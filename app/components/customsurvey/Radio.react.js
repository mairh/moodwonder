import React from 'react';

export default class Radio extends React.Component {

    constructor (props) {
        super(props);
    }

    onRemoveRadioOption = (e) => {
        e.preventDefault();
        this.props.removeRadio(e, this);
    }

    changeHandler = (key, formdata, field) => {
        this.props.changeRadio(key, formdata, field);
    }

    render () {
        let rid = this.props.rid;
        let formdata = this.props.formdata;
        let childcancelbtn = this.props.childcancelbtn;
        let index = rid; // rid like 'q1r1'

        let rValue = '';
        if (typeof formdata === 'undefined') {
            rValue = '';
        } else {
            rValue = formdata[index];
        }

        return (
            <div id={index} key={index} className="inline fields">
                <div className="field four wide column"></div>
                <div className="field ">
                    <input
                        type="text"
                        ref={index}
                        value={rValue}
                        onChange={this.changeHandler.bind(this, 'formdata', index)}
                        name={index}
                        id={index}
                        placeholder=""/>
                </div>
                <div className="field ">
                    <a href="#" id={index} onClick={this.onRemoveRadioOption} className="ui submit  button cancel">{childcancelbtn}</a>
                </div>
            </div>
        );
    }
}
