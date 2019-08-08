import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import UserList from "./user-list";
import UserAdd from "./user-add";


/*
* 用户管理
 * */
class User extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/home/user' exact component={UserList}/>
                    <Route path="/home/user/add" component={UserAdd}></Route>
                    <Redirect to='/home/user'></Redirect>
                </Switch>
            </div>
        );
    }
}

export default User
