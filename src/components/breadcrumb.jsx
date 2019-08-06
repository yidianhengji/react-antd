import React, {Component} from 'react'
import {Breadcrumb} from 'antd';
import {withRouter} from "react-router-dom";
import router from '../router'

class BreadcrumbBar extends Component {

    getBreadcrumb = () => {
        const pathName = this.props.location.pathname;
        let breadcrumbHtml = '';
        router.map((item) => {
            if (item.path === pathName) {
                breadcrumbHtml = (
                    <Breadcrumb separator=">" style={{padding: '15px 0'}}>
                        <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                    </Breadcrumb>
                )
            } else if (item.children) {
                const cItem = item.children.find((cItem) => cItem.path === pathName);
                if (cItem) {
                    breadcrumbHtml = (
                        <Breadcrumb separator=">" style={{padding: '15px 0'}}>
                            <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>{cItem.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    )
                }
            }
        });
        return breadcrumbHtml
    };

    render() {
        return this.getBreadcrumb()
    };
}

export default withRouter(BreadcrumbBar);
