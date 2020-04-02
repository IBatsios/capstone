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
  LIST_INTEREST_ID,
  LIST_INTEREST_LABEL,
  LIST_INTEREST_TYPE,
  LIST_INTEREST_HELPER_TEXT,
  LIST_DESCRIPTION_LABEL,
  LIST_URL_HELPER_TEXT,
  ADD_LIST
} from 'config/view/constants';

export const ListForm = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const [values, setValues] = React.useState({
    id: props.id,
    userId: state.user.id,
    title: props.title || '',
    url: props.url || '',
    interest: props.interest || '',
    description: props.description || '',
  });


  const handleClose = () => {
    dispatch({
      type: 'ListFormClose'
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
      type: 'ListFormSave',
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
        open={state.listFormOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{ADD_LIST}</DialogTitle>
        <DialogContent>
          <TextField
            required
            value={values.title}
            onChange={handleChange("title")}
            margin="dense"
            id="title"
            label="Name"
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
            helperText={LIST_INTEREST_HELPER_TEXT}
            fullWidth
          />
          <TextField
            required
            onChange={handleChange("interest")}
            id={LIST_INTEREST_ID}
            select
            label={LIST_INTEREST_LABEL}
            value={values.interest}
            helperText={LIST_INTEREST_HELPER_TEXT}
            fullWidth
          >
            {state.interests.map((interest) => (
              <MenuItem key={interest} value={interest}>
                {interest}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={values.description}
            onChange={handleChange("description")}
            margin="dense"
            id="description"
            label={LIST_DESCRIPTION_LABEL}
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

