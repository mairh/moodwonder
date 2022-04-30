import React from 'react';

export default class Textbox extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let tid = this.props.tid;
        let index = tid;
        return (
            <div id={index} key={index} className="inline fields">
                <div className="field"><label>Textbox</label></div>
            </div>
        );
    }
}
