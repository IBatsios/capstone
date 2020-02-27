import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserContext from "app/context/UserContext";
import { HomeController } from "app/Home";
import { WatercoolerController } from "app/Watercooler";
import { ListsController } from "app/Lists";

class User extends Component {
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
          <Tabs value={active} onChange={this.handleChange} centered>
            <Tab label="Home" {...a11yProps(0)} />
            <Tab label="Watercooler" {...a11yProps(1)} />
            <Tab label="Lists" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      <TabPanel value={active} index={0}>
        <HomeController />
      </TabPanel>
      <TabPanel value={active} index={1}>
        <WatercoolerController />
      </TabPanel>
      <TabPanel value={active} index={2}>
        <ListsController />
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

export default User;
