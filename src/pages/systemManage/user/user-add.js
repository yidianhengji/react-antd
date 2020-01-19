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
import { reqRoleQuery } from '../../../api/role';
import { reqUserAddList, reqUserUpdateList, reqUserQueryOneList } from '../../../api/user';

const { Option } = Select;


class UserAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            action: BASE + 'upload',
            roleDataList: [],
            imageUrl: ''
        };
    };
    componentDidMount () {
        let type = this.props.location.state.type;
        reqRoleQuery().then(res => {
            if (res.data.code === 1) {
                this.setState({
                    roleDataList: res.data.data,
                })
            }
        });
        if (type === 2) {
            reqUserQueryOneList({ uuid: this.props.location.state.uuid }).then(res => {
                if (res.data.code === 1) {
                    const { setFieldsValue } = this.props.form;
                    let params = {
                        name: res.data.data.name,
                        sex: res.data.data.sex + '',
                        mobile: res.data.data.mobile,
                        role_id: res.data.data.role_id
                    }
                    this.setState({ imageUrl: res.data.data.head_pic })
                    setFieldsValue(params)
                }
            })
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let type = this.props.location.state.type;
                if (type === 1) {
                    message.loading('正在提交中', 0);
                    values.head_pic = this.state.imageUrl
                    reqUserAddList(values).then(res => {
                        if (res.data.code === 1) {
                            message.success(res.data.msg);
                            setTimeout(() => {
                                this.props.history.push({
                                    pathname: '/home/user'
                                })
                            }, 1000);
                        }
                        message.destroy()
                    })
                } else if (type === 2) {
                    message.loading('正在提交中', 0);
                    let params = values;
                    params.uuid = this.props.location.state.uuid;
                    params.head_pic = this.state.imageUrl;
                    reqUserUpdateList(params).then(res => {
                        if (res.data.code === 1) {
                            message.success(res.data.msg);
                            setTimeout(() => {
                                this.props.history.push({
                                    pathname: '/home/user'
                                })
                            }, 1000);
                        }
                        message.destroy()
                    })
                }
            }
        });
    };


    beforeUpload (file) {
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

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                imageUrl: info.file.response.data[0].url,
                loading: false,
            })
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 10,
                    offset: 4,
                },
            },
        };

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );

        const sexDataList = [
            { value: 1, name: "男" },
            { value: 2, name: "女" }
        ];
        const getSexData = sexDataList.map(item => (
            <Option key={item.value}>{item.name}</Option>
        ));

        const getRoleData = this.state.roleDataList.map(item => (
            <Option key={item.uuid}>{item.name}</Option>
        ));

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
                            {getSexData}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="手机号码">
                    {getFieldDecorator('mobile', {
                        rules: [
                            { required: true, message: '请输入手机号码' }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="角色" hasFeedback>
                    {getFieldDecorator('role_id', {
                        rules: [{ required: true, message: '请选择角色' }],
                    })(
                        <Select placeholder="请选择">
                            {getRoleData}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="头像" hasFeedback>
                    {getFieldDecorator('head_pic')(
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={this.state.action}
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'register' })(UserAdd);
