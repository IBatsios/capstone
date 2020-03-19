import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import { Interest, Sidebar, Content, Ads } from 'layout';
import { Posts } from 'views/user';

const Movies = () => {
  const [state, dispatch] = useContext(UserContext);

  // TODO: Remove hard-coded strings and create appropriate config files.
  return (
    <Interest
      sidebar={
        <Sidebar
          lists={state.user.lists.filter(item => item.interest === 'movies')}
        />
      }
      content={
        <Content>
          <Posts posts={
            state.posts.filter(post => {
              return post.interest === 'movies' && post.author.id === state.user.id
          })}/>
        </Content>
      }
      ads={
        <Ads>
          Home Movies Ads
        </Ads>
      }
    />
  );
}

export default Movies;
