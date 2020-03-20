import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReportIcon from '@material-ui/icons/Report';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import AddCommentIcon from '@material-ui/icons/AddComment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const ContextActionsDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText primary="Like" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ThumbDownIcon />
          </ListItemIcon>
          <ListItemText primary="Dislike" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AddCommentIcon />
          </ListItemIcon>
          <ListItemText primary="Add Comment" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Friend Request" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer('bottom', true)}
        aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        {fullList('bottom')}
      </Drawer>
    </div>
  );
}


export const ContextActionsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
  <>
    <IconButton
      onClick={handleClick}
      aria-label="settings">
      <MoreVertIcon />
    </IconButton>
    <Menu
      id="context-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ThumbUpIcon />
        </ListItemIcon>
        <ListItemText primary="Like" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ThumbDownIcon />
        </ListItemIcon>
        <ListItemText primary="Dislike" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <AddCommentIcon />
        </ListItemIcon>
        <ListItemText primary="Add Comment" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Friend Request" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </MenuItem>
    </Menu>
  </>
  );
}

export const ContextActions = () => {
  return (
    <>
      <Hidden xsDown>
        <ContextActionsMenu />
      </Hidden>
      <Hidden smUp>
        <ContextActionsDrawer />
      </Hidden>
    </>
  );
}
