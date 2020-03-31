const users = require('./mock-user.json');
const posts = require('./mock-posts.json');
const comments = require('./mock-post-comments.json');
const lists = require('./mock-lists.json');

export const getUser = (id) => {
  return users.find(item => item.id === id) || null;
}

const getComments = (id) => {
  return comments.filter(comment => comment.postId === id) || null;
}

export const getUserPosts = (id) => {
  return posts.filter(item => item.author.id === id) || null;
}

export const getPosts = () => {
  posts.forEach(post => {
     post.comments = getComments(post.id);
  })
  return posts;
}

export const getLists = () => {
  return lists; 
}
