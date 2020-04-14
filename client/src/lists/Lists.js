import React, { useContext } from "react";
import Tab from "@material-ui/core/Tab";
import { UserContext } from 'data/UserStore';
import { Ads, ContentHeader, Sidebar } from 'layout/Layout';
import { Tabs } from "interest/Tabs";
import TabPanel from 'tabs/TabPanel';
import { Listing } from 'lists/Listing';
import 'interest/interest.css';

const Lists = () => {
  const [state] = useContext(UserContext);
  const section = 'lists';

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
            <Listing lists={
              state.lists.filter(list => {
                return list.interest === interest && list.author.id === state.user.id
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

export default Lists;
