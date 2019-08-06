import React, {Component} from 'react';
import {Icon, Layout} from "antd";

class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            layoutMenu: 200
        };
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            layoutMenu: !this.state.collapsed ? 80 : 200
        });
    };

    render() {
        const {Header} = Layout;
        return (
            <Header className="header">
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
            </Header>
        )
    }
}

export default HeaderBar;
