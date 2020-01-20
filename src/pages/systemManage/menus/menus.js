import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import MenusList from "./menus-list";
import MenusAdd from "./menus-add";

/*
* 用户管理
 * */
class User extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route path='/home/menus' exact component={MenusList} />
          <Route path="/home/menus/add" component={MenusAdd}></Route>
          <Redirect to='/home/menus'></Redirect>
        </Switch>
      </div>
    );
  }
}

export default User
