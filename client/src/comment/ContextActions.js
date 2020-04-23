import React, { useContext } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ReportIcon from '@material-ui/icons/Report'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Hidden from '@material-ui/core/Hidden'
import { UserContext } from 'data/UserStore'
import { CommentForm } from './CommentForm'
import { URL } from 'config/user'

/**
 * Context action menu for posts on mobile devices.
 */
export const ContextActionsDrawer = (props) => {
  const [state, setState] = React.useState({
    open: false,
  })
  const useStyles = makeStyles({
    contextDrawer: {
      width: 'auto',
    },
  })
  const classes = useStyles()

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, open: isOpen })
  }

  const contextDrawer = () => (
    <div
      className={classes.contextDrawer}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {props.isAuthor() && (
          <ListItem button onClick={() => props.onEdit(props)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary='Edit Comment' />
          </ListItem>
        )}
        {!props.isAuthor() && (
          <div>
            <ListItem button onClick={() => props.onLike(props)}>
              <ListItemIcon>
                <ThumbUpIcon />
              </ListItemIcon>
              <ListItemText primary='Like' />
            </ListItem>
            <ListItem button onClick={() => props.onDislike(props)}>
              <ListItemIcon>
                <ThumbDownIcon />
              </ListItemIcon>
              <ListItemText primary='Dislike' />
            </ListItem>
            <ListItem button onClick={() => props.onFriendRequest(props)}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary='Friend Request' />
            </ListItem>
          </div>
        )}
      </List>
      <Divider />
      {props.isAuthor() && (
        <List>
          <ListItem button onClick={() => props.onDelete(props)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary='Delete' />
          </ListItem>
        </List>
      )}
      {!props.isAuthor() && (
        <List>
          <ListItem button onClick={() => props.onReport(props.id)}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary='Report' />
          </ListItem>
        </List>
      )}
    </div>
  )

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} aria-label='settings'>
        <MoreVertIcon />
      </IconButton>
      <Drawer anchor='bottom' open={state.open} onClose={toggleDrawer(false)}>
        {contextDrawer()}
      </Drawer>
    </div>
  )
}

/**
 * Context actions a user can perform on a post.
 */

export const ContextActions = (props) => {
  const [state, dispatch] = useContext(UserContext)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleContextMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    try {
      const response = await axios({
        withCredentials: true,
        method: 'delete',
        url: `${URL.COMMENTS}/${props._id}`,
      })

      const updatedPost = await axios({
        withCredentials: true,
        method: 'get',
        url: `${URL.POSTS}/${props.postId}`,
      })

      dispatch({
        store: 'PostStore',
        type: 'PostFormSave',
        payload: updatedPost.data,
      })

      handleClose()
    } catch (e) {
      console.log(e)
    }
  }

  const handleEdit = () => {
    dispatch({
      type: 'pushBlock',
      payload: <CommentForm {...props} />,
    })
    handleClose()
  }

  const handleLike = () => {
    dispatch({
      store: 'PostStore',
      type: 'likeComment',
      payload: props.id,
    })
    handleClose()
  }

  const handleDislike = () => {
    dispatch({
      store: 'PostStore',
      type: 'dislikeComment',
      payload: props.id,
    })
    handleClose()
  }

  const handleReport = () => {
    dispatch({
      store: 'PostStore',
      type: 'reportComment',
      payload: props.id,
    })
    handleClose()
  }

  const handleFriendRequest = () => {
    dispatch({
      store: 'PostStore',
      type: 'newFriendRequest',
      payload: {
        userId: state.user.id,
        friendId: props.author.id,
      },
    })
    handleClose()
  }

  // Checks if the current user is the owner of the post or comment.
  const isAuthor = () => {
    return state.user.id === props.author.id
  }

  return (
    <>
      <Hidden xsDown>
        <IconButton onClick={handleContextMenuClick} aria-label='settings'>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='context-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {/* Don't allow the author to like or dislike their own content */}
          {!isAuthor() && (
            <div>
              <MenuItem onClick={handleLike}>
                <ListItemIcon>
                  <ThumbUpIcon />
                </ListItemIcon>
                <ListItemText primary='Like' />
              </MenuItem>
              <MenuItem onClick={handleDislike}>
                <ListItemIcon>
                  <ThumbDownIcon />
                </ListItemIcon>
                <ListItemText primary='Dislike' />
              </MenuItem>
              <MenuItem onClick={handleFriendRequest}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary='Friend Request' />
              </MenuItem>
              <MenuItem onClick={handleReport}>
                <ListItemIcon>
                  <ReportIcon />
                </ListItemIcon>
                <ListItemText primary='Report' />
              </MenuItem>
            </div>
          )}
          {isAuthor() && (
            <div>
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary='Edit Comment' />
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary='Delete' />
              </MenuItem>
            </div>
          )}
        </Menu>
      </Hidden>
      <Hidden smUp>
        <ContextActionsDrawer
          isAuthor={isAuthor}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={handleReport}
          onFriendRequest={handleFriendRequest}
          {...props}
        />
      </Hidden>
    </>
  )
}
