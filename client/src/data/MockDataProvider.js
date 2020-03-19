const users = require('./mock-user.json');
const posts = require('./mock-posts.json');

export const getUser = (id) => {
  return users.find(item => item.id === id) || null;
}

export const getUserPosts = (id) => {
  return posts.filter(item => item.author.id === id) || null;
}

export const getPosts = () => {
  return posts;
}
