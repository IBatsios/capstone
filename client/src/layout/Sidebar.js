import React from 'react';
import classes from './Sidebar.module.css';

export const Sidebar = (props) => {
  let lists = [];
  if (props.lists) {
    lists = props.lists;
  }

  // The code below can be explained in part by the following link. 
  // https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
  return (
    <div>
      <div>
        {props.children}
      </div>

      {lists.length > 0 &&
        <ul className={classes.listing}>
          {lists.map((list, index) => (
            <li key={index}>{list.name}</li>
          ))}
        </ul>
      }
    </div>
  );
}
