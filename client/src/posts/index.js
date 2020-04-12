import React from "react";
import { PostStore } from 'data/PostStore';
import { default as PostsComponent } from './Posts';

const Posts = () => {
  return (
    <PostStore>
      <PostsComponent />
    </PostStore>
  );
};

export default Posts;
