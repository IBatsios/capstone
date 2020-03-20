import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import classes from './Posts.module.css';
import { PostDrawer, PostMenu } from './PostMenu';

export const Posts = (props) => {
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
                />
              }
              action={
                <>
                  <Hidden xsDown>
                    <PostMenu />
                  </Hidden>
                  <Hidden smUp>
                    <PostDrawer />
                  </Hidden>
                </>
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
          </Card>
        ))}
      </>
    );
  }
  
  return null;
}
