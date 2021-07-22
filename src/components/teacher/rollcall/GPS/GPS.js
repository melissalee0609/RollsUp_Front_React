import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ComButton from "../../../ComButton";
import {useParams} from "react-router-dom";
import { usePosition } from 'use-position';
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import {Toolbar, AppBar, Grid, IconButton, Slide, Backdrop, Snackbar, Dialog, Button} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/*----------------------------------------------*/
const useStyles = makeStyles(theme => ({
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  imageSrc: {
    maxHeight:'200px',
    maxWidth:'200px',
    display:'block',
    margin:theme.spacing(2),
  },
  appBar: {
    backgroundColor:'#fff8e1',
  },
}));
/*---------------------------------------------*/


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function GPS() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  const [uujoinID,setUuJoinID] = React.useState('0');
  const [clicked, setClicked] = React.useState(true);
  const params = useParams();


  const watch = true;
      const {
        latitude,
        longitude,
      } = usePosition(watch);


      const [rcid, setRcid] = React.useState(0)

      const handleSubmit = () => {
        
    fetch('/teacher/rollcall/addrollcall',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          
          qrcode: uujoinID,
          cs_id: params.cs_id,
          rc_inputsource: 'GPS點名',
          gps_point: latitude + "," + longitude,
      })
  })
  .then(res => {
                    
    async function fetchres(){
    const rq = await res.text();  //接收後端傳來的訊息
    if (rq === 'request failed. teacher not in this class!')
    {
        //alert("點名失敗! 您不是此課程的老師!");
        setOpenErr1(true);
        setClicked(false);
        console.log(1);
        
    }
    else if(rq === "request successful! the rollcall has already added!") 
    {
        //alert("點名成功!");
        setOpenS(true);
        setClicked(false);
        console.log(2);
        // setQrcode(null);   
    }
    
    
} fetchres() })
  .then(res => {
  async function fetchData() {
    const result = await axios.get(`/teacher/rollcall/findRCID/${uujoinID}/`)
    
    setRcid(result.data[0]["rc_id"]);
  
    console.log(result.data[0]["rc_id"]);
    }
    fetchData()
})
    
  }

  const handleClickOpen = () => {
    setOpen(true);
    setUuJoinID(uuidv4());
  };
  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
  };  
  const handleClose = () => {
    setOpen(false);
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
      setUuJoinID('0');
      setOpen(false);
    })
  }
  putData();
};

  

  return (
    <div>
      <Button  onClick={handleClickOpen} >
       <ComButton title="GPS" url="https://image.flaticon.com/icons/svg/2572/2572792.svg" className={classes.button} c/>
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
                src="https://image.flaticon.com/icons/svg/1321/1321801.svg"
          />
        </Grid>

    <Grid item  xs={12}>
      <Button disabled={clicked===false} onClick={handleSubmit} className={classes.button}>
        點名
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
      {/* 失敗小紅框1 */}
      <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            建立點名失敗！您不是此課程的老師！
          </Alert>
      </Snackbar>
    </div>
  );
}


