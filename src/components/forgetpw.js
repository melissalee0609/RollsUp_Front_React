import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, List } from "@material-ui/core";

/*------------ STYLE ------------*/
const useStyles = makeStyles(theme =>({
    
    Link: {
        fontSize:'14px',
        paddingLeft:theme.spacing(20),
        fontFamily: 'Microsoft JhengHei',
      },   
    block:{
        margin:theme.spacing(1),
        fontFamily: 'Microsoft JhengHei',
    },
    block2:{
        width:'460px',
        margin:theme.spacing(1),
        fontFamily: 'Microsoft JhengHei',
    },
    typoHeading: {
      color: "#582707",
      padding: 25,
      fontFamily: 'Microsoft JhengHei',
      fontWeight: 'bold',
    },
    button: {
      fontFamily: 'Microsoft JhengHei',
      fontWeight:'bold',
      width:'100px',
    },
}
));
/*--------------------------------*/
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ForgetPw() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 稍後小橘2
  const [openErr2, setOpenErr2] = React.useState(false);
  const [btnClose, setbtnClose] = React.useState(true);
  const [inputs, setInputs] = React.useState({
    id:'',
    phone:'',
    mail:''
    //宣告要接值的變數
});


const handleChange = fieldname => event => {
  event.persist();
  setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
}

  let history = useHistory(); //傳值跳頁的方法


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
    setbtnClose(true);
    inputs.id='';
    inputs.mail='';
    inputs.phone='';
  };
  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
    setbtnClose(true);
  };  
  const handleSubmit = () => {
    setbtnClose(false);
     setOpenErr2(true);
    
    
    console.log(inputs.id)
    console.log(inputs.mail);
    console.log(inputs.phone);

    if(inputs.id.length === 5 
      && inputs.mail.length > 0
      && inputs.phone.length > 0)
      {
    
        fetch('/sendTeacherEmailWithNewPassword/',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teacher_id: inputs.id,
                teacher_mail: inputs.mail,
                teacher_phone: inputs.phone,
            })
        })
        .then(res => {

            async function fetchres(){
            const test = await res.text();
            if(test ==="請求失敗，Email或phone沒有找到")
            {
                setOpenErr2(false);
                setOpenErr1(true);
                console.log(1);
            }
            else
            {
                setOpenS(true);
                setOpenErr1(false);
                setOpenErr2(false);
                setOpen(false);
                console.log(0);
                history.push("/login");
            }
        } fetchres() })
        .then(res => console.log(res))
        .catch(err => console.log(`Error with message: ${err}`))
      }
      else if(inputs.id.length === 9
        && inputs.mail.length > 0
        && inputs.phone.length > 0)
        {
          fetch('/sendStudentEmailWithNewPassword/',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                std_id: inputs.id,
                std_mail: inputs.mail,
                std_phone: inputs.phone,
            })
        })
        .then(res => {

            async function fetchres(){
            const test = await res.text();
            if(test ==="request failed. Email or Phone Number has round!")
            {
                setOpenErr1(true);
                setOpenErr2(false);
                console.log(1);
            }
            else
            {
                setOpenS(true);
                setOpenErr1(false);
                setOpenErr2(false);
                setOpen(false);
                console.log(0);
                history.push("/login");
            }
        } fetchres() })
        .then(res => console.log(res))
        .catch(err => console.log(`Error with message: ${err}`))
        }
      else 
      {
        setOpenErr2(false);
        setOpenErr1(true);
      }
    }     
  
      
  return (
    <div >
      <Typography className={classes.Link}>
        <Link href="#" onClick={handleClickOpen} >
          忘記密碼?
        </Link>
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.typoHeading}>忘記密碼嗎 ( ･д･ )?</DialogTitle>
        <DialogContent>
          <DialogContentText>
           請填寫以下資料以便我們找回您的密碼
          </DialogContentText>
          <List >
          <TextField
          autoFocus
          id="id"
          label="帳號"
          variant="outlined"
          size="small"
          className={classes.block}
          value={inputs.id}
          onChange={handleChange('id')}
        />
        <TextField
          id="phone"
          label="手機"
          variant="outlined"
          size="small"
          className={classes.block}
          value={inputs.phone}
          onChange={handleChange('phone')}
        />
          </List>
          <TextField
            id="mail"
            variant="outlined"
            size="small"
            label="Email"
            type="email"
            fullWidth
            className={classes.block2}
            value={inputs.mail}
          onChange={handleChange('mail')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.button} color="secondary">
            取消
          </Button>
          <Button disabled={btnClose===false} onClick={handleSubmit} className={classes.button} color="primary">
            確認送出
          </Button>
        </DialogActions>
      </Dialog>
      {/* 成功小綠框 */}
      <Snackbar open={openS} autoHideDuration={2000} onClose={handleClose} style={{marginBottom:100}}>
          <Alert severity="success">
            已寄送新密碼，請至Email確認！
          </Alert>
      </Snackbar>
      {/* 失敗小紅框1 */}
      <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            請重新確認及填寫資料！
          </Alert>
      </Snackbar>
      {/* 稍候小橘框2 */}
      <Snackbar open={openErr2} style={{marginBottom:100}}>
          <Alert severity="warning">
            請稍候，正在發送新密碼！
          </Alert>
        </Snackbar>
    </div>
  );
}
