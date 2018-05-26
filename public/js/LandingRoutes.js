import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LandingPage from './landing';

const LandingRoutes = () => {
    return (
        <Switch>
            <Route exact path='/' component={LandingPage} />
            {/*<Route path='/about' component={About} />
            <Route path='/friends' component={Friends} />*/}
        </Switch>
    )
}

export default LandingRoutes;