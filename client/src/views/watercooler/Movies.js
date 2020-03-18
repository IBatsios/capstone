import React from "react";
import MovieCalendar from 'views/MovieCalendar/MovieCalendar';
import { Interest, Sidebar, Content, Ads } from 'layout';

const Movies = () => {
  return (
    <Interest
      sidebar={
        <Sidebar>
          <MovieCalendar />
        </Sidebar>
      }
      content={
        <Content>
          <div>Watercooler Movies Content</div>
        </Content>
      }
      ads={
        <Ads>
          <div>Watercooler Movies Ads</div>
        </Ads>
       }
      />
  );
}

export default Movies;
