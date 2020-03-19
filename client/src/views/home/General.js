import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import { Interest, Sidebar, Content, Ads } from 'layout';
import { Bio, Posts } from 'views/user';


const General = () => {
  const [state, dispatch] = useContext(UserContext);

  const posts = state.posts;
  return (
    <Interest
      sidebar={
        <Sidebar>
          Home General SideBar
        </Sidebar>
      }
      content={
        <Content>
          <Bio />
          <Posts posts={
            state.posts.filter(post => {
              return post.interest === 'general' && post.author.id === state.user.id
          })}/>
        </Content>
      }
      ads={
        <Ads>
          Home General Ads
        </Ads>
      }
    />
  );
}

export default General;
