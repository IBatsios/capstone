import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
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

export const ContextActionsDrawer = (props) => {
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


  const matches = (props) => {
    
  }

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
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Post" />
        </ListItem>
        <ListItem button onClick={() => props.onLike(props.id)}>
          <ListItemIcon>
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText primary="Like" />
        </ListItem>
        <ListItem button onClick={() => props.onDislike(props.id)}>
          <ListItemIcon>
            <ThumbDownIcon />
          </ListItemIcon>
          <ListItemText primary="Dislike" />
        </ListItem>
        <ListItem button onClick={() => props.onAddComment(props.id)}>
          <ListItemIcon>
            <AddCommentIcon />
          </ListItemIcon>
          <ListItemText primary="Add Comment" />
        </ListItem>
        <ListItem button onClick={() => props.onFriendRequest(props.author)}>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Friend Request" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => props.onReport(props.id)}>
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


export const ContextActionsMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleContextMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    props.onEditPost(props.post);
    handleClose();
  };

  const handleLike = () => {
    props.onLike(props.id);
    handleClose();
  }

  const handleDislike = () => {
    props.onDislike(props.id);
    handleClose();
  }

  const handleAddComment = () => {
    props.onAddComment(props.id);
    handleClose();
  }

  const handleFriendRequest = () => {
    props.onFriendRequest(props.author);
    handleClose();
  }

  const handleReport = () => {
    props.onReport(props.id);
    handleClose();
  }

  return (
  <>
    <IconButton
      onClick={handleContextMenuClick}
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
      {/* Only allow this option for the author */}
      { props.userId == props.post.author.id &&
        <MenuItem onClick={handleEditPost}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Post" />
        </MenuItem>
      }
      <MenuItem onClick={handleLike}>
        <ListItemIcon>
          <ThumbUpIcon />
        </ListItemIcon>
        <ListItemText primary="Like" />
      </MenuItem>
      <MenuItem onClick={handleDislike}>
        <ListItemIcon>
          <ThumbDownIcon />
        </ListItemIcon>
        <ListItemText primary="Dislike" />
      </MenuItem>
      <MenuItem onClick={handleAddComment}>
        <ListItemIcon>
          <AddCommentIcon />
        </ListItemIcon>
        <ListItemText primary="Add Comment" />
      </MenuItem>
      <MenuItem onClick={handleFriendRequest}>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Friend Request" />
      </MenuItem>
      <MenuItem onClick={handleReport}>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </MenuItem>
    </Menu>
  </>
  );
}

export const ContextActions = (props) => {

  return (
    <>
      <Hidden xsDown>
        <ContextActionsMenu {...props} />
      </Hidden>
      <Hidden smUp>
        <ContextActionsDrawer {...props} />
      </Hidden>
    </>
  );
}
