import React, { useContext } from "react";
import { UserContext } from 'data/UserStore';
import { Ads, ContentHeader, Sidebar } from 'layout/Layout';

import Tab from "@material-ui/core/Tab";
import { Tabs } from "interest/Tabs";
import TabPanel from 'tabs/TabPanel';
import Posts from 'posts/Posts';
import 'interest/interest.css';

const Watercooler = () => {
  const [state] = useContext(UserContext);
  const section = 'watercooler';

  const tabs = state.interests.map((interest, index) => (
    <Tab label={interest} value={index} key={index} />
  ));

  const tabPanels = state.interests.map((interest, index) => (
    <TabPanel value={state.section[section].interest} index={index} key={index}>
      <div className="interests">
        {Sidebar({section, interest})}
        <div className="content">
          <div className="wrapper">
            {ContentHeader({section, interest})}
            <Posts posts={
              state.posts.filter(post => {
                return post.interest === interest
              })
            } />
          </div>
        </div>
        {Ads({section, interest})}
      </div>
    </TabPanel>
  ));

  return (
    <>
      <Tabs
        section={section}
        interests={state.interests}
        tabs={tabs}
        tabPanels={tabPanels}
      />
    </>
  );
}

export default Watercooler;
