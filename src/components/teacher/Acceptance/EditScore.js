import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { Snackbar, TextField, Dialog, Button, DialogActions, DialogContent, Typography } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  typo: {
    color: "#582707",
    padding: 10,
    fontSize:16,
    flex: 1,
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
  },
  typoHeading: {
    color: "#582707",
    padding: 10,
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
  },
  button: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    width:'100px',
    fontFamily: 'Microsoft JhengHei',
    color: "white",
    fontSize:14,
    backgroundColor: "#f8b62b",
    fontWeight:'bold',
},
  button2: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    width:'100px',
},
  textfield: {
    paddingLeft: 10,
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AcceptScore( props )  {
  const classes = useStyle();
  


  const [openS, setOpenS] = React.useState(false);
  const [inputs, setInputs] = React.useState(
    {score:props.score},    
  );
  const [open, setOpen] = React.useState(false);



  const handleChange = fieldname => event => {
    setInputs(2);
    event.persist();
    setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
    
}
  
  const submitClick = () => {
    setOpenS(true);
    console.log(props.stdid);
    console.log(props.hwid);
    console.log(parseInt(inputs.score));
    
    fetch('/teacher/updateScoreAfterFinish',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          std_id: props.stdid,
          accept_hw_id: props.hwid,
          accept_score: parseInt(inputs.score),
          // accept_done: 1
      })
  })

  };

  const submitClose = (event, reason) => {

    handleClose(true);
    setOpenS(false);
    setInputs(1);
    window.location.reload();
  };

  const nosubmitClose = (event, reason) => {

    handleClose(true);
    setOpenS(false);
    setInputs(1);

  };
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


  return (
    <div>
      <Button 
      onClick = {handleClickOpen}
      variant = "contained" 
      className={classes.button}
    >
    更改分數
  </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            驗收評分
          </Typography>

           {/* 之後要接學號 */}  
          <Typography className={classes.typoHeading} variant="h8">
            學號：{props.stdid}
          </Typography>

          <Typography className={classes.typo} >
            分數 :
          
          <TextField
                id="score"
                value={inputs.score}
                onChange={handleChange('score')} 
                size="small"
                variant="outlined"
                className={classes.textfield}
                style={{width:200}}
            />
 
            </Typography>
          </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={nosubmitClose} color="default" className={classes.button2} autoFocus>關閉視窗</Button>
        <Button disabled={inputs.score===""} onClick={submitClick} color="primary" className={classes.button2} autoFocus>儲存</Button>
        <Snackbar open={openS} autoHideDuration={1000} onClose={submitClose} >
        <Alert onClose={submitClose} severity="success">
          已儲存！
        </Alert>
      </Snackbar>
      </DialogActions>
    </Dialog>
    </div>
    
  );
};