import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout } from 'antd';

import MenuBar from '../../components/menu';
import HeaderBar from '../../components/header';
import BreadcrumbBar from '../../components/breadcrumb';

import './home.less';
import LogoImg from '../../assets/logo.png';

// 用户管理
import Test from '../module/test'
import User from '../systemManage/user/user';
import Roles from '../systemManage/roles/roles';

class Home extends Component {

    constructor(props) {
        super(props);
    };

    handleClick = (item) => {
        let path = item.item.props.path;
        if (path) {
            this.props.history.push(path)
        }
    };

    render () {
        const { Sider, Content } = Layout;
        const { collapsed } = this.props
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} className="layout-sider">
                    {!collapsed ? <div className="logo">后台管理系统</div> : <div className="logo"><img className="logo-img" src={LogoImg} /></div>}
                    <Scrollbars className="menu-height">
                        <MenuBar></MenuBar>
                    </Scrollbars>
                </Sider>
                <Layout style={{ marginLeft: !collapsed ? 200 : 80 }}>
                    <HeaderBar collapsed={collapsed}></HeaderBar>
                    <Scrollbars>
                        <Content className="layout-content">
                            <BreadcrumbBar></BreadcrumbBar>
                            <Switch>
                                <Route path='/home/test' exact component={Test} />
                                <Route path="/home/user" component={User} />
                                <Route path="/home/roles" component={Roles} />
                                <Redirect to='/home/test'></Redirect>
                            </Switch>
                        </Content>
                    </Scrollbars>
                </Layout>
            </Layout >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.collapsed
    }
}

export default connect(mapStateToProps, null)(Home);
