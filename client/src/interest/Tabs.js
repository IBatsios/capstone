import React, { useContext } from "react";
import { UserContext } from 'data/UserStore';
import classes from './Tabs.module.css';
import TabsUi from "@material-ui/core/Tabs";
import { Swipeable } from "react-swipeable";

/**
 * Presents users content filter by interest (category) in a tab interface.
 */
export const Tabs = (props) => {
  const [state, dispatch] = useContext(UserContext);

  const changeTab = (value) => {
    dispatch({
      type: 'changeTab',
      payload: { 
        section: props.section,
        interest: value
      }
    });
  };

  const handleTabClick = (event, value) =>  {
    changeTab(value);
  };

  // Don't allow swiping out-of-bounds.
  const handleSwipe = (event) => {
    if (event.dir === "Right") {
      if (state[props.section].interest > 0) {
        changeTab(state[props.section].interest-1);
      }
    }
    if (event.dir === "Left") {
      if (state[props.section].interest + 1 < props.interests.length) {
        changeTab(state[props.section].interest+1);
      }
    }

  }

  return (
    <>
      <TabsUi
        className={classes.tabs} position="fixed"
        value={state.section[props.section].interest}
        onChange={handleTabClick}
      >
        {props.tabs}
      </TabsUi>
      <Swipeable onSwiped={handleSwipe}>
        {props.tabPanels}
      </Swipeable>
    </>
  );
};
