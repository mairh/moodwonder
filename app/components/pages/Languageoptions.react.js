import React from 'react';
import _ from 'underscore';

export default class Languageoptions extends React.Component {

    constructor (props) {
        super(props);
    }

    onSelectLanguage = (e) => {
        this.props.onChange(e, this);
    }

    render () {
        let languages = this.props.languages;
        let options = '';
        let lcount = _.size(languages);
        if( lcount > 0 ) {
            options = languages.map((language) => {
                return (
                    <option value={language}>{language}</option>
                );
            });
        }

        return (
            <select className="ui search dropdown" onChange={this.onSelectLanguage}>
                {options}
            </select>
        );
    }
}
