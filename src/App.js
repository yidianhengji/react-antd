import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './views/home'
import Nes from './views/nes'
import Login from './views/login/login'
function BasicExample() {
    return (
        <Login></Login>
        /*<Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                    <li>
                        <Link to="/home">home</Link>
                    </li>
                </ul>
                <Route exact path="/" component={Home} />
                <Route path="/topics" component={Nes} />
                <Route path="/home" component={Home} />
            </div>
        </Router>*/
    );
}

export default BasicExample;
