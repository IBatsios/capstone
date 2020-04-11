import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { UserContext } from 'data/UserStore';
import { ListForm } from './ListForm';
import { ListItemForm } from './ListItemForm';
import { ListItems } from './ListItems';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

/**
 * Actions that can be taken on a list.
 * @param {Object} props - A list object.
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

  const handleAddListItem = () => {
    dispatch({
      type: 'pushBlock',
      payload: <ListItemForm id={props.list.id} />
    });
    handleClose();
  }

  const handleDelete = () => {
    dispatch({
      store: 'ListStore',
      type: 'deleteList',
      payload: props.list.id
    });
    handleClose();
  }

  const handleEditList = () => {
    dispatch({
      type: 'pushBlock',
      payload: <ListForm {...props.list} />
    });
    handleClose();
  }

  const handleViewList = () => {
    dispatch({
      type: 'pushBlock',
      payload: <ListItems {...props.list} />
    });
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
      id="list-context-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleViewList}>
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        <ListItemText primary="View List" />
      </MenuItem>
      <MenuItem onClick={handleEditList}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit List" />
      </MenuItem>
      <MenuItem onClick={handleAddListItem}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Item" />
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Delete List" />
      </MenuItem>
    </Menu>
  </>
  );
}
