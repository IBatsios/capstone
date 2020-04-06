import React, { useContext } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { UserContext } from 'data/UserStore';
import { ContextActions } from './ContextActions';
import { ListForm } from './ListForm';
import { ListItemForm } from './ListItemForm';
import { ListItems } from './ListItems';
import classes from './Listing.module.css';


export const Listing = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const handleAddListItem = (list) => {
    dispatch({
      type: 'addListItem',
      payload: <ListItemForm id={list.id} />
    });
  }

  const handleDelete = ({id}) => {
    dispatch({
      type: 'deleteList',
      payload: id
    });
  };

  const handleEditList = (list) => {
    const { id, name, interest } = { ...list};
    const listData = { id, name, interest};
    dispatch({
      type: 'editList',
      payload: <ListForm {...listData} />
    });
  }

  const handleViewList = (list) => {
    dispatch({
      type: 'listOpen',
      payload: {
        listOpen: true,
        listItems: <ListItems {...list} />
      }
    });
  }


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
                userId={state.user.id}
                id={list.id}
                list={list}
                onAddListItem={(list) => handleAddListItem(list)}
                onDelete={(list) => handleDelete(list)}
                onEditList={(list) => handleEditList(list)}
                onViewList={(list) => handleViewList(list)}
              />
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
      {state.listItems}
    </div>
  );
}

