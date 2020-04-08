import React, { useContext, Fragment } from "react";
import { UserContext } from 'data/UserStore';
import { TabsUi } from 'tabs/Tabs';
import { LISTS } from 'config/user';
import { ListStore } from 'data/ListStore';
import { ListContext } from 'data/ListStore';

const Lists = () => {
  return (
    <Fragment>
      <ListStore>
        <TabsUi context={ListContext} section={ LISTS } />
      </ListStore>
    </Fragment>
  );
}

export default Lists;
