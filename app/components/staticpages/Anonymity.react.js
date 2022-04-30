import React from 'react';
import Header from 'components/staticpages/Header.react';

export default class Anonymity extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {

        return (
            <div className="pusher">
                <div className="ui inverted vertical masthead center aligned segment" style={{"backgroundColor": "#26a69a"}}>
                    <Header />
                    <div className="ui text container">
                        <div className="banner-content">
                            <h2>AMTY_BNNR_TITLE</h2>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment" style={{"background":"#ECEFF1"}}>
                    <div className="ui middle aligned stackable grid container">
                        <div className="sixteen wide column">
                            <div className="ui segment">
                                <h3>AMTY_TITLE</h3>
                            </div>
                            <p>AMTY_PARA1</p>
                            <p>AMTY_PARA2</p>
                            <ul>
                                <li>AMTY_PARA_LI1</li>
                                <li>AMTY_PARA_LI2</li>
                                <li>AMTY_PARA_LI3</li>
                            </ul>
                            <p>AMTY_PARA3</p>
                            <p>AMTY_PARA4</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
