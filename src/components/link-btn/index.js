import React, { Component } from 'react';
import './index.less'

export default class LinkBtn extends Component {
    render() {
        return (
            <a className="link-btn" {...this.props}>{this.props.children}</a>
        )
    }
}
