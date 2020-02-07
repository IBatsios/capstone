import TabsView from '../Tabs/TabsView';

class Watercooler extends TabsView {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [
        { label: "Watercooler Item One", content: "Watercooler Item One content"},
        { label: "Watercooler Item Two", content: "Watercooler Item Two content"},
        { label: "Watercooler Item Three", content: "Watercooler Item Three content"}
      ],
      activeTab: this.activeTab()
    };
  }
}

export default Watercooler;
