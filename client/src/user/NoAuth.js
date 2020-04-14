import React, { useContext } from "react";
import { NoAuthContext } from 'data/NoAuthStore';
import { Login } from 'login/login';

/**
 * Manages the process of a user becoming authenticated.
 */
export const NoAuth = () => {
  const [state, dispatch] = useContext(NoAuthContext);

  return (
    <>
      {state.dynamicContent &&
        state.dynamicContent[0]
      } 
    </>
  );
}
