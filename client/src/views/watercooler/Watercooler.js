import React, { useContext, Fragment } from "react";
import { UserContext } from 'data/UserStore';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Swipeable } from "react-swipeable";
import TabPanel from 'views/TabPanel';
import General from './General';
import Movies from './Movies';
import Music from './Music';

const Watercooler = () => {
  const [state, dispatch] = useContext(UserContext);
  const active = state.activeWatercoolerTab;
  const interests = state.interests;

  const changeTab = (index) =>  {
    dispatch({
      type: 'changeActiveWatercoolerTab',
      payload: index 
    });
  }

  const handleTabClick = (event, index) =>  {
    changeTab(index);
  }


  // Don't allow swiping out-of-bounds.
  const handleSwipe = (event) => {
    if (event.dir === "Right") {
      if (active > 0) {
        changeTab(active-1);
      }
    }
    if (event.dir === "Left") {
      if (active + 1 < interests.length) {
        changeTab(active+1);
      }
    }

  }

  return (
    <Fragment>
      <Tabs position="fixed" value={active} onChange={handleTabClick}>
        {interests.map((interest, index) => (
          <Tab label={interest} value={index} key={index} />
        ))}
      </Tabs>
      <Swipeable onSwiped={handleSwipe}>
        <TabPanel value={active} index={0} prefix="watercooler">
          <General />
        </TabPanel>
        <TabPanel value={active} index={1} prefix="watercooler">
          <Movies />
        </TabPanel>
        <TabPanel value={active} index={2} prefix="watercooler">
          <Music />
        </TabPanel>
      </Swipeable>
    </Fragment>
  );
}

export default Watercooler;
