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
import { UserContext } from 'data/UserStore';
import {
  ADD_COMMENT,
  COMMENT_CONTENT_ID,
  COMMENT_CONTENT_LABEL,
  COMMENT_CONTENT_TYPE
} from 'config/view/constants';

export const CommentForm = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const [values, setValues] = React.useState({
    authorId: state.user.id || '',
    content: props.content || '',
    postId: props.postId
  });


  const handleClose = () => {
    dispatch({
      type: 'CommentFormClose'
    });
  };

  const handleSave = () => {
    dispatch({
      type: 'CommentFormSave',
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
        open={state.commentFormOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{ADD_COMMENT}</DialogTitle>
        <DialogContent>
          <TextField
            value={values.content}
            onChange={handleChange("content")}
            margin="dense"
            id={COMMENT_CONTENT_TYPE}
            label={COMMENT_CONTENT_LABEL}
            type={COMMENT_CONTENT_TYPE}
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

