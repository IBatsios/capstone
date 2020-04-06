import React, { useContext } from "react";
import CloseIcon from '@material-ui/icons/Close';
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
import { UserContext } from 'data/UserStore';
import classes from './ListItems.module.css';


export const ListItems = ({name, items}) => {
  const [state, dispatch] = useContext(UserContext);

  const handleClose = () => {
    dispatch({
      type: 'listOpen',
      payload: {
        listOpen: false,
        listItems: null
      }
    });
  };

  const getItemName = (item) => {
    let name = item.name;

    if (item.url) {
      name = <a target="_blank" rel="noopener noreferrer" href={item.url}>{item.name}</a>;
    }

    return name;
  }

  return (
    <Dialog
      open={state.listOpen}
      onClose={handleClose}
      aria-labelledby="list-items-dialog"
      fullWidth
    >
      <DialogTitle id="dialog-list-items">
        {name}
        {state.listOpen ? (
          <IconButton
            className={classes.closeButton}
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <List key={name}>
          {items.map((item, index) => (
            <React.Fragment key={item.name}>
              <ListItem>
                <ListItemText
                  primary={getItemName(item)}
                  secondary={
                    item.description
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
