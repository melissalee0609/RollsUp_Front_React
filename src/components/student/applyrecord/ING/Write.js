import React from 'react';
import MuiAlert from "@material-ui/lab/Alert";
import { brown } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {Select, FormControl, Grid, ListItem, IconButton, Dialog, Button, Snackbar, Typography, TextareaAutosize} from '@material-ui/core';

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
}));
/*------------------------------*/




function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Write(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // 成功小綠綠
    const [openS, setOpenS] = React.useState(false);
    // 失敗小紅1
    const [openErr1, setOpenErr1] = React.useState(false);
    // 失敗小紅2
    const [openErr2, setOpenErr2] = React.useState(false);
    const [inputs, setInputs] = React.useState(
      {content:props.content,}
    );
  
    const handleChange = fieldname => event => {
      event.persist();
      setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
      
  }


  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.time)
    console.log(props.applytime);
    console.log(props.type)
    console.log(props.content)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
  };

  const handleSubmit = () =>{
    setOpen(false);
    
    console.log(inputs.content);
    fetch('/student/takeleave/UpdateContent',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rc_id:props.id,
        tl_content:inputs.content,
      })
  })
  .then(res => {
                    
    async function fetchres(){
    const test = await res.text();  //接收後端傳來的訊息
    if (test === "請假內容不得為空") //請假內容不得為空
    {
        //alert("請假內容不得為空!");
        console.log(test);
        setOpenErr1(true);
        setOpenErr2(false);
    }
    else if(test === "教師已審核過該筆請假，無法更改內容") //教師已審核過該筆請假，無法更改內容
    {
        //alert("教師已審核過該筆請假，無法更改內容!");
        console.log(2);
        setOpenErr1(false);
        setOpenErr2(true);
    }
    else if(test === "已修改請假內容") //已修改請假內容
    {
        //alert("已修改請假內容!");
        console.log(3);
        setOpenS(true);
        setOpenErr1(false);
        setOpenErr2(false);
        window.location.reload();
    }
} fetchres() })
  };

  return (
    <div className={classes.root}>
      <IconButton variant="outlined" style={{color:brown[500]}} onClick={handleClickOpen}>
        <CreateIcon />
      </IconButton>

      <Dialog onClose={handleClose}  open={open} variant="inline" fullWidth maxWidth="sm">
        <DialogTitle  edge="start"onClose={handleClose}>
        
        <ListItem alignItems="flex-start">
          
        <ListItem>
          <Typography className={classes.inputName} >
            點名時間:
        </Typography>
            <Typography
                  className={classes.inline}>
                    {props.time}
            </Typography>
          </ListItem>  


             <ListItem>
          <Typography className={classes.inputName} >
            申請時間:
        </Typography>
            <Typography
                  
                  className={classes.inline}>
                    {props.applytime}
            </Typography>
          </ListItem>  
          
          </ListItem>
        </DialogTitle>

        <DialogContent dividers>
        <Grid container spacing={1}  
        direction="column"  
        justify="center"  
        alignItems="flex-start"
        >

            <Grid item xs={12} row> 
              
                <div>
                <Typography className={classes.inputName} variant="body1">
                    請假類別：
                
                <FormControl variant="outlined" className={classes.formControl} size="small">
                    <Select
                    native
                    value={props.type}
                   disabled
                    >
                    <option value="" />
                    <option value={4}>病假</option>
                    <option value={5}>事假</option>
                    <option value={6}>喪假</option>
                    <option value={7}>公假</option>
                    </Select>
                </FormControl>
                </Typography>
                </div>
            </Grid>  

            <Grid item xs={12}>
                
                <div >
                <Typography className={classes.inputName} variant="body2">
                    請假事由：
                </Typography>

                <Typography className={classes.inputName} variant="body2">
                    <TextareaAutosize 
                    style={{borderRadius:10, padding:8, width:550, height:50, fontSize:14, fontFamily:'微軟正黑體'}}    rowsMin={5} placeholder="請詳述請假事由"
                    value={inputs.content}
                    onChange={handleChange('content')}/>
                </Typography>     
                </div>
            </Grid>
        </Grid>
        </DialogContent>

        <DialogActions>
        <Button onClick={handleClose} className={classes.button} style={{fontFamily: 'Microsoft JhengHei'}} color="default" autoFous>關閉視窗</Button>
        <Button  
        onClick={handleSubmit}
        style={{fontFamily: 'Microsoft JhengHei'}}
        className={classes.button}
        color="primary" autoFous>確認送出</Button>
        </DialogActions>

      </Dialog>
       {/* 成功小綠框 */}
       <Snackbar open={openS} autoHideDuration={2000} onClose={handleSubmit} style={{ marginBottom: 100 }}>
          <Alert severity="success">
            修改內容成功！
          </Alert>
      </Snackbar>
      {/* 失敗小紅框1 */}
      <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
          <Alert severity="error">
            請假內容不得為空！
          </Alert>
      </Snackbar>
      {/* 失敗小紅框2 */}
      <Snackbar open={openErr2} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
          <Alert severity="error">
            教師已審核過該筆請假，無法更改內容！
          </Alert>
      </Snackbar>
    </div>
  );
}
