import React, { Component } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    Upload,
    Icon,
    message
} from 'antd';
import { BASE } from '../../../api/path'

const { Option } = Select;

function beforeUpload (file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            action: BASE + 'upload'
        };
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


    handleChange = info => {
        console.log(info)
    };

    render () {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="姓名">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入姓名！', whitespace: true }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="性别">
                    {getFieldDecorator('sex', {
                        rules: [
                            { required: true, message: '请选择性别' }
                        ]
                    })(
                        <Select placeholder="请选择">
                            <Option value="1">男</Option>
                            <Option value="2">女</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="手机号码">
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: true, message: '请输入手机号码' }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="角色" hasFeedback>
                    {getFieldDecorator('roleId', {
                        rules: [{ required: true, message: '请选择角色' }],
                    })(
                        <Select placeholder="请选择">
                            <Option value="china">China</Option>
                            <Option value="usa">U.S.A</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="头像" hasFeedback>
                    {getFieldDecorator('headPic')(
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={this.state.action}
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'register' })(UserAdd);
