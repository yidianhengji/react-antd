import React, {Component} from 'react';
import {Icon, Menu} from "antd";
import { Link } from "react-router-dom";
import router from '../router'

class MenuBar extends Component {

    router = (router)=>{
        return router.map((item,index)=>{
            const { SubMenu } = Menu;
            if(!item.children){
                return (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.icon} />
                            <span>{item.name}{index}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <Link to={item.path}>
                                <Icon type={item.icon} />
                                <span>{item.name}{index}</span>
                            </Link>
                        }
                    >
                        {this.router(item.children)}
                    </SubMenu>
                )
            }
        })
    }
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
                {
                    this.router(router)
                }
            </Menu>
        )
    }
}

export default MenuBar;
