import React, { Component } from 'react';
import Home from './Home';
import UserContext from "app/context/UserContext";

class HomeController extends Component {
  static contextType = UserContext;

  state = {
    focus: 0
  }

  setFocus = (event, value) => {
    console.log("setFocus");
  }

  render() {
    console.log(this);

    return (
      <Home />
    );
  }

}

export default HomeController;
