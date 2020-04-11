import React from 'react';
import { Comment } from './Comment';

export const Comments = (props) => {
  return (
    <>
      {props.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
}
