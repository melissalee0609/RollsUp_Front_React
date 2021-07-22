import React from "react";
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
import { Fab, Dialog, Button, DialogActions, DialogContent, Typography } from "@material-ui/core";

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
  fab: {
    position: "fixed",
    bottom: '5%',
    right: "5%",
    opacity: '100%',
    backgroundColor:'#582707',
    zIndex:10,
  },
  button: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    width:'100px',
  },
}));


export default function OpenJoinClass ()  {
  const classes = useStyle();

  const[open,setOpen]=React.useState();
  const [uujoinID,setuujoinID] = React.useState(uuidv4);
  const joinID = uujoinID.substring(0,8);
  console.log(joinID);

  const handleClose =() =>{
    setOpen(false);
    fetch('/teacher/course/openToJoin/',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          
          cs_id: csid,
          cs_qrcode: null,
      })
  })
  window.location.reload();
  }

  const handleClickOpen=()=>{
    setOpen(true);

    fetch('/teacher/course/openToJoin/',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          
          cs_id: csid,
          cs_qrcode: joinID,
      })
  })
  }
  
  const params = useParams();
  const csid = params.cs_id;

  return (
    <div>
    <Fab style={{color:'#ffffff'}} aria-label="add" className={classes.fab} onClick={handleClickOpen} >
      <AddIcon />
    </Fab>

    <Dialog open={open} onClose={handleClose} >
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            開放加入課程
          </Typography>

          <Typography className={classes.typoHeading} variant="body1">
            代碼：{joinID}
          </Typography>
          <Typography className={classes.typoHeading} variant="body1">
            QRcode：
          </Typography>
          <QRCode level="H" imageSettings={{src:"https://i.imgur.com/PWfHRt7.png", height:60,width:60,excavate:true}}  value={joinID} size={300}/>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className={classes.button} onClick={handleClose} color="default">關閉視窗</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};