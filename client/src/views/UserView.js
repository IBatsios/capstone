import React, { useContext, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { UserContext } from 'data/UserStore';
import HomeView from "views/HomeView";
import WatercoolerView from "views/WatercoolerView";
import ListsView from "views/ListsView";


const UserView = () => {
  const [state, dispatch] = useContext(UserContext);
  const active = state.activeHeaderTab;

  const onTabChange = (event, value) =>  {
    dispatch({
      type: 'changeActiveHeaderTab',
      payload: value 
    });
  }

  return (
    <Fragment>
      <AppBar position="static" color="default">
        <Tabs value={active} centered onChange={onTabChange}>
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Watercooler" {...a11yProps(1)} />
          <Tab label="Lists" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={active} index={0}>
        <HomeView />
      </TabPanel>
      <TabPanel value={active} index={1}>
        <WatercoolerView />
      </TabPanel>
      <TabPanel value={active} index={2}>
        <ListsView />
      </TabPanel>
    </Fragment>
  );
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

export default UserView;
