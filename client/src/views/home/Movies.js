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
    <div>Home Movies Ads</div>
  );
}

const Content = () => {
  return (
    <div>Home Movies Content</div>
  ); 
}

const SideBar = () => {
  return (
    <div>Home Movies SideBar</div>
  );
}
export default Movies;
