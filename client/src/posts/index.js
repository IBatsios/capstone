import React from "react";
import { PostStore } from 'data/PostStore';
import { default as PostsComponent } from './Posts';
export { Comments } from './Comments';

const Posts = () => {
  return (
    <PostStore>
      <PostsComponent />
    </PostStore>
  );
};

export default Posts;
