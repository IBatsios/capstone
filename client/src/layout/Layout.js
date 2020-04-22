import React from "react";
import { Blocks, renderBlocks } from 'utils';
import classes from './Layout.module.css';
import Hidden from '@material-ui/core/Hidden';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { SITE_NAME, URL } from 'config/user';

export const Copyright = ({className}) => {
  return (
    <Typography className={className} variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={URL.FRONTEND}>
        {SITE_NAME}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
