import React, {Component} from 'react';
import {Table} from 'antd';

class InitTable extends Component {
    render() {
        return (
            <Table rowKey="uuid" columns={this.props.columns} dataSource={this.props.data}></Table>
        )
    }
}

export default InitTable;
