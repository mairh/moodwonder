import React from 'react';
import Header from 'components/staticpages/Header.react';

export default class Terms extends React.Component {

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
                            <h2></h2>
                        </div>
                    </div>
                </div>


                <div className="ui vertical stripe segment">
                    <div className="ui middle aligned stackable grid container">

                        <div className="sixteen wide column">
                            <div className="ui segment">
                                <h3>TRMS_TITLE</h3>
                            </div>


                            <p> TRMS_DES</p>
                        </div>

                    </div>
                </div>
                <div className="ui vertical stripe segment" style={{"background":"#ECEFF1"}}>
                    <div className="ui two column stackable grid container h2">

                        <div className="eight wide column">
                            <h2>TRMS_SEC1_T1</h2>
                            <p>TRMS_SEC1_P1</p>
                            <p>TRMS_SEC1_P2</p>
                        </div>

                        <div className="eight wide column">
                            <h2>TRMS_SEC2_T1</h2>
                            <p>TRMS_SEC2_P1</p>
                        </div>

                        <div className="eight wide column">
                            <h2>TRMS_SEC3_T1</h2>
                            <p>TRMS_SEC3_P1</p>
                        </div>
                        <div className="eight wide column">
                            <h2>TRMS_SEC4_T1</h2>
                            <p>TRMS_SEC4_P1</p>
                        </div>

                        <div className="eight wide column">
                            <h2>TRMS_SEC5_T1</h2>
                            <p>TRMS_SEC5_P1</p>
                        </div>

                        <div className="eight wide column">
                            <h2>TRMS_SEC6_T1</h2>
                            <p>TRMS_SEC6_P1</p>

                        </div>

                        <div className="eight wide column">
                            <h2>TRMS_SEC7_T1</h2>
                            <p>TRMS_SEC7_P1</p>
                        </div>

                        <div className="eight wide column">
                            <h2>TRMS_SEC8_T1</h2>
                            <p>TRMS_SEC8_P1</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
