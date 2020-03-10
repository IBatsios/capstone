import React from "react";
import Interest from 'layout/Interest';


const Movies = () => {
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
    <div>Home Music Ads</div>
  );
}

const Content = () => {
  return (
    <div>Home Music Content</div>
  ); 
}

const SideBar = () => {
  return (
    <div>Home Music SideBar</div>
  );
}
export default Movies;
