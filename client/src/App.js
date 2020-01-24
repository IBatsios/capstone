import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import { Watercooler } from './components/Watercooler';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/watercooler">Watercooler</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/watercooler">
              <Watercooler />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
