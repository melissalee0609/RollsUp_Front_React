import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ComButton from "../../../ComButton";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import QRCode from 'qrcode.react';
import {useParams} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { usePosition } from 'use-position';
import axios from 'axios';
import MuiAlert from "@material-ui/lab/Alert";
import {Snackbar, Button, Dialog,Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button: {
    width: '150px',
    margin:'auto',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Microsoft JhengHei',
    color: "white",
    fontSize:16,
    backgroundColor: "#f8b62b",
    fontWeight:'bold',
  },
  appBar: {
    backgroundColor:'#fff8e1',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Qrcode() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [qrcode , setQrcode] = React.useState('0');
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 更改成功小綠綠
  const [openC, setOpenC] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  const [clicked, setClicked] = React.useState(true);
  const params = useParams();
        
  const watch = true;
  const {
    latitude,
    longitude,
  } = usePosition(watch);
  
  const [rcid, setRcid] = React.useState(0)  
  const handleSubmit = () => {
    console.log(qrcode);
    fetch('/teacher/rollcall/addrollcall',{
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      qrcode: qrcode,
      cs_id: params.cs_id,
      rc_inputsource: 'QRcode點名',
      gps_point: latitude + ","  + longitude,
  })
})
.then(res => {

async function fetchres(){
const rq = await res.text();  //接收後端傳來的訊息
if (rq === 'request failed. teacher not in this class!')
{
    //alert("點名失敗! 您不是此課程的老師!");
    setOpenErr1(true);
    
}
else if(rq === "request successful! the rollcall has already added!") 
{
  //alert("點名成功!");
  setOpenS(true);
  setClicked(false); 
}


} fetchres() })
.then(res => {
async function fetchData() {
  const result = await axios.get(`/teacher/rollcall/findRCID/${qrcode}/`)
  setRcid(result.data[0]["rc_id"]);
}
fetchData()
})


  }
  const handleClickOpen = () => {
    setOpen(true);
    setQrcode(uuidv4());
    
  };
  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenC(false);
    setClicked(false);
  };  
  const handleClose = () => {
  
  setClicked(true);
  
    console.log(rcid)
    async function putData() {
      
      fetch('/teacher/rollcall/closedRollcall/',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rc_id: rcid,
        })
    })
    .then(res => {
          setQrcode('0');
          setOpen(false);
      })
    }
    putData();
    
  };
  const handleChangeQr = () => {
  
      let code = uuidv4();
      setQrcode(code);
      console.log(code)

      console.log(rcid)
      function putData() {
      
      fetch('/teacher/rollcall/updateQRcode',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            qrcode: code,
            rc_id: rcid,
            
        }),
        
    })
      .then(res => {
          setOpenC(true);
          console.log(qrcode)
      })
    }
    putData();
    
  };


  return (

    <div>
      <Button onClick={handleClickOpen} >
       <ComButton title="QRcode" url="https://image.flaticon.com/icons/svg/2313/2313039.svg" />
      </Button>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <Backdrop className={classes.backdrop} open >
      <AppBar className={classes.appBar}>
          <Toolbar>
            <Grid item xs={12} sm={12}></Grid>
    
    <IconButton color="#582707" onClick={handleClose}>
      <CloseIcon />
    </IconButton>  
    </Toolbar>
    </AppBar>

      
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >

    <Grid item  xs={12}>
      <Typography>
        <QRCode level="H" imageSettings={{src:"https://i.imgur.com/PWfHRt7.png", height:100,width:100,excavate:true}} value={qrcode} size={300}/>
      </Typography>
        
    </Grid>    

    <Grid>
          
      <Button disabled={clicked===false} onClick={handleSubmit}  className={classes.button}>
        開始點名
      </Button>
      <Button disabled={clicked===false?false:true} onClick={handleChangeQr} className={classes.button}>
        更新QRcode
      </Button>
    </Grid>
      
        </Grid>
      </Backdrop>

        
      </Dialog>
      {/* 成功小綠框 */}
      <Snackbar open={openS} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="success">
            開始點名囉！
          </Alert>
      </Snackbar>
      {/* 更改成功 */}
      <Snackbar open={openC} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="success">
            更改QRcode成功！
          </Alert>
      </Snackbar>
      {/* 失敗小紅框1 */}
      <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            建立點名失敗！您不是此課程的老師！
          </Alert>
      </Snackbar>
    </div>
  );
}