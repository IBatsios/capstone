import React, { createContext, useReducer } from 'react';
// Acting as a call to the backend or some middleware.

let posts;


const initialState = {};

/**
 * postMap stores the request for posts from the server and handles any
 * differences in property names between the front and back-ends.  
 **/
const postMap = {
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
    return allPosts;
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
    console.log(post);
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

export function postReducer(state, action) {
  console.log(action);
  let post;
  switch (action.type) {
    case 'isFetchingPosts':
      console.log('isFetchingPosts');
      return {...state, isFetchingPosts: true};
    case 'setPostData':
      // This would not be necessary if the properties of the backend
      // model were implemented based on the documentation.
      action.payload.posts.map(post => {
        postMap.set(post);
      });
      return {...state, posts: postMap.getAll(), isFetchingPosts: false};
    case 'CommentFormSave':
      console.log('CommentFormSave');
      // Prints to the console, the submitted post data.
      console.log(action.payload);
      return { ...state };
    case 'addCommentToPost':
      return { ...state };
    case 'editComment':
      return { ...state };
    case 'deleteComment':
      // A temporary means to remove a comment from a post.
      state.posts  = state.posts.map(post => {
        if (post.id === action.payload.postId) {
          post.comments = post.comments.filter(comment => comment.id !== action.payload.id);
        } 
        return post;
      });
      return {...state};
    case 'deletePost':
      console.log(`User with id: ${state.user.id} wants to delete post with id: ${action.payload}`);

      // A temporary means to remove a post.
      postMap.map.delete(action.payload);

      // Send the deleted post information to the  server.
      return { ...state, posts: postMap.getAll()};
    case 'PostFormSave':
      postMap.set(action.payload);
      return {...state, posts: postMap.getAll()};
    // The next two case may be moved to a local state.
    case 'likePost':
      console.log(`liked postId: ${action.payload}`);
      post = postMap.getById(action.payload);
      post.likeCount++;
      postMap.save(post);
      // Send updated information to the server.
      return { ...state, posts: postMap.getAll() };
    case 'dislikePost':
      console.log(`disliked postId: ${action.payload}`);
      post = postMap.getById(action.payload);
      // This seems wrong.  There is a like count and an arrayLike;
      // but nothing to store dislikes.  So, I've just decremented the
      // like counter.
      post.likeCount--;
      postMap.save(post);
      return { ...state, posts: postMap.getAll() };
    case 'reportPost':
      console.log(`postId ${action.payload} has been reported`);
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

