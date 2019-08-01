import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './views/login/login'
import Base from './views/base/base'
function BasicExample() {
    return (
        <Router>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Base}>

            </Route>
        </Router>
    );
}

export default BasicExample;
