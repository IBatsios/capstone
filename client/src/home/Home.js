import React, { useEffect, useContext } from "react";
import axios from "axios";
import Tab from "@material-ui/core/Tab";
import { UserContext } from 'data/UserStore';
import { Ads, ContentHeader, Sidebar } from 'layout/Layout';
import { Tabs } from "interest/Tabs";
import TabPanel from 'tabs/TabPanel';
import Posts from 'posts/Posts';
import { URL } from 'config/user';
import 'interest/interest.css';

const Home = () => {
  const [state, dispatch] = useContext(UserContext);
  const section = 'home';

  useEffect(() => {
      const fetchLists = async () => {
          try {
              dispatch({
                type:'isFetchingLists',
                payload: true
              });
              const response = await axios.get(URL.LISTS);
              dispatch({
                type:'setListData',
                payload: {
                  lists: response.data
                }
              });
          } catch (e) {
              dispatch({
                lists: state.lists,
                isFetchingLists: false
              });
          }
      };
      fetchLists();
  }, []);

  useEffect(() => {
      const fetchPosts = async () => {
          try {
              dispatch({
                type:'isFetchingPosts',
                payload: true
              });
              const response = await axios.get(URL.POSTS);
              dispatch({
                type:'setPostData',
                payload: {
                  posts: response.data
                }
              });
          } catch (e) {
              dispatch({
                posts: state.posts,
                isFetchingPosts: false
              });
          }
      };
      fetchPosts();
  }, []);
  // Despite the following warning message—which can be seen in the web console, "React Hook useEffect has missing dependencies: 'dispatch' and 'state.posts'. Either include them or remove the dependency array  react-hooks/exhaustive-deps", do not remove the empty array above.  It will create an infinite loop, making requests to the backend.

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
            {state.posts &&
              <Posts posts={
                state.posts.filter(post => {
                  return post.interest === interest && post.author.id === state.user.id
                })
              } />
            }
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

export default Home;
