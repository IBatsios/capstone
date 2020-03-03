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
    <div>Watercooler General Ads</div>
  );
}

const Content = () => {
  return (
    <div>Watercooler General Content</div>
  ); 
}

const SideBar = () => {
  return (
    <div>Watercooler General SideBar</div>
  );
}
export default General;
