import React from 'react';
import Cookie from 'utils/Cookie';
import LanguageContants from 'constants/LanguageConstants';

export default class Homeheader extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            lang: 'EN'
        };
    }

    componentDidMount () {
        let lang = Cookie.getCookie('lang');
        this.setState({lang: lang});
    }

    onClickLanguage = (lang) => {
        Cookie.setCookie('lang', lang, 30);
        this.setState({lang: lang});
        location.reload(true);
    }

    render () {
        let lang = this.state.lang;

        return (
            <header className="entry-header ui menu">
                <div style={{"display": "flex!important"}} className="ui large top fixed menu transition visible">
                    <div className="ui container"> <a className="item" href="/"><img src="/assets/images/logo-mw.png" alt=""/></a>
                        <div className="right menu">
                            <div className="item padding-row">
                                <div className="ui icon top pointing dropdown"> <span>{lang}</span>
                                    <div className="menu">
                                        <div onClick={this.onClickLanguage.bind(null, LanguageContants.EN)} className="item">EN</div>
                                        <div onClick={this.onClickLanguage.bind(null, LanguageContants.FI)} className="item">FI</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="ui icon top right pointing dropdown"> <span><i className="sidebar icon"></i></span>
                                    <div className="menu">
                                        <a href="/login" className="item">HOM_SIGN_IN </a>
                                        <a href="/signup" className="item">HOM_REGISTER</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
