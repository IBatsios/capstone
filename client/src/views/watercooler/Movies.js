import React from "react";
import MovieCalendar from 'views/MovieCalendar/MovieCalendar';
import Interest from 'layout/Interest';

const Ads = () => {
  return (
    <div>Watercooler Movies Ads</div>
  );
}

const Content = () => {
  return (
    <div>Watercooler Movies Content</div>
  ); 
}


const Movies = () => {
  return (
    <Interest
      sidebar={
        <MovieCalendar />
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

export default Movies;
