import React, { useEffect } from "react";
import {Dialog, Button, DialogActions, DialogContent, Typography, TextareaAutosize, Input} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {useHistory, useParams} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {brown} from '@material-ui/core/colors';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import axios from 'axios';

const useStyle = makeStyles(theme => ({
  typo: {
    marginLeft: 10,
    padding: 5,
    flex: 1,
    fontFamily: 'Microsoft JhengHei',
  },
  description: {
    marginLeft: 10,
    padding: 5,
    flex: 1
  },
  typoHeading: {
    color: "#582707",
    padding: 10,
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteQuestionS( props )  {
  const classes = useStyle();
  const params = useParams();
  const csid = params.cs_id;

  const [open, setOpen] = React.useState(false);

  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
   // 失敗小紅2
   const [openErr2, setOpenErr2] = React.useState(false);
   // 失敗小紅3
   const [openErr3, setOpenErr3] = React.useState(false);
  

  const [changes, setChanges] = React.useState(1);
  const [inputs, setInputs] = React.useState({
    id: props.atid,
    //宣告要接值的變數
});


// const handleChange = fieldname => event => {
//     event.persist();
//     setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
//     //
// }

// let post; //宣告一個布林值變數
// let history = useHistory(); //傳值跳頁的方法


//   const submitClick = () => {
  
//     setOpenS(true);
//   };

const [stdid, setStdid] = React.useState(0);

  useEffect(() => {
    
    async function fetchStdid() {
      const result = await axios.get(`/student/std_id`);
      // setStdid(result.data);
      setStdid(result.data["std_id"]);
      // console.log(result.data);
      // console.log(stdid);
    }

    fetchStdid();
  }, []);

  const submitClose = (event, reason) => {
    handleClose(true);
    setOpenS(false);
    setChanges(1);
    inputs.id='';
    // inputs.content='';
    window.location.reload();
    
  };
    
  const handleDelete = (student) =>
   {
    console.log(stdid);
    console.log(props.time);
    fetch(`/student/deletequestioncontent/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q_std_id: stdid,
          q_asktime: props.time,
        }),
      })
       .then(res => {
        
        async function fetchres(){
        const test = await res.text();  //接收後端傳來的訊息
        if (test === "request failed. you can not delete other student's question, because you are not the question creator!") 
        {
            console.log(1);
            setOpenS(false);
            setOpenErr1(true);
            setOpenErr2(false);
            setOpenErr3(false);
        }
        else if (test === "request failed. thw question with asktime was not found!")
        {
            console.log(2);
            setOpenS(false);
            setOpenErr2(true);
            setOpenErr1(false);
            setOpenErr3(false);
        }
        else if (test === "request failed. you can not delete your question, because the question has already replied from teacher!")
        {
            console.log(3);
            setOpenS(false);
            setOpenErr3(true);
            setOpenErr2(false);
            setOpenErr1(false);
        }
        else
        {
          console.log(0);                      
            setOpenS(true);
            setOpenErr1(false);
            setOpenErr2(false);
            setOpenErr3(false);
        }
        
    } fetchres() })
 
      }

        const handleOpenButton = () => {
          setOpen(true);
        }
        
        const handleClose= () => {
          setOpen(false);
        }

  return (
    <div>
    <Button style={{ 
    color:"white", 
    fontFamily:"Microsoft JhengHei", 
    fontWeight:"bold"}} 
    onClick={handleOpenButton}
    >
        刪除問題
    </Button>
    <Dialog open={open} onClose={handleClose} >
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            確定要刪除此問題?
          </Typography>

        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" style={{fontFamily: 'Microsoft JhengHei'}}>關閉視窗</Button>
        <Button  onClick={handleDelete} color="primary" style={{fontFamily: 'Microsoft JhengHei'}}>確認刪除</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={600} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            已刪除問題！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} autoHideDuration={600}style={{marginBottom:100}} onClose={submitClose}>
          <Alert severity="error">
            你不能刪除其他人的問題！
          </Alert>
        </Snackbar>
         {/* 失敗小紅框2 */}
         <Snackbar open={openErr2} autoHideDuration={600}style={{marginBottom:100}} onClose={submitClose}>
          <Alert severity="error">
            沒有此問題！
          </Alert>
        </Snackbar>
         {/* 失敗小紅框3 */}
         <Snackbar open={openErr3} autoHideDuration={600}style={{marginBottom:100}} onClose={submitClose}>
          <Alert severity="error">
            此問題已解決！
          </Alert>
        </Snackbar>
       
       
        
      </DialogActions>
    </Dialog>
    </div>
  );
};