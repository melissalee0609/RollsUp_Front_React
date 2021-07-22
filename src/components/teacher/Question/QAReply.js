import React from "react";
import {Dialog, Button, DialogActions, DialogContent, Typography, TextareaAutosize} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useParams } from "react-router-dom";


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
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function QaReply( props )  {
  const classes = useStyle();
  const [openS, setOpenS] = React.useState(false);
  const [inputs, setInputs] = React.useState(1);

  const [open, setOpen] = React.useState(false);
  

  const [reply, setReply] = React.useState({
    reply: '',
  })
  
  const params = useParams();
  const csid = params.cs_id;
  
  
  const handleChange = fieldname => event => {
    setInputs(2);
    event.persist();
    setReply(reply => ({...reply, [fieldname]: event.target.value}));
    //
}
  
  const submitSaved = () => {
  
    setOpenS(true);

    fetch('/teacher/question',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          q_reply: reply.reply,
          cs_id: csid,
          q_std_id: props.stdid,
          q_asktime: props.time
      })
  })

  };

  const submitClick = () => {
  
    setOpenS(true);

    fetch('/teacher/question',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          q_reply: "老師已回覆過類似問題！",
          cs_id: csid,
          q_std_id: props.stdid,
          q_asktime: props.time
      })
  })

  };


  const submitClose = (event, reason) => {
    handleClose(true);
    setOpenS(false);
    setInputs(1);
    window.location.reload();

  };
    


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>

    <Button 
      onClick = {handleClickOpen}
      variant = "contained" 
      className={classes.button}
    >
    回覆
  </Button>

    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            回覆問題
          </Typography>
           
          <Typography className={classes.typo} variant="body1">
            學生問題：
          </Typography>

          {/* 之後要接問題 */}  
          <Typography className={classes.typo} variant="body1">
            <Typography disabled style={{borderRadius:10, padding:8, width:250, height:40, fontSize:14, fontFamily:'微軟正黑體'}} rowsMin={5} >
              {props.content}
            </Typography>
          </Typography>

          <Typography className={classes.typo} variant="body1">
            老師回覆：
          </Typography>
          <Typography className={classes.typo} variant="body1">
            <TextareaAutosize 
            onChange={handleChange('reply')} 
            id="reply" 
            style={{borderRadius:10, padding:8, width:250, height:40, fontSize:14, fontFamily:'微軟正黑體'}}
            rowsMin={5} 
            placeholder="請輸入回覆"
            value={reply.reply}
            />
          </Typography>
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={submitClose} color="default" style={{fontFamily: 'Microsoft JhengHei'}} autoFocus>關閉視窗</Button>
        <Button onClick={submitClick} color="secondary" style={{fontFamily: 'Microsoft JhengHei'}} autoFocus>標記為已於課堂上回答</Button>
        <Button 
        disabled={inputs===2 ? false : true} 
        onClick={submitSaved} 
        color="primary" 
        style={{fontFamily: 'Microsoft JhengHei'}}
        autoFocus
        >
          儲存
          </Button>
        <Snackbar open={openS} autoHideDuration={1000} onClose={submitClose}>
        <Alert onClose={submitClose} severity="success">
          已儲存！
        </Alert>
      </Snackbar>
      </DialogActions>
    </Dialog>
    
    </div>
    
  );
};