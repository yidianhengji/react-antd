import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './pages/login/login.jsx';
import Home from './pages/home/home.jsx';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}></Route>
                </Switch>
            </Router>
        );
    }
}
