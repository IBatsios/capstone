import React from "react";
import Interest from 'layout/Interest';


const General = () => {
  return (
    <Interest
      sidebar={
        <SideBar />
      }
      content={
        <Content />
      }
      ads={
        <Ads />
      }
    />
  );
}

const Ads = () => {
  return (
    <div>Home General Ads</div>
  );
}

const Content = () => {
  return (
    <div>Home General Content</div>
  ); 
}

const SideBar = () => {
  return (
    <div>Home General SideBar</div>
  );
}
export default General;
