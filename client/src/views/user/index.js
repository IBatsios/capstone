import React from "react";
import { UserStore } from 'data/UserStore';
import { default as UserTemplate } from './User';

const User = () => {
  return (
    <UserStore>
      <UserTemplate />
    </UserStore>
  );
}

export default User;
export { Bio } from './Bio';
export { Posts } from './Posts';
