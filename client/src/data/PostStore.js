import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import {
  getUserPosts,
  getPosts
} from './MockDataProvider';

const posts = getPosts();

// Allows for activating any given form.
const activeForm = null;
const postFormOpen = false;

// No sure where this id will be coming from yet, but it's
// time to start passing in more realistic user data.
const id = '5e7216fbacd4a42955b6450e';

const initialState = {
  ...userConfig,
  posts,
  postFormOpen,
  activeForm
};

function reducer(state, action) {
  switch (action.type) {
    case 'addCommentToPost':
      return { ...state, commentFormOpen: true, activeForm: action.payload };
    case 'deletePost':
        console.log(`User with id: ${state.user.id} wants to delete post with id: ${action.payload}`);
      return { ...state};
    case 'editPost':
      return { ...state, postFormOpen: true, activeForm: action.payload };
    case 'PostFormSave':
      // Prints to the console, the submitted post data.
      console.log(action.payload);
    return { ...state };
    // The next two case may be moved to a local state.
    case 'PostFormOpen':
      return { ...state, postFormOpen: true, activeForm: action.payload };
    case 'PostFormClose':
      return { ...state, postFormOpen: false, activeForm: null };
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
      throw new Error(`Action type: ${action.type} is not defined.`);
  }
}

export const PostContext = createContext([{}, function(){}]);

export const PostStore = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <PostContext.Provider value={[state, dispatch]}>
      {children}
    </PostContext.Provider>
  )
}
