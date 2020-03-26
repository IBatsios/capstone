import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import { Bio } from 'views/user/Bio';
import MovieCalendar from 'views/MovieCalendar/MovieCalendar';


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
      content: [
        Bio 
      ],
    }
  },
  watercooler: {
    movies: {
      sidebar: [
        MovieCalendar
      ]
    }
  }
}

const userConfig = {
  blocks: blocks,
  interests: INTERESTS,
  headerTabs: [ HOME, WATERCOOLER, LISTS ],
  activeHeaderTab: 0
}



export {
  HOME,
  HOME_ICON,
  LISTS,
  LISTS_ICON,
  WATERCOOLER,
  WATERCOOLER_ICON,
  INTERESTS,
  userConfig
}
