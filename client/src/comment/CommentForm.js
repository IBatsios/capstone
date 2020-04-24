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
  ADD_COMMENT,
  COMMENT_CONTENT_LABEL,
  COMMENT_CONTENT_TYPE
} from 'config/view/constants';
import { URL } from 'config/user';

export const CommentForm = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const [values, setValues] = React.useState({
    authorId: state.user.id || '',
    content: props.content || '',
    id: props._id,
    postId: props.postId
  });


  const handleClose = () => {
    dispatch({
      type: 'popBlock'
    });
  };

  const handleSave = async () => {
    // Send the updated comment data to the server.
    try {
      const commentId = values.id || '';
      let response = await axios({
        withCredentials: true,
        method: 'put',
        url: `${URL.COMMENTS}/${commentId}`,
        data: {
          content: values.content,
          postId: values.postId
        }
      });

      // Get the post with the updated comment.
      response = await axios({
        withCredentials: true,
        method: 'get',
        url: `${URL.POSTS}/${values.postId}`
      });
      dispatch({
        store: 'PostStore',
        type: 'PostFormSave',
        payload: response.data 
      });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Dialog
        open={true}
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

