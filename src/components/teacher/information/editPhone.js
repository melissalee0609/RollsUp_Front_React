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
  const [inputs, setInputs] = React.useState(1);
  const [phone, setPhone] = React.useState({
    phone: '',
  })

  const submitClick = () => {
  
    fetch('/teacher/resetPhone',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          teacher_phone: phone.phone,
      })
  })
  .then(res => {
      
      async function fetchres(){
      const test = await res.text();  //接收後端傳來的訊息
      if (test === "phone格式不正確，請輸入10位數字的電話號碼") 
      {
          console.log(1);
          setOpenErr1(true);
      }
      else
      {
          console.log(0);
          setOpenS(true);
          setOpenErr1(false);
          window.location.reload();        
      }
      
  } fetchres() })

  };

  const handleChange = fieldname => event => {
    setInputs(2);
    event.persist();
    setPhone(phone => ({...phone, [fieldname]: event.target.value}));
}
  const submitClose = () => {
    handleClose(true);
    setOpenS(false);
    setOpenErr1(false);
    setInputs(1);
    phone.phone='';
  };

  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
};

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'xs'}>
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            修改電話號碼
          </Typography>

          <TextField
          label="新的電話號碼"
          variant="outlined"
          size="small"
          value={phone.phone}
          onChange={handleChange('phone')}  style={{fontFamily:'微軟正黑體'}}/>

        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={submitClose} color="default" style={{fontFamily:'微軟正黑體'}}  autoFocus>關閉視窗</Button>
        <Button disabled={inputs===2 ? false : true} onClick={submitClick} color="primary" style={{fontFamily:'微軟正黑體'}}  autoFocus>儲存</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            修改完成！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error" >
            電話格式不正確，請輸入10位數字的電話號碼！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    
  );
};