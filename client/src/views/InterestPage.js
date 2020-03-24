import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import { Interest, Sidebar, Content, Ads } from 'layout';
import { Posts } from 'views/post';
import { HOME, WATERCOOLER } from 'config/user';


export const InterestPage = (props) => {
  const [state, dispatch] = useContext(UserContext);

  // The top-level navigation section for the site.
  const section = props.section;

  // The category of the post.
  const interest = props.interest.component;

  // Posts with a given interest
  let posts = state.posts;

  switch (section) {
    case 'home':
      posts = state.posts.filter(post => {
        return post.interest === interest && post.author.id === state.user.id
      })
      break;
    case 'watercooler':
      posts = state.posts.filter(post => {
        return post.interest === interest
      })
      break;
    default:
      throw new Error('Section not is not defined.');
  }

  // Blocks of content configured to appear in  a given section
  // and interest category.
  const blocks = state.blocks[section][interest];


  const sidebar_blocks = blocks.sidebar.map((Block, index) => (
    <Block key={index} />
  ));

  const content_blocks = blocks.content.map((Block, index) => (
    <Block key={index} />
  ));

  return (
    <Interest
      sidebar={
        <Sidebar>
          {sidebar_blocks}
          {props.children}
        </Sidebar>
      }
      content={
        <Content>
          {content_blocks}
          {props.children}
          <Posts posts={posts} />
        </Content>
      }
      ads={
        <Ads>
          {section} {interest} Ads
        </Ads>
      }
    />
  );
}
