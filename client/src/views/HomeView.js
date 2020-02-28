import React, { useContext, Fragment } from "react";
import { UserContext } from 'data/UserStore';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const HomeView = () => {
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
      <Tabs value={active} onChange={onTabChange}>
        {interests.map((interest, index) => (
          <Tab label={interest} value={index} key={index} />
        ))}
      </Tabs>
    </Fragment>
  );
}

export default HomeView;
