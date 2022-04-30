import React from 'react';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class SliderRow extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            moodrate: '',
            multilang: MlangStore.getState().multilang
        };
    }

    componentDidMount() {
        MlangStore.listen(this._onMLChange);
    }

    componentWillUnmount() {
        MlangStore.unlisten(this._onMLChange);
    }

    onChangeMood = (e) => {
        e.preventDefault();
        let moodrate = e.target.value;
        this.setState({moodrate: moodrate});
    }

    _onMLChange = () => {
        this.setState({
            multilang: MlangStore.getState().multilang
        });
    }

    render () {
        let mood = this.props.mood;
        let moodrate = (this.state.moodrate) ? this.state.moodrate : ((this.props.lastrated) ? this.props.lastrated : 3.7 );
        let mlarray = this.state.multilang;

        return (
            <div className="ui three column doubling stackable grid container labeled button" tabIndex="0">
                <div className="ui yellow mwgrey button column">{GetText("SRVY_" + mood + "_KEY", mlarray)}</div>
                <div className="ui basic yellow left pointing label column"> {GetText("SRVY_" + mood + "_DES", mlarray)} </div>
                <div className="mood-slider column">
                    <div className="ui range" style={{"width":"100%"}}>
                        <input type="range" name={mood} max="5" min="1" value={moodrate} step="0.1" onChange={this.onChangeMood} className="sliderinput" style={{"float": "left", "marginTop": "5px"}} />
                        <span className="slider-value">{moodrate}</span>
                    </div>
                </div>
            </div>
        );
    }
}
