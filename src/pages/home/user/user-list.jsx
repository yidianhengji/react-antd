import React, { Component } from 'react';
import LinkBtn from '../../../components/link-btn'
import { reqUserQueryList } from '../../../api/user';
import { Divider, Table } from 'antd';

/*
* 用户管理
 * */
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            params: {
                pageSize: 10,
                pageNum: 1
            },
            selectedRowKeys: [],
            selectedRows: [],
            pagination: {},
            dataList: [],
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    render: text => <LinkBtn>{text}</LinkBtn>
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    render: text => text === 1 ? <span>男</span> : <span>女</span>
                },
                {
                    title: 'Address',
                    dataIndex: 'roleName',
                },
                {
                    title: '操作',
                    render: (text, record) => (
                        <span>
                            <LinkBtn onClick={() => this.updateClick(record.uuid)}>修改</LinkBtn>
                            <Divider type="vertical" />
                            <LinkBtn onClick={() => this.deleteClick(record.uuid)}>删除</LinkBtn>
                        </span>
                    ),
                },
            ]
        };
        this.updateClick = this.updateClick.bind(this);
    };
    /*
    * 调用后台用户列表接口
    * */
    fetch = () => {
        this.setState({ loading: true });
        let params = this.state.params;
        reqUserQueryList(params).then(res => {
            if (res.data.code === 1) {
                const pagination = { ...this.state.pagination };
                pagination.total = res.data.data.total;
                this.setState({
                    loading: true,
                    dataList: res.data.data,
                    pagination,
                })
            }
        });
    };
    /*
    * 分页回调事件
    * */
    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination)
        let params = {
            pageSize: pagination.pageSize,
            pageNum: pagination.current
        };
        this.setState({
            params: params
        }, () => {
            this.fetch();
        });
    };
    /*
    * 修改按钮
    * */
    updateClick (uuid) {
        this.props.history.push({
            pathname: '/home/user/add',
            query: {
                type: 2,
                uuid
            }
        })
    };
    /*
    * 删除按钮
    * */
    deleteClick (uuid) {
        alert(uuid)
    };
    /*
    * 在渲染前调用异步请求
    * */
    componentWillMount () {
        this.fetch()
    };
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
                <Table
                    rowKey="uuid"
                    dataSource={this.state.dataList}
                    columns={this.state.columns}
                    pagination={this.state.pagination}
                    rowSelection={rowSelection}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default User
