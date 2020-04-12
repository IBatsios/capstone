import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import {
  getLists
} from './MockDataProvider';

const lists = getLists();

const initialState = {
  // TODO: Remove userConfig from this initialState, it should be onlyin
  // UserStore.  Removing from here causes an error and needs to be 
  // fixed.
  ...userConfig,
  lists
};

export function listReducer(state, action) {
  switch (action.type) {
    case 'ListFormSave':
      // Prints to the console, the submitted post data.
      console.log(action.payload);
      if (action.payload.id) {
        state.lists = state.lists.map(list => {
          if (list.id === action.payload.id) {
            list = {...list, ...action.payload};
          }
          return list;
        });
      } else {
        const listId = state.posts.length + 100;
        const list = { id: listId, items: [], ...action.payload };
        state.lists.unshift(list);
      }
      return { ...state };
    case 'deleteList':
      console.log(action.payload);
      state.lists = state.lists.filter(list =>  list.id !== action.payload);
      return { ...state };
    case 'deleteListItem':
      console.log(`User with id: ${state.user.id} wants to delete the item named ${action.payload.item.name} with id: ${action.payload.item.id} from list with id: ${action.payload.listId}`);
      return { ...state}; 
    case 'ListItemFormSave':
      console.log(`Add items to list with id: ${action.payload.id}`);
      console.log(action.payload);
      if (action.payload.id) {
        state.lists = state.lists.map(list => {
          list.items = list.items.map(item => {
            if (item.id === action.payload.id) {
              item = {...item, ...action.payload};
            }
            return item;
          });
          return list;
        });
      } 
      return { ...state };
    default:
      return state;
  }
}

export const ListContext = createContext([{lists: lists}, function(){}]);
export const ListStore = ({children}) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return(
    <ListContext.Provider value={[state, dispatch]}>
      {children}
    </ListContext.Provider>
  )
}

