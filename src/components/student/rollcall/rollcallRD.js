import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyMenu from '../MenuS';
import Rollcallrecord from './rollcallrecord';
import RollcallForm from './rollcallForm';
import { useParams } from "react-router-dom";

/*------------ STYLE ------------*/
const useStyles = makeStyles({

  div:{
      height:'100vh',
      background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
    },  
  Paper:{
      width: '90%',
      margin: 'auto',        
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


export default function RollcallRD() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const params = useParams();
  const csid = params.cs_id;

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
                <LinkTab label="點名中" href="/rollcallrecordT" {...a11yProps(0)} style={{ fontFamily:'微軟正黑體'}}/>
                <LinkTab label="點名記錄" href="/rollcallrecordS" {...a11yProps(1)} style={{ fontFamily:'微軟正黑體'}}/>
            
                </Tabs>
            </AppBar>

            
      <TabPanel value={value} index={0}>
       <RollcallForm/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Rollcallrecord/>
      </TabPanel>
      </div>
  );
}