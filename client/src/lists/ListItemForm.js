import React, { useContext } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UserContext } from 'data/UserStore';
import {
  LIST_ITEM_DESCRIPTION_LABEL,
  LIST_ITEM_URL_HELPER_TEXT
} from 'config/view/constants';
import { URL } from 'config/user';

export const ListItemForm = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [buttonState, setButtonState] = React.useState({disabled: false});

  const [values, setValues] = React.useState({
    id: props._id,
    name: props.name || '',
    url: props.url || '',
    description: props.description || '',
    listId: props.listId
  });


  const handleClose = () => {
    dispatch({
      type: 'popBlock',
    });
  };

  const handleSave = async () => {
    // Prevent duplicate submissions.
    setButtonState({disabled: true});

    // Remove properties with an undefined value.
    Object.keys(values).forEach(key => {
      if (values[key] === undefined) {
        delete values[key];
      }
    });
    const itemId = values.id || '';
    let response = await axios({
      withCredentials: true,
      method: 'put',
      url: `${URL.LIST_ITEMS}/${itemId}`,
      data: {
        name: values.name,
        url: values.url,
        description: values.description,
        listId: values.listId
      }
    });

    // Get the list with the updated item.
    response = await axios({
      withCredentials: true,
      method: 'get',
      url: `${URL.LISTS}/${values.listId}`
    });

    dispatch({
      store: 'ListStore',
      type: 'saveList',
      payload: response.data 
    });
    handleClose();
  };

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-name"
        fullWidth
      >
        <DialogTitle id="form-dialog-name">List item</DialogTitle>
        <DialogContent>
          <TextField
            required
            value={values.name}
            onChange={handleChange("name")}
            margin="dense"
            id="list-item-name"
            label="name"
            type="text"
            fullWidth
          />
          <TextField
            required
            value={values.url}
            onChange={handleChange("url")}
            margin="dense"
            id="url"
            label="URL"
            type="text"
            helperText={LIST_ITEM_URL_HELPER_TEXT}
            fullWidth
          />
          <TextField
            value={values.description}
            onChange={handleChange("description")}
            margin="dense"
            id="description"
            label={LIST_ITEM_DESCRIPTION_LABEL}
            type="text"
            multiline
            rows="4"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button {...buttonState} onClick={handleSave} color="primary">
            Save 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
