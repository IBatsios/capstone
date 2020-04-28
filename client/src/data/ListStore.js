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
    return this.map.get(list._id);
  },
  // Saves the list as provide by the backend.
  set(list) {
    this.map.set(list._id, list);
  },
  // Returns all the lists in the format the frontend expects.
  getAll() {
    let allLists = [];
    for (let list of this.map.values()) {
      const {_id, ...other} = {...list};
      allLists.push({id: _id, ...other});
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
      return {...state, isFetchingLists: true};
    case 'setListData':
      action.payload.lists.map(list => {
        listMap.set(list);
      });
      return {...state, lists: listMap.getAll(), isFetchingLists: false};
    case 'saveList':
      listMap.set(action.payload);
      return {
        ...state,
        lists: listMap.getAll(),
        activeList: listMap.get(action.payload)
      };
    case 'deleteList':
      listMap.delete(action.payload);
      return { ...state, lists: listMap.getAll() };
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

