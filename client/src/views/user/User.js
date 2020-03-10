import React, { useContext, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from '@material-ui/core/AppBar';
import { UserContext } from 'data/UserStore';
import Home from "views/home/Home";
import Watercooler from "views/watercooler/Watercooler";
import Lists from "views/lists/Lists";
import TabPanel from 'views/TabPanel';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import ListIcon from '@material-ui/icons/List';
import Hidden from '@material-ui/core/Hidden';
import classes from './User.module.css';



const User = () => {
  const [state, dispatch] = useContext(UserContext);
  const active = state.activeHeaderTab;
  const otherProps = {
    prefix: 'header'
  }

  const onTabChange = (event, value) =>  {
    dispatch({
      type: 'changeActiveHeaderTab',
      payload: value 
    });
  }

  return (
     <Fragment>
       <Hidden xsDown>
         <AppBar position="static" color="default">
           <Tabs value={active} centered onChange={onTabChange}>
             <Tab label="Home" {...a11yProps(0)} />
             <Tab label="Watercooler" {...a11yProps(1)} />
             <Tab label="Lists" {...a11yProps(2)} />
           </Tabs>
         </AppBar>
       </Hidden> 
       <Paper>
         <TabPanel value={active} index={0} {...otherProps}>
           <Home />
         </TabPanel>
         <TabPanel value={active} index={1} {...otherProps}>
           <Watercooler />
         </TabPanel>
         <TabPanel value={active} index={2} {...otherProps}>
           <Lists />
         </TabPanel>
       </Paper>

      <Hidden smUp>
        <BottomNavigation
           value={active}
           onChange={onTabChange}
           showLabels
           className={classes.root}
        >

          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Watercooler" icon={<LocalDrinkIcon />} />
          <BottomNavigationAction label="Lists" icon={<ListIcon />} />
        </BottomNavigation>
      </Hidden>
    </Fragment>
  );
}

function a11yProps(index) {
  return {
    id: `header-tab-${index}`,
    'aria-controls': `header-tabpanel-${index}`,
  };
}

export default User;
