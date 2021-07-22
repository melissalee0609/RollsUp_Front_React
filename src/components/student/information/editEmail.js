import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { TextField, Snackbar, Dialog, Button, DialogActions, DialogContent, Typography } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  typo: {
    fontFamily: 'Microsoft JhengHei',
    marginLeft: 10,
    padding: 5,
    flex: 1,
    fontSize:16,
  },
  description: {
    marginLeft: 10,
    padding: 5,
    flex: 1
  },
  typoHeading: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    color: "#582707",
    padding: 10
  },
  button: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    width:'100px',
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function EditEmail({ open, handleClose })  {
  const classes = useStyle();
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);
  const [inputs, setInputs] = React.useState(1);
  const [email, setEmail] = React.useState({
    email: '',
  })
  const submitClick = () => {
       
    fetch('/student/resetEmail',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          std_mail: email.email,
      })
  })
  .then(res => {
      
      async function fetchres(){
      const test = await res.text();  //接收後端傳來的訊息
      if (test === "request failed. Email format error!") //帳號已註冊過
      {
          setOpenErr1(true);
          setOpenErr2(false);
          console.log(1);
      }
      else if(test === "This account has already exist!") //信箱不包含@
      {
          setOpenErr2(true);
          setOpenErr1(false);
          console.log(2);
      }
      else
      {
          console.log(0);
          setOpenS(true);
          setOpenErr1(false);
          setOpenErr1(false);
          window.location.reload();        
      }
      
  } fetchres() })
  };

  const submitClose = () => {
    handleClose(true);
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
    setInputs(1);
    email.email='';
  };
  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
};

  const handleChange = fieldname => event => {
    setInputs(2);
    event.persist();
    setEmail(email => ({...email, [fieldname]: event.target.value}));
}

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            修改Email
          </Typography>

          <TextField
          label="新的Email"
          variant="outlined"
          size="small"
          value={email.email}
          onChange={handleChange('email')}  style={{fontFamily:'微軟正黑體'}}/>
          <Typography className={classes.typo} variant="body1">
            
          </Typography>
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={submitClose} color="default" className={classes.button} autoFocus>關閉視窗</Button>
        <Button disabled={inputs===2 ? false : true} className={classes.button} onClick={submitClick} color="primary" autoFocus>儲存</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            更改成功！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            Email格式錯誤！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框2 */}
        <Snackbar open={openErr2} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            此信箱已存在！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    
  );
};