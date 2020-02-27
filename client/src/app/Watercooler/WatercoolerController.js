import React, { Component } from 'react';
import Watercooler from './Watercooler';
import UserContext from "app/context/UserContext";

class WatercoolerController extends Component {
  static contextType = UserContext;

  render() {
    return (
      <Watercooler />
    );
  }

}

export default WatercoolerController;
