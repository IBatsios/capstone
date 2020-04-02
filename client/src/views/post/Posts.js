import React, { useContext } from "react";
import { UserContext } from 'data/UserStore';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './Posts.module.css';
import { ContextActions } from 'views/ContextActions';
import { Comments } from 'views/post';
import { CommentForm } from 'views/post/CommentForm';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export const Posts = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const classes = { ...useStyles(), ...styles};
  const [expanded, setExpanded] = React.useState(-1);

  const handleExpandClick = (index) => {
    // Toggle the display of the comments for the post
    // which is clicked on.
    setExpanded(expanded === index ? -1 : index);
  };

  const handleLike = (postId) => {
    dispatch({
      type: 'likePost',
      payload: postId 
    });
  };

  const handleDislike = (postId) => {
    dispatch({
      type: 'dislikePost',
      payload: postId 
    });
  };

  const handleAddComment = (postId) => {
    dispatch({
      type: 'addCommentToPost',
      payload: <CommentForm postId={postId} /> 
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

  const handleReport = (postId) => {
    dispatch({
      type: 'reportPost',
      payload: postId 
    });
  }

  // Only render markup for posts that exist.
  if (props.posts.length > 0) {
    return (
      <>
        {props.posts.map((post, index) => (
          <Card className={classes.root} key={index}>
            <CardHeader
              avatar={
                <Avatar
                  alt={post.author.username}
                  src={post.author.avatar}
                />
              }
              action={
                <ContextActions
                  id={post.id}
                  author={post.author}
                  onLike={(postId) => handleLike(postId)}
                  onDislike={(postId) => handleDislike(postId)}
                  onAddComment={(postId) => handleAddComment(postId)}
                  onFriendRequest={(author) => handleFriendRequest(author)}
                  onReport={(postId) => handleReport(postId)}
                />
              }
              title={
                post.author.username
              }
            />

            <CardContent>
              <Typography className={classes.title} gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" component="p">
                {post.content}
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
            {post.comments.length > 0 && // Only render this with comments.
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expanded === index}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            }
            </CardActions>
            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
              <CardContent>
                <Comments comments={post.comments} />
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </>
    );
  }
  
  return null;
}
