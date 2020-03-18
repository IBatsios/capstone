import React from "react";
import { Interest, Sidebar, Content, Ads } from 'layout';


const Music = () => {
  return (
    <Interest
      sidebar={
        <Sidebar>
          <div>Watercooler Music SideBar</div>
        </Sidebar>
      }
      content={
        <Content>
          <div>Watercooler Music Content</div>
        </Content>
      }
      ads={
        <Ads>
          <div>Watercooler Music Ads</div>
        </Ads>
      }
    />
  );
}

export default Music;
