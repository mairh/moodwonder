import React from 'react';

export default class HalfStar extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        let star = this.props.star;

        return (
            <i className={"star half empty icon " + star +"-haf"}></i>
        );
    }
}
