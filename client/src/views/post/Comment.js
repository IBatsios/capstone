import React, { useContext } from "react";
import { UserContext } from 'data/UserStore';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { ContextActions } from 'views/ContextActions';
import classes from './Comment.module.css';
import { CommentForm } from 'views/post/CommentForm';


export const Comment = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const handleEditComment = (comment) => {
    console.log(comment);
    const { id, content } = { ...comment};
    const commentData = { id, content };
    dispatch({
      type: 'editComment',
      payload: <CommentForm {...commentData} /> 
    });
  };

  const handleLike = (commentId) => {
    dispatch({
      type: 'likeComment',
      payload: commentId 
    });
  };

  const handleDislike = (commentId) => {
    dispatch({
      type: 'dislikeComment',
      payload: commentId 
    });
  };

  const handleFriendRequest = (author) => {
    dispatch({
      type: 'newFriendRequest',
      payload: {
        userId: state.user.id,
        friendId: author.id
      }
    });
  };

  const handleReport = (commentId) => {
    dispatch({
      type: 'reportComment',
      payload: commentId 
    });
  }


  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              alt={props.comment.author.username}
              src={props.comment.author.avatar}
            />
          }
          action={
            <ContextActions
              userId={state.user.id}
              id={props.comment.id}
              comment={props.comment}
              author={props.comment.author}
              onEditComment={(comment) => handleEditComment(comment)}
              onLike={(commentId) => handleLike(commentId)}
              onDislike={(commentId) => handleDislike(commentId)}
              onFriendRequest={(author) => handleFriendRequest(author)}
              onReport={(commentId) => handleReport(commentId)}
            />
          }
          title={
            props.comment.author.username
          }
        />
        <CardContent>
          <Typography variant="body2" component="p">
            {props.comment.content}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
