import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { listReducer } from 'data/ListStore';
import { postReducer } from 'data/PostStore';
import { appConfig } from '../config/user';
import { Friends } from 'friends/Friends';
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
    this.map.set(user._id, user);
  },
  getById(id) {
    const {_id, ...other} = this.map.get(id);
    return { id: _id, ...other };
  }
}

const getUser = (user) => {
  console.log(user);
  return axios({
      withCredentials: true,
      method: 'get',
      url: `${URL.USERS}/${user.id}`
    }).then(response => {
      console.log(response);
      return response.data;
  });
};

const cancelFriendRequest = async (id) => {
  return axios({
      withCredentials: true,
      method: 'put',
      url: `${URL.CANCEL_FRIEND_REQUEST}/${id}`,
    }).then(response => {
      return response.data;
  });
};

const requestFriend = async (id) => {
  return axios({
      withCredentials: true,
      method: 'put',
      url: `${URL.FRIENDS}/${id}`,
    }).then(response => {
      return response.data;
  });
};

const acceptFriendRequest = (id) => {
  return axios({
      withCredentials: true,
      method: 'put',
      url: `${URL.ACCEPT_FRIEND}/${id}`,
    }).then(response => {
      return response.data;
  });
};

const rejectFriendRequest = async (id) => {
  const response = await axios({
    withCredentials: true,
    method: 'put',
    url: `${URL.REJECT_FRIEND}/${id}`
  })
};

const removeFriend = async (id) => {
  console.log(id);
  const response = await axios({
    withCredentials: true,
    method: 'put',
    url: `${URL.REMOVE_FRIEND}/${id}`
  })
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
    case 'getUser':
      //userMap.set(action.payload.user);
      console.log('getUser');
      let user = getUser(state.user);
      console.log(user);
      return {...state };
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
        //dynamicContent: [],
        dynamicContent: [<Friends />],
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
        ...appConfig,
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
    case 'friendRequest':
      console.log(action.payload);
      requestFriend(action.payload); 
      return {...state };
    case 'removeFriend':
      console.log(action.payload);
      removeFriend(action.payload);
      return {...state };
    case 'cancelFriendRequest':
      console.log(action.payload);
      cancelFriendRequest(action.payload); 
      return {...state };
    case 'acceptFriendRequest':
      console.log('acceptFriendRequest');
      acceptFriendRequest(action.payload);
      return {...state };
    case 'rejectFriendRequest':
      rejectFriendRequest(action.payload);
      return {...state };
      /*
    case 'newFriendRequest':
      console.log(`userId ${action.payload.userId} want to be friends with userId ${action.payload.friendId}`);
      return { ...state };
      */
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
