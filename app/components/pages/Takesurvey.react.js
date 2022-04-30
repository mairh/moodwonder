import React from 'react';
import PageActions from 'actions/PageActions';
import PageStore from 'stores/PageStore';

export default class Takesurvey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pagedata: [],
            language: props.language,
            TSVY_CANCEL_BTN: '',
            TSVY_SUBMIT_BTN: ''
        };
    }

    componentDidMount() {
        PageStore.listen(this._onChange);
        PageActions.getPage({page: 'takesurvey', language: this.state.language});
    }

    componentWillUnmount() {
        PageStore.unlisten(this._onChange);
    }

    _onChange = () => {
        this.setState({
            pagedata: PageStore.getState().pagedata
        });

        let pagedata = this.state.pagedata;
        this.setState({
            TSVY_CANCEL_BTN: pagedata.TSVY_CANCEL_BTN,
            TSVY_SUBMIT_BTN: pagedata.TSVY_SUBMIT_BTN
        });
    }

    onCancelLogin = (e) => {
        e.preventDefault();
    }

    onSubmitTakesurvey = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onChangeCancelBtn = (e) => {
        e.preventDefault();
        this.setState({ TSVY_CANCEL_BTN: e.target.value });
    }
    onChangeSubmitBtn = (e) => {
        e.preventDefault();
        this.setState({ TSVY_SUBMIT_BTN: e.target.value });
    }



    render() {

        let pagedata = this.state.pagedata;
        let TSVY_CANCEL_BTN = this.state.TSVY_CANCEL_BTN;
        let TSVY_SUBMIT_BTN = this.state.TSVY_SUBMIT_BTN;


        return (
            <div className="ui container">
                <h4>Edit - Takesurvey page keys</h4>
                <div className="ui three column stackable grid container ">
                    <div className="column">
                        <form id="takesurveyForm" className="ui form">
                            <input type="hidden" name="_id" value={pagedata._id} />
                            <input type="hidden" name="language" value={pagedata.language} />

                            <div className="field">
                                <label>TSVY_CANCEL_BTN</label>
                                <input className="form-control"
                                    name="TSVY_CANCEL_BTN"
                                    type="text"
                                    value={TSVY_CANCEL_BTN}
                                    onChange={this.onChangeCancelBtn} />
                            </div>
                            <div className="field">
                                <label>TSVY_SUBMIT_BTN</label>
                                <input className="form-control"
                                    name="TSVY_SUBMIT_BTN"
                                    type="text"
                                    value={TSVY_SUBMIT_BTN}
                                    onChange={this.onChangeSubmitBtn} />
                            </div>

                            <div className="field">
                                <button className="ui blue button" onClick={this.onSubmitTakesurvey}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="column"></div>
                    <div className="column"></div>
                </div>
            </div>
        );
    }

}
