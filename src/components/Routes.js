import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import LoginForm from "./login";
import history from './history';
import DashBoard from "./Dashboard"
import Transaction from './Transaction'


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={LoginForm} />
                    <Route path="/dashboard" component={DashBoard} />
                    <Route path="/transaction" component={Transaction} />
                    {/* <Route path="/Products" component={Products} /> */}
                </Switch>
            </Router>
        )
    }
}