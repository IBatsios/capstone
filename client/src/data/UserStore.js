import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import {
  getUser,
  getUserPosts,
  getPosts,
  getLists
} from './MockDataProvider';

// No sure where this id will be coming from yet, but it's
// time to start passing in more realistic user data.
const id = '5e7216fbacd4a42955b6450e';

// This represents posts which are relevant to the authenticated user.
// They contain both there posts and other users, I'm not sure of how
// the logic works for decided what is considered relevant.
const posts = getPosts();

const lists = getLists();

// Allows for activating any given form.
const activeForm = null;
const listItemForm = null;

const postFormOpen = false;

const listFormOpen = false;
const listItemFormOpen = false;
const profileFormOpen = false;

const user = getUser(id);
const initialState = {
  ...userConfig,
  user,
  lists,
  posts,
  postFormOpen,
  listFormOpen,
  listItemFormOpen,
  listItemForm,
  activeForm,
  profileFormOpen
};
function reducer(state, action) {
  switch (action.type) {
    case 'profileFormClose':
      return { ...state, profileFormOpen: false, activeForm: null };
    case 'profileFormOpen':
      return { ...state, profileFormOpen: true, activeForm: action.payload };
    case 'profileFormSave':
      console.log(`User with id: ${state.user.id} updated profile settings to`);
      console.table(action.payload);
      return { ...state };
    case 'newFriendRequest':
      console.log(`userId ${action.payload.userId} want to be friends with userId ${action.payload.friendId}`);
      return { ...state };
    case 'changeActiveHeaderTab':
      return { ...state, activeHeaderTab: action.payload };
    default:
      throw new Error(`Action type: ${action.type} is not defined.`);
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
