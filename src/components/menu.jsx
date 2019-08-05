import React, {Component} from 'react';
import {Icon, Menu} from "antd";
import { Link } from "react-router-dom";

class MenuBar extends Component {
    render() {
        const { SubMenu } = Menu;
        return (
            <Menu
                theme="dark"
                onClick={this.handleClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <Menu.Item key="1">
                    <Link to='/home/test'>
                        <Icon type="home" />
                        <span>首页</span>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="mail" />
                            <span>列表</span>
                        </span>
                    }
                >
                    <Menu.Item key="12">
                        <Link to='/home/test2'>
                            列表yi
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/home/test3'>
                            列表yi
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">列表三</Menu.Item>
                    <Menu.Item key="4">列表四</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default MenuBar;
