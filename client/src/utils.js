import React, { useContext } from "react";
import { UserContext } from 'data/UserStore';
import { Remarkable } from 'remarkable';

export const renderBlocks = (blocks) => {
  if (blocks && blocks.length > 0) {
    return (
      blocks.map((Block, index) => {
        // If a block is of type string it is potentially text
        // or markup and should be returned as is.
        if (typeof Block === 'string') {
          return Block;
        }
        // The Block is expected to be a Component. 
        return(
          <Block key={index} />
        )
      })
    )
  }
}


export const Blocks = ({section, interest, location}) => {
  const [state] = useContext(UserContext);
  // The below uses optional chaining, so there is not need to check
  // if each section, interest, and location values are null or undefined.
  // URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  return state.blocks?.[section]?.[interest]?.[location];
}

export const renderMarkdown = (text) => {
  const md = new Remarkable();
  // Don't be bothered by the dangerouslySetInnerHTML property.  It's
  // generally not a good idea to set innerHTML in React due to conflicts
  // with state; but this just renders markup using Remarkable, a
  // demo even used on React's website.
  return (
    <div
      dangerouslySetInnerHTML={
        { __html: md.render(text) }
      }
    />
  );
}

