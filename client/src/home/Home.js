import React, { useContext } from "react";
import { TabsUi } from 'tabs/Tabs';
import { HOME } from 'config/user';

const Home = () => {
  return (
      <TabsUi section={ HOME } />
  );
}

export default Home;
