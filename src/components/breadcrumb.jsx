import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import { withRouter } from "react-router-dom";
import router from '../router'

class BreadcrumbBar extends Component {
    getBreadcrumb = () => {
        const pathName = this.props.location.pathname;
        return router.map((item, index) => {
            if (item.children) {
                const cItem = item.children.find((cItem) => cItem.path === pathName);
                if (cItem) {
                    return (
                        <Breadcrumb key={index} separator="/" className="breadcrumb-nav">
                            <Breadcrumb.Item href="/home/test">首页</Breadcrumb.Item>
                            <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>{cItem.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    )
                } else {
                    const str = item.children.find((cItem) => pathName.indexOf(cItem.path) !== -1);
                    if (str) {
                        return (
                            <Breadcrumb key={index} separator="/" className="breadcrumb-nav">
                                <Breadcrumb.Item href="/home/test">首页</Breadcrumb.Item>
                                <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                                <Breadcrumb.Item>{str.name}</Breadcrumb.Item>
                            </Breadcrumb>
                        )
                    }
                }
            }
        });
    };
    render () {
        return this.getBreadcrumb();
    };
}

export default withRouter(BreadcrumbBar);
