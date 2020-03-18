const users = require('./mock-user.json');

export const getUser = (id) => {
  return users.find(item => item.id === id) || null;

}
