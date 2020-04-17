import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import { Bio } from 'user/Bio';
import MovieCalendar from 'MovieCalendar/MovieCalendar';


// Names and icons for top-level navigation. 
const HOME = 'home';
const LISTS = 'lists';
const WATERCOOLER = 'watercooler';

// Top-level navigation icons.
const HOME_ICON = HomeIcon;
const LISTS_ICON = ListIcon;
const WATERCOOLER_ICON = LocalDrinkIcon;


// Default user interests.
const GENERAL = "general";
const MOVIES = "movies";
const MUSIC = "music";
const INTERESTS = [ GENERAL, MOVIES, MUSIC ];

// Components or strings can be placed in a given section of the interest
// layout.   
const blocks = {
  home: {
    general: {
      sidebar: [],
      content: [
        Bio 
      ],
      ads: []
    },
    movies: {
      sidebar: [],
      ads: []
    }
  },
  watercooler: {
    general: {
      sidebar: [],
      ads: []
    },
    movies: {
      sidebar: [
        MovieCalendar
      ],
      ads: []
    }
  }
}

const userConfig = {
  blocks: blocks,
  interests: INTERESTS,
  headerTabs: [ HOME, WATERCOOLER, LISTS ],
  activeHeaderTab: 0,
  section: {
    home: {
      interest: 0
    },
     watercooler: {
      interest: 0
    },
    lists: {
      interest: 0
    }
  }
}
// Replace backend url with the hosting domain or address in production.
const BACKEND_URL = 'http://localhost:9000';
const URL = {
  POSTS: `${BACKEND_URL}/posts`,
  REGISTER: `${BACKEND_URL}/register`,
  LOGOUT: `${BACKEND_URL}/logout`,
  LOGIN: `${BACKEND_URL}/login`
};

export {
  HOME,
  HOME_ICON,
  LISTS,
  LISTS_ICON,
  WATERCOOLER,
  WATERCOOLER_ICON,
  INTERESTS,
  userConfig,
  URL
}
