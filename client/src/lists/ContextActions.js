import React, { useContext } from "react";
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
import { URL } from 'config/user';

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
      payload: <ListItemForm listId={props.list.id} />
    });
    handleClose();
  }

  const handleDelete = async () => {
    try {
      await axios({
        withCredentials: true,
        method: 'delete',
        url: `${URL.LISTS}/${props.list.id}`
      });

      dispatch({
        store: 'ListStore',
        type: 'deleteList',
        payload: props.list.id
      });
    } catch (e) {
      console.log(e);
    }

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
    // TODO: Refactor to remove activeList from state.  It here because
    // the view of list items doesn't re-render when an item is changed.
    // It's a work-around!
    dispatch({
      type: 'activeList',
      payload: props.list
    });
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
