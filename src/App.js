import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './views/login/login'
import home from './views/home/index'
function BasicExample() {
    return (
        <Router>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={home} />
        </Router>
    );
}

export default BasicExample;
