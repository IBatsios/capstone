import React, { createContext, useReducer } from 'react';
import { userConfig } from '../config/user';
// Acting as a call to the backend or some middleware.
import {
  getLists
} from './MockDataProvider';

const lists = getLists();

// Allows for activating any given form.
const activeForm = null;
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
  activeForm
};

export function listReducer(state, action) {
  switch (action.type) {
    case 'listOpen':
      return { ...state, ...action.payload };
    case 'ListFormOpen':
      return { ...state, listFormOpen: true, activeForm: action.payload };
    case 'ListFormClose':
      return { ...state, listFormOpen: false, activeForm: null };
    case 'ListFormSave':
      // Prints to the console, the submitted post data.
      console.log(action.payload);
    return { ...state };
    case 'deleteList':
      console.log(state);
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

