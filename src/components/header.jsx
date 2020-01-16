import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Layout } from "antd";
import { connect } from 'react-redux'
import { collapsedAction } from '../store/action-creates'

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
            userinfo: JSON.parse(window.localStorage.getItem("userinfo"))
        };
    };

    render () {
        const { Header } = Layout;
        const { collapsed, toggle } = this.props;
        return (
            <Header className={["header", !collapsed ? 'header-width-default' : 'header-width']}>
                <div className="header-left">
                    <Icon
                        className="trigger"
                        type={!collapsed ? 'menu-fold' : 'menu-unfold'}
                        onClick={toggle}
                    />
                </div>
                <div className="header-right">
                    <div className="item">
                        <Dropdown overlay={menu}>
                            <span className="ant-dropdown-link header-user" type="down">
                                <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="" /> {this.state.userinfo.name}
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.collapsed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggle () {
            dispatch(collapsedAction())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
