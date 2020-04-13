import React from "react";
import { Blocks, renderBlocks } from 'utils';
import classes from './Layout.module.css';
import Hidden from '@material-ui/core/Hidden';

export const ContentHeader = ({section, interest}) => {
  let blocks = Blocks({section, interest, location: 'content'});
  if (blocks) {
    return (
      renderBlocks(blocks)
    );
  }
}

export const Sidebar = ({section, interest}) => {
  let blocks = Blocks({section, interest, location: 'sidebar'});
  if (blocks) {
    return (
      <Hidden smDown>
        <div className={classes.sidebar}>
          <div className={classes.wrapper}>
            {renderBlocks(blocks)}
          </div>
        </div>
      </Hidden>
    );
  }
}

export const Ads = ({section, interest}) => {
  let blocks = Blocks({section, interest, location: 'ads'});
  if (blocks) {
    return (
      <Hidden smDown>
        <div className={classes.ads}>
          <div className={classes.wrapper}>
            {renderBlocks(blocks)}
          </div>
        </div>
      </Hidden>
    )
  }
}
