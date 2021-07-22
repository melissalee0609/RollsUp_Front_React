import React from "react";
import {useParams} from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import {Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Snackbar, Button,Typography, TextareaAutosize} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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



const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  fab: {
      position: "fixed",
      bottom: 20,
      right: 20,
      backgroundColor:"#582707",
      zIndex:10,
    },
  typo: {
    padding: 5,
    flex: 1,
    fontFamily:'微軟正黑體',
  },
  description: {
    marginLeft: 10,
    padding: 5,
    flex: 1
  },
  typoHeading: {
    color: "#582707",
    padding: 10,
    fontFamily:'微軟正黑體'
  },
  button: {
   // margin: theme.spacing(1),
    marginLeft: 10,
    // marginTop: 10,
    marginBottom: 10,
    width:'100px',
    fontFamily: 'Microsoft JhengHei',
    color: "white",
    backgroundColor: "#003060",
    fontWeight:'bold',
  },
  text:{
    fontFamily: 'Microsoft JhengHei',
  },
  btntext:{
    fontFamily: 'Microsoft JhengHei',
    width:'100px',
  },
}
));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddQA ()  {
  const classes = useStyle();
  const [open, setOpen] = React.useState(false);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);
  // 失敗小橘3
  const [openErr3, setOpenErr3] = React.useState(false);
  // 稍候小橘4
  const [openErr4, setOpenErr4] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    ques:'',
  });

  const params = useParams();
  const csid = params.cs_id;
  
  const handleChange = fieldname => event => {
    event.persist();
    setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
    }
  

  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
    setOpenErr3(false);
    setOpenErr4(false);
  };


  const handleSubmit = () => {
    
    setOpenS(true);
    fetch('/student/question',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
          q_content: inputs.ques,
          cs_id: csid
      })
  })
  .then(res => {
                    
    async function fetchres(){
    const test = await res.text();  //接收後端傳來的訊息
    if (test === "request failed. Questions cannot be repeated within 5 minutes") //五分鐘內不能繼續問
    {
        //alert("五分鐘內不能繼續問!");
        console.log(1);
        setOpenErr1(true);
        setOpenErr2(false);
        setOpenErr3(false);
        setOpenErr4(false);
    }
    else if(test === "request failed. input content is null!") //內容為空
    {
        //alert("內容為空!");
        console.log(2);
        setOpenErr2(true);
        setOpenErr1(false);
        setOpenErr3(false);
        setOpenErr4(false);
    }
    else if(test === "request failed. input ClassId not found!") //找不到該課
    {
        //alert(找不到該課!");
        console.log(3);
        setOpenErr3(true);
        setOpenErr1(false);
        setOpenErr2(false);
        setOpenErr4(false);
    }
    else if(test === "request failed. student does not in this class") //學生不屬於該課
    {
        //alert(學生不屬於該課!");
        console.log(4);
        setOpenErr4(true);
        setOpenErr1(false);
        setOpenErr2(false);
        setOpenErr3(false);
    }
    else
    {
        setOpenErr1(false);
        setOpenErr2(false);
        setOpenErr3(false);
        setOpenErr4(false);
        setOpenS(true);
        console.log(0);
     //   history.push('/ViewAnnouncementt/${csid}');
    }
    
} fetchres() })
  };

  const submitClose = (event, reason) => {
    handleClose(true);
    setOpenS(false);
    window.location.reload();
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  }
    
 

  return (
    <div className={classes.root}>
    <Fab aria-label="add" style={{color:'#ffffff'}} className={classes.fab} onClick={handleClickOpen} >
      <AddIcon />
    </Fab>

    <Dialog onClose={handleClose}  open={open} variant="inline" fullWidth maxWidth="xs">
        <DialogTitle  edge="start"onClose={handleClose}>
     
          <Typography className={classes.typoHeading} variant="h5" >
            提問
          </Typography>
        </DialogTitle>

        
        <DialogContent className={classes.text}>
          <Typography className={classes.typo} variant="body1">
            請輸入問題內容：
          </Typography>

          <Typography className={classes.typo} variant="body1">
            <TextareaAutosize
             id="ques"
             name="ques"
             value={inputs.ques}
             onChange={handleChange('ques')}
             style={{borderRadius:10, padding:8, width:250,  fontSize:14, fontFamily:'微軟正黑體'}}
             rowsMin={5}
             placeholder="請輸入問題"
             />
          </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={submitClose} color="default" className={classes.btntext} >關閉視窗</Button>
        <Button 
        disabled={inputs.ques === '' ? true : false} 
        onClick={handleSubmit} 
        color="primary"
        className={classes.btntext}
        >
          確認送出
          </Button>
          </DialogActions>
        </Dialog>

        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            老師收到你的問題囉！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} style={{marginBottom:100}}>
          <Alert severity="error">
            請勿在短時間內連續發問！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框2 */}
        <Snackbar open={openErr2} style={{marginBottom:100}}>
          <Alert severity="error">
            請輸入問題內容！
          </Alert>
        </Snackbar>
        {/* 失敗小橘框3 */}
        <Snackbar open={openErr3} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="warning">
            請確認課堂是否正確！
          </Alert>
        </Snackbar>
        {/* 稍後小橘框4 */}
        <Snackbar open={openErr4} style={{marginBottom:100}}>
          <Alert severity="warning">
            您不屬於該課程！
          </Alert>
        </Snackbar>
      </div>
  );
}
