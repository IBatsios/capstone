import React, { useContext } from "react";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { UserContext } from 'data/UserStore';
import classes from './ListItems.module.css';
import { URL } from 'config/user';


export const Friends = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const handleClose = () => {
  };

  const handleRemoveFriend = () => {
  }

  const handleAcceptFriend = () => {
  }


  return (
  );
}
