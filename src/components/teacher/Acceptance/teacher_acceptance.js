import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow, TableContainer,Box, Typography, Tab, AppBar, Tabs,Button} from "@material-ui/core";

import MyMenu from '../MenuT';
import { useParams} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import AcceptScore from "./acceptScore";
import PropTypes from 'prop-types';
import EditScore from './EditScore';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
      {value === index && <Box p={3}>{children}</Box>}
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TAcceptanceList() {

  /*------------ STATE ------------*/
  const [acceptances, setAcceptances] = useState([]);

  /*------------ STYLE ------------*/
  const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 450,
    },
    button: {
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      width:'100px',
      fontFamily: 'Microsoft JhengHei',
      color: "white",
      fontSize:14,
      backgroundColor: "#f8b62b",
      fontWeight:'bold',
  },
    div:{
      height:'100vh',
      background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
    },
  });
  const classes = useStyles();

  const acceptanceList = [ 'accept_label','std_id','std_name', 'accept_time','accept_state','accept_score','accept_content','accept_score' ]
  const acceptanceDoneList = [ 'accept_label','std_id','std_name' ,'accept_time', 'accept_score','accept_score' ]
  

  const params = useParams();
  const csid = params.cs_id;
  const hwname = params.hw_name;
  
  const[state,setState] = React.useState(acceptances['accept_tag']);
  const [value, setValue] = React.useState(0);

   // ???????????????
   const [openS, setOpenS] = React.useState(false);
 



  useEffect(() => {
      async function fetchData() {
          const result = await axios.get(`/teacher/acceptance/hw/${csid}/${hwname}/`);
          setAcceptances(result.data);
        //   console.log(result.data);
      }
      fetchData();
  }, []);

   console.log(acceptances);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const labelChange = (event,id) => {
    const tagIndex = acceptances.findIndex(s=>s.std_id==id)
    var newlist = [...acceptances]
    newlist[tagIndex].accept_tag =(event.target.checked) 
    // == true ? 1 : 0
    //setState({ ...state, [event.target.name]: event.target.checked });
    
    setAcceptances(newlist);
    labelSubmit(acceptances[tagIndex])
    console.log(' newlist[tagIndex]', acceptances[tagIndex])
  };


  const labelSubmit = (label) =>
  {
    console.log('stdid',label['std_id'])
    console.log('hw_id',label['accept_hw_id'])
    console.log('tag',label['accept_tag'])

    if(label['accept_tag'] === true)
    {

      fetch(`/teacher/updateTag/`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          std_id: label.std_id,
          accept_hw_id: label.accept_hw_id,
          accept_tag: 1,
          
        })
        
      })
    }
    else
    {
      fetch(`/teacher/updateTag/`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          std_id: label.std_id,
          accept_hw_id: label.accept_hw_id,
          accept_tag: 0,
          
        })
      })
    }window.location.reload();
     }

     const labelChange2 = (event,id) => {
      const tagIndex = acceptances.findIndex(s=>s.std_id==id)
      var newlist = [...acceptances]
      newlist[tagIndex].accept_tag =(event.target.checked) 
      // == true ? 1 : 0
      //setState({ ...state, [event.target.name]: event.target.checked });
      
      setAcceptances(newlist);
      labelSubmit2(acceptances[tagIndex])
      console.log(' newlist[tagIndex]', acceptances[tagIndex])
    };

     const labelSubmit2 = (label) =>
  {
    console.log('stdid',label['std_id'])
    console.log('hw_id',label['accept_hw_id'])
    console.log('tag',label['accept_tag'])

    if(label['accept_tag'] === true)
    {

      fetch(`/teacher/updateTag/`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          std_id: label.std_id,
          accept_hw_id: label.accept_hw_id,
          accept_tag: 1,
          
        })
        
      })
    }
    else
    {
      fetch(`/teacher/updateTag/`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          std_id: label.std_id,
          accept_hw_id: label.accept_hw_id,
          accept_tag: 0,
          
        })
      })
    }
     }


  const deletQ=(event,id)=>{
    const QIndex = acceptances.findIndex(s=>s.std_id===id)
    handleDelete(acceptances[QIndex])
    console.log('QIndex',acceptances[QIndex])
    
  }

  const handleDelete = (student) =>
  {
    console.log('homework',hwname)
    console.log('stdid',student['std_id'])
    fetch('/teacher/acceptance/deleteAcceptance/',{
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        std_id: student.std_id,
        hw_name: hwname,
        cs_id: csid,
      })
  })
  .then(res => {
    async function fetchres(){
      const test = await res.text();  //???????????????????????????
      if (test === "???????????????????????????") //??????????????????
      {
          //alert("?????????????????????");
          //setOpenWarn2(true);
      }
      else if(test === "???????????????????????????????????????") //???????????????@
      {
          //alert("???????????????????????????????????????!");
          //setOpenErr1(true);
      }
      else
      {
          //alert("????????????????????????!");    
          setOpenS(true);
          // history.push(`/acceptance/${csid}/${hwname}`);     
          window.location.reload();

      }
      
  } fetchres() })
  
}

