import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`site-tabpanel-${index}`}
      aria-labelledby={`site-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


class SiteTabs extends Component {
  state = {
    value: this.props.value
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue});
  };

  a11yProps = (index) => {
    return {
      id: `site-tab-${index}`,
      'aria-controls': `site-tabpanel-${index}`,
    };
  }

  render() {
    const  classes = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange} aria-label="site tabs">
            {this.props.tabs.map((tab, index) => (
              <Tab label={tab.label} {...this.a11yProps(index)} key={index} />
            ))} 
          </Tabs>
        </AppBar>
        {this.props.tabs.map((tab, index) => (
          <TabPanel value={this.state.value} index={index} key={index}>
            {tab.content}
          </TabPanel>
        ))} 
      </div>
    );
  }
}

export default SiteTabs;
