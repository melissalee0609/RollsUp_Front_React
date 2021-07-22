import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import RollcallrecordTable from './rollcallrecordT/rollcallrecordT';
import RollcallrecordSTable from './rollcallrecordS/rollcallrecordS';
import axios from 'axios';
import Button from '@material-ui/core/Button';

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

/*------------ STYLE ------------*/
const useStyles = makeStyles(theme =>({
    
  Link: {
      fontSize:'14px',
      paddingLeft:theme.spacing(2),
      fontFamily: 'Microsoft JhengHei',
    },  
  }))

export default function RollcallRDDp( props ) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const params = useParams();
  const csid = params.cs_id;

  console.log(csid);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



const download = () => {
  // fake server request, getting the file url as response
  setTimeout(() => {
    const response = {
      file: 'http://140.136.155.124:8080/downloadExcel/Rollcall/'+props.csid+'/',
      
    };
    // server sent the url to the file!
    // now, let's download:
    window.open(response.file);
    // you could also do:
    // window.location.href = response.file;
  }, 100);
}


console.log('csid',csid);

  const exportexcel = () => {
    async function fetchData() {
        const result = await axios.get(`/teacher/downloadExcel/Rollcall/${csid}/`);
        console.log(result.data);
    }
    fetchData();
}

  return (
          <div>
            <AppBar position="static" color="inherite" >
                <Tabs
                value={value}
                onChange={handleChange}
                >
                <LinkTab label="時間查看" href="/rollcallrecordT" {...a11yProps(0)}   style={{ fontFamily:'微軟正黑體'}}/>
                <LinkTab label="學生查看" href="/rollcallrecordS" {...a11yProps(1)}   style={{ fontFamily:'微軟正黑體'}}/>
               
                <Button  color="primary" className={classes.Link} onClick={download}>
                  匯出成Excel檔
                </Button>
              
                </Tabs>
            </AppBar>

            
      <TabPanel value={value} index={0}>
        <RollcallrecordTable/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <RollcallrecordSTable/>
      </TabPanel>

      </div>
  );
}