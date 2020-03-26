import React, { useContext } from 'react';
import { UserContext } from 'data/UserStore';
import Hidden from '@material-ui/core/Hidden';
import classes from './Interest.module.css';
import { Posts } from 'views/post';
import { HOME, WATERCOOLER } from 'config/user';
import { renderBlocks } from 'utils';


export const Interest = (props) => {
  const [state, dispatch] = useContext(UserContext);

  // The top-level navigation section for the site.
  const section = props.section;

  // The category of the post.
  const interest = props.interest.component;

  // Blocks of content configured to appear in  a given section
  // and interest category.
  let blocks = [];
  if (state.blocks[section]) {
    if (state.blocks[section][interest]) {
      blocks = state.blocks[section][interest];
    }
  }

  // Posts with a given interest
  let posts = state.posts;

  switch (section) {
    case HOME:
      posts = state.posts.filter(post => {
        return post.interest === interest && post.author.id === state.user.id
      })
      break;
    case WATERCOOLER:
      posts = state.posts.filter(post => {
        return post.interest === interest
      })
      break;
    default:
      throw new Error('Section not is not defined.');
  }


  return (
    <div className={classes.interests}>
      <Hidden smDown>
        <div className={classes.sidebar}>
          <div className={classes.wrapper}>
            {renderBlocks(blocks.sidebar)}
          </div>
        </div>
      </Hidden>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          {renderBlocks(blocks.content)}
          <Posts posts={posts} />
        </div>
      </div>
      <Hidden smDown>
        <div className={classes.ads}>
          <div className={classes.wrapper}>
            {renderBlocks(blocks.ads)}
          </div>
        </div>
      </Hidden>
    </div>
  );
}
