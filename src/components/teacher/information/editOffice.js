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

export default function EditOffice({ open, handleClose })  {
  const classes = useStyle();
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  const [inputs, setInputs] = React.useState(1);
  const [office, setOffice] = React.useState({
    office: '',
  })

  const submitClick = () => {
  
    
    
    fetch('/teacher/resetOffice/',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          teacher_office: office.office,
      })
  })
  .then(res => {
      
      async function fetchres(){
      const test = await res.text();  //接收後端傳來的訊息
      if (test === "input Office too long!") 
      {
          console.log(1);
          setOpenErr1(true);
      }
      else if(test === "renew Office Seccessful!") 
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
    setOffice(office => ({...office, [fieldname]: event.target.value}));
}
  const submitClose = () => {
    handleClose(true);
    setOpenS(false);
    setOpenErr1(false);
    setInputs(1);
    office.office='';
  };
    
  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
};

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            修改辦公室位置
          </Typography>
          <TextField
          label="新的辦公室位置"
          variant="outlined"
          size="small"
          value={office.office}
          onChange={handleChange('office')}  style={{fontFamily:'微軟正黑體'}}/>
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
            請再次確認辦公室位置！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    
  );
};