const submitClose = (event, reason) => {
  window.location.reload();
};

  return (
    <div className={classes.div}>
  
      <MyMenu/>

      <AppBar position="static" color="default" style={{maxWidth:'96%',margin:'auto'}}>
                <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                >
                <LinkTab label="????????????" href="/drafts" {...a11yProps(0)} style={{ fontFamily:'???????????????'}}/>
                <LinkTab label="????????????" href="/trash" {...a11yProps(1)} style={{ fontFamily:'???????????????'}}/>
            
                </Tabs>
            </AppBar>
      <TabPanel value={value} index={0}>
      <Paper>
      <TableContainer>
        <Table className={classes.table} size="small">

            {/*===== TableHead =====*/}
            <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell> 
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>????????????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                </TableRow>
            </TableHead>

            {/*===== TableBody =====*/}
            <TableBody>
                {acceptances.map((acceptance,index) => acceptance["accept_done"] === false && 
                (acceptance["accept_state"] === 0 || acceptance["accept_state"] === 1) ? (
                    <TableRow key={index}>
                      {/* <TableCell ></TableCell> */}
                      
                    {
                        acceptanceList.map( (list, i) => i < 7 ?
                            i<1
                            ?//??????
                              <TableCell key={i} component="th" scope="row" align="center">
                                <FormControlLabel
                                    control={
                                    <Checkbox 
                                    icon={<RadioButtonUncheckedIcon />} 
                                    checkedIcon={<FiberManualRecordIcon />} 
                                    checked={acceptance["accept_tag"]}
                                    onChange={(e)=>labelChange(e,acceptance.std_id)}
                                    />}
                                  />
                              </TableCell>
                            
                            :
                            i<5&&i>3? acceptance["accept_state"] === 0 ?
                            <TableCell key={i} component="th" scope="row" align="center" >
                              ??????
                            </TableCell>
                              :
                            <TableCell key={i} component="th" scope="row" align="center">
                              ??????
                            </TableCell>
                            :
                            <TableCell key={i} component="th" scope="row" align="center">
                            {acceptance[list]}
                          </TableCell>
                            ://??????
                            acceptance["accept_state"]===0?
                            <TableCell key={i} align="center">
                              <Button  
                            onClick={(e)=>deletQ(e,acceptance.std_id)}
                            variant="contained" 
                            className={classes.button} 
                             >
                            ????????????
                            </Button>
                            
                             <AcceptScore
                             stdid={acceptance['std_id']}
                             hwid={acceptance['accept_hw_id']}
                             stdname={acceptance['std_name']}
                             label={acceptance['accept_tag']}
                             content={acceptance['accept_content']}
                             score={acceptance['accept_score']}
                             />                             
                            </TableCell>
                            :
                            <TableCell key={i} align="center">
                             <AcceptScore
                             stdid={acceptance['std_id']}
                             hwid={acceptance['accept_hw_id']}
                             stdname={acceptance['std_name']}
                             label={acceptance['accept_tag']}
                             content={acceptance['accept_content']}
                             score={acceptance['accept_score']}

                             />
                             </TableCell>
                         )
                    }
                    
                    </TableRow>
                    
                )
                :
                <div></div>
               
                )}
            </TableBody>

        </Table>
        </TableContainer>
        </Paper>
        </TabPanel>


        <TabPanel value={value} index={1}>
     <Paper>
     <TableContainer>
        <Table className={classes.table} size='small'>

            {/*===== TableHead =====*/}
            <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  <TableCell component="th" scope="row" align="center" style={{ fontFamily:'???????????????'}}>??????</TableCell>
                  
                </TableRow>
            </TableHead>

            {/*===== TableBody =====*/}
            <TableBody>
                {acceptances.map((acceptance,index) => acceptance["accept_done"] === true ? (
                    <TableRow key={index}>
          
                    {
                        
                        acceptanceDoneList.map( (list, i) => i < 5 ?
                        i<1?
                        <TableCell key={i} component="th" scope="row" align="center">
                       <FormControlLabel
                          control={
                          <Checkbox 
                          // icon={<FavoriteBorder />} checkedIcon={<Favorite />} 
                          icon={<RadioButtonUncheckedIcon />} 
                          checkedIcon={<FiberManualRecordIcon />} 
                          checked={acceptance["accept_tag"]}
                          onChange={(e)=>labelChange2(e,acceptance.std_id)}
                          />}
                        />
                     </TableCell>
                            :
                            <TableCell key={i} component="th" scope="row" align="center" >
                               {acceptance[list]}
                            </TableCell>
                            :
                            <TableCell key={i} align="center">
                             <EditScore
                             stdid={acceptance['std_id']}
                             hwid={acceptance['accept_hw_id']}
                             score={acceptance['accept_score']}
                             />
                            
                             
                            </TableCell>
                              
                         )
                    }
                    
                    </TableRow>
                    
                )
                :
                <div></div>
               
                )}
            </TableBody>

        </Table>
        </TableContainer>
        </Paper>
        </TabPanel>

         {/* ????????????????????? */}
      {/* <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{ marginBottom: 100, fontFamily: '???????????????' }}>
        <Alert severity="success">
          ????????????????????????
          </Alert>
      </Snackbar> */}
    </div>
  );
}