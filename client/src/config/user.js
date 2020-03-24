import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import { Bio } from 'views/user/Bio';
import MovieCalendar from 'views/MovieCalendar/MovieCalendar';


// Names and icons for top-level navigation. 
const HOME = 'home';
const HOME_ICON = HomeIcon;
const HOME_LABEL = "Home";
const LISTS = 'lists';
const LISTS_ICON = ListIcon;
const LISTS_LABEL = "Lists";
const WATERCOOLER = 'watercooler';
const WATERCOOLER_ICON = LocalDrinkIcon;
const WATERCOOLER_LABEL = "Watercooler";


// Default user interests.
const GENERAL = "general";
const MOVIES = "movies";
const MUSIC = "music";
const INTERESTS = [ GENERAL, MOVIES, MUSIC ];

const blocks = {
  home: {
    general: {
      sidebar: [
      ],
      content: [
        Bio 
      ]
    },
    movies: {
      sidebar: [
      ],
      content: [
      ]
    },
    music: {
      sidebar: [
      ],
      content: [
      ]
    }
  },
  watercooler: {
    general: {
      sidebar: [
      ],
      content: [
      ]
    },
    movies: {
      sidebar: [
        MovieCalendar
      ],
      content: [
      ]
    },
    music: {
      sidebar: [
      ],
      content: [
      ]
    }
  },
  lists: {
  }
}

const userConfig = {
  blocks: blocks,
  interests: INTERESTS,
  headerTabs: [ HOME_LABEL, WATERCOOLER_LABEL, LISTS_LABEL ],
  activeHeaderTab: 0,
  activeHomeTab: 0,
  activeWatercoolerTab: 0
}



export {
  HOME,
  HOME_ICON,
  HOME_LABEL,
  LISTS_ICON,
  LISTS_LABEL,
  WATERCOOLER,
  WATERCOOLER_ICON,
  WATERCOOLER_LABEL,
  INTERESTS,
  userConfig
}
