import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import { URL } from 'config/user';

// Acting as a call to the backend or some middleware.

let posts;


const initialState = {};

/**
 * postMap stores the request for posts from the server and handles any
 * differences in property names between the front and back-ends.  
 **/
const postMap = {
  // FIXME: Upon adding new posts the state of all posts is changed.  In
  // other words, if a post has comments expanded and a new post is
  // added, all the posts are re-rendered—causing the comments section to
  // close.
  map: new Map(),
  // Returns a post in the format of the front-end.
  get(post) {
    const { _id, topic, ...other } = this.map.get(post.id);
    return {
      id: _id,
      interest: topic,
      ...other
    }
  },
  // Saves the post as provide by the backend.
  set(post) {
    this.map.set(post._id, post);
  },
  // Returns all the posts in the format the frontend expects.
  getAll() {
    let allPosts = [];
    for (let post of this.map.values()) {
      const { _id, topic, ...other } = {...post};
      allPosts.push({ id: _id, interest: topic, ...other});
    }

    const byCreatedDate = (a, b) => {
      if (a.createdAt == b.createdAt) {
        return 0;
      }

      if (a.createdAt < b.createdAt) {
        return 1;
      }

      return -1;
    }

    return allPosts.sort(byCreatedDate);
  },
  getById(id) {
    const {_id, topic, ...other} = this.map.get(id);
    return {
      id: _id,
      interest: topic,
      ...other
    }
  },
  like(id) {
    const post = this.map.get(id);
    post.likeCount = post.likeCount++;
    this.map.set(post._id, post);
    // TODO: Add something to the arrayLike property, maybe the authorId of
    // who liked it.
  },
  // Update an entry in the map from the frontend format.
  save(post) {
    const { id, interest, ...other } = {...post};
    this.map.set(id, { _id: id, topic: interest, ...other });
  }
}

const deletePost = async (id) => {
  postMap.map.delete(id);

  try {
    await axios({
      withCredentials: true,
      method: 'delete',
      url: `${URL.POSTS}/${id}`
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteComment = async (comment) => {
  try {
    await axios({
      withCredentials: true,
      method: 'delete',
      url: `${URL.COMMENTS}/${comment._id}`
    });

    const updatedPost = await axios({
      withCredentials: true,
      method: 'get',
      url: `${URL.POSTS}/${comment.postId}`
    });
    postMap.set(updatedPost);
  } catch (e) {
    console.log(e);
  }
};

export function postReducer(state, action) {
  let post;
  switch (action.type) {
    case 'isFetchingPosts':
      return {...state, isFetchingPosts: true};
    case 'setPostData':
      // This would not be necessary if the properties of the backend
      // model were implemented based on the documentation.
      action.payload.posts.map(post => {
        postMap.set(post);
      });
      return {...state, posts: postMap.getAll(), isFetchingPosts: false};
    case 'CommentFormSave':
      // Prints to the console, the submitted post data.
      return { ...state };
    case 'addCommentToPost':
      return { ...state };
    case 'editComment':
      return { ...state };
    case 'deleteComment':
      return {...state, posts: postMap.getAll()};
    case 'deletePost':
      // Tell the server which post to delete.
      // Remove the post from the local state.
      postMap.map.delete(action.payload);
      return { ...state, posts: postMap.getAll()};
    case 'PostFormSave':
      // Add the new post the local store.
      postMap.set(action.payload);
      return {...state, posts: postMap.getAll()};
    // The next two case may be moved to a local state.
    case 'likePost':
      post = postMap.getById(action.payload);
      post.likeCount++;
      postMap.save(post);
      // Send updated information to the server.
      return { ...state, posts: postMap.getAll() };
    case 'reportPost':
      return { ...state };
    default:
      return {...state};
  }
}

export const PostContext = createContext([{}, function(){}]);

export const PostStore = ({children}) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return(
    <PostContext.Provider value={[state, dispatch]}>
      {children}
    </PostContext.Provider>
  )
}

export function usePosts() {
  return useReducer(postReducer, posts);
}

