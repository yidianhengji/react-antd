import React, { Component } from 'react';
import LinkBtn from '../../../components/link-btn';
import { reqRoleQueryAll, reqRoleUpdate } from '../../../api/role';
import { Divider, Table, Form, Row, Col, Input, Button, Popconfirm, message } from 'antd';
import '../../../assets/css/list.less';

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedRowKeys: [],
      selectedRows: [],
      pagination: {},
      dataList: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '描述',
          dataIndex: 'description'
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
        },
        {
          title: '操作',
          render: (text, record) => (
            <span>
              <LinkBtn onClick={() => this.updateClick(record.uuid)}>修改</LinkBtn>
              <Divider type="vertical" />
              <Popconfirm
                title="是否删除该条记录？"
                onConfirm={this.confirm.bind(this, record.uuid)}
                onCancel={this.cancel}
                okText="是"
                cancelText="否"
              >
                <LinkBtn>删除</LinkBtn>
              </Popconfirm>
            </span>
          ),
        },
      ],
      params: {
        pageSize: 10,
        pageNum: 0,
        name: ''
      },
      visible: false,
      condition: true,
    };
    this.updateClick = this.updateClick.bind(this);
  };

  confirm = (uuid) => {
    this.setState({ visible: false });
    let params = { uuid, status: 2 }
    reqRoleUpdate(params).then(res => {
      if (res.data.code === 1) {
        message.success('操作成功！');
        this.fetch();
      } else {
        message.error(res.data.msg);
      }
    });
  };

  cancel = () => {
    this.setState({ visible: false });
  };

  fetch = () => {
    this.setState({ loading: true });
    let params = this.state.params;
    reqRoleQueryAll(params).then(res => {
      if (res.data.code === 1) {
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.total;
        this.setState({
          loading: true,
          dataList: res.data.data,
          pagination,
        })
      }
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    let params = {
      pageSize: pagination.pageSize,
      pageNum: pagination.current - 1
    };
    this.setState({ params }, () => {
      this.fetch();
    });
  };

  handleAdd () {
    this.props.history.push({
      pathname: '/home/roles/add',
      state: { type: 1 }
    })
  };

  updateClick (uuid) {
    this.props.history.push({
      pathname: '/home/roles/add',
      state: { type: 2, uuid }
    })
  };

  componentWillMount () {
    this.fetch()
  };

  handleSearch = e => {
    e.preventDefault();
    this.fetch();
  };

  handlechangeName = (event) => {
    let params = this.state.params;
    params.name = event.target.value
    this.setState({
      params
    })
  }

  render () {
    // 列表复选框
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows
        })
      }
    };
    return (
      <div>
        <Form className="ant-advanced-search-form">
          <Row type="flex">
            <Col span={3} key="1">
              <Form.Item label="名称">
                <Input
                  placeholder="请输入名称"
                  value={this.state.params.name}
                  onChange={this.handlechangeName.bind(this)}
                />
              </Form.Item>
            </Col>
            <Col className="ant-advanced-search-form-btns">
              <Button type="primary" onClick={this.handleSearch}>搜索</Button>
            </Col>
          </Row>
        </Form>
        <div className="table-list">
          <Row className="operation-btns">
            <Button type="primary" onClick={this.handleAdd.bind(this)}>新增</Button>
          </Row>
          <Table
            rowKey="uuid"
            dataSource={this.state.dataList}
            columns={this.state.columns}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

export default RolesList
