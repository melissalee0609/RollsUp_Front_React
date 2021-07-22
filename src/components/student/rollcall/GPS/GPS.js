import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import ComButton from "../../../ComButton";
import { useParams } from "react-router-dom";
import { usePosition } from 'use-position';
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import {Toolbar, AppBar, Grid, IconButton, Slide, Backdrop, Snackbar, Dialog, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  gpslogo:{
    width: '150px',
    height:'150px',
  },
  imageSrc: {
    maxHeight:'200px',
    maxWidth:'200px',
    display:'block',
    margin:theme.spacing(2),
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

export default function GPS() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [gps,setGps] = React.useState([]);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);  
  const [clicked, setClicked] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
        const result = await axios.get(`/student/rollcall/newlyGPSRollcall/${params.cs_id}/`);
        
        console.log(result.data);
        setGps(result.data);
    }
    fetchData();
   }, []);

  const params = useParams();

  
  const watch = true;
      const {
        latitude,
        longitude,
      } = usePosition(watch);


      const handleSubmit = () => {
        
        console.log(gps)
        
        
      fetch('/student/rollcall/GPSRollcall/',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          rc_id: gps['rc_id'],
          gps_point: latitude + ","  + longitude
      })
  })
  .then(res => {
                    
    async function fetchres(){
    const rq = await res.text();  //接收後端傳來的訊息
    console.log(rq);
    if (rq === 'request failed. This rollcall was closed by teacher!')
    {
        //alert("點名失敗! 老師已關閉點名!");
        setOpenErr1(true);
        setOpenErr2(false);
        
        console.log(1);
        
    }
    else if(rq === 'request failed. GPS point distance too far!') 
    {
        //alert("點名失敗! 您不再範圍內!");
        setOpenErr2(true);
        setOpenErr1(false);
        console.log(2);
    }
    else if(rq === 'request successful! the GPS rollcall record has already added!') 
    {
        //alert("點名成功!");
        console.log(3.0);
        setOpenS(true);
        console.log(3.1);
        setOpenErr1(false);
        console.log(3.2);
        setOpenErr2(false);
        console.log(3.3);
        setClicked(false);
        console.log(3.4);  
    }
    else{
      console.log(4)
    }
    
    
} fetchres() })
      
      
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
  }; 
  const handleClose = () => {
    setOpen(false);
    setClicked(true);
    window.location.reload();

  };

  

  return (
    <div>
      <Button  onClick={handleClickOpen} >
       <ComButton title="GPS" url="https://image.flaticon.com/icons/svg/2807/2807144.svg" className={classes.button}/>
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
        justify="center"
        alignItems="center"
      >
<Grid item xs={12}>
        <img
                className={classes.imageSrc}
                alt="complex"
                src="https://image.flaticon.com/icons/svg/1321/1321793.svg"
          />
        </Grid>
    <Grid item  xs={12}>
      <Button disabled={clicked===false} onClick={handleSubmit} className={classes.button}>
    我要簽到!
</Button>
        
    </Grid>    

      
        </Grid>
      </Backdrop>

        
      </Dialog>
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
            點名失敗！您不在範圍內！
          </Alert>
      </Snackbar>      
    </div>
  );
}
