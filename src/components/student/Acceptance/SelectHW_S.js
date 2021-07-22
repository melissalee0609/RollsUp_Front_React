import React , { useState, useEffect } from 'react';
import MyMenu from '../MenuS';
import { Button, Table, TableHead, TableBody, TableCell, TableRow,Box, ButtonBase, makeStyles, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';



export default function SelectHW() {
  

  const useStyles = makeStyles({
    Paper:{
      width: '90%',
      margin: 'auto', 
      marginTop:'5%',   
      marginBottom:'5%',
      boxShadow:"1px 1px 1px 1px #9E9E9E",    
  },
    backbut: {
      margin:'auto',
      marginTop: 30,
      fontFamily: 'Microsoft JhengHei',
      backgroundColor: '#E0E0E0',
    },
    button: {
      
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10,
      width:'120px',
      fontFamily: 'Microsoft JhengHei',
      color: "white",
      backgroundColor: "#003060",
      fontWeight:'bold',
  },
    selehw: {
      fontFamily: 'Microsoft JhengHei',
    },
    buttonbase: {
      width: '100%',
      margin: 0,
      fontFamily: 'Microsoft JhengHei',
    },
    div:{
      height:'100vh',
      background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
    },
  });
  
  const classes = useStyles();

  const [Acc, setAcc] = React.useState([]);
  const [stdid, setStdid] = React.useState([]);
  const acceptanceList = [ 'hw_name','hw_content', 'hw_createtime' ]

  const params = useParams();
  const csid = params.cs_id;
  
  // console.log(csid);
  useEffect(() => {
    async function fetchData() {

      const result  = await axios.get(`/student/acceptance/${csid}`)
      
      setAcc(result.data);
      console.log(result.data);
      // console.log(result.data[0]['cs_id']);
      
    }
      async function fetchStdid() {
        const result = await axios.get(`/student/acceptance/std_id`);
        setStdid(result.data['std_id']);
        console.log(result.data);
    }
    fetchData();
    fetchStdid();
  }, []);

  console.log(Acc);

  
  
  
  return (
    <div className={classes.div}>
      <MyMenu/>
      <br/>
      <Typography className={classes.selehw} variant="h5" component="h2" gutterBottom style={{marginBottom:'2%',textAlign:'center',marginTop:'2%'}}>請選擇作業：</Typography>
      <Paper className={classes.Paper}>
          
          <Table >
            <TableHead>
                <TableRow>
                    <TableCell align="center" className={classes.typo} style={{ fontFamily:'微軟正黑體'}}>作業名稱</TableCell>
                    <TableCell align="center" className={classes.typo} style={{ fontFamily:'微軟正黑體'}}>內容</TableCell>
                    <TableCell align="center" className={classes.typo} style={{ fontFamily:'微軟正黑體'}}>日期</TableCell>
                    {/* <TableCell align="center">分數</TableCell> */}
                    
                </TableRow>
            </TableHead>
            
            <TableBody>
              {Acc.map((Accept,index) => (
                <TableRow key={index}>
                 
                  {
                    acceptanceList.map( (list, i) => 
                    
                    <TableCell key={i} component="th" scope="row" align="center">
                      <ButtonBase 
                      className={classes.buttonbase} 
                      component={Link} 
                      to={`/acceptance/${csid}/${Accept['hw_name']}/${stdid}`}
                      >
                      {Accept[list]}      
                    </ButtonBase>
                      </TableCell>
                    
                      )
                    }
                    
                </TableRow>
              )
              )}
             
            </TableBody>
          </Table>
      </Paper>
      <Grid
        container
        justify="center"
      >
      
      </Grid>

    </div>
  )
}