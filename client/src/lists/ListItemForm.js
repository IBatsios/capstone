import React, { useContext } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { UserContext } from 'data/UserStore';
import {
  ADD_LIST_ITEM,
  LIST_ITEM_TITLE,
  LIST_ITEM_DESCRIPTION_LABEL,
  LIST_ITEM_URL_HELPER_TEXT
} from 'config/view/constants';

export const ListItemForm = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const [values, setValues] = React.useState({
    id: props.id,
    userId: state.user.id,
    name: props.name || '',
    url: props.url || '',
    description: props.description || ''
  });


  const handleClose = () => {
    dispatch({
      type: 'popBlock',
    });
  };

  const handleSave = () => {
    // Remove properties with an undefined value.
    Object.keys(values).forEach(key => {
      if (values[key] === undefined) {
        delete values[key];
      }
    });
    dispatch({
      store: 'ListStore',
      type: 'ListItemFormSave',
      payload: values
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
          <Button onClick={handleSave} color="primary">
            Save 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
