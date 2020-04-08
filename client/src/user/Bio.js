import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { UserContext } from 'data/UserStore';
import classes from './Bio.module.css';
export const Bio = () => {
  const [state, dispatch] = useContext(UserContext);

  // TODO: Move this default image to a config file.
  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebar}>
        <Avatar
          className={classes.avatar}
          alt={state.user.username}
          src={state.user.avatar}
        />
      </div>
      <div className={classes.content}>
        <div>Username: {state.user.username}</div>
        <div>Email: {state.user.email}</div>
        <div>{state.user.bio}</div>
      </div>
    </div>
  );
}
