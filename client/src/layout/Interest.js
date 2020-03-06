import React from "react";
import Hidden from '@material-ui/core/Hidden';
import classes from './Interest.module.css';


const Interest = (props) => {

  const { sidebar, content, ads } = props;

  return (
    <div className={classes.interests}>
      <Hidden smDown>
        <div className={classes.sidebar}>
          <div className={classes.wrapper}>{sidebar}</div>
        </div>
      </Hidden>
      <div className={classes.content}>
        <div className={classes.wrapper}>{content}</div>
      </div>
      <Hidden smDown>
        <div className={classes.ads}>
          <div className={classes.wrapper}>{ads}</div>
        </div>
      </Hidden>
    </div>
  );
}

export default Interest;
