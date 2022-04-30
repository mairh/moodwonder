import React from 'react';

export default class FullStar extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        let star = this.props.star;
        return (
            <i className={"icon active  "+ star}></i>
        );
    }
}
