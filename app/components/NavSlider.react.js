import React from 'react';

export default class NavSlider extends React.Component {

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

    onClickSmiley = (rate) => {
        this.setState({moodrate: rate});
    }

    render () {
        let moodrate = (this.state.moodrate) ? this.state.moodrate : ((this.props.lastrated) ? this.props.lastrated : 3.7 );
        let lastrated = this.props.lastrated;
        let lastratedvalue = '';

        if(lastrated) {
            lastratedvalue = 'Last rated : ' + lastrated;
        }

        return (
            <div>
                <input type="range" name="moodrate" max="5" min="1" value={moodrate} step="0.1" title={lastratedvalue} onChange={this.onChangeMood} />
                <span><img src="/assets/images/smiley-1.png" className="first rating-smiley" onClick={this.onClickSmiley.bind(null, 1)} /></span>
                <span><img src="/assets/images/smiley-2.png" className="rating-smiley" onClick={this.onClickSmiley.bind(null, 2)}/></span>
                <span><img src="/assets/images/smiley-3.png" className="rating-smiley" onClick={this.onClickSmiley.bind(null, 3)}/></span>
                <span><img src="/assets/images/smiley-4.png" className="rating-smiley" onClick={this.onClickSmiley.bind(null, 4)}/></span>
                <span><img src="/assets/images/smiley-5.png" className="rating-smiley rating-smiley-last" onClick={this.onClickSmiley.bind(null, 5)}/></span>
            </div>
        );
    }
}
