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
    title: props.title || '',
    url: props.url || '',
    description: props.description || ''
  });


  const handleClose = () => {
    dispatch({
      type: 'ListFormClose'
    });
  };

  const handleAdd = () => {
    // Remove properties with an undefined value.
    Object.keys(values).forEach(key => {
      if (values[key] === undefined) {
        delete values[key];
      }
    });
    dispatch({
      type: 'ListItemFormSave',
      payload: values
    });
  };

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Dialog
        open={state.listItemFormOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{ADD_LIST_ITEM}</DialogTitle>
        <DialogContent>
          <TextField
            required
            value={values.title}
            onChange={handleChange("title")}
            margin="dense"
            id="title"
            label="title"
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
          <Button onClick={handleAdd} color="primary">
            Add 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
