import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { ContextActions } from 'comment/ContextActions';
import classes from './Comment.module.css';
import { CommentForm } from 'comment/CommentForm';


export const Comment = (props) => {
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
              {...props.comment}
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
