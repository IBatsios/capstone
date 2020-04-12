import React, { useContext } from "react";
import CloseIcon from '@material-ui/icons/Close';
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
import { UserContext } from 'data/UserStore';
import { ListItemForm } from './ListItemForm';
import classes from './ListItems.module.css';


export const ListItems = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const handleClose = () => {
    dispatch({
      type: 'popBlock'
    });
  };

  const handleDeleteItem = item => () => {
    dispatch({
      store: 'ListStore',
      type: 'deleteListItem',
      payload: {
        listId: props.id,
        item: item
      }
    });
  };

  const handleEditItem = item => () => {
    dispatch({
      type: 'pushBlock',
      payload: <ListItemForm listId={props.id} {...item} />
    });
  };


  const getItemName = (item) => {
    let name = item.name;

    if (item.url) {
      name = <a target="_blank" rel="noopener noreferrer" href={item.url}>{item.name}</a>;
    }

    return name;
  }

  const isAuthor = () => {
    return state.user.id === props.author.id;
  }

  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="list-items-dialog"
        fullWidth
      >
        <DialogTitle id="dialog-list-items">
          {props.name}
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
          <List key={props.name}>
            {props.items.map((item, index) => (
              <React.Fragment key={item.name}>
                <ListItem>
                  <ListItemText
                    primary={getItemName(item)}
                    secondary={
                      item.description
                    }
                  />

                  {isAuthor() &&
                    <>
                      <IconButton
                        aria-label="edit"
                        onClick={handleEditItem(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={handleDeleteItem(item)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  }
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
