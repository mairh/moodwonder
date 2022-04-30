import React from 'react';

export default class Textarea extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let index = this.props.txid;

        return (
            <div id={index} key={index} className="inline fields">
                <div className="field "><label>Textarea</label></div>
            </div>
        );
    }
}
