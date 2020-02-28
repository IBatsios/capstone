import React, { createContext, useReducer } from 'react';

export const UserContext = createContext({});

const initialState = {
  interests: ["movies", "music"],
  headerTabs: ["home", "watercooler", "lists"],
  activeHeaderTab: 0,
  activeHomeTab: 0,
  activeWatercoolerTab: 0,
};

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

export const UserStore = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}
