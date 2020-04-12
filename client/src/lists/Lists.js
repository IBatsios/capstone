import React, { Fragment } from "react";
import { TabsUi } from 'tabs/Tabs';
import { LISTS } from 'config/user';

const Lists = () => {
  return (
    <TabsUi section={ LISTS } />
  );
}

export default Lists;
