import React from 'react';
import MyMenu from '../MenuS';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ING from './ING/ING';
import Fail from './Check/Fail';
import Pass from './Check/Pass';
import { makeStyles } from '@material-ui/core/styles';

/*------------ STYLE ------------*/
const useStyles = makeStyles({
  div:{
      height:'100vh',
      background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
    },  
});
/*--------------------------------*/

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}



export default function ApplyRecord() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
          <div className={classes.div}>
             <MyMenu/>
            <AppBar position="static" color="inherite" style={{maxWidth:'97%',margin:'auto'}}>
                <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                >
                <LinkTab label="審核中" href="/ING" {...a11yProps(0)} style={{ fontFamily:'微軟正黑體'}}/>
                <LinkTab label="未通過" href="/CheckBlock" {...a11yProps(1)} style={{ fontFamily:'微軟正黑體'}}/>
                <LinkTab label="已通過" href="/CheckBlock" {...a11yProps(2)} style={{ fontFamily:'微軟正黑體'}}/>
            
                </Tabs>
            </AppBar>

            
      <TabPanel value={value} index={0}>
        <ING/>
      </TabPanel>

      <TabPanel value={value} index={1}>
       <Fail/>
      </TabPanel>

      <TabPanel value={value} index={2}>
       <Pass/>
      </TabPanel>
      </div>
  );
}