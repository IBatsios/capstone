import React, { createContext, useReducer } from 'react';

const initialState = {
  lists: []
};

/**
 * listMap stores the lists requested from the server and handles any
 * differences in property names between the front and back-ends.  
 **/
const listMap = {
  map: new Map(),
  // Returns a list in the format of the front-end.
  get(list) {
    return this.map.get(list.id);
  },
  // Saves the list as provide by the backend.
  set(list) {
    this.map.set(list.id, list);
  },
  // Returns all the lists in the format the frontend expects.
  getAll() {
    let allLists = [];
    for (let list of this.map.values()) {
      allLists.push({...list});
    }
    return allLists;
  },
  getById(id) {
    return this.map.get(id);
  },
  delete(id) {
    this.map.delete(id);
  }
}

export function listReducer(state, action) {
  switch (action.type) {
    case 'isFetchingLists':
      console.log('isFetchingLists');
      return {...state, isFetchingLists: true};
    case 'setListData':
      console.log('setListData');
      action.payload.lists.map(list => {
        listMap.set(list);
      });
      return {...state, lists: listMap.getAll(), isFetchingLists: false};
    case 'ListFormSave':
      // Prints to the console, the submitted post data.
      console.log(action.payload);
      if (action.payload.id) {
        const list = {...listMap.get(action.payload), ...action.payload};
        listMap.set(list);
        return {...state, lists: listMap.getAll() };
        // Send a the new list information to the server.
      } else {
        // Send a the new list information to the server.
      }
      return { ...state };
    case 'deleteList':
      console.log(action.payload);
      listMap.delete(action.payload);
      return { ...state, lists: listMap.getAll() };
    case 'deleteListItem':
      // TODO: Implement delete of an item from a list.
      return { ...state}; 
    case 'ListItemFormSave':
      console.log(`Add items to list with id: ${action.payload.id}`);
      console.log(action.payload);
      // TODO: Implement saving an item to a list.
      return { ...state };
    default:
      return state;
  }
}

export const ListContext = createContext([{}, function(){}]);
export const ListStore = ({children}) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return(
    <ListContext.Provider value={[state, dispatch]}>
      {children}
    </ListContext.Provider>
  )
}

