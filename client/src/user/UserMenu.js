import React, { useContext } from "react";
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { USER_MENU } from 'config/view/constants';
import { UserContext } from 'data/UserStore';
import { PostForm } from 'posts/PostForm';
import { ListForm } from 'lists/ListForm';
import { ProfileForm } from 'user/ProfileForm';
import { URL } from 'config/user';

export const UserMenu = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [values, setValues] = React.useState({
    menu: false
  });

  // The direction the menu enters from.
  const menuAnchor = 'left';

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setValues({ ...values, 'menu': open });
  };

  const addList = () => {
    dispatch({
      type: 'pushBlock',
      payload: <ListForm />
    });
  };

  const addPost = () => {
    dispatch({
      type: 'pushBlock',
      payload: <PostForm /> 
    });
  }

  const adminPortal = () => {
    window.open(URL.ADMIN_PORTAL, "_blank");
  }

  const profileForm = () => {
    dispatch({
      type: 'pushBlock',
      payload: <ProfileForm />
    });
  }

  const logout = async () => {
    try {
      await axios({
        withCredentials: true,
        method: 'get',
        url: URL.LOGOUT
      });
      dispatch({
        type: 'logout'
      });
    } catch (e) {
      console.log(e);
    }
  }

  const userMenuOptions = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={addPost}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary={USER_MENU.ADD_POST} />
        </ListItem>
        <ListItem button onClick={addList}>
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary={USER_MENU.ADD_LIST} />
        </ListItem>
        <ListItem button onClick={profileForm}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={USER_MENU.PROFILE_SETTINGS} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {state.user.isAdmin &&
          <ListItem button onClick={adminPortal}>
            <SupervisorAccountIcon />
            <ListItemText primary={USER_MENU.ADMIN_PORTAL} />
          </ListItem>
        }
        <ListItem button onClick={logout}>
          <ExitToAppIcon />
          <ListItemText primary={USER_MENU.LOG_OUT} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge={props.edge}
        onClick={toggleDrawer(true)}
        aria-label="open drawer">
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={menuAnchor}
        open={values.menu}
        onClose={toggleDrawer(false)}
       >
        {userMenuOptions()}
      </Drawer>
    </div>
  );
}
