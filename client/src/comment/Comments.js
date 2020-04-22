import React from 'react';
import { Comment } from './Comment';

export const Comments = (props) => {
  return (
    <>
      {props.comments.map((comment) => (
        /* The use of comment._id may change to comment.id
           after some server-side changes.  This is a work-around. */
        <Comment key={comment._id} postId={props.postId} comment={comment} />
      ))}
    </>
  );
}
