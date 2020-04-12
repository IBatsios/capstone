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
  ADD_LIST,
  LIST_INTEREST_ID,
  LIST_INTEREST_LABEL,
  LIST_INTEREST_TYPE,
  LIST_INTEREST_HELPER_TEXT
} from 'config/view/constants';

export const ListForm = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const [values, setValues] = React.useState({
    id: props.id,
    userId: state.user.id,
    name: props.name || '',
    interest: props.interest || ''
  });


  const handleClose = () => {
    dispatch({
      type: 'popBlock'
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
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-name"
        fullWidth
      >
        <DialogTitle id="form-dialog-listForm">{ADD_LIST}</DialogTitle>
        <DialogContent>
          <TextField
            required
            value={values.name}
            onChange={handleChange("name")}
            margin="dense"
            id="name"
            label="Name"
            type="text"
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

