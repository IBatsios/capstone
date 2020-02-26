import React, { Component } from 'react';
import Lists from './Lists';
import UserContext from "app/context/UserContext";

class ListsController extends Component {
  static contextType = UserContext;

  render() {
    return (
      <Lists />
    );
  }

}

export default ListsController;
