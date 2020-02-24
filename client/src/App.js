import React, { Component } from "react";
import { UserProvider } from "app/UserContext";
import { User } from "app";


class App extends Component {

  state = {
      activeTab: 0,
      username: 'username',
      interests: ["movies", "music"],
      nav: ["home", "watercooler", "lists"],
      home:0,
      watercooler:0,
      lists: 0,
      updateValue: (newValue) => {
        this.setState(newValue);
      }
  }


  render() {
    return (
      <UserProvider value={this.state}>
        <User />
      </UserProvider>
    );
  }
}

export default App;
