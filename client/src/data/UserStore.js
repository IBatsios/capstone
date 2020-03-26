import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import { getUser, getUserPosts, getPosts } from './MockDataProvider';

// No sure where this id will be coming from yet, but it's
// time to start passing in more realistic user data.
const id = '5e7216fbacd4a42955b6450e';

// This represents posts which are relevant to the authenticated user.
// They contain both there posts and other users, I'm not sure of how
// the logic works for decided what is considered relevant.
const posts = getPosts();

const user = getUser(id);
const initialState = {
  ...userConfig,
  user,
  posts
};

function reducer(state, action) {
  switch (action.type) {
    case 'changeActiveHeaderTab':
      return { ...state, activeHeaderTab: action.payload };
    default:
      throw new Error('Action type is not defined.');
  }
}

export const UserContext = createContext({});

export const UserStore = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
