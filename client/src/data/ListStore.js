import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import {
  getLists
} from './MockDataProvider';

const lists = getLists();

// Allows for activating any given form.
const activeForm = null;
const activeList = null;
const listItemForm = null;
const listItemFormOpen = false;
const listOpen = false;
const listFormOpen = false;

const initialState = {
  ...userConfig,
  lists,
  listFormOpen,
  listOpen,
  listItemFormOpen,
  listItemForm,
  activeList,
  activeForm
};

export function listReducer(state, action) {
  switch (action.type) {
    case 'activeList':
      console.log(action.payload);
      console.log({...action.payload});
      return { ...state, activeList: action.payload };
    case 'listOpen':
      console.log(action.payload);
      return { ...state, ...action.payload };
    case 'ListFormOpen':
      return { ...state, listFormOpen: true, activeForm: action.payload };
    case 'ListFormClose':
      return { ...state, listFormOpen: false, activeForm: null };
    case 'ListFormSave':
      // Prints to the console, the submitted post data.
      console.log(action.payload);
      if (action.payload.id) {
        state.lists = state.lists.map(list => {
          if (list.id === action.payload.id) {
            console.log(list);
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
    case 'editList':
      console.log('editList');
      return { ...state, listFormOpen: true, activeForm: action.payload };
    case 'addList':
      console.log('addList');
      console.log(state);
      return { ...state, listFormOpen: true, activeForm: action.payload };
    case 'addListItem':
      console.log(state);
      return { ...state, listItemFormOpen: true, activeForm: action.payload };
    case 'editListItem':
      return { ...state, listItemFormOpen: true, activeForm: action.payload };
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
      return { ...state, listItemFormOpen: false, activeForm: null };
    case 'ListItemFormClose':
      return { ...state, listItemFormOpen: false, activeForm:null };
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

