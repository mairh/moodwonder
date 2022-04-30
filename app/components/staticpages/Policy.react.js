import React from 'react';
import Header from 'components/staticpages/Header.react';


export default class Policy extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {

        return (
            <div className="pusher">
                <div className="ui inverted vertical masthead center aligned segment" style={{"background-color": "#26a69a"}}>
                    <Header />
                    <div className="ui text container">
                        <div className="banner-content">
                            <h2></h2>
                        </div>
                    </div>
                </div>
                <div className="ui vertical stripe segment" style={{"background":"#ECEFF1"}}>
                    <div className="ui middle aligned stackable grid container">
                        <div className="sixteen wide column">
                            <div className="ui segment">
                                <h3>PLCY_TITLE</h3>
                            </div>
                            <p>PLCY_PARA1</p>
                            <p>PLCY_PARA2</p>
                            <p>PLCY_PARA3</p>
                            <p>PLCY_PARA4</p>
                            <p>PLCY_PARA5</p>
                            <p>PLCY_PARA6</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
