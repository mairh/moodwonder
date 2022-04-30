import React from 'react';
import getFormData from 'get-form-data';
import NotificationRulesActions from 'actions/NotificationRulesActions';
import NotificationRulesStore from 'stores/NotificationRulesStore';
import RequireAuth from 'utils/requireAuth';

export default RequireAuth(class Notificationrules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rules: [],
            showrules: true,
            editkey: '',
            editvalue: '',
            editdescription: '',
            editstatus: '',
            editid: ''
        };
    }

    componentDidMount() {
        NotificationRulesActions.getRules();
        NotificationRulesStore.listen(this._onChange);
    }

    componentWillUnmount() {
        NotificationRulesStore.unlisten(this._onChange);
    }

    _onChange = () => {
        this.setState({
            rules: NotificationRulesStore.getState().rules
        });
    }

    onRuleSubmit = (e) => {
        e.preventDefault();
        let form = document.querySelector('#ruleForm');
        let data = getFormData(form, {trim: true});
        let id = data['id'];

        let rule = rule || {};
        rule.rule_key = data['rule_key'];
        rule.rule_value = data['rule_value'];
        rule.description = data['description'];
        rule.status = data['status'];

        if (window.confirm('Are you sure?')) {
            if(id !== '') {
                console.log(JSON.stringify(rule));
                NotificationRulesActions.editRule(id, rule);
            }
        }

        this.setState({showrules: true});
        this.setState({showform: false});

    }

    onEditRule = (e, child) => {
        this.setState({showform: true});
        this.setState({showrules: false});
        let id = e.target.id;
        let rules = this.state.rules;

        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            if (rule._id === id) {
                this.setState({editkey: rule.rule_key});
                this.setState({editvalue: rule.rule_value});
                this.setState({editdescription: rule.description});
                this.setState({editid: rule._id});
                this.setState({editstatus: rule.status});
            }
        }
    }

    onDeleteRule = (e) => {
        e.preventDefault();
        let id = e.target.id;
        NotificationRulesActions.deleteRule(id);
    }


    onListRules = (e) => {
        e.preventDefault();
        this.setState({showrules: true});
        this.setState({showform: false});
    }

    onChangeKey = (e) => {
        e.preventDefault();
        let key = e.target.value;
        this.setState({editkey: key});
    }

    onChangeValue = (e) => {
        e.preventDefault();
        let value = e.target.value;
        this.setState({editvalue: value});
    }

    onChangeDescription = (e) => {
        e.preventDefault();
        let description = e.target.value;
        this.setState({editdescription: description});
    }

    onChangeStatus = (e, child) => {
        e.preventDefault();
        let id = e.target.id;
        let item = document.getElementById(id);

        let rule = rule || {};
        if(item.getAttribute("data-status") === 'active') {
            rule.status = 'inactive';
        } else {
            rule.status = 'active';
        }
        rule.rule_key = item.getAttribute("data-rulekey");
        rule.rule_value = item.getAttribute("data-rulevalue");
        rule.description = item.getAttribute("data-description");

        NotificationRulesActions.editRule(id, rule);
    }

    onChangeRuleStatus = (e) => {
        e.preventDefault();
        let editstatus = e.target.value;
        this.setState({editstatus: editstatus});
    }



    render() {

        let rules = this.state.rules;
        let showrules = this.state.showrules;
        let showform = this.state.showform;

        let rulelists = '';
        let formcontents = '';
        let items = '';
        let sno = 1;

        if (showrules) {
            items = rules.map((rule) => {
                return (
                    <tr>
                        <td className="text-center">{sno++}</td>
                        <td className="text-center">{rule.rule_key}</td>
                        <td className="text-center">{rule.rule_value}</td>
                        <td className="text-center">{rule.description}</td>
                        <td className="text-center">
                            <a href="#"
                                id={rule._id}
                                data-rulekey={rule.rule_key}
                                data-rulevalue={rule.rule_value}
                                data-description={rule.description}
                                data-status={rule.status}
                                onClick={this.onChangeStatus}
                                >{rule.status}</a>
                        </td>
                        <td className="text-center">
                            <a href="#"
                                onClick={this.onEditRule}
                                id={rule._id}>Edit</a>
                            &nbsp;&nbsp;
                            <a href="#" onClick={this.onDeleteRule} id={rule._id}>Delete</a>
                        </td>
                    </tr>
                );
            });

            rulelists = (
                <div className="ui container">

                    <table className="ui celled table">
                        <thead>
                            <tr className="info">
                                <th className="text-center"></th>
                                <th className="text-center">Rule key</th>
                                <th className="text-center">Value</th>
                                <th className="text-center">Description</th>
                                <th className="text-center">Status</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (showform) {
            formcontents = (
                <div className="ui container">
                    <div className="ui six column stackable grid container ">
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column">
                            <button className="ui orange button" style={{"height":"40px !important"}} href="#" onClick={this.onListRules}>List notification rules</button>
                        </div>
                    </div>
                    <h4>Edit rules</h4>
                    <div className="ui three column stackable grid container ">
                        <div className="column">
                            <form id="ruleForm" className="ui form">
                                <div className="field">
                                    <label>Rule key</label>
                                    <input type="text"
                                        className="form-control"
                                        name="rule_key"
                                        value={this.state.editkey}
                                        onChange={this.onChangeKey}
                                        placeholder="rule key"/>
                                </div>
                                <div className="field">
                                    <label>Value</label>
                                    <input type="text"
                                        className="form-control"
                                        name="rule_value"
                                        value={this.state.editvalue}
                                        onChange={this.onChangeValue}
                                        placeholder="value"/>
                                </div>
                                <div className="field">
                                    <label>Description</label>
                                    <input type="text"
                                        className="form-control"
                                        name="description"
                                        value={this.state.editdescription}
                                        onChange={this.onChangeDescription}
                                        placeholder="description"/>
                                </div>
                                <div className="field">
                                    <label>Status</label>
                                    <select className="ui search dropdown" name="status" value={this.state.editstatus} onChange={this.onChangeRuleStatus}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <input type="hidden" name="id" value={this.state.editid}  ref="id"/>
                                    <button className="ui blue button" onClick={this.onRuleSubmit}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="ui container">
                <h2>Notification rules</h2>
                <br/>

                <div className="form-group">
                    {rulelists}
                </div>

                <div className="form-group">
                    {formcontents}
                </div>

            </div>
        );
    }
});
