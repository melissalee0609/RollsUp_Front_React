import React, { useEffect } from "react";
import { Dialog, Button, DialogActions, DialogContent, Typography, TextareaAutosize, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory, useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { brown } from '@material-ui/core/colors';
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

export default function CompleteQuestionT(props) {
  const classes = useStyle();
  const params = useParams();
  const csid = params.cs_id;

  const [open, setOpen] = React.useState(false);

  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);

  const [openErr2, setOpenErr2] = React.useState(false);

  const [changes, setChanges] = React.useState(1);
  const [inputs, setInputs] = React.useState({
    id: props.atid,
    //宣告要接值的變數
  });


  const [stdid, setStdid] = React.useState(0);

  useEffect(() => {

    async function fetchStdid() {
      const result = await axios.get(`/student/std_id`);
      // setStdid(result.data);
      setStdid(result.data["std_id"]);
      //   console.log(result.data);
      //   console.log(stdid);
    }

    fetchStdid();
  }, []);

  const submitClose = (event, reason) => {
    handleClose(true);
    setOpenS(false);
    setChanges(1);
    inputs.id = '';
    window.location.reload();

  };

  const handleFinish = (student) => {

    fetch(`/teacher/CompletionQuestion`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q_std_id: stdid,
        q_asktime: props.time,
        cs_id: csid,
      }),
    })
      .then(res => {

        async function fetchres() {
          const test = await res.text();  //接收後端傳來的訊息
          if (test === "request failed. thw question with asktime was not found!") //公告不存在
          {
            console.log(1);
            setOpenS(false);
            setOpenErr1(true);
            setOpenErr2(false);
          }

          else if (test === "request failed. your question has been solved from teacher or student!") {
            setOpenS(false);
            setOpenErr1(false);
            setOpenErr2(true);
            console.log(2);
          }
          else {
            setOpenS(true);
            setOpenErr1(false);
            setOpenErr2(false);
            console.log(3);
            window.location.reload();
          }

        } fetchres()
      })
    
      .then(res => console.log(res))
      .catch(err => console.log(`Error with message: ${err}`))
  }

  const handleOpenButton = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <Button style={{
        color: "white",
        fontFamily: "Microsoft JhengHei",
        fontWeight: "bold",
      }} onClick={handleOpenButton}>
        完成問題
    </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography className={classes.typoHeading} variant="h5">
              確定要完成此問題?
          </Typography>


          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{ fontFamily: 'Microsoft JhengHei' }}>關閉視窗</Button>
          <Button onClick={handleFinish} color="primary" style={{ fontFamily: 'Microsoft JhengHei' }}>確認完成</Button>
          {/* 成功小綠框 */}
          <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{ marginBottom: 100 }}>
            <Alert severity="success">
              已完成問題！
          </Alert>
          </Snackbar>
          {/* 失敗小紅框1 */}
          <Snackbar open={openErr1} style={{ marginBottom: 100 }}>
            <Alert severity="error">
              沒有此問題！
          </Alert>
          </Snackbar>
          {/* 失敗小紅框2 */}
          <Snackbar open={openErr2} style={{ marginBottom: 100 }}>
            <Alert severity="error">
              此問題已被解決！
          </Alert>
          </Snackbar>



        </DialogActions>
      </Dialog>
    </div>
  );
};