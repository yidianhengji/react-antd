import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import RolesList from "./roles-list";
import RolesAdd from "./roles-add";

/*
* 用户管理
 * */
class User extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route path='/home/roles' exact component={RolesList} />
          <Route path="/home/roles/add" component={RolesAdd}></Route>
          <Redirect to='/home/roles'></Redirect>
        </Switch>
      </div>
    );
  }
}

export default User
