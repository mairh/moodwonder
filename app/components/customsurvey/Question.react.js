import React from 'react';
import Radio from 'components/customsurvey/Radio.react';
import Checkbox from 'components/customsurvey/Checkbox.react';
import Textbox from 'components/customsurvey/Textbox.react';
import Textarea from 'components/customsurvey/Textarea.react';

export default class Question extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    onRemoveQuestion = (e) => {
        e.preventDefault();
        this.props.onClick(this);
    }

    onSelectAnswerType = (e) => {
        this.props.onChange(e, this);
    }

    onRemoveRadioOption = (e, child) => {
        this.props.removeRadio(e, child);
    }

    onAddRadioOption = (e) => {
        e.preventDefault();
        this.props.addRadio(e, this);
    }

    onRemoveCheckboxOption = (e, child) => {
        this.props.removeCheckbox(e, child);
    }

    onAddCheckboxOption = (e) => {
        e.preventDefault();
        this.props.addCheckbox(e, this);
    }

    changeHandler = (key, formdata, field) => {
        this.props.changeQuestion(key, formdata, field);
    }

    changeRadioHandler = (key, formdata, field) => {
        this.props.changeRadio(key, formdata, field);
    }

    changeCheckboxHandler = (key, formdata, field) => {
        this.props.changeCheckbox(key, formdata, field);
    }

    render () {
        let qid = this.props.qid;
        let sno = this.props.sno;
        let formdata = this.props.formdata;
        let question = this.props.question;
        let qnsplcholder = this.props.qnsplcholder;
        let anstypelbl = this.props.anstypelbl;
        let anstypedefault = this.props.anstypedefault;
        let childaddbtn = this.props.childaddbtn;
        let childcancelbtn = this.props.childcancelbtn;

        let radio = this.props.radio;
        let radioComponent = '';
        let radioAddBtn = '';

        let checkbox = this.props.checkbox;
        let checkboxComponent = '';
        let checkboxAddBtn = '';

        let textbox = this.props.textbox;
        let textboxComponent = '';

        let textarea = this.props.textarea;
        let textareaComponent = '';

        radioComponent = radio.map((rid) => {
            return (<Radio
                qid={qid}
                rid={rid}
                formdata={formdata}
                removeRadio={this.onRemoveRadioOption}
                changeRadio={this.changeRadioHandler}
                childcancelbtn={childcancelbtn} />
            );
        });

        if (radio.length > 0) {
            radioAddBtn = (
                <div className="field">
                    <a href="#" id={qid} onClick={this.onAddRadioOption} className="ui submit button submitt"><i className="plus icon"></i>{childaddbtn}</a>
                </div>
            );
        }

        checkboxComponent = checkbox.map((cid) => {
            return (<Checkbox
                qid={qid}
                cid={cid}
                formdata={formdata}
                removeCheckbox={this.onRemoveCheckboxOption}
                changeCheckbox={this.changeCheckboxHandler}
                childcancelbtn={childcancelbtn} />
            );
        });

        if (checkbox.length > 0) {
            checkboxAddBtn = (
                <div className="field">
                    <a href="#" id={qid} onClick={this.onAddCheckboxOption} className="ui submit button submitt"><i className="plus icon"></i>{childaddbtn}</a>
                </div>
            );
        }

        textboxComponent = textbox.map((tid) => {
            return (<Textbox qid={qid} tid={tid} />);
        });

        textareaComponent = textarea.map((txid) => {
            return (<Textarea qid={qid} txid={txid} />);
        });

        let qValue = '';
        if (typeof formdata === 'undefined') {
            qValue = '';
        } else {
            qValue = formdata['question_' + qid];
        }

        return (
            <div id={qid} key={qid} className="ui two column stackable grid survey test"  style={{"marginRight": "0px !important"}}>
                <div className="one wide column qst-mobile">
                    <div className="ui grey circular label"> Q.{sno}</div>
                </div>
                <div className="fifteen wide column padin-lft">
                    <div className="ui left pointing label">
                        <span className="qst-mobile-1">Q.{sno}</span> {question} {sno}?
                        <a href="#" className="action" id={qid} onClick={this.onRemoveQuestion}>
                            <i className="trash icon"></i>
                        </a>
                    </div>
                    <div className="ui form options">
                        <div className="ui form options" >
                            <div className=" field">
                                <input
                                    type="text"
                                    ref={'question_' + qid}
                                    value={qValue}
                                    onChange={this.changeHandler.bind(this, 'formdata', 'question_' + qid)}
                                    name={'question_' + qid}
                                    className="form-control"
                                    id={'question_' + qid}
                                    placeholder={qnsplcholder}/>
                            </div>
                            <div className="inline fields">
                                <div className="field">
                                    <label>{anstypelbl}</label>
                                </div>
                                <div className=" field">
                                    <select
                                        className="ui dropdown"
                                        ref={'answertype_' + qid}
                                        id={qid} name={'answertype_' + qid}
                                        onChange={this.onSelectAnswerType}>
                                        <option value="0">{anstypedefault}</option>
                                        <option value="radio">Radio</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="textarea">Textarea</option>
                                    </select>
                                </div>
                            </div>

                            {radioComponent}
                            {radioAddBtn}
                            {checkboxComponent}
                            {checkboxAddBtn}
                            {textboxComponent}
                            {textareaComponent}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
