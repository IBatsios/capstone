import React, { useContext } from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { UserContext } from 'data/UserStore';
import { ContextActions } from './ContextActions';
import { ListForm } from './ListForm';
import { ListItemForm } from './ListItemForm';
import classes from './Listing.module.css';


export const Listing = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const handleAddListItem = (list) => {
    dispatch({
      type: 'addListItem',
      payload: <ListItemForm id={list.id} />
    });
  }

  const handleEditList = (list) => {
    const { id, name, interest } = { ...list};
    const listData = { id, name, interest};
    dispatch({
      type: 'editList',
      payload: <ListForm {...listData} />
    });
  }

  return (
    <div className={classes.lists}>
        {props.lists.map((list, index) => (
          <Card key={index}>
            <CardContent className={classes.list}>
              <Typography className={classes.title}>
                {list.name}
              </Typography>
              <ContextActions
                userId={state.user.id}
                id={list.id}
                list={list}
                onAddListItem={(list) => handleAddListItem(list)}
                onEditList={(list) => handleEditList(list)}
              />
            </CardContent>

          </Card>
        ))}
    </div>
  );
}

