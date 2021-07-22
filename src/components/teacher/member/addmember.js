import React from 'react';
import AddIcon from "@material-ui/icons/Add";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Button, Dialog, IconButton, Fab, Snackbar, Typography, TextField } from '@material-ui/core';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  typo: {
    marginLeft: 10,
    padding: 5,
    flex: 1,
    fontFamily: 'Microsoft JhengHei',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  button: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    width:'100px',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h3">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


/*------------ STYLE ------------*/
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(5),
        right: theme.spacing(5),
        backgroundColor:"#582707",
        zIndex:10,
      },
      typoHeading: {
        color: "#582707",
        padding: 10,
        fontFamily: 'Microsoft JhengHei',
        fontWeight: 'bold',
      },
      TextField:{
          width:'100%',
      },
      text:{
        height:'60px',
      },
      button: {
        fontFamily: 'Microsoft JhengHei',
        fontWeight:'bold',
        width:'100px',
      },
}));
/*------------------------------*/



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Apply(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  const [inputs, setInputs] = React.useState({
      std_id: '',  
  });
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = fieldname => event => {
    event.persist();
    setInputs(inputs => ({...inputs, [fieldname]: event.target.value }));
  }
  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    inputs.std_id='';
  };  
  const handleSubmit = () =>{
    console.log("stdid",inputs.std_id);
    console.log("csid",props.csid);
    fetch('/teacher/Addstudent/',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          std_id:inputs.std_id,
          cs_id:props.csid,
      })
  }).then(res => {

    async function fetchres(){
    const test = await res.text();
    if(test ==="新增此學生成功")
    {
        setOpenS(true);
        setOpenErr1(false);
        console.log(1);
        window.location.reload();
    }
    else
    {
        setOpenErr1(true);
        setOpenS(false);
        console.log(0);
    }
} fetchres() })
  };

  return (
    <div className={classes.root}>
     <Fab aria-label="add" style={{color:'#ffffff'}} className={classes.fab} onClick={handleClickOpen} >
      <AddIcon />
    </Fab>
      <Dialog onClose={handleClose}  open={open} variant="inline" fullWidth maxWidth="xs">
        <DialogTitle  edge="start"onClose={handleClose}>
    
            <Typography className={classes.typoHeading} variant="h5">
                新增學生
            </Typography>
        </DialogTitle>

        <DialogContent className={classes.text}>
        
                <TextField 
                id="std_id"
                label="學生學號"
                name="stdid"
                value={inputs.stdid}
                onChange={handleChange('std_id')}
                size="small"
                variant="outlined"
                className={classes.TextField}
            />
        </DialogContent>

        <DialogActions>
        <Button onClick={handleClose} color="default" className={classes.button} autoFous>關閉視窗</Button>
        <Button  
        onClick={handleSubmit}
        color="primary" className={classes.button} autoFous>確認送出</Button>
        </DialogActions>

      </Dialog>
      {/* 成功小綠框 */}
      <Snackbar open={openS} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="success">
            成功新增學生！
          </Alert>
      </Snackbar>
      {/* 失敗小紅框1 */}
      <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            請重新確認學號是否正確！
          </Alert>
      </Snackbar>
    </div>
  );
}
