import React, { Component } from 'react';
import './index.less'

export default class LinkBtn extends Component {
    render() {
        return (
            <button className="link-btn" {...this.props}>{this.props.children}</button>
        )
    }
}
