import React, { useContext } from "react";
import { TabsUi } from 'views/tabs/Tabs';
import { HOME } from 'config/user';
import { PostStore } from 'data/PostStore';
import { PostContext } from 'data/PostStore';

const Home = () => {
  return (
    <PostStore>
      <TabsUi context={PostContext} section={ HOME } />
    </PostStore>
  );
}

export default Home;
