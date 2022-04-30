import React from 'react';
import UserStore from 'stores/UserStore';
import GetText from 'utils/GetText';
import MlangStore from 'stores/MlangStore';

export default class Logout extends React.Component {

    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.state = {
            multilang: MlangStore.getState().multilang
        };
    }

    componentDidMount () {
        UserStore.listen(this._onChange);
    }

    componentWillUnmount () {
        UserStore.unlisten(this._onChange);
    }

    _onChange = () => {
        if(!this.state.isLoggedIn){
            window.location.assign('/');
        }
    }

    render() {
        let mlarray = this.state.multilang;
        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui  image header"> <a href="/"><img src="assets/images/logo.png" className="image"/></a></h2>
                    <div className="ui message ">
                        <h2>{GetText('LOUT_MESSAGE', mlarray)}!</h2> {GetText('LOUT_TEXTBEFORE_LOGIN', mlarray)} <a href="/login"> {GetText('LOUT_LOGIN', mlarray)} </a> {GetText('LOUT_TEXTAFTER_LOGIN', mlarray)}.
                    </div>
                </div>
            </div>
        );
    }
}
