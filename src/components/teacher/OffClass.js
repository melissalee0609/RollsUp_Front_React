import React from "react";
import { useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { IconButton, Snackbar, Dialog, Button, DialogActions, DialogContent, Typography } from "@material-ui/core";

const useStyle = makeStyles(theme => ({

  typoHeading: {
    color: "#582707",
    padding: 10,
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
  },
  typo: {
    marginLeft: 10,
    padding: 5,
    flex: 1,
    fontFamily: 'Microsoft JhengHei',
    color:"#FF0000",
    fontWeight: 'bold',

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

export default function OffClass( props )  {
  const classes = useStyle();
  const params = useParams();
  const csid = params.cs_id;
  const [open, setOpen] = React.useState(false);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  const [changes, setChanges] = React.useState(1);
  const [inputs, setInputs] = React.useState({
    id: props.atid,
    //宣告要接值的變數
});


  const submitClose = (event, reason) => {
    handleClose(true);
    setOpenS(false);
    setChanges(1);
    inputs.id='';
    window.location.reload();
    
  };
  const handleSubmit = (classs) => {
    
    console.log('classs',props.cs_id)
      
      fetch('/teacher/CloseTheCourse/',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cs_id: props.cs_id
        })
    })
    .then(res => {
        
        async function fetchres(){
        const test = await res.text();  //接收後端傳來的訊息
        if (test === "request failed. teacher not in this class!") 
        {
            console.log(1);
            setOpenErr1(true);
            setOpenS(false);        
            
        }
        else if(test === "request successful! your course has been closed!") 
        {
            console.log(2);
            setOpenS(true);        
            setOpenErr1(false);
            window.location.reload();    
        }
    } fetchres()}
    
    )
    
  };

    const handleOpenButton = () => {
      setOpen(true);
    }
        
    const handleClose= () => {
      setOpen(false);
    }
    const ErrClose = () => {
        setOpenS(false);
        setOpenErr1(false);
        setOpen(false);
    };
  return (
    <div>
    <IconButton  variant="outlined" style={{ margin:25 , float:"right", color:"#D0D0D0" }} onClick={handleOpenButton}>
        <RemoveCircleOutlineIcon/>
    </IconButton>
    <Dialog open={open} onClose={handleClose} >
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            下架課程
          </Typography>

          <Typography className={classes.typo} variant="body1">
            下架後即無法再看到該課程，確定要下架嗎?
          </Typography>

        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" className={classes.button} style={{fontFamily: 'Microsoft JhengHei'}}>關閉視窗</Button>
        <Button  onClick={handleSubmit} color="primary" className={classes.button} style={{fontFamily: 'Microsoft JhengHei'}}>確認下架</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            已下架該課程！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            教師不屬於該課程！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    </div>
  );
};