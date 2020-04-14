import React from "react";
import { useAuth } from 'data/NoAuthStore';
import { NoAuthStore } from 'data/NoAuthStore';
import { NoAuth } from 'user/NoAuth';
import User from 'user';
import { Copyright } from 'layout/Layout';

function App() {
  const [state, dispatch] = useAuth();

  return (
    <>
      {state.authenticated
       ? <> 
           <User />
           <Copyright className="copyright" />
         </>
       : <>
           <NoAuthStore>
             <NoAuth />
           </NoAuthStore>
         </>
      }
    </>
  );
}

export default App;
