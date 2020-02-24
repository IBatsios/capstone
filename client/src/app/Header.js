import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserContext from "app/UserContext";
import { Home, Watercooler, Lists } from "app";

class Header extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    this.context.updateValue({ activeTab: newValue });
  }

  render() {
    const active = this.context.activeTab ?? 0;
    return (
      <div className="">
        <AppBar position="static" color="default">
          <Tabs value={active} onChange={this.handleChange} centered >
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Watercooler" {...a11yProps(1)} />
            <Tab label="Lists" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      <TabPanel value={active} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={active} index={1}>
        <Watercooler />
      </TabPanel>
      <TabPanel value={active} index={2}>
        <Lists />
      </TabPanel>
      </div>
    );
  }
}

function a11yProps(index) {
  return {
    id: `header-tab-${index}`,
    'aria-controls': `header-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`header-tabpanel-${index}`}
      aria-labelledby={`header-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export default Header;
