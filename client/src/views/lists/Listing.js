import React from 'react';

export const Listing = (props) => {
  return (
    <ul>
      {props.lists.map((list, index) => (
        <li key={list.id}>{list.title}</li>
      ))}
    </ul>
  );
}
