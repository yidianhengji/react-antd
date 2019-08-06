import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Scrollbars} from 'react-custom-scrollbars';
import {Layout} from 'antd';
import MenuBar from '../../components/menu';
import HeaderBar from '../../components/header';
import BreadcrumbBar from '../../components/breadcrumb';
import Test from "../module/test";
import Test2 from "../module/test2";
import Test3 from "../module/test3";
import './home.less';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            layoutMenu: 200
        };
    };

    handleClick = (item) => {
        let path = item.item.props.path;
        if (path) {
            this.props.history.push(path)
        }
    };

    render() {
        const {Sider, Content} = Layout;
        const layoutMenu = this.state.layoutMenu;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="layout-sider">
                    <div className="logo"/>
                    <Scrollbars className="menu-height">
                        <MenuBar></MenuBar>
                    </Scrollbars>
                </Sider>
                <Layout style={{marginLeft: layoutMenu}}>
                    <HeaderBar></HeaderBar>
                    <Scrollbars>
                        <Content className="layout-content">
                            <BreadcrumbBar></BreadcrumbBar>
                            <div style={{background: '#fff', padding: '15px'}}>
                                <Switch>
                                    <Route path='/home/test' exact component={Test}/>
                                    <Route path="/home/test2" component={Test2}/>
                                    <Route path="/home/test3" component={Test3}/>
                                    <Redirect to='/home/test'></Redirect>
                                </Switch>
                            </div>
                        </Content>
                    </Scrollbars>
                </Layout>
            </Layout>
        );
    }
}

export default Home;
