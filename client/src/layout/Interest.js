import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Interest = (props) => {
  const { sidebar, content, ads } = props;

  const classes = useStyles();

  return (
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            {sidebar}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {content}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            {ads}
          </Paper>
        </Grid>
    </Grid>
  );
}

export default Interest;
