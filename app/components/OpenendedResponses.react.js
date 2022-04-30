import React from 'react';
import OpenEndedActions from 'actions/OpenEndedActions';
import OpenEndedStore from 'stores/OpenEndedStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class OpenendedResponses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answers : OpenEndedStore.getState().answers,
            multilang: MlangStore.getState().multilang,
            area: 'most_improved',
            mood: 'All'
        };
    }

    componentDidMount() {
        OpenEndedStore.listen(this._onOpenChange);
        OpenEndedActions.getAnswers(this.state.area, this.state.mood);

        $('.area').dropdown({
            onChange: this.onChangeArea
        });

        $('.mood').dropdown({
            onChange: this.onChangeMood
        });
    }

    componentWillUnmount() {
        OpenEndedStore.unlisten(this._onOpenChange);
    }

    _onOpenChange = () => {
        this.setState({
            answers : OpenEndedStore.getState().answers
        });
    }

    onChangeArea = () => {
        let area = document.getElementById("area").value;
        this.setState({ area: area});
        OpenEndedActions.getAnswers(area, this.state.mood);
    }

    onChangeMood = () => {
        let mood = document.getElementById("mood").value;
        this.setState({ mood: mood});
        OpenEndedActions.getAnswers(this.state.area, mood);
    }

    render() {


        let answers = this.state.answers;
        let mlarray = this.state.multilang;
        let content;

        let data = answers.map((ans) => {
            let temp = {};

            temp.most_improved_qone = ans.most_improved_qone;
            temp.most_improved_aone = ans.most_improved_aone;
            temp.most_improved_qtwo = ans.most_improved_qtwo;
            temp.most_improved_atwo = ans.most_improved_atwo;
            temp.most_improved_qthree = ans.most_improved_qthree;
            temp.most_improved_athree = ans.most_improved_athree;
            temp.least_improved_qone = ans.least_improved_qone;
            temp.least_improved_aone = ans.least_improved_aone;
            temp.least_improved_qtwo = ans.least_improved_qtwo;
            temp.least_improved_atwo = ans.least_improved_atwo;
            temp.least_improved_qthree = ans.least_improved_qthree;
            temp.least_improved_athree = ans.least_improved_athree;
            temp.most_improved_mood = ans.most_improved_mood;
            temp.least_improved_mood = ans.least_improved_mood;

            return temp;
        });


        if (data.length > 0) {

            content = data.map((row, index) => {
                let color;
                if ((index % 2) == 0) {
                    color = '#F5F5F5';
                } else {
                    color = '#EEEEEE';
                }

                let mostImproved;
                let leastImproved;
                if (this.state.area === 'most_improved') {
                    mostImproved = (
                        <div className="ui one column stackable grid survey">
                            <div className="column padin-lft">
                                <div className="ui form options">
                                    <div className="inline fields">{'Most improved areas - ' + row.most_improved_mood}</div>
                                </div>
                            </div>

                            <div className="column ">
                                <label className=""></label>
                            </div>

                            <div className="column padin-lft">
                                <div className="">
                                    <div className="inline fields">Q:&nbsp; {row.most_improved_qone}</div>
                                </div>
                            </div>

                            <div className="column ">
                                <label className="">A:&nbsp; {row.most_improved_aone}</label>
                            </div>

                            <div className="column padin-lft">
                                <div className="ui form ">
                                    <div className="inline fields"></div>
                                </div>
                            </div>

                            <div className="column padin-lft">
                                <div className="">
                                    <div className="inline fields">Q:&nbsp; {row.most_improved_qtwo}</div>
                                </div>
                            </div>

                            <div className="column ">
                                <label className="">A:&nbsp; {row.most_improved_atwo}</label>
                            </div>

                            <div className="column padin-lft">
                                <div className="ui form ">
                                    <div className="inline fields"></div>
                                </div>
                            </div>

                            <div className="column padin-lft">
                                <div className="">
                                    <div className="inline fields">Q:&nbsp; {row.most_improved_qthree}</div>
                                </div>
                            </div>

                            <div className="column ">
                                <label className="">A:&nbsp; {row.most_improved_athree}</label>
                            </div>
                        </div>
                    );

                } else {
                    leastImproved = (
                        <div className="ui one column stackable grid survey">
                            <div className="column padin-lft">
                                <div className="ui form options">
                                    <div className="inline fields">{'Least improved areas - ' + row.least_improved_mood}</div>
                                </div>
                            </div>

                            <div className="column ">
                                <label className=""></label>
                            </div>

                            <div className="column padin-lft">
                                <div className="">
                                    <div className="inline fields">Q:&nbsp; {row.least_improved_qone}</div>
                                </div>
                            </div>

                            <div className="column ">
                                <label className="">A:&nbsp; {row.least_improved_aone}</label>
                            </div>

                            <div className="column padin-lft">
                                <div className="ui form ">
                                    <div className="inline fields"></div>
                                </div>
                            </div>

                            <div className="column padin-lft">
                                <div className="">
                                    <div className="inline fields">Q:&nbsp; {row.least_improved_qtwo}</div>
                                </div>
                            </div>

                            <div className="column ">
                                <label className="">A:&nbsp; {row.least_improved_atwo}</label>
                            </div>

                            <div className="column padin-lft">
                                <div className="ui form ">
                                    <div className="inline fields"></div>
                                </div>
                            </div>

                            <div className="column padin-lft">
                                <div className="">
                                    <div className="inline fields">Q:&nbsp; {row.least_improved_qthree}</div>
                                </div>
                            </div>

                            <div className="column ">
                                <label className="">A:&nbsp; {row.least_improved_athree}</label>
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="custom-box" style={{"background":color}}>
                        {mostImproved}
                        {leastImproved}
                    </div>
                );
            });

        } else {

            content = (
                <div className="custom-box">
                    <div className="ui two column stackable grid survey">
                        <div className="column ">
                            <label className="line-height">No results.</label>
                        </div>
                        <div className="column "></div>
                    </div>
                </div>
            );
        }



        return (
            <div className="ui segment brdr-none padding-none width-rating">
                <div className="clear"></div>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <h4 className="ui header ryt com">{GetText('OPER_TITLE', mlarray)}</h4>
                    </div>
                    <div className="column">
                        <div className="three column">
                            <select style={{"float": "right"}} id="area" className="ui dropdown area">
                                <option value="most_improved">{GetText('OPER_MOST_IMPROVED', mlarray)}</option>
                                <option value="least_improved">{GetText('OPER_LEAST_IMPROVED', mlarray)}</option>
                            </select>
                        </div>
                    </div>
                    <div className="column">
                        <div className="three column">
                            <select name="optmood" style={{"float": "right"}} id="mood" className="ui dropdown mood">
                                <option value="All">{GetText('OPER_OPTALL', mlarray)}</option>
                                <option value="Mood">{GetText('OPER_OPTMOOD', mlarray)}</option>
                                <option value="Meaning">{GetText('OPER_OPTMEANING', mlarray)}</option>
                                <option value="Expectations">{GetText('OPER_OPTEXPECTATIONS', mlarray)}</option>
                                <option value="Strengths">{GetText('OPER_OPTSTRENGTHS', mlarray)}</option>
                                <option value="Recognition">{GetText('OPER_OPTRECOGNITION', mlarray)}</option>
                                <option value="Development">{GetText('OPER_OPTDEVELOPMENT', mlarray)}</option>
                                <option value="Influence">{GetText('OPER_OPTINFLUENCE', mlarray)}</option>
                                <option value="Goals">{GetText('OPER_OPTGOALS', mlarray)}</option>
                                <option value="Team">{GetText('OPER_OPTTEAM', mlarray)}</option>
                                <option value="Friendship">{GetText('OPER_OPTFRIENDSHIP', mlarray)}</option>
                                <option value="Feedback">{GetText('OPER_OPTFEEDBACK', mlarray)}</option>
                                <option value="Opportunities">{GetText('OPER_OPTOPPORTUNITIES', mlarray)}</option>
                                <option value="Recommendation">{GetText('OPER_OPTRECOMMENDATION', mlarray)}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {content}

            </div>
        );
    }
}
