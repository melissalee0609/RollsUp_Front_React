import React from 'react';
import PropTypes from 'prop-types';
import RegisterS from './RegisterS';
import RegisterT from './RegisterT';
import Menu from './MenuisLogouted';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core/';


const useStyles = makeStyles(theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    div: {
      height:'100hv',
      background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
      
    },  

  }));

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
      {value === index && <Box p={4}>{children}</Box>}
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

export default function RegisterBlock() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const params = useParams();
  const csid = params.cs_id;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.div}>
        <Menu/>
        
            <AppBar position="static" color="inherit">
                <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                >
                <LinkTab label="學生" href={`/rollcall/${csid}`} {...a11yProps(0)} />
                <LinkTab label="教師" href={`/rollcallrecord/${csid}`} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            
      <TabPanel value={value} index={0}>
        <RegisterS/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <RegisterT/>
      </TabPanel>
    </div>
  );
}