import React, { useContext, Fragment } from "react";
import { UserContext } from 'data/UserStore';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Swipeable } from "react-swipeable";
import TabPanel from 'views/TabPanel';
import { InterestPage } from 'views/InterestPage';

export const TabsUi = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [active, setActive] = React.useState(0);
  const interests = state.interests;

  const handleChange = (event, newValue) => {
    changeTab(newValue);
  };

  const changeTab = (value) => {
    setActive(value);
  }

  const handleTabClick = (event, value) =>  {
    changeTab(value);
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
  const tabs = interests.map((interest, index) => (
    <Tab label={interest} value={index} key={index} />
  ));

  const section = props.section;
  const tabPanels = interests.map((interest, index) => (
    <TabPanel value={active} index={index} key={index}>
      {getInterest({section, interest, index})}
    </TabPanel>
  ));

  return (
    <>
      <Tabs position="fixed" value={active} onChange={handleTabClick}>
        {tabs}
      </Tabs>
      <Swipeable onSwiped={handleSwipe}>
        {tabPanels}
      </Swipeable>
    </>
  );
}

const getInterest = (props) => {
  return React.createElement(InterestPage, {
    key: props.interest.toString(),
    section: props.section,
    interest: {
      id: props.index,
      component: props.interest 
    }
  });
}

