import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ContextActions } from './ContextActions';
import classes from './Listing.module.css';

/**
 * Creates a view for listing a users lists and provides a context
 * menu for users to take actions on a list.
 * @param {list[]} props - An array of list objects.
 */
export const Listing = (props) => {
  return (
    <div className={classes.lists}>
      {props.lists.map((list, index) => (
        <React.Fragment key={index}>
          <Card>
            <CardContent className={classes.list}>
              <Typography className={classes.title}>
                {list.name}
              </Typography>
              <ContextActions
                list={list}
              />
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
}

