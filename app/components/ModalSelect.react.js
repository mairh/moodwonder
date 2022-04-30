import React from 'react';
import Immutable from 'immutable';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class ModalSelect extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            mwkeys: MlangStore.getState().mwkeys
        };
    }

    render () {
        let mwkeys = this.state.mwkeys;
        let select = [
            <option value="">{GetText('MDL_OPT_DEFAULT', mwkeys)}</option>,
            <optgroup label={GetText('MDL_OPTGRP_ONE', mwkeys)}>
                <option value={GetText('MDL_GRPONE_OPT_ONE', mwkeys)}>{GetText('MDL_GRPONE_OPT_ONE', mwkeys)}</option>
                <option value={GetText('MDL_GRPONE_OPT_TWO', mwkeys)}>{GetText('MDL_GRPONE_OPT_TWO', mwkeys)}</option>
                <option value={GetText('MDL_GRPONE_OPT_THREE', mwkeys)}>{GetText('MDL_GRPONE_OPT_THREE', mwkeys)}</option>
                <option value={GetText('MDL_GRPONE_OPT_FOUR', mwkeys)}>{GetText('MDL_GRPONE_OPT_FOUR', mwkeys)}</option>
                <option value={GetText('MDL_GRPONE_OPT_FIVE', mwkeys)}>{GetText('MDL_GRPONE_OPT_FIVE', mwkeys)}</option>
                <option value={GetText('MDL_GRPONE_OPT_SIX', mwkeys)}>{GetText('MDL_GRPONE_OPT_SIX', mwkeys)}</option>
                <option value={GetText('MDL_GRPONE_OPT_SEVEN', mwkeys)}>{GetText('MDL_GRPONE_OPT_SEVEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPONE_OPT_EIGHT', mwkeys)}>{GetText('MDL_GRPONE_OPT_EIGHT', mwkeys)}</option>
            </optgroup>,
            <optgroup label={GetText('MDL_OPTGRP_TWO', mwkeys)}>
                <option value={GetText('MDL_GRPTWO_OPT_ONE', mwkeys)}>{GetText('MDL_GRPTWO_OPT_ONE', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_TWO', mwkeys)}>{GetText('MDL_GRPTWO_OPT_TWO', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_THREE', mwkeys)}>{GetText('MDL_GRPTWO_OPT_THREE', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_FOUR', mwkeys)}>{GetText('MDL_GRPTWO_OPT_FOUR', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_FIVE', mwkeys)}>{GetText('MDL_GRPTWO_OPT_FIVE', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_SIX', mwkeys)}>{GetText('MDL_GRPTWO_OPT_SIX', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_SEVEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_SEVEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_EIGHT', mwkeys)}>{GetText('MDL_GRPTWO_OPT_EIGHT', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_NINE', mwkeys)}>{GetText('MDL_GRPTWO_OPT_NINE', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_TEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_TEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_ELEVEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_ELEVEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_TWELVE', mwkeys)}>{GetText('MDL_GRPTWO_OPT_TWELVE', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_THIRTEEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_THIRTEEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_4TEEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_4TEEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_FIFTEEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_FIFTEEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_6TEEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_6TEEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_7TEEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_7TEEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_8TEEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_8TEEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_NINTEEN', mwkeys)}>{GetText('MDL_GRPTWO_OPT_NINTEEN', mwkeys)}</option>
                <option value={GetText('MDL_GRPTWO_OPT_TWENTY', mwkeys)}>{GetText('MDL_GRPTWO_OPT_TWENTY', mwkeys)}</option>
            </optgroup>,
            <optgroup label={GetText('MDL_OPTGRP_THREE', mwkeys)}>
                <option value={GetText('MDL_GRPTHREE_OPT_ONE', mwkeys)}>{GetText('MDL_GRPTHREE_OPT_ONE', mwkeys)}</option>
                <option value={GetText('MDL_GRPTHREE_OPT_TWO', mwkeys)}>{GetText('MDL_GRPTHREE_OPT_TWO', mwkeys)}</option>
                <option value={GetText('MDL_GRPTHREE_OPT_THREE', mwkeys)}>{GetText('MDL_GRPTHREE_OPT_THREE', mwkeys)}</option>
            </optgroup>,
            <optgroup label={GetText('MDL_OPTGRP_FOUR', mwkeys)}>
                <option value={GetText('MDL_GRPFOUR_OPT_ONE', mwkeys)}>{GetText('MDL_GRPFOUR_OPT_ONE', mwkeys)}</option>
                <option value={GetText('MDL_GRPFOUR_OPT_TWO', mwkeys)}>{GetText('MDL_GRPFOUR_OPT_TWO', mwkeys)}</option>
            </optgroup>
        ];

        return (
            <select className="ui dropdown" name="comment_title">
                {select}
            </select>
        );
    }
}

ModalSelect.propTypes = { user: React.PropTypes.instanceOf(Immutable.Map) };
