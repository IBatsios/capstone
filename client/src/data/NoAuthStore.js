import React, { createContext, useReducer } from 'react';
import { Login } from 'login/login';

// Used to add and remove content on-the-fly.
// TODO: Rework configured blocks and integrate this functionality.
const dynamicContent = [<Login />];
let authenticated = true;

const initialState = {
  authenticated,
  dynamicContent
};

export function reducer(state, action) {
  switch (action.type) {
    case 'login':
      state.dynamicContent = [<Login />];
      console.log('login');
      console.log(action.payload);
      return {...state};
    case 'signIn':
      console.log('signIn');
      console.log(action.payload);
      // TODO: Check if sign-in was successful.
      return {...state, initialState: true};
    case 'register':
      console.log(action.payload);
      // TODO: Check if registration was successful.
      state.dynamicContent = [<Login />];
      return {...state};
    case 'popBlock':
      state.dynamicContent.shift();
      console.log(`popBlock (length): ${state.dynamicContent.length}`);
      return { ...state };
    case 'pushBlock':
      state.dynamicContent.unshift(action.payload);
      console.log(`pushBlock (length): ${state.dynamicContent.length}`);
      console.log(state.dynamicContent);
      return { ...state };
    default:
      return {...state};
  }
}

export const NoAuthContext = createContext({});

export const NoAuthStore = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <NoAuthContext.Provider value={[state, dispatch]}>
      {children}
    </NoAuthContext.Provider>
  )
}

export const AuthContext = createContext({});

export const AuthStore = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useReducer(reducer, initialState);
}

