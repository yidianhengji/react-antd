import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Index extends Component {
    render() {
        return (
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
        );
    }
}

export default Index
