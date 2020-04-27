import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { listReducer } from 'data/ListStore';
import { postReducer } from 'data/PostStore';
import { appConfig, userConfig } from '../config/user';
import { URL } from 'config/user';

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
    user = {...userConfig, ...user};
    let friends = [];
    let pendingRequests = [];

    try {
      for (let friendId of user.friends) {
        getUser(friendId).then((result) => {
          friends.push(result.user);
        });
      }
    } catch {
      // ES2019 optional catch binding.
      // The user has no friends.
    }

    try {
      for (let userId of user.pendingRequests) {
        getUser(userId).then((result) => {
          pendingRequests.push(result.user);
        });
      }
    } catch {
      // This user doesn't have any pending friend requests.
    }

    user.friends = friends;
    user.pendingRequests = pendingRequests;
    this.map.set(user._id, user);
  },
  getById(id) {
    const {_id, ...other} = this.map.get(id);
    return { id: _id, ...other };
  }
}

const getUser = (id) => {
  return axios({
      withCredentials: true,
      method: 'get',
      url: `${URL.USERS}/${id}`
    }).then(response => {
      return response.data;
  });
};

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
      return {...state, isFetchingUser: true};
    case 'setUser':
      userMap.set(action.payload.user);
      return {
        ...state,
        authenticated: true,
        login: true,
        activeList,
        ...appConfig,
        lists: [],
        posts: [],
        dynamicContent: [],
        user: userMap.getById(action.payload.user._id),
        isFetchingUser: false
      };
    case 'updateUser':
      userMap.set(action.payload.user);
      return {
        ...state,
        user: userMap.getById(action.payload.user._id)
      };
    case 'signIn':
      userMap.set(action.payload);
      sessionStorage.setItem('userId', action.payload._id);
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
      return {...state, register: action.payload};
    case 'changeTab':
      state.section[action.payload.section].interest = action.payload.interest;
      return {...state};
    // TODO: Refactor to not require activeList.  It's a work-around
    // to cause ListItems to re-render when items have been updated.
    case 'activeList':
      return {...state, activeList: {...action.payload}};
    case 'logout':
      sessionStorage.removeItem('userId');
      return { ...initialState, authenticated: false};
    case 'newFriendRequest':
      console.log(`userId ${action.payload.userId} want to be friends with userId ${action.payload.friendId}`);
      return { ...state };
    case 'changeActiveHeaderTab':
      return { ...state, activeHeaderTab: action.payload };
    case 'changeActiveManageFriendsTab':
      return { ...state, activeManageFriendsTab: action.payload };
    case 'popBlock':
      state.dynamicContent.shift();
      return { ...state };
    case 'pushBlock':
      state.dynamicContent.unshift(action.payload);
      return { ...state };
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
