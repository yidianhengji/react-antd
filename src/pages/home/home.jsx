import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Icon, Breadcrumb } from 'antd';
import MenuBar from '../../components/menu'
import Test from "../module/test";
import Test2 from "../module/test2";
import Test3 from "../module/test3";
import './home.less'

class Home extends Component {
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
    handleClick = (item) => {
        let path = item.item.props.path;
        if(path){
            this.props.history.push(path)
        }
    }
    render() {
        const { Header, Sider, Content } = Layout;
        const layoutMenu = this.state.layoutMenu;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="sider">
                    <div className="logo" />
                    <Scrollbars className="menu-height">
                        <MenuBar></MenuBar>
                    </Scrollbars>
                </Sider>
                <Layout style={{ marginLeft: layoutMenu }}>
                    <Header className="header">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Scrollbars>
                        <Content
                            style={{
                                margin: '64px 20px 16px',
                                minHeight: 'auto',
                            }}
                        >
                            <Breadcrumb separator=">" style={{padding: '15px 0'}}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                                <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                                <Breadcrumb.Item>An Application</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ background: '#fff', padding: '15px' }}>
                                <Switch>
                                    <Route path='/home/test' exact component={Test}/>
                                    <Route path="/home/test2" component={Test2} />
                                    <Route path="/home/test3" component={Test3}></Route>
                                </Switch>
                            </div>
                        </Content>
                    </Scrollbars>
                </Layout>
            </Layout>
        );
    }
}

export default Home
