import React, { Component, Fragment } from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Modal,
  Tree
} from 'antd';
import { reqMenuTree, reqMenuAdd, reqMenuUpdate, reqMenuQueryOne } from '../../../api/menu';
const { TreeNode } = Tree;

class MenusAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modal1Visible: false,
      treeData: [],
      parent_id: '',
      parent_name: ''
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let type = this.props.location.state.type;
        if (type === 1) {
          message.loading('正在提交中', 0);
          values.parent = this.state.parent_id;
          reqMenuAdd(values).then(res => {
            if (res.data.code === 1) {
              message.success(res.data.msg);
              setTimeout(() => {
                this.props.history.push({
                  pathname: '/home/menus'
                })
              }, 1000);
            }
            message.destroy()
          })
        } else if (type === 2) {
          message.loading('正在提交中', 0);
          let params = values
          params.uuid = this.props.location.state.uuid
          params.parent = this.state.parent_id;
          reqMenuUpdate(params).then(res => {
            if (res.data.code === 1) {
              message.success(res.data.msg);
              setTimeout(() => {
                this.props.history.push({
                  pathname: '/home/menus'
                })
              }, 1000);
            }
            message.destroy()
          })
        }
      }
    });
  };

  componentDidMount () {
    let type = this.props.location.state.type;

    reqMenuTree({ uuid: this.props.location.state.uuid }).then(res => {
      if (res.data.code === 1) {
        this.setState({
          treeData: res.data.data
        })
      }
    })

    if (type === 2) {
      reqMenuQueryOne({ uuid: this.props.location.state.uuid }).then(res => {
        if (res.data.code === 1) {
          const { setFieldsValue } = this.props.form;
          let params = {
            name: res.data.data.name,
            description: res.data.data.description
          }
          setFieldsValue(params)
        }
      })
    }
  }

  setModal1Visible (modal1Visible) {
    this.setState({ modal1Visible });
  }

  getTreeData = data => data.map(item => {
    return (
      <TreeNode title={<span onClick={this.handleTreeClick.bind(this, item.uuid, item.name)}>
        {item.name}
      </span>} key={item.uuid} >
        {item.children && item.children.length > 0 ? this.getTreeData(item.children) : ''}
      </TreeNode>
    )
  })

  handleTreeClick (uuid, name) {
    this.setState({
      parent_id: uuid,
      parent_name: name
    })
  }

  onCancel () {
    this.setModal1Visible(false)
  }

  onOk () {
    this.setModal1Visible(false);
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

    return (
      <Fragment>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="名称">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请输入名称！', whitespace: true }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="上级菜单">
            {(<div style={{ display: "flex", marginTop: "4px" }}>
              <Input disabled placeholder="请选择上级菜单" value={this.state.parent_name} />
              <Button type="primary" style={{ margin: '0px 10px' }} onClick={() => this.setModal1Visible(true)}>选择</Button>
              <Button>清空</Button>
            </div>)}
          </Form.Item>
          <Form.Item label="图标">
            {(<Input />)}
          </Form.Item>
          <Form.Item label="排序">
            {getFieldDecorator('sort', {
              rules: [
                { required: true, message: '请输入排序号！', whitespace: true }
              ]
            })(<Input type="number" maxLength={100} />)}
          </Form.Item>
          <Form.Item label="菜单路径">
            {(<Input />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">保存</Button>
          </Form.Item>
        </Form>
        <Modal
          title="选择上级菜单"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          cancelText="取消"
          okText="确定"
          onOk={() => this.onOk()}
          onCancel={() => this.onCancel()}
        >
          <Tree
            showLine={true}
            showIcon={false}
            defaultExpandAll={true}
          >
            {this.getTreeData(this.state.treeData)}
          </Tree>
        </Modal>
      </Fragment >
    )
  }
}

export default Form.create(
  {
    name: 'register'
  },
)(MenusAdd);
