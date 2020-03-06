import React, { createContext, useReducer } from 'react';

export const MovieContext = createContext({});

// TODO: Put the date formatting locale and options somewhere else.
const locale = "en-US";
const options = { year: 'numeric', month: 'long', day: 'numeric' };

const initialState = {
  date: new Date().toLocaleDateString(locale, options),
  // Demo data for the movie calendar.  Probably should be removed, I don't think its a
  // good idea to keep loading all of these iframes.
  trailers: [
   {
     name: 'Emma', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/JniWHloJAvY',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'The Invisible Man', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/Pso0Aj_cTh0',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'The Whistlers', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/d7I6i943qUA',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'My Hero Academia: Heroes Rising', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/MfoBFRdFDLw',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Guns Akimbo', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/JggpSpqxS6I',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'The Jesus Rolls', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/btp_Yd-MRoI',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Lost in America', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/SfHm98lqLvI',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Blood on Her Name', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/8ag1XTSj7j4',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Thapped', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/jBw_Eta0HDM',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Art Paul of Playboy', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/B0DA8U2EUKM',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Tread', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/yb1hQfo4nFY',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Ik Sandhu Hunda Si', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/_46Y1vJQUOs',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Disappearance at Clifton Hill', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/TjNYN5bqi8I',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Saint Francis', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/_21S3V-CMwY',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Greed', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/ISNS0lremmo',
       height: 168,
       width: 300,
     }
   },
   {
     name: 'Straight Up', 
     trailer: {
       embedUrl:'https://www.youtube.com/embed/Tn4r-0Bf1xc',
       height: 168,
       width: 300,
     }
   },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    default:
      return { ...state};
  }
}

export const MovieStore = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <MovieContext.Provider value={[state, dispatch]}>
      {children}
    </MovieContext.Provider>
  )
}
