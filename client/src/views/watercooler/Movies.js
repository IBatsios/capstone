import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import MovieCalendar from 'views/MovieCalendar/MovieCalendar';
import { Interest, Sidebar, Content, Ads } from 'layout';
import { Posts } from 'views/user';

const Movies = () => {
  const [state, dispatch] = useContext(UserContext);

  return (
    <Interest
      sidebar={
        <Sidebar>
          <MovieCalendar />
        </Sidebar>
      }
      content={
        <Content>
          <Posts posts={state.posts.filter(post => post.interest === 'movies')
        }/>
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
