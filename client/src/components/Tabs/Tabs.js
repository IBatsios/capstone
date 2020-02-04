import React, { Component } from 'react';
import TabsComponent from '@material-ui/core/Tabs';
import TabComponent from '@material-ui/core/Tab';

class Tabs extends Component {

  handleChange = (event, value) => {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(value);
    }
  };

  render() {
    /* @material-ui/core/Tabs requires a specific set of property
       names to render. */
    
    let props = {...this.props};
    props.value = props.activeTab;
    delete props.activeTab;

    return (
      <React.Fragment>
        <TabsComponent {...props} onChange={this.handleChange}>
          {props.tabs.map((tab, index) => (
            <TabComponent label={tab.label} key={index} />
          ))} 
        </TabsComponent>
      </React.Fragment>
    );
  }
}

export default Tabs;
