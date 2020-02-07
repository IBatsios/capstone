import TabsView from '../Tabs/TabsView';

class Home extends TabsView {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [
        { label: "Home Item One", content: "Home Item One content"},
        { label: "Home Item Two", content: "Home Item Two content"},
        { label: "Home Item Three", content: "Home Item Three content"}
      ],
      activeTab: this.activeTab()
    };
  }
}

export default Home;
