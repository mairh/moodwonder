import React from 'react';
import Formsy from 'formsy-react';

let MyOwnInput = React.createClass({

    mixins: [Formsy.Mixin],

    changeValue: function (event) {
        this.setValue(event.currentTarget.value);
    },
    render: function () {

        let errorMessage = this.getErrorMessage();

        let classNames = {
            formGroup: ['form-group'],
            elementWrapper: []
        };

        if (errorMessage) {
            classNames.formGroup.push('has-error');
            classNames.formGroup.push('has-feedback');
        }

        let elementWrapper = classNames.formGroup.join(' ');

        return (
            <div className={elementWrapper}>
                <input type={this.props.type || 'text'} placeholder={this.props.placeholder}
                    className={this.props.className} name={this.props.name} onChange={this.changeValue}
                    value={this.getValue()} autoComplete={this.props.autocomplete || 'on' }
                    disabled={this.props.disabled || false } />
                <span className='help-block validation-message'>{errorMessage}</span>
            </div>
        );
    }
});

let MyOwnSelect = React.createClass({

    mixins: [Formsy.Mixin],

    changeValue: function (event) {
        this.setValue(event.currentTarget.value);
        if(typeof this.props.onChange !== 'undefined'){
            this.props.onChange(event.currentTarget.value);
        }
    },

    render: function () {

        let errorMessage = this.getErrorMessage();

        let classNames = {
            formGroup: ['form-group'],
            elementWrapper: []
        };

        if (errorMessage) {
            classNames.formGroup.push('has-error');
            classNames.formGroup.push('has-feedback');
        }

        let elementWrapper = classNames.formGroup.join(' ');

        let options = this.props.options.map((data, key) => {
            return (
                <option key={key} data={data._id} value={data.text} >{data.text}</option>
            );
        });

        return (
            <div className={elementWrapper}>
                <select className={this.props.className} name={this.props.name} onChange={this.changeValue}
                    defaultValue={this.props.value} value={this.getValue()}>
                    <option value=''>{this.props.placeholder}</option>
                    {options}
                </select>
                <span className='help-block validation-message'>{errorMessage}</span>
            </div>
        );
    }
});

export { MyOwnInput, MyOwnSelect };
