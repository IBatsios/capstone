import React from 'react';
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

  const canComment = () => {
    let allowComment = false;
    if (props.post) {
      // We current only support comments on posts.
      allowComment = true; 
    }
    return allowComment;
  }

  // Show the edit post option when the context menu is attached to
  // a post and the user is the author.
  const canEditComment = () => {
    return isAuthor() && props.comment;
  }

  // Show the edit post option when the context menu is attached to
  // a post and the user is the author.
  const canEditPost = () => {
    return isAuthor() && props.post;
  }

  // Checks if the current user is the owner of the post or comment.
  const isAuthor = () => {
    let author = false;

    if (props.post && props.userId === props.post.author.id) {
      author = true;
    }

    if (props.comment && props.userId === props.comment.author.id) {
      author = true;
    }

    return author;
  }


  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {/* Only allow this option for the author */}
        { canEditPost() &&
          <ListItem button onClick={() => props.onEditPost(props.post)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Post" />
          </ListItem>
        }
        { !isAuthor() &&
          <div>
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
          </div>
        }
        { canComment() &&
          <ListItem button onClick={() => props.onAddComment(props.id)}>
            <ListItemIcon>
              <AddCommentIcon />
            </ListItemIcon>
            <ListItemText primary="Add Comment" />
          </ListItem>
        }
        { canEditComment() &&
          <ListItem button onClick={() => props.onEditComment(props.comment)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Comment" />
          </ListItem>
        }
        { !isAuthor() &&
          <ListItem button onClick={() => props.onFriendRequest(props.author)}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Friend Request" />
          </ListItem>
        }
      </List>
      <Divider />
      { isAuthor() &&
        <List>
          <ListItem button onClick={() => props.onDelete(props)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      }
      { !isAuthor() &&
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

  const handleDelete = () => {
    props.onDelete(props);
    handleClose();
  }

  const handleEditComment = () => {
    props.onEditComment(props.comment);
    handleClose();
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

  const canComment = () => {
    let allowComment = false;
    if (props.post) {
      // We current only support comments on posts.
      allowComment = true; 
    }
    return allowComment;
  }

  // Show the edit post option when the context menu is attached to
  // a post and the user is the author.
  const canEditComment = () => {
    return isAuthor() && props.comment;
  }

  // Show the edit post option when the context menu is attached to
  // a post and the user is the author.
  const canEditPost = () => {
    return isAuthor() && props.post;
  }

  // Checks if the current user is the owner of the post or comment.
  const isAuthor = () => {
    let author = false;

    if (props.post && props.userId === props.post.author.id) {
      author = true;
    }

    if (props.comment && props.userId === props.comment.author.id) {
      author = true;
    }

    return author;
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
      { canEditPost() && 
        <MenuItem onClick={handleEditPost}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Post" />
        </MenuItem>
      }
      {/* Don't allow the author to like or dislike their own content */}
      { !isAuthor() &&
        <div>
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
        </div>
      }
      { canComment() && 
        <MenuItem onClick={handleAddComment}>
          <ListItemIcon>
            <AddCommentIcon />
          </ListItemIcon>
          <ListItemText primary="Add Comment" />
        </MenuItem>
      }
      { canEditComment() && 
        <MenuItem onClick={handleEditComment}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Comment" />
        </MenuItem>
      }
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
