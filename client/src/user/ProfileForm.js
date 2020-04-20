import React, { useContext } from "react";
import axios from 'axios';
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

/**
 * Allows user to modify their profile.
 * @param {object} [props] Could contain user settings.
 */
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
    console.log({ data: { avatar: values.avatar, bio: values.bio, email: values.email, firstName: values.firstName, lastName: values.lastName, phone: values.phone }});
    axios({
      method: 'put',
      url: `http://localhost:9000/users/${state.user.id}`,
      data: {
        _id: state.user.id,
        avatar: values.avatar, 
        bio: values.bio,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone
      }
    })
    .then(function (response) {
      console.log(response);
      dispatch({
        type: 'updateUserProfile',
        payload: response.data 
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    //handleClose();
  };

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Dialog
        open={true}
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

