import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Layout } from "antd";

const onClickMenuItem = (key) => {
    console.log(key)
}

const menu = (
    <Menu onClick={onClickMenuItem}>
        <Menu.Item key="0">
            <Icon type="user" />个人信息
        </Menu.Item>
        <Menu.Item key="1">
            <Icon type="key" />修改密码
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
            <Icon type="logout" />退出登录
      </Menu.Item>
    </Menu>
);

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

    render () {
        const { Header } = Layout;
        return (
            <Header className={["header", !this.props.collapsed ? 'header-width-default' : 'header-width']}>
                <div className="header-left">
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                </div>
                <div className="header-right">
                    <div className="item">
                        <Dropdown overlay={menu}>
                            <span className="ant-dropdown-link header-user" type="down">
                                <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="" /> 张三
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        )
    }
}

export default HeaderBar;
