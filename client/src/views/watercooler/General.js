import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import { Interest, Sidebar, Content, Ads } from 'layout';
import { Posts } from 'views/user';

const General = () => {
  const [state, dispatch] = useContext(UserContext);

  return (
    <Interest
      sidebar={
        <Sidebar>
          Watercooler General SideBar
        </Sidebar>
      }
      content={
        <Content>
          <Posts posts={
            state.posts.filter(post => post.interest === 'general')
          }/>
        </Content>
      }
      ads={
        <Ads>
          Watercooler General Ads
        </Ads>
      }
    />
  );
}

export default General;
