import React, { useContext, Fragment } from "react";
import { UserContext } from 'data/UserStore';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from 'views/TabPanel';
import General from "./General";
import Movies from './Movies';
import Music from './Music';

const Home = () => {
  const [state, dispatch] = useContext(UserContext);
  const active = state.activeHomeTab;
  const interests = state.interests;

  const onTabChange = (event, value) =>  {
    dispatch({
      type: 'changeActiveHomeTab',
      payload: value 
    });
  }

  return (
    <Fragment>
      <Tabs position="fixed" value={active} onChange={onTabChange}>
        {interests.map((interest, index) => (
          <Tab label={interest} value={index} key={index} />
        ))}
      </Tabs>
      <TabPanel value={active} index={0} prefix="home">
        <General />
      </TabPanel>
      <TabPanel value={active} index={1} prefix="home">
        <Movies />
      </TabPanel>
      <TabPanel value={active} index={2} prefix="home">
        <Music />
      </TabPanel>
    </Fragment>
  );
}

export default Home;
