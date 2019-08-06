import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Spin } from 'antd';
import './login.less';
import {reqLogin} from '../../api/login'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const req = await reqLogin(values)
                console.log(req)
                /*this.setState({
                    isLoading: true,
                });*/
                //setInterval(() => this.props.history.push('/home'), 1000);

            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const isLoading = this.state.isLoading;
        return (
            <div className="login-page">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入账号!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入账号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>是否记住密码？</Checkbox>)}
                        <a className="login-form-forgot" href="javascript:void(0)">
                            忘记密码？
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                {isLoading ? (
                    <div className="login-loading">
                        <Spin tip="Loading..."></Spin>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Form.create()(Login);
