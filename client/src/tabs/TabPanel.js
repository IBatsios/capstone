import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import classes from './TabPanel.module.css';

function TabPanel(props) {
  const { children, value, index, prefix, ...other } = props;

  return (
    <Typography
      component="div"
      className={classes.tabpanel}
      role="tabpanel"
      hidden={value !== index}
      id={`${prefix}-tabpanel-${index}`}
      aria-labelledby={`${prefix}-tab-${index}`}
      {...other}
    >
      {<Box p={0}>{children}</Box>}
    </Typography>
  );
}

export default TabPanel;
