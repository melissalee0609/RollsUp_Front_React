import React from "react";
import { useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { brown } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/styles";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton, Snackbar, Dialog, Button, DialogActions, DialogContent, Typography } from "@material-ui/core";

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
  button: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    width:'100px',
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteMember( props )  {
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
    
  const handleDelete = (student) =>
   {

     console.log('student',props.std_id)
     console.log('csid',csid)
        fetch(`/teacher/Deletestudent`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              std_id: props.std_id,
              cs_id: csid,
            })
       })
       .then(res => {
        console.log(inputs.id)
        async function fetchres(){
        const test = await res.text();  //接收後端傳來的訊息
        if (test === "刪除此學生成功") 
        {
            console.log(1);
            setOpenS(true);
            setOpenErr1(false);
        }
        else
        {
            setOpenS(false);
            setOpenErr1(true);
            console.log(0);                      
        }
        
    } fetchres() })
    .then(res => console.log(res))
    .catch(err => console.log(`Error with message: ${err}`))
      }

        const handleOpenButton = () => {
          setOpen(true);
        }
        
        const handleClose= () => {
          setOpen(false);
        }

  return (
    <div>
    <IconButton  variant="outlined"  style={{color:brown[500]}} onClick={handleOpenButton}>
        <DeleteOutlineIcon/>
    </IconButton>
    <Dialog open={open} onClose={handleClose} >
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            確定要刪除此學生?
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" className={classes.button} style={{fontFamily: 'Microsoft JhengHei'}}>關閉視窗</Button>
        <Button  onClick={handleDelete} color="primary" className={classes.button} style={{fontFamily: 'Microsoft JhengHei'}}>確認刪除</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            已刪除學生！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} style={{marginBottom:100}}>
          <Alert severity="error">
            學生不存在此課堂！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    </div>
  );
};