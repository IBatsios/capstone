import React from "react";
import { TabsUi } from 'tabs/Tabs';
import { WATERCOOLER } from 'config/user';
import { PostStore } from 'data/PostStore';
import { PostContext } from 'data/PostStore';

const Watercooler = () => {
  return (
    <PostStore>
      <TabsUi context={ PostContext } section={ WATERCOOLER } />
    </PostStore>
  );
}

export default Watercooler;
