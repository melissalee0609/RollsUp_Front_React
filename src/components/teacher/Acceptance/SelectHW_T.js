import React , { useState, useEffect } from 'react';
import MyMenu from '../MenuT';
import { Snackbar,Button, Table, TableHead, TableBody, TableCell, TableRow,TableContainer,Box, ButtonBase, makeStyles, Grid, CardActionArea, Fab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Link, useParams} from "react-router-dom";
import axios from 'axios';
import AddAccept from './addAcceptance';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import EditHW from './EditHW';
import {brown} from '@material-ui/core/colors';
import MuiAlert from "@material-ui/lab/Alert";

/*-------------------------------------------------------*/
const useStyles = makeStyles(theme => ({
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
    width:'80px',
    fontFamily: 'Microsoft JhengHei',
    color: "white",
    fontSize:14,
    backgroundColor: "#f8b62b",
    fontWeight:'bold',
},
  selehw: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    color:'#582707',

  },
  buttonbase: {
    width: '100%',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    backgroundColor:'#582707',
    zIndex:10,
  },
  typo: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold'
  },
  div:{
    height:'100vh',
    background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/*-------------------------------------------------------*/

export default function SelectHW_T() {
  //接值
  
  const classes = useStyles();
  
  const [Acc, setAcc] = React.useState([]);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 成功小綠綠2
  const [openS2, setOpenS2] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);
  // 成功小綠綠3
  const [openS3, setOpenS3] = React.useState(false);
  // 失敗小紅3
  const [openErr3, setOpenErr3] = React.useState(false);
  const acceptanceList = [ 'hw_name','hw_content', 'hw_createtime','hw_id','accept_done' ]

  const params = useParams();
  const csid = params.cs_id;
  
  useEffect(() => {
    async function fetchData() {

      const result  = await axios.get(`/teacher/acceptance/${csid}`)
      
      setAcc(result.data);
      console.log(result.data);
    }
    fetchData();
  }, []);

  console.log(Acc);

  const closeHW=(event,id)=>{
    const hwIndex = Acc.findIndex(s=>s.hw_id=id)
    handleCloseHW(Acc[hwIndex])
    console.log('hwIndex',Acc[hwIndex])
    
  }

  const handleCloseHW = (Accept) =>
   {
     console.log('homework',Accept['hw_id'])
        fetch(`/teacher/closedHomework/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              hw_id: Accept.hw_id,
              
        })
       })
       .then(res => {
                    
        async function fetchres(){
        const test = await res.text();  //接收後端傳來的訊息
        if (test === "關閉作業成功！") //關閉作業成功！
        {
         
            console.log(1);
            setOpenS(true);
            setOpenErr1(false);
        }
        else if(test === "teacher not in this class!") 
        {
          
            console.log(2);
            setOpenErr1(true);
            setOpenS(false);
        }
       
    } fetchres() })
      }


  const reopenHW=(event,id)=>{
    const hwIndex = Acc.findIndex(s=>s.hw_id=id)
    handleReOpenHW(Acc[hwIndex])
    console.log('hwIndex',Acc[hwIndex])
    
  }

  const handleReOpenHW = (Accept) =>
   {
     console.log('homework',Accept['hw_id'])
        fetch(`/teacher/REopenHomework/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              hw_id: Accept.hw_id,
              
        })
       })
       .then(res => {
                    
        async function fetchres(){
        const test = await res.text();  //接收後端傳來的訊息
        if (test === "重新開啟作業成功！") //重新開啟作業成功！
        {
        
            console.log(1);
            setOpenS2(true);
            setOpenErr2(false);
        }
        else if(test === "teacher not in this class!") 
        {
        
            console.log(2);
            setOpenErr2(true);
            setOpenS2(false);
        }
       
    } fetchres() })

      }

  const deletHW=(event,id)=>{
    const hwIndex = Acc.findIndex(s=>s.hw_name=id)
    handleDelete(Acc[hwIndex])
    console.log('hwIndex',Acc[hwIndex])
    
  }

  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenS2(false);
    setOpenErr2(false);
    setOpenS3(false);
    setOpenErr3(false);
    window.location.reload();
};

  const handleDelete = (Accept) =>
   {
     console.log('homework',Accept['hw_name'])
     console.log(params.cs_id)
        fetch(`/teacher/acceptance/deleteHomework/`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              hw_name: Accept.hw_name,
              hw_cs_id: params.cs_id,
        })
       })
       .then(res => {
                    
        async function fetchres(){
        const test = await res.text();  //接收後端傳來的訊息
        if (test === "刪除作業完成!") //刪除作業完成!
        {
            //alert("刪除作業完成!");
            console.log(1);
            setOpenS3(true);
            setOpenErr3(false);
        }
        else
        {
            //alert("teacher not in this class!");
            console.log(2);
            setOpenErr3(true);
            setOpenS3(false);
        }
       
    } fetchres() })
      // window.location.reload();
      }


  const [openCreateHw, closeCreateHw] = React.useState(false);
  const onCloseCreateHw = () => {
    closeCreateHw(openCreateHw ? false : true);
  };  
  
  
  return (
    <div className={classes.div}>
      <MyMenu/>
      <Fab style={{color:'#ffffff'}} aria-label="add" className={classes.fab} onClick={() => closeCreateHw(true)}>
          <AddIcon />
        </Fab>
        <br/>
      <Typography className={classes.selehw} variant="h5" component="h2" gutterBottom style={{marginBottom:'2%',textAlign:'center',marginTop:'2%'}}>請選擇作業：</Typography>
      <Paper className={classes.Paper}>
      <TableContainer>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" className={classes.typo}>作業名稱</TableCell>
                    <TableCell align="center" className={classes.typo}>內容</TableCell>
                    <TableCell align="center" className={classes.typo}>日期</TableCell>
                    <TableCell align="center" className={classes.typo}>編輯</TableCell>
                    <TableCell align="center" className={classes.typo}>處理</TableCell>
                </TableRow>
            </TableHead>
            
            <TableBody>
              {Acc.map((Acc,index) => (
                <TableRow key={index}>
                 
                  {
                    acceptanceList.map( (list, i) => i < 3 ?
                    
                    <TableCell key={i} component="th" scope="row" align="center">
                      <ButtonBase className={classes.buttonbase} component={Link} to={`/acceptancet/${csid}/${Acc['hw_name']}`}>
                      {Acc[list]}      
                    </ButtonBase>
                      </TableCell>
                    :
                    i>2&&i<4?
                    <TableCell key={i} align="center">
                <Grid>
                <EditHW 
                name={Acc['hw_name']} 
                content={Acc['hw_content']} 
                id={Acc['hw_id']}
                />

                <IconButton  variant="outlined"  style={{color:brown[500]}} onClick={(e)=>deletHW(e,Acc.hw_name)}>
                 <DeleteIcon/>
               </IconButton>
               </Grid>
                    </TableCell>
                    :
                  Acc["hw_closed"] == 0?
              <TableCell align="center">
                <Button className={classes.button} onClick={(e)=>closeHW(e,Acc.hw_id)}>關閉驗收</Button>
              </TableCell>
              :
              <TableCell align="center">
              <Button className={classes.button} onClick={(e)=>reopenHW(e,Acc.hw_id)}>重啟驗收</Button>
            </TableCell>
                      )
                    }
                 
                </TableRow>
              ))}
             
            </TableBody>
          </Table>
          </TableContainer>
      </Paper>
      <Grid
        container
        justify="center"
      >
     
      </Grid>
      <AddAccept open={openCreateHw} handleClose={onCloseCreateHw}/>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={1500} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="success">
            關閉作業成功！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} autoHideDuration={1500} onClose={ErrClose}　style={{marginBottom:100}}>
          <Alert severity="error">
            教師不屬於該課程！
          </Alert>
        </Snackbar>
        {/* 成功小綠框2 */}
        <Snackbar open={openS2} autoHideDuration={1500} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="success">
            開啟作業成功！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框2 */}
        <Snackbar open={openErr2} autoHideDuration={1500} onClose={ErrClose}　style={{marginBottom:100}}>
          <Alert severity="error">
            教師不屬於該課程！
          </Alert>
        </Snackbar>
         {/* 成功小綠框3 */}
         <Snackbar open={openS3} autoHideDuration={1500} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="success">
            刪除作業成功！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框3 */}
        <Snackbar open={openErr3} autoHideDuration={1500} onClose={ErrClose}　style={{marginBottom:100}}>
          <Alert severity="error">
            刪除作業失敗！
          </Alert>
        </Snackbar>
    </div>
  )
}