import React from 'react';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import CustomSurveyFormsStore from 'stores/CustomSurveyFormsStore';
import { Navigation } from 'react-router';
import mixins from 'es6-mixins';
import MlangStore from 'stores/MlangStore';
import GetText from 'utils/GetText';

export default class Customsurveyforms extends React.Component {

    constructor(props) {
        super(props);
        mixins(Navigation, this);
        this.state = CustomSurveyFormsStore.getState();
        this.state.filtered = [];
        this.state.multilang = MlangStore.getState().multilang;
    }

    componentDidMount() {
        CustomSurveyActions.getCustomSurveyForms();
        CustomSurveyFormsStore.listen(this._onChange);
        MlangStore.listen(this._onMLChange);
    }

    componentWillUnmount() {
        CustomSurveyFormsStore.unlisten(this._onChange);
        MlangStore.unlisten(this._onMLChange);
    }

    _onChange = (state) => {
        this.setState({
            forms: CustomSurveyFormsStore.getState().forms,
            formid: CustomSurveyFormsStore.getState().formid,
            filtered: this.state.forms
        });

        if(this.state.formid){
            this.handleOnDeleteForm(this.state.formid);
        }
    }

    _onMLChange = () => {
        this.setState({
            multilang: MlangStore.getState().multilang
        });
    }

    handleOnDeleteForm = (id) => {
        let forms = this.state.forms;
        for (let i = 0; i < forms.length; i++) {
            let form = forms[i];
            if (form._id === id) {
                forms.splice(i, 1);
                this.setState({forms: forms});
            }
        }
    }

    onSearchTitle = (e) => {
        e.preventDefault();
        let text = e.target.value;
        let forms = this.state.forms;
        let filtered = [];
        forms.map((data, key) => {
            if((data.surveytitle.toLowerCase()).indexOf(text.toLowerCase()) === 0){
                filtered.push(data);
            }
        });
        this.setState({filtered: filtered});
    }

    onDeleteForm = (e) => {
        e.preventDefault();
        let id = e.target.id;
        CustomSurveyActions.deleteForm(id);
    }

    onTakeASurvey = (e) => {
        e.preventDefault();
        let id = e.target.id;
        window.location.assign('/takesurvey/' + id);
    }

    onViewResponse = (e) => {
        e.preventDefault();
        let id = e.target.id;
        window.location.assign('/surveyresponses/' + id);
    }

    render() {
        let mlarray = this.state.multilang;
        let forms = this.state.filtered;
        let items = null;
        let sno = 1;
        let content;

        if ((this.state.forms).length > 0) {
            items = forms.map((form) => {
                return (
                    <tr>
                        <td>{sno++}</td>
                        <td>{form.surveytitle}</td>
                        <td>{form.createddate}</td>
                        <td><a href="#" onClick={this.onTakeASurvey} id={form._id}>{GetText('SVFM_VIEWSURVEY_LINK', mlarray)}</a> &nbsp;|&nbsp;
                            <a href="#" onClick={this.onViewResponse} id={form._id}>{GetText('SVFM_VIEWRESPONSES_LINK', mlarray)}</a> &nbsp;|&nbsp;
                            <a href="#" onClick={this.onDeleteForm} id={form._id}>{GetText('SVFM_DELETE_LINK', mlarray)}</a>
                        </td>
                    </tr>
                );
            });

            content = [
                <div className="ui four column stackable grid container">
                    <div className="five column">
                        <div className="ui search">
                            <div className="ui icon input">
                                <input className="prompt" type="text" placeholder={GetText('SVFM_SEARCH_BOX', mlarray)} name="searchtitle" id="searchtitle" onChange={this.onSearchTitle} />
                                <i className="search icon"></i>
                            </div>
                            <div className="results"></div>
                        </div>
                    </div>
                </div>,

                <div className="ui container">
                    <table id="tableData" className="ui celled striped table">
                        <thead>
                            <tr>
                                <th>{GetText('SVFM_TBLNUMBER', mlarray)}</th>
                                <th>{GetText('SVFM_TBLTITLE', mlarray)}</th>
                                <th>{GetText('SVFM_TBLDATE', mlarray)}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
            ];
        } else {
            content = [
                <div className="custom-box">
                    <div className="ui one column stackable grid survey">
                        <div className="column ">
                            <label className="line-height">No items found.</label>
                        </div>
                    </div>
                </div>
            ];
        }

        const mySurveyTabContent = [
            <div className="ui segment brdr-none padding-none width-rating  ">
                <div className="clear"></div>
                <div className="ui two column stackable grid container ">
                    <div className="column">
                        <h4 className="ui header ryt com">{GetText('SVFM_TITLE', mlarray)}</h4>
                    </div>
                </div>
                {content}
            </div>
        ];

        return (
            <div>
                <div className="ui tabular menu tab two column">
                    <a className="item mobile column" href="/customsurvey">Create new survey</a>
                    <a className="item mobile active column" href="/surveyforms">My surveys</a>
                    <a className="item mobile column" href="/viewsurvey">Participate in surveys</a>
                </div>
                {mySurveyTabContent}
            </div>
        );
    }
}

Customsurveyforms.contextTypes = { router: React.PropTypes.func };
