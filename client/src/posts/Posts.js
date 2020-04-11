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
import { ContextActions } from 'ContextActions';
import { Comments } from 'comment/Comments';
import { CommentForm } from 'comment/CommentForm';
import PostForm from 'posts/PostForm';

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

const Posts = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const classes = { ...useStyles(), ...styles};
  const [expanded, setExpanded] = React.useState(-1);

  const handleExpandClick = (index) => {
    // Toggle the display of the comments for the post
    // which is clicked on.
    setExpanded(expanded === index ? -1 : index);
  };

  const handleDelete = ({id}) => {
    dispatch({
      store: 'PostStore',
      type: 'deletePost',
      payload: id
    });
  };


  const handleEditPost = (post) => {
    console.log(post);
    const { id, author, title, content, interest, spoiler } = { ...post};
    const postData = { id, author, title, content, interest, spoiler };
    dispatch({
      type: 'pushBlock',
      payload: <PostForm {...postData} /> 
    });
  };

  const handleLike = (postId) => {
    dispatch({
      store: 'PostStore',
      type: 'likePost',
      payload: postId 
    });
  };

  const handleDislike = (postId) => {
    dispatch({
      store: 'PostStore',
      type: 'dislikePost',
      payload: postId 
    });
  };

  const handleAddComment = (postId) => {
    dispatch({
      type: 'pushBlock',
      payload: <CommentForm postId={postId} /> 
    });
  };

  const handleFriendRequest = (author) => {
    dispatch({
      store: 'PostStore',
      type: 'newFriendRequest',
      payload: {
        userId: state.user.id,
        friendId: author.id
      }
    });
  };

  const handleReport = (postId) => {
    dispatch({
      store: 'PostStore',
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
                  userId={state.user.id}
                  id={post.id}
                  post={post}
                  author={post.author}
                  onDelete={(post) => handleDelete(post)}
                  onEditPost={(post) => handleEditPost(post)}
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

export default Posts;
