import React, {Component} from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import './base.css'

class Base extends Component {
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
        const { SubMenu } = Menu;
        const layoutMenu = this.state.layoutMenu;
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="sider">
                    <div className="logo" />
                    <Scrollbars className="menu-height">
                        <Menu
                            theme="dark"
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>Navigation One</span>
                                    </span>
                                }
                            >
                                <Menu.ItemGroup key="g1" title="Item 1">
                                    <Menu.Item key="1" path="/login">Option 1</Menu.Item>
                                    <Menu.Item key="2">Option 2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="g2" title="Item 2">
                                    <Menu.Item key="3">Option 3</Menu.Item>
                                    <Menu.Item key="4">Option 4</Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span>Navigation Two</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>Navigation Three</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                                <Menu.Item key="91">Option 9</Menu.Item>
                                <Menu.Item key="101">Option 10</Menu.Item>
                                <Menu.Item key="111">Option 11</Menu.Item>
                                <Menu.Item key="121">Option 12</Menu.Item>
                            </SubMenu>
                        </Menu>
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
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                                Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>Content <br/>
                            </div>
                        </Content>
                    </Scrollbars>
                </Layout>
            </Layout>
        );
    }
}

export default Base
