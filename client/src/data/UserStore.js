import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import { getUser } from './MockDataProvider';

// No sure where this id will be coming from yet, but it's
// time to start passing in more realistic user data.
const id = '5e7216fbacd4a42955b6450e';

const user = getUser(id);
const initialState = {...userConfig, user};

console.log(initialState);

function reducer(state, action) {
  switch (action.type) {
    case 'changeActiveHeaderTab':
      return { ...state, activeHeaderTab: action.payload };
    case 'changeActiveHomeTab':
      return { ...state, activeHomeTab: action.payload };
    case 'changeActiveWatercoolerTab':
      return { ...state, activeWatercoolerTab: action.payload };
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
