import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ContextActions } from 'comment/ContextActions';
import classes from './Comment.module.css';
import { renderMarkdown } from 'utils';


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
              postId={props.postId}
            />
          }
          title={
            props.comment.author.username
          }
        />
        <CardContent>
          {renderMarkdown(props.comment.content)}
        </CardContent>
      </Card>
    </>
  );
}
