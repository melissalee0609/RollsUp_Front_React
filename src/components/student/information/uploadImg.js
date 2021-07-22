import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { Snackbar, Dialog, Button, DialogActions, DialogContent, Typography, Input } from "@material-ui/core";


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

export default function EditPassword({ open, handleClose })  {
  const classes = useStyle();

  const [openS, setOpenS] = React.useState(false);
  
  const [inputs, setInputs] = React.useState(1);

  const submitClick = () => {
  
    setOpenS(true);
  };

  const submitClose = () => {
    handleClose(true);
    setOpenS(false);
    setInputs(1);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            上傳大頭照
          </Typography>

           
          <Typography className={classes.typo} variant="h8">
            <Input type="file" onChange={()=> setInputs(2)}/>
          </Typography>

        
          <Typography className={classes.typo} variant="body1">
            
          </Typography>
        </div>

        
      </DialogContent>
      <DialogActions>
        <Button onClick={submitClose} color="default" autoFous>關閉視窗</Button>
        <Button disabled={inputs===2 ? false : true} onClick={submitClick} color="primary" autoFous>儲存</Button>
        <Snackbar open={openS} autoHideDuration={1000} onClose={submitClose}>
        <Alert onClose={submitClose} severity="success">
          已上傳大頭照！
        </Alert>
      </Snackbar>
      </DialogActions>
    </Dialog>
    
  );
};