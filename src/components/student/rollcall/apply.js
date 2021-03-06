import React from 'react';
import { brown } from '@material-ui/core/colors';
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import {InputLabel, Select, FormControl, Grid, ListItem, IconButton, Dialog, Button, Snackbar, Typography, TextareaAutosize} from '@material-ui/core';


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

export default function Apply(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // ???????????????
    const [openS, setOpenS] = React.useState(false);
    // ????????????1
    const [openErr1, setOpenErr1] = React.useState(false);
    const [inputs, setInputs] = React.useState({
        typeid:'',
        tl_content:'',    
    });
  
    const handleChange = fieldname => event => {
      event.persist();
      setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
      
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
  };

  const handleSubmit = () =>{
    setOpen(false);
    console.log(props.id);
    console.log(inputs.tl_content);
    console.log(inputs.typeid);
    fetch('/student/takeleave',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          rc_id:props.id,
          tl_content:inputs.tl_content,
          tl_type_id:inputs.typeid,
      })
  })
  .then(res => {
                    
    async function fetchres(){
    const test = await res.text();  //???????????????????????????
    if (test === "??????????????????????????????????????????????????????") //??????????????????????????????????????????????????????
    {
        //alert("??????????????????????????????????????????????????????!");
        console.log(test);
        setOpenErr1(true);
    }
    else if(test === "????????????") 
    {
        //alert("????????????!");
        console.log(2);
        setOpenS(true);
        setOpenErr1(false);
        window.location.reload();
    }
} fetchres() })
  };

  return (
    <div className={classes.root}>
      <IconButton variant="outlined" style={{color:brown[500]}} onClick={handleClickOpen}>
        <AssignmentOutlinedIcon />
      </IconButton>

      <Dialog onClose={handleClose}  open={open} variant="inline" fullWidth maxWidth="sm">
        <DialogTitle  edge="start"onClose={handleClose}>
        
        <ListItem alignItems="flex-start">
          
        <ListItem>
          <Typography className={classes.inputName} >
            ????????????:
        </Typography>
            <Typography
                  className={classes.inline}>
                    {props.time}
            </Typography>
          </ListItem>  


             <ListItem>
          <Typography className={classes.inputName} >
            ??????:
        </Typography>
            <Typography
                  
                  className={classes.inline}>
                    {props.resource}
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
                    ???????????????
                
                <FormControl variant="outlined" className={classes.formControl} size="small">
                    <InputLabel>??????</InputLabel>
                    <Select
                    native
                    value={inputs.typeid}
                    onChange={handleChange('typeid')}
                    inputProps={{
                        name: 'typeid',
                        id:'typeid'
                    }}
                    >
                    <option value="" />
                    <option value={4}>??????</option>
                    <option value={5}>??????</option>
                    <option value={6}>??????</option>
                    <option value={7}>??????</option>
                    </Select>
                </FormControl>
                </Typography>
                </div>
            </Grid>  

            <Grid item xs={12}>
                
                <div >
                <Typography className={classes.inputName} variant="body2">
                    ???????????????
                </Typography>

                <Typography className={classes.inputName} variant="body2">
                    <TextareaAutosize 
                    style={{borderRadius:10, padding:8, width:550, height:50, fontSize:14, fontFamily:'???????????????'}}    rowsMin={5} placeholder="?????????????????????"
                    value={inputs.tl_content}
                    onChange={handleChange('tl_content')}/>
                </Typography>     
                </div>
            </Grid>
        </Grid>
        </DialogContent>

        <DialogActions>
        <Button onClick={handleClose} className={classes.button} color="default" autoFous>????????????</Button>
        <Button  
        onClick={handleSubmit}
        className={classes.button}
        color="primary" autoFous>????????????</Button>
        </DialogActions>

      </Dialog>
      {/* ??????????????? */}
      <Snackbar open={openS} autoHideDuration={2000} onClose={handleSubmit} style={{ marginBottom: 100 }}>
          <Alert severity="success">
            ?????????????????????
          </Alert>
      </Snackbar>
      {/* ???????????????1 */}
      <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
          <Alert severity="error">
            ???????????????????????????????????????
          </Alert>
      </Snackbar>
    </div>
  );
}
