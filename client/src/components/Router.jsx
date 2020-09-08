import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import ResDetails from './ResDetails';
import UpdateRes from './UpdateRes';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route
                    path="/restaurants/:id/update"
                    component={UpdateRes}
                ></Route>
                <Route path="/restaurants/:id" component={ResDetails}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;
