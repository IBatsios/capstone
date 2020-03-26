import React from 'react';

export const renderBlocks = (blocks) => {
  if (blocks) {
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
