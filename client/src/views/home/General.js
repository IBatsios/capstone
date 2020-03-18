import React from "react";
import { Interest, Sidebar, Content, Ads } from 'layout';
import { Bio } from 'views/user/Bio';


const General = () => {
  return (
    <Interest
      sidebar={
        <Sidebar>
          Home General SideBar
        </Sidebar>
      }
      content={
        <Content>
          <Bio />
          Home General Content
        </Content>
      }
      ads={
        <Ads>
          Home General Ads
        </Ads>
      }
    />
  );
}

export default General;
