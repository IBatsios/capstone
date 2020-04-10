import React, { useContext, Fragment } from "react";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Hidden,
  Tabs,
  Tab,
  Toolbar
} from '@material-ui/core';
import {
  HOME,
  HOME_ICON,
  LISTS,
  LISTS_ICON,
  WATERCOOLER,
  WATERCOOLER_ICON
} from 'config/user';
import classes from './User.module.css';
import Home from "home/Home";
import Lists from "lists/Lists";
import Watercooler from "watercooler/Watercooler";
import TabPanel from 'TabPanel';
import { UserContext } from 'data/UserStore';
import { UserMenu } from './UserMenu';

import { ListForm } from 'lists/ListForm';

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
        <Toolbar>
          <AppBar position="fixed" color="default">
            <Toolbar>
              <UserMenu
                edge="start"
                /*
                onAddPost={() => handleAddPost()}
                onAddList={() => handleAddList()}
                onEditProfile={() => handleEditProfile()}
                */
              />
            </Toolbar>
            <Hidden xsDown>
              <Tabs className={classes.tabs} value={active} centered onChange={onTabChange}>
                <Tab label={HOME} {...a11yProps(0)} />
                <Tab label={WATERCOOLER} {...a11yProps(1)} />
                <Tab label={LISTS} {...a11yProps(2)} />
              </Tabs>
            </Hidden> 
          </AppBar>
       </Toolbar>
       <TabPanel value={active} index={0} {...otherProps}>
         <Home />
       </TabPanel>
       <TabPanel value={active} index={1} {...otherProps}>
         <Watercooler />
       </TabPanel>
       <TabPanel value={active} index={2} {...otherProps}>
         <Lists />
       </TabPanel>

      <Hidden smUp>
        <BottomNavigation
           value={active}
           onChange={onTabChange}
           showLabels
           className={classes.root}
        >

          <BottomNavigationAction
            label={HOME}
            icon={<HOME_ICON />}
            classes={{label: classes.label}}
          />
          <BottomNavigationAction
            label={WATERCOOLER}
            icon={<WATERCOOLER_ICON />}
            classes={{label: classes.label}}
          />
          <BottomNavigationAction
            label={LISTS}
            icon={<LISTS_ICON />}
            classes={{label: classes.label}}
          />
        </BottomNavigation>
      </Hidden>
      {state.activeForm}
      {state.dynamicContent &&
        state.dynamicContent[0]
      }
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
