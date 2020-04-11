import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import {
  getUserPosts,
  getPosts
} from './MockDataProvider';

const posts = getPosts();
let updatedPosts;

// No sure where this id will be coming from yet, but it's
// time to start passing in more realistic user data.
const id = '5e7216fbacd4a42955b6450e';

const initialState = {
  // TODO: Remove userConfig from this initialState, it should be onlyin
  // UserStore.  Removing from here causes an error and needs to be 
  // fixed.
  ...userConfig,
  posts
};

export function postReducer(state, action) {
  console.log(action);
  switch (action.type) {
    case 'CommentFormSave':
      console.log('CommentFormSave');
      // Prints to the console, the submitted post data.
      console.log(action.payload);
      const author = { id: state.user.id, username: state.user.username, avatar: state.user.avatar };
      if (action.payload.postId) {
        updatedPosts = state.posts.map(post => {
          if (post.id === action.payload.postId) {
            const commentId = post.comments.length;
            post.comments.push({ id: commentId, author: author, ...action.payload});
          }
          return post;
        });
      }
      console.log(updatedPosts);
      state.posts = updatedPosts;
      return { ...state };
    case 'addCommentToPost':
      return { ...state };
    case 'editComment':
      return { ...state };
    case 'deleteComment':
      // A temporary means to remove a comment from a post.
      state.posts  = state.posts.map(post => {
        if (post.id === action.payload.comment.postId) {
          post.comments = post.comments.filter(comment => comment.id !== action.payload.comment.id);
        } 
        return post;
      });
      return {...state};
    case 'deletePost':
      console.log(`User with id: ${state.user.id} wants to delete post with id: ${action.payload}`);
      // A temporary means to remove a post.
      state.posts = state.posts.filter(post =>  post.id !== action.payload);
      return { ...state};
    case 'PostFormSave':
      console.log('PostFormSave');
      // Prints to the console, the submitted post data.
      // A temporary means to save  a post.
      console.log(action.payload);
      if (action.payload.id) {
        state.posts = state.posts.map(post => {
          if (post.id === action.payload.id) {
            post = {...post, ...action.payload};
          }
          return post;
        });
      } else {
        const author = { id: state.user.id, username: state.user.username, avatar: state.user.avatar };
        const postId = state.posts.length;
        const post = { id: postId, author: author, comments: [], ...action.payload };
        state.posts.unshift(post);
      }
    return { ...state };
    // The next two case may be moved to a local state.
    case 'likePost':
      console.log(`liked postId: ${action.payload}`);
      return { ...state };
    case 'dislikePost':
      console.log(`disliked postId: ${action.payload}`);
      return { ...state };
    case 'reportPost':
      console.log(`postId ${action.payload} has been reported`);
      return { ...state };
    default:
      return {...state};
  }
}

export const PostContext = createContext([{}, function(){}]);

export const PostStore = ({children}) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return(
    <PostContext.Provider value={[state, dispatch]}>
      {children}
    </PostContext.Provider>
  )
}

export function usePosts() {
  return useReducer(postReducer, posts);
}

