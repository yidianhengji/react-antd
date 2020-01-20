import React, { Component } from 'react';
import LinkBtn from '../../../components/link-btn';
import { reqMenuTree, reqMenuUpdate } from '../../../api/menu';
import { Divider, Table, Row, Button, Popconfirm, message } from 'antd';
import '../../../assets/css/list.less';

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedRowKeys: [],
      selectedRows: [],
      pagination: false,
      dataList: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '排序',
          dataIndex: 'sort'
        },
        {
          title: '菜单路径',
          dataIndex: 'url'
        },
        {
          title: '图标',
          dataIndex: 'icon'
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
      visible: false,
      condition: true,
    };
    this.updateClick = this.updateClick.bind(this);
  };

  confirm = (uuid) => {
    this.setState({ visible: false });
    let params = { uuid, flag: 2 }
    reqMenuUpdate(params).then(res => {
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
    reqMenuTree(params).then(res => {
      if (res.data.code === 1) {
        this.setState({
          loading: true,
          dataList: res.data.data,
        })
      }
    });
  };

  handleAdd () {
    this.props.history.push({
      pathname: '/home/menus/add',
      state: { type: 1 }
    })
  };

  updateClick (uuid) {
    this.props.history.push({
      pathname: '/home/menus/add',
      state: { type: 2, uuid }
    })
  };

  componentWillMount () {
    this.fetch()
  };

  render () {
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
