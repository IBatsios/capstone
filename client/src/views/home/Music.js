import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import { Interest, Sidebar, Content, Ads } from 'layout';

const Music = () => {
  const [state, dispatch] = useContext(UserContext);

  // TODO: Remove hard-coded strings and create appropriate config files.
  return (
    <Interest
      sidebar={
        <Sidebar
          lists={state.user.lists.filter(item => item.interest === 'music')}
        >
          Home Music SideBar
        </Sidebar>
      }
      content={
        <Content>
          Home Music Content
        </Content>
      }
      ads={
        <Ads>
          Home Music Ads
        </Ads>
      }
    />
  );
}

export default Music;
