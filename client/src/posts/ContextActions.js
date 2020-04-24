import React, { useContext } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReportIcon from '@material-ui/icons/Report';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AddCommentIcon from '@material-ui/icons/AddComment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import { UserContext } from 'data/UserStore';
import { PostForm } from './PostForm';
import { CommentForm } from 'comment/CommentForm';
import { URL } from 'config/user';

/**
 * Context action menu for comments on mobile devices.
 */
export const ContextActionsDrawer = (props) => {
  const [state, setState] = React.useState({
    open: false
  });
  const useStyles = makeStyles({
    contextDrawer: {
      width: 'auto',
    },
  });
  const classes = useStyles();

  const toggleDrawer = (isOpen) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, open: isOpen });
  };

  const contextDrawer = () => (
    <div
      className={classes.contextDrawer}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {props.isAuthor() &&
          <ListItem button onClick={() => props.onEditPost(props)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Post" />
          </ListItem>
        }
        <ListItem button onClick={() => props.onAddComment(props)}>
          <ListItemIcon>
            <AddCommentIcon />
          </ListItemIcon>
          <ListItemText primary="Add Comment" />
        </ListItem>
        {!props.isAuthor() &&
          <div>
            <ListItem button onClick={() => props.onLike(props)}>
              <ListItemIcon>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText primary="Like" />
            </ListItem>
            <ListItem button onClick={() => props.onFriendRequest(props)}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Friend Request" />
            </ListItem>
          </div>
        }
      </List>
      <Divider />
        {props.isAuthor() && 
          <List>
            <ListItem button onClick={() => props.onDelete(props)}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        }
        {!props.isAuthor() && 
          <List>
            <ListItem button onClick={() => props.onReport(props.id)}>
              <ListItemIcon>
                <ReportIcon />
              </ListItemIcon>
              <ListItemText primary="Report" />
            </ListItem>
          </List>
        }
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <Drawer anchor="bottom" open={state.open} onClose={toggleDrawer(false)}>
        {contextDrawer()}
      </Drawer>
    </div>
  );
}

/**
 * Context actions a user can perform on a post.
 */
export const ContextActions = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleContextMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await axios({
        withCredentials: true,
        method: 'delete',
        url: `${URL.POSTS}/${props.id}`
      });

      dispatch({
        store: 'PostStore',
        type: 'deletePost',
        payload: props.id
      });
    } catch (e) {
      console.log(e);
    }
    handleClose();
  }

  const handleEdit = () => {
    const { id, author, title, content, interest, spoiler } = { ...props};
    const postData = { id, author, title, content, interest, spoiler };
    dispatch({
      type: 'pushBlock',
      payload: <PostForm {...postData} /> 
    });
    handleClose();
  };

  const handleLike = () => {
    dispatch({
      store: 'PostStore',
      type: 'likePost',
      payload: props.id 
    });
    handleClose();
  }

  const handleAddComment = () => {
    dispatch({
      type: 'pushBlock',
      payload: <CommentForm postId={props.id} /> 
    });
    handleClose();
  }

  const handleFriendRequest = () => {
    dispatch({
      store: 'PostStore',
      type: 'newFriendRequest',
      payload: {
        userId: state.user.id,
        friendId: props.author.id
      }
    });
    handleClose();
  }

  const handleReport = async () => {
    try {
      await axios({
        withCredentials: true,
        method: 'put',
        url: `${URL.REPORT_POSTS}/${props.id}`
      });
    } catch (e) {
      console.log(e);
    }
    handleClose();
  }

  // Checks if the current user is the owner of the post or comment.
  const isAuthor = () => {
    return state.user.id === props.author.id;
  }

  return (
  <>
    <Hidden xsDown>
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
        { isAuthor() && 
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Post" />
          </MenuItem>
        }
        {/* Don't allow the author to like their own content */}
        { !isAuthor() &&
          <div>
            <MenuItem onClick={handleLike}>
              <ListItemIcon>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText primary="Like" />
            </MenuItem>
          </div>
        }
        <MenuItem onClick={handleAddComment}>
          <ListItemIcon>
            <AddCommentIcon />
          </ListItemIcon>
          <ListItemText primary="Add Comment" />
        </MenuItem>
        {/* User shouldn't be able to request themselves
           as a friend or report there comments or posts. */}
        { !isAuthor() &&
          <div>
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
          </div>
        }
        { isAuthor() &&
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        }
      </Menu>
    </Hidden>
    <Hidden smUp>
      <ContextActionsDrawer
        isAuthor={isAuthor}
        onEditPost={handleEdit}
        onDelete={handleDelete}
        onAddComment={handleAddComment}
        onReport={handleReport}
        onFriendRequest={handleFriendRequest}
        onLike={handleLike}
        {...props}
      />
    </Hidden>
  </>
  );
}
