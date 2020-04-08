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
function reducer(state, action) {
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
      return { ...state };
    case 'editList':
      //return { ...state, listFormOpen: true, activeForm: action.payload };
      console.log(action.payload);
      return { ...state };
    case 'addListItem':
      return { ...state, listItemFormOpen: true, activeForm: action.payload };
    case 'editListItem':
      return { ...state, listItemFormOpen: true, activeForm: action.payload };
    case 'deleteListItem':
      console.log(`User with id: ${state.user.id} wants to delete the item named ${action.payload.item.name} with id: ${action.payload.item.id} from list with id: ${action.payload.listId}`);
      return { ...state}; 
    case 'ListItemFormSave':
      console.log(`Add items to list with id: ${action.payload.id}`);
      console.log(action.payload);
      return { ...state, listItemFormOpen: false, activeForm: null };
    case 'ListItemFormClose':
      return { ...state, listItemFormOpen: false, activeForm:null };
    default:
      throw new Error(`Action type: ${action.type} is not defined.`);
  }
}

export const ListContext = createContext([{}, function(){}]);

export const ListStore = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <ListContext.Provider value={[state, dispatch]}>
      {children}
    </ListContext.Provider>
  )
}
