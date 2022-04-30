import Immutable from 'immutable';
import CustomSurveyActions from 'actions/CustomSurveyActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

class CustomSurveyStore {

    constructor () {

        this.isSurveyCreated = false;
        this.form = Immutable.Map({});
        this.organization = [];
        this.myforms = [];

        this.bindListeners({
            handleCustomSurveyForm: CustomSurveyActions.CREATESURVEYFORM,
            handleSurveyForm: CustomSurveyActions.HANDLESURVEYFORM,
            handleOrganization: CustomSurveyActions.HANDLEORGANIZATION,
            handleMycSurveyForms: CustomSurveyActions.MYCSURVEYFORMS
        });
    }

    bootstrap () {
        if (!Immutable.OrderedMap.isOrderedMap(this.form)) {
            this.form = fromJSOrdered(this.form);
        }
    }

    handleCustomSurveyForm (data) {
        this.isSurveyCreated = true;
        this.emitChange();
    }

    handleSurveyForm (data) {
        this.form = data;
        this.emitChange();
    }

    handleOrganization (data) {
        this.organization = [];
        this.organization = data;
        this.emitChange();
    }

    handleMycSurveyForms (data) {
        this.myforms = [];
        this.myforms = data;
        this.emitChange();
    }

}

// Export our newly created Store
export default alt.createStore(CustomSurveyStore, 'CustomSurveyStore');
