import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Handtable from './Handtable';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ComButton from "../../../ComButton";
import {useParams} from "react-router-dom";
import { usePosition } from 'use-position';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor:'#fff8e1',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  inputForm: {
    paddingLeft: 65,
    paddingTop: 10,
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Hand() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [uujoinID,setuujoinID] = React.useState(uuidv4);

  const params = useParams();

  const watch = true;
  const {
    latitude,
    longitude,
    // error,
  } = usePosition(watch);

  const [rcid, setRcid] = React.useState(0)
  
  const handleClickOpen = () => {
    setOpen(true);
    
      fetch('/teacher/rollcall/addrollcall',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              qrcode:uujoinID ,
              gps_point:latitude + ","  + longitude,
              cs_id: params.cs_id,
              rc_inputsource: '手動點名'
              
          })
      })
      .then(res => {
                    
        async function fetchres(){
        
    } fetchres() })
      .then(res => {
      async function fetchData() {
        const result = await axios.get(`/teacher/rollcall/findRCID/${uujoinID}/`)
        
        setRcid(result.data[0]["rc_id"]);
        
        }
        fetchData()
    })
      
  };

  const handleClose = () => {
    setOpen(false);
    console.log(rcid)
    fetch('/teacher/rollcall/closedRollcall/',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          
          rc_id: rcid,
          
      })
  })
  };




  return (
    <div>
     <Button  onClick={handleClickOpen} >
     <ComButton title="手動點名" url="https://image.flaticon.com/icons/svg/2311/2311961.svg" />
      </Button>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>

    <Grid item xs={12} sm={12}></Grid>
    
    <IconButton  color="#582707"  onClick={handleClose}>
      <CloseIcon />
    </IconButton>  
    </Toolbar>

    </AppBar>
        <List>
         <Handtable id={rcid}/>
        </List>
        </Dialog>    
    </div>
  );
}
