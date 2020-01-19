import React, { Component } from 'react';
import LinkBtn from '../../../components/link-btn';
import { reqUserQueryAllList } from '../../../api/user';
import { Divider, Table, Form, Row, Col, Input, Button } from 'antd';
import '../../../assets/css/list.less';

/*
* 用户管理
 * */
class User extends Component {
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
                    title: '手机号码',
                    dataIndex: 'mobile',
                },
                {
                    title: '所属角色',
                    dataIndex: 'roleName',
                },
                {
                    title: '创建时间',
                    dataIndex: 'create_time'
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
            ],
            params: {
                pageSize: 10,
                pageNum: 0,
                name: '',
                mobile: ''
            },
        };
        this.updateClick = this.updateClick.bind(this);
    };

    fetch = () => {
        this.setState({ loading: true });
        let params = this.state.params;
        reqUserQueryAllList(params).then(res => {
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
        console.log(this)
        this.props.history.push({
            pathname: '/home/user/add',
            state: { type: 1 }
        })
    };

    updateClick (uuid) {
        this.props.history.push({
            pathname: '/home/user/add',
            state: { type: 2, uuid }
        })
    };

    deleteClick (uuid) {
        alert(uuid)
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
        params.name = event.target.value;
        this.setState({ params });
    }

    handlechangeMobile = (event) => {
        let params = this.state.params;
        params.mobile = event.target.value;
        this.setState({ params });
    }

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
                <Form className="ant-advanced-search-form">
                    <Row type="flex">
                        <Col span={3} key="1">
                            <Form.Item label="姓名">
                                <Input
                                    placeholder="请输入姓名"
                                    value={this.state.params.name}
                                    onChange={this.handlechangeName.bind(this)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3} key="1" style={{ marginLeft: '10px' }}>
                            <Form.Item label="手机号">
                                <Input
                                    placeholder="请输入手机号码"
                                    value={this.state.params.mobile}
                                    onChange={this.handlechangeMobile.bind(this)}
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

export default User
