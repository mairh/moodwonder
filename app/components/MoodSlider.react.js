import React from 'react';

export default class MoodSlider extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            moodrate: ''
        };
    }

    onChangeMood = (e) => {
        e.preventDefault();
        let moodrate = e.target.value;
        this.setState({moodrate: moodrate});
    }

    render () {
        let moodrate = (this.state.moodrate) ? this.state.moodrate : ((this.props.lastrated) ? this.props.lastrated : 3.7 );
        let lastrated = this.props.lastrated;
        let lastratedvalue = '';

        if(lastrated) {
            lastratedvalue = (<span>{'Last rated ' + lastrated}</span>);
        }

        return (
            <div className="row">
                <div className="col-sm-6" >
                    {moodrate}
                    <br/>
                    <input type="range" name="moodrate" max="5" min="1" value={moodrate} step="0.1" onChange={this.onChangeMood} />
                    <br/>
                    {lastratedvalue}
                </div>
            </div>
        );
    }
}
