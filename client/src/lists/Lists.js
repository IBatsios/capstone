import React, { useContext, Fragment } from "react";
import { UserContext } from 'data/UserStore';
import { TabsUi } from 'views/tabs/Tabs';
import { LISTS } from 'config/user';

const Lists = () => {
  const [state, dispatch] = useContext(UserContext);

  return (
    <Fragment>
      <TabsUi section={ LISTS } />
    </Fragment>
  );
}

export default Lists;
