import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import { reqRoleAdd } from '../../../api/role';

class RolesAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let type = this.props.location.state.type;
        if (type == 1) {
          const hide = message.loading('正在提交中', 0);
          reqRoleAdd(values).then(res => {
            if (res.data.code === 1) {
              message.destroy()
              message.success(res.data.msg);
              setTimeout(() => {
                this.props.history.push({
                  pathname: '/home/roles',
                  state: {
                    type: 1
                  }
                })
              }, 1000);
            }
          })
        }
      }
    });
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

    const { TextArea } = Input;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          {getFieldDecorator('name', {
            rules: [
              { required: true, message: '请输入角色名称！', whitespace: true }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('description')(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'register' })(RolesAdd);
