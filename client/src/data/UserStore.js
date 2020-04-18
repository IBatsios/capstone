import React, { createContext, useReducer } from 'react';
import { listReducer } from 'data/ListStore';
import { postReducer } from 'data/PostStore';
import { userConfig } from '../config/user';

/**
 * userMap stores the users requested from the server and handles any
 * differences in property names between the front and back-ends.  
 **/
const userMap = {
  map: new Map(),
  // Returns a user in the format of the front-end.
  get(user) {
    const { _id, ...other } = this.map.get(user.id);
    return { id: _id, ...other }
  },
  // Saves the user as provide by the backend.
  set(user) {
    this.map.set(user._id, user);
  },
  getById(id) {
    const {_id, ...other} = this.map.get(id);
    return { id: _id, ...other };
  },
  // Update an entry in the map from the frontend format.
  save(user) {
    const { id, ...other } = {...user};
    this.map.set(id, { _id: id, ...other });
  }
}

const activeList = {};
const initialState = {
  authenticated: false
};

export function userReducer(state, action) {
  switch (action.store) {
    case 'ListStore':
      return listReducer(state, action);
    case 'PostStore':
      return postReducer(state, action);
  }
  switch (action.type) {
    case 'setPostData':
      return postReducer(state, action);
    case 'isFetchingPosts':
      return postReducer(state, action);
    case 'isFetchingLists':
      return listReducer(state, action);
    case 'setListData':
      return listReducer(state, action);
    case 'isFetchingUser':
      console.log('isFetchingUser');
      return {...state, isFetchingUser: true};
    case 'setUser':
      // FIXME: This is a work-around.
      // This serves to auto-login in the user defined in the
      // login form.  It seems to me there ought to be a way
      // to allow a user with a valid session on the backend to 
      // avoid sending there username and password with each 
      // request.
      userMap.set(action.payload.user);
      return {
        ...state,
        authenticated: true,
        login: true,
        activeList,
        ...userConfig,
        lists: [],
        posts: [],
        dynamicContent: [],
        user: userMap.getById(action.payload.user._id),
        isFetchingUser: false
      };
    case 'login':
      console.log({...initialState});
      console.log(state);
      return { ...initialState};
    case 'signIn':
      console.log(action.payload);
      userMap.set(action.payload);
      return {
        user: userMap.getById(action.payload._id),
        authenticated: true,
        isFetchingPosts: false,
        login: true,
        activeList,
        ...userConfig,
        lists: [],
        posts: [],
        dynamicContent: []
      }
    case 'register':
      console.log('register');
      console.log(action.payload);
      return {...state, register: action.payload};
    case 'changeTab':
      state.section[action.payload.section].interest = action.payload.interest;
      return {...state};
    // TODO: Refactor to not require activeList.  It's a work-around
    // to cause ListItems to re-render when items have been updated.
    case 'activeList':
      console.log(action.payload);
      return {...state, activeList: {...action.payload}};
    case 'logout':
      console.log('Logging out');
      //return { ...initialState};
      return {...state};
    case 'newFriendRequest':
      console.log(`userId ${action.payload.userId} want to be friends with userId ${action.payload.friendId}`);
      return { ...state };
    case 'changeActiveHeaderTab':
      return { ...state, activeHeaderTab: action.payload };
    case 'popBlock':
      state.dynamicContent.shift();
      console.log(`popBlock (length): ${state.dynamicContent.length}`);
      return { ...state };
    case 'pushBlock':
      state.dynamicContent.unshift(action.payload);
      console.log(`pushBlock (length): ${state.dynamicContent.length}`);
      console.log(state.dynamicContent);
      return { ...state };
    case 'updateUserProfile':
      console.log(action.payload);
      return {...state};
    default:
      return {...state};
  }

}

export const UserContext = createContext({});

export const UserStore = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return(
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
