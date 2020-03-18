import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import { Interest, Sidebar, Content, Ads } from 'layout';

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
          Home Movies Content
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
