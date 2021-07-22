import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ComButton from "../../../ComButton";
import QRCode from 'qrcode.react';
import {useParams} from "react-router-dom";
import QrReader from 'react-qr-reader'
import MuiAlert from "@material-ui/lab/Alert";
import {useState} from  "react";
import {DialogActions} from "@material-ui/core";
import { usePosition } from 'use-position';
import { Label } from '@material-ui/icons';
import {Typography, Toolbar, AppBar, Grid, IconButton, Slide, Backdrop, Snackbar, Dialog, Button} from "@material-ui/core";


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
    margin: theme.spacing(1),
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
  const [change, setChange] = React.useState(0);  
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅1
  const [openErr2, setOpenErr2] = React.useState(false);
  // 失敗小紅3
  const [openErr3, setOpenErr3] = React.useState(false);

  const [inputs, setInputs] = React.useState({
    cs_id:'',
  
    //宣告要接值的變數
});
   const [scan, setScan] = useState();

   function handleScan (scan) {
     if(scan){
       setScan(scan);
       setChange(1);
     }
   }
   const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setChange(0);
  };  
   function handleError (err) {
     console.error(err);
   }
  const handleClickOpen = () => {
    setOpen(true);  
    setScan("");
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handleChange = cs_id => event => {
    event.persist();
    setInputs(inputs => ({...inputs, [cs_id]: event.target.value}));
    setChange(1);
}   

const watch = true;
const {
  latitude,
  longitude,
} = usePosition(watch);

const gpspoint = latitude + ',' + longitude;

const submitClick = () => {
console.log(scan)
fetch('/student/rollcall/QRcodeRollcall/' + scan + '/' + gpspoint,{
  method: 'PUT',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({})
})
.then(res => {
                    
  async function fetchres(){
  const rq = await res.text();  //接收後端傳來的訊息
  if (rq === "request failed. This rollcall was closed by teacher!")
  {
      //alert("點名失敗! 老師已關閉點名!");
      setOpenErr1(true);
      setOpenErr2(false);
      setOpenErr3(false);
      console.log(1);
      
  }
  else if(rq === "request successful! the QRcode rollcall record has already added!") 
  {
      //alert("點名成功!");
      setOpenS(true);
      setOpenErr1(false);
      setOpenErr2(false);
      setOpenErr3(false);
      console.log(2);
      window.location.reload();
  }
  else if(rq === "request failed. GPS point distance too far!")
    {
      setOpenErr1(false);
      setOpenErr2(false);
      setOpenErr3(true);
      console.log(3);
    }
  else
  {
        //alert("QRcode不存在!");
        setOpenErr2(true);
        console.log(4);
  }
    
    
  } fetchres() })
    
  
    }


  return (
    <div>
      <Button onClick={handleClickOpen} >
       <ComButton title="QRcode" url="https://image.flaticon.com/icons/svg/1827/1827680.svg" />
      </Button>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <Backdrop className={classes.backdrop} open >
      <AppBar className={classes.appBar}>
          <Toolbar>
            <Grid item xs={12} sm={12}></Grid>
    
    <IconButton  color="#582707" onClick={handleClose}>
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
      <QrReader
        facingMode="environment"
        delay={300}
        style={{width:250}}
        onError={handleError}
        onScan={handleScan}
      />
      </Typography>
        
    </Grid>    

      
       
        <DialogActions>

        <Button disabled={change===0 ? true : false} onClick={submitClick} color="primary" className={classes.button}>我要簽到!</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
            <Alert severity="success">
              點名成功！
            </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
            <Alert severity="error">
              點名失敗！老師已關閉點名！
            </Alert>
        </Snackbar>
        {/* 失敗小紅框2 */}
        <Snackbar open={openErr2} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
            <Alert severity="error">
              QRcode不存在！
            </Alert>
        </Snackbar>
          {/* 失敗小紅框3 */}
        <Snackbar open={openErr3} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
            <Alert severity="error">
              距離太遠囉！
            </Alert>
        </Snackbar>

      </DialogActions>
 </Grid>
      </Backdrop>

        
      </Dialog>
    </div>
  );
}
