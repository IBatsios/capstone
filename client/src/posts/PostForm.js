import React, { useContext } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
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
  ADD_POST,
  POST_TITLE_ID,
  POST_TITLE_LABEL,
  POST_TITLE_TYPE,
  POST_CONTENT_ID,
  POST_CONTENT_LABEL,
  POST_CONTENT_TYPE,
  POST_INTEREST_ID,
  POST_INTEREST_LABEL,
  POST_INTEREST_TYPE,
  POST_INTEREST_HELPER_TEXT,
  SPOILER_LABEL,
  SPOILER_ID
} from 'config/view/constants';

export const  PostForm = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const [values, setValues] = React.useState({
    id: props.id,
    title: props.title || '',
    content: props.content || '',
    interest: props.interest || '',
    spoiler: props.spoiler || false 
  });


  const handleClose = () => {
    dispatch({
      type: 'popBlock'
    });
  };

  const handleSave = () => {
    // Remove properties with an undefined value.
    // We want to be able to know the id of the post
    // if it is being editted; but be don't want to pass
    // around and id of undefined for new posts.
    Object.keys(values).forEach(key => {
      if (values[key] === undefined) {
        delete values[key];
      }
    });

    dispatch({
      store: 'PostStore',
      type: 'PostFormSave',
      payload: values
    });
    handleClose();

    handleClose();
  };

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckbox = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{ADD_POST}</DialogTitle>
        <DialogContent>
          <TextField
            required
            value={values.title}
            onChange={handleChange("title")}
            autoFocus
            margin="dense"
            id={POST_TITLE_TYPE}
            label={POST_TITLE_LABEL}
            type={POST_TITLE_TYPE}
            fullWidth
          />
          <TextField
            required
            value={values.content}
            onChange={handleChange("content")}
            margin="dense"
            id={POST_CONTENT_TYPE}
            label={POST_CONTENT_LABEL}
            type={POST_CONTENT_TYPE}
            rows="4"
            multiline
            fullWidth
          />
          <TextField
            required
            onChange={handleChange("interest")}
            id={POST_INTEREST_ID}
            select
            label={POST_INTEREST_LABEL}
            value={values.interest}
            helperText={POST_INTEREST_HELPER_TEXT}
            fullWidth
          >
            {state.interests.map((interest) => (
              <MenuItem key={interest} value={interest}>
                {interest}
              </MenuItem>
            ))}
          </TextField>
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleCheckbox}
                  checked={values.spoiler}
                  name={SPOILER_ID}
                />
              }
              label={SPOILER_LABEL}
              labelPlacement="start"
            />
          </FormControl>
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
