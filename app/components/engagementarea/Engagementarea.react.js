import React from 'react';
import getFormData from 'get-form-data';
import EngagementAreaActions from 'actions/EngagementAreaActions';
import EngagementAreaStore from 'stores/EngagementAreaStore';
import RequireAuth from 'utils/requireAuth';

export default RequireAuth(class Engagementarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            engagementareas: [],
            editmood: '',
            editdescription: '',
            editstatus: '',
            editid: '',
            addengagementform: false,
            editengagementform: false,
            showlists: true,
            showform: false
        };
    }

    componentDidMount() {
        EngagementAreaStore.listen(this._onChange);
        EngagementAreaActions.getEngagements();
    }

    componentWillUnmount() {
        EngagementAreaStore.unlisten(this._onChange);
    }

    _onChange = () => {
        this.setState({
            engagementareas: EngagementAreaStore.getState().engagementareas
        });
    }

    onLanguageSubmit = (e) => {
        e.preventDefault();
        let form = document.querySelector('#engagementForm');
        let data = getFormData(form, {trim: true});
        let id = data['id'];

        let engagementarea = engagementarea || {};
        engagementarea.mood = data['mood'];
        engagementarea.description = data['description'];
        engagementarea.status = data['status'];

        if (window.confirm('Are you sure?')) {
            console.log(JSON.stringify(engagementarea));
            if(id === '') {
                EngagementAreaActions.addEngagement(engagementarea);
            } else {
                EngagementAreaActions.editEngagement(id, engagementarea);
            }
        }

        this.setState({showlists: true});
        this.setState({showform: false});

    }

    onDeleteEngagement = (e) => {
        e.preventDefault();
        let id = e.target.id;
        EngagementAreaActions.deleteEngagement(id);
    }

    onAddEngagement = (e) => {
        e.preventDefault();
        this.setState({addengagementform: true});
        this.setState({showform: true});
        this.setState({showlists: false});
        this.setState({editengagementform: false});
        this.setState({editmood: ''});
        this.setState({editid: ''});
        this.setState({editdescription: ''});
        this.setState({editstatus: ''});
    }

    onEditEngagement = (e, child) => {
        this.setState({addengagementform: false});
        this.setState({showform: true});
        this.setState({showlists: false});
        let id = e.target.id;
        let engagementareas = this.state.engagementareas;

        for (let i = 0; i < engagementareas.length; i++) {
            let engagementarea = engagementareas[i];
            if (engagementarea._id === id) {
                this.setState({editmood: engagementarea.mood});
                this.setState({editdescription: engagementarea.description});
                this.setState({editid: engagementarea._id});
                this.setState({editstatus: engagementarea.status});
                this.setState({editengagementform: true});
            }
        }
    }

    onChangeEngagementStatus = (e) => {
        e.preventDefault();
        let editstatus = e.target.value;
        this.setState({editstatus: editstatus});
    }

    onChangeMood = (e) => {
        e.preventDefault();
        let mood = e.target.value;
        this.setState({editmood: mood});
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

        let engagementarea = engagementarea || {};
        if(item.getAttribute("data-status") === 'active') {
            engagementarea.status = 'inactive';
        } else {
            engagementarea.status = 'active';
        }
        engagementarea.mood = item.getAttribute("data-mood");
        engagementarea.description = item.getAttribute("data-description");

        EngagementAreaActions.editEngagement(id, engagementarea);
    }

    onListEngagements = (e) => {
        e.preventDefault();
        this.setState({showlists: true});
        this.setState({showform: false});
    }

    render() {
        let engagementareas = this.state.engagementareas;
        let addengagementform = this.state.addengagementform;
        let editengagementform = this.state.editengagementform;
        let showlists = this.state.showlists;
        let showform = this.state.showform;

        let formcontents = '';
        let engagementlists = '';
        let items = '';
        let sno = 1;
        let formtitle = '';

        if (addengagementform) {
            formtitle = 'Add new engagement area';
        } else if (editengagementform) {
            formtitle = 'Edit engagement area';
        }

        if (showlists) {
            items = engagementareas.map((engagementarea) => {
                return (
                    <tr>
                        <td className="text-center">{sno++}</td>
                        <td className="text-center">{engagementarea.mood}</td>
                        <td className="text-center">{engagementarea.description}</td>
                        <td className="text-center">
                            <a href="#"
                                id={engagementarea._id}
                                data-mood={engagementarea.mood}
                                data-description={engagementarea.description}
                                data-status={engagementarea.status}
                                onClick={this.onChangeStatus}
                                >{engagementarea.status}</a>
                        </td>
                        <td className="text-center">
                            <a href="#"
                                onClick={this.onEditEngagement}
                                id={engagementarea._id}>Edit</a>
                            &nbsp;/&nbsp;
                            <a href="#" onClick={this.onDeleteEngagement} id={engagementarea._id}>Delete</a>
                        </td>
                    </tr>
                );
            });

            engagementlists = (
                <div className="ui container">
                    <div className="ui six column stackable grid container ">
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column"></div>
                        <div className="column">
                            <button className="ui orange button" style={{"height":"40px !important"}} href="#" onClick={this.onAddEngagement}>Add Engagement</button>
                        </div>
                    </div>
                    <table className="ui celled table">
                        <thead>
                            <tr className="info">
                                <th className="text-center"></th>
                                <th className="text-center">Mood</th>
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
                            <button className="ui orange button" style={{"height":"40px !important"}} href="#" onClick={this.onListEngagements}>List Engagement areas</button>
                        </div>
                    </div>

                    <h4>{formtitle}</h4>
                    <div className="ui three column stackable grid container ">
                        <div className="column">
                            <form id="engagementForm" className="ui form">
                                <div className="field">
                                    <label>Mood</label>
                                    <input type="text"
                                        className="form-control"
                                        name="mood"
                                        value={this.state.editmood}
                                        onChange={this.onChangeMood}
                                        placeholder="mood"/>
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
                                    <select className="ui search dropdown" name="status" value={this.state.editstatus} onChange={this.onChangeEngagementStatus}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <input type="hidden" name="id" value={this.state.editid}  ref="id"/>
                                    <button className="ui blue button" onClick={this.onLanguageSubmit}>Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="column"></div>
                        <div className="column"></div>
                    </div>
                </div>
            );
        }

        return (
            <div className="ui container">
                <h2>Engagement area</h2>

                <div className="form-group">
                    {formcontents}
                </div>

                <div className="form-group">
                    {engagementlists}
                </div>

            </div>
        );
    }
});
