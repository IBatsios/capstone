import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import TabsStyles from './TabsStyles';

class TabBar extends Component {

  handleChange = (event, value) => {
    this.props.onChange(value);
  };

  render() {
    const  classes = TabsStyles;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          {this.props.children}
        </AppBar>
      </div>
    );
  }
}

export default TabBar;
