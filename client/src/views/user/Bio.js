import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import classes from './Bio.module.css';
export const Bio = () => {
  const [state, dispatch] = useContext(UserContext);

  // TODO: Move this default image to a config file.
  const imgUrl = state.user.avatar || '/avatar.png';
  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebar}>
        <img alt="avatar" src={imgUrl} />
      </div>
      <div className={classes.content}>
        <div>Username: {state.user.username}</div>
        <div>Email: {state.user.email}</div>
        <div>{state.user.bio}</div>
      </div>
    </div>
  );
}
