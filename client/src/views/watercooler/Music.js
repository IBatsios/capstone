import React from "react";
import Interest from 'layout/Interest';


const Music = () => {
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
    <div>Watercooler Music Ads</div>
  );
}

const Content = () => {
  return (
    <div>Watercooler Music Content</div>
  ); 
}

const SideBar = () => {
  return (
    <div>Watercooler Music SideBar</div>
  );
}
export default Music;
