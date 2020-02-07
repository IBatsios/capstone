import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TabsView from '../Tabs/TabsView';
import Home from './Home';
import Watercooler from './Watercooler';
import About from './About';
import TabBar from '../../components/Tabs/TabBar';
import Tabs from '../../components/Tabs/Tabs';
import TabContent from '../../components/Tabs/TabContent';

class Layout extends TabsView {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [
        { label: "Home", content: <Home />},
        { label: "Watercooler", content: <Watercooler />},
        { label: "About", content: <About />},
      ],
      activeTab: this.activeTab()
    };
  }

  /* This may be removed if there is no need for for the layout
     tabs to retain the selected after refresh. */
  handleChange = (newValue) => {
    this.setState({ activeTab: newValue }); 
    sessionStorage.setItem(
      this.displayName,
      newValue.toString()
    );
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <TabBar>
          <Tabs {...this.state} onChange={this.handleChange} centered/>
        </TabBar>
        <TabContent {...this.state} />
      </React.Fragment>
    );
  }
}

export default Layout;
