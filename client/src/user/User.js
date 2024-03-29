import React, { useContext, useEffect } from "react";
import axios from 'axios';
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
import TabPanel from 'tabs/TabPanel';
import { UserContext } from 'data/UserStore';
import { UserMenu } from './UserMenu';
import { Login } from 'login/login';
import { Register } from 'register/register';
import { Copyright } from 'layout/Layout';
import { URL } from 'config/user';

/**
 * Manages the authenticated user-interface or directs a visitor
 * to login or create an account.
 */
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
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios({
            withCredentials: true,
            method: 'get',
            url: `${URL.USERS}/${userId}`
          });
          dispatch({
            type: 'setUser',
            payload: response.data 
          });
        } catch (e) {
          console.log(e);
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <>
      {state.authenticated
        ? <>
            <Toolbar>
              <AppBar position="fixed" color="default">
                <Toolbar>
                  <UserMenu edge="start" />
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
            <Copyright className="copyright" />
          </>
        : <>
           { state.register
             ? <Register />
             : <Login />
           }
          </>
       }
       {state.dynamicContent &&
         state.dynamicContent[0]
       }
     </>
  );
}

function a11yProps(index) {
  return {
    id: `header-tab-${index}`,
    'aria-controls': `header-tabpanel-${index}`,
  };
}

export default User;
