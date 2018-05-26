import React from 'react';
import ReactDOM from 'react-dom';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='view-container container'>
                    <div className='landing-view'>
                        <div className="row">
                            <div className="one-half column">
                                <h3>Howdy!! Good Gamers</h3>
                                <div>
                                    <a href="#problem-1" className="button button-primary">Games</a>
                                </div>
                                <div>
                                    <a href="#problem-1" className="button button-primary">What's Next</a>
                                </div>
                                <div>
                                    <a href="#problem-1" className="button button-primary">Log</a>
                                </div>
                            </div>
                            <div className="one-half column">
                                <img src="./images/HeroImage.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;