import React, { useContext } from "react";
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import {
  Tab,
  Tabs
} from '@material-ui/core';
import TabPanel from 'tabs/TabPanel';
import classes from './Friends.module.css';
import { UserContext } from 'data/UserStore';
import { URL } from 'config/user';
import { MANAGE_FRIENDS } from 'config/view/constants';


export const Friends = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const active = state.activeManageFriendsTab;

  const onTabChange = (event, value) =>  {
    dispatch({
      type: 'changeActiveManageFriendsTab',
      payload: value 
    });
  }


  const handleClose = () => {
    dispatch({
      type: 'popBlock'
    });
  };

  const handleRejectFriendRequest = id => () => {
    console.log(id);
    console.log('handleRemoveFriend');
    dispatch({
      type: 'rejectFriendRequest',
      payload: id
    });
  }

  const handleRemoveFriend = id => () => {
    console.log('handleRemoveFriend');
  }

  const handleAcceptFriend = id => () => {
    console.log('handleAcceptFriend');
    dispatch({
      type: 'acceptFriendRequest',
      payload: id
    });
  }

  return (
    <>
      <Dialog
        className={classes.dialogPaper}
        open={true}
        onClose={handleClose}
        aria-labelledby="friends-dialog"
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle id="dialog-friends">
            {MANAGE_FRIENDS.TITLE}
            <IconButton
              className={classes.closeButton}
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Tabs value={active} centered onChange={onTabChange}>
            <Tab label={MANAGE_FRIENDS.FRIENDS} />
            <Tab label={MANAGE_FRIENDS.PENDING} />
            <Tab label={MANAGE_FRIENDS.SENT_REQUESTS} />
          </Tabs>
          <TabPanel className={classes.tabpanel} value={active} index={0}>
            <List>
              {state.user.friends.map((friend, index) => (
                <React.Fragment key={friend._id}>
                  <ListItem>
                    <Avatar
                      className={classes.avatar}
                      alt={friend.username}
                      src={friend.avatar}
                    />
                    <ListItemText
                      primary={friend.username}
                      secondary={ friend.bio }
                    />
                    <>
                      <IconButton
                        aria-label="delete"
                        onClick={handleRemoveFriend}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </TabPanel>
          <TabPanel className={classes.tabpanel} value={active} index={1}>
            <List>
              {state.user.pendingRequests.map((pendingRequest, index) => (
                <React.Fragment key={pendingRequest._id}>
                  <ListItem>
                    <Avatar
                      className={classes.avatar}
                      alt={pendingRequest.username}
                      src={pendingRequest.avatar}
                    />
                    <ListItemText
                      primary={pendingRequest.username}
                      secondary={
                        pendingRequest.bio
                      }
                    />
                    <>
                      <IconButton
                        aria-label="approve"
                        onClick={handleAcceptFriend(pendingRequest._id)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        aria-label="reject"
                        onClick={handleRejectFriendRequest(pendingRequest._id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </TabPanel>
          <TabPanel className={classes.tabpanel} value={active} index={2}>
            <List>
              {state.user.sentRequests.map((sentRequest, index) => (
                <React.Fragment key={sentRequest._id}>
                  <ListItem>
                    <Avatar
                      className={classes.avatar}
                      alt={sentRequest.username}
                      src={sentRequest.avatar}
                    />
                    <ListItemText
                      primary={sentRequest.username}
                      secondary={
                        sentRequest.bio
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
}
