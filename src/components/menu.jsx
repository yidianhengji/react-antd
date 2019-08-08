import React, {Component} from 'react';
import {Icon, Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import router from '../router'

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ''
        };
        this.handleClick = this.handleClick.bind(this);
    };

    getMenuRouterConfig = (router) => {
        const selectedKeys = this.props.location.pathname;
        return router.map((item) => {
            const {SubMenu} = Menu;
            if (!item.children) {
                return (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.icon}/>
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                const cItem = item.children.find(cItem => cItem.path === selectedKeys);
                if (cItem) {
                    this.openKey = item.path
                }
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                        {this.getMenuRouterConfig(item.children)}
                    </SubMenu>
                )
            }
        })
    };

    componentWillMount() {
        this.getRouterConfig = this.getMenuRouterConfig(router);
        this.setState({
            selectedKeys: this.props.location.pathname
        })
    };

    handleClick(item) {
        this.setState({
            selectedKeys: item.key
        })
    };

    render() {
        const openKey = this.openKey;
        return (
            <Menu
                theme="dark"
                onClick={this.handleClick}
                selectedKeys={[this.state.selectedKeys]}
                defaultOpenKeys={[openKey]}
                mode="inline"
            >
                {this.getRouterConfig}
            </Menu>
        )
    }
}

export default withRouter(MenuBar);
