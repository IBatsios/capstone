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

export const ProfileForm = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const [values, setValues] = React.useState({
    id: props.id || state.user.id || '',
    avatar: props.avatar || state.user.avatar || '',
    bio: props.bio || state.user.bio || '',
    email: props.email || state.user.email || '',
    firstName: props.firstName || state.user.firstName || '',
    lastName: props.lastName || state.user.lastName || '',
    phone: props.phone || state.user.phone || ''
  });


  const handleClose = () => {
    dispatch({
      type: 'profileFormClose'
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
      type: 'profileFormSave',
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
        open={state.profileFormOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-profile"
        fullWidth
      >
        <DialogTitle id="form-dialog-profileForm">Profile Settings</DialogTitle>
        <DialogContent>
          <TextField
            value={values.firstName}
            onChange={handleChange("firstName")}
            margin="dense"
            id="edit-profile-form-firstname"
            label="First Name"
            type="text"
            fullWidth
          />
          <TextField
            value={values.lastName}
            onChange={handleChange("lastName")}
            margin="dense"
            id="edit-profile-form-lastname"
            label="Last Name"
            type="text"
            fullWidth
          />
          <TextField
            value={values.email}
            onChange={handleChange("email")}
            margin="dense"
            id="edit-profile-form-email"
            label="Email"
            type="text"
            fullWidth
          />
          <TextField
            value={values.phone}
            onChange={handleChange("phone")}
            margin="dense"
            id="edit-profile-form-phone"
            label="Phone"
            type="text"
            fullWidth
          />
          <TextField
            value={values.avatar}
            onChange={handleChange("avatar")}
            margin="dense"
            id="edit-profile-form-avatar"
            label="Avatar URL"
            type="text"
            fullWidth
          />
          <TextField
            value={values.bio}
            onChange={handleChange("bio")}
            margin="dense"
            id="edit-profile-form-bio"
            label="Bio"
            type="text"
            rows="4"
            multiline
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

