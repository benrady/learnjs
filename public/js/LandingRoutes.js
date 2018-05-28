import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './Components/landing';
import GameList from './Components/GameList';

const LandingRoutes = (path = '/') => {
    return (
        <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/games' component={GameList} />
        </Switch>
    )
}

export default LandingRoutes;