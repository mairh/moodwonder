import React from 'react';
import Immutable from 'immutable';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h1>HOM_TITLE</h1>
            </div>
        );
    }
}

Index.propTypes = {
    topics: React.PropTypes.instanceOf(Immutable.OrderedMap),
    newTopic: React.PropTypes.string
};
