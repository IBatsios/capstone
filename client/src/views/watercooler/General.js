import React from "react";
import { Interest, Sidebar, Content, Ads } from 'layout';

const General = () => {
  return (
    <Interest
      sidebar={
        <Sidebar>
          Watercooler General SideBar
        </Sidebar>
      }
      content={
        <Content>
          Watercooler General Content
        </Content>
      }
      ads={
        <Ads>
          Watercooler General Ads
        </Ads>
      }
    />
  );
}

export default General;
