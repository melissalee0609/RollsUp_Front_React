import React from "react";
import { useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { Snackbar, Dialog, Button, DialogActions, DialogContent, Typography } from "@material-ui/core";

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
  btntext:{
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    width:'100px',
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteAnnouncement( props )  {
  const classes = useStyle();
  const params = useParams();
  const csid = params.cs_id;
  const [open, setOpen] = React.useState(false);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);
  // 失敗小橘3
  const [openErr3, setOpenErr3] = React.useState(false);
  // 失敗小橘4
  const [openErr4, setOpenErr4] = React.useState(false);
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
    
  const handleDelete = () =>
    {
        if( inputs.id !== null ) //每個輸入格都不為空值
            {
                fetch('/teacher/announcement/delete/',{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      at_id: props.atid,
                      cs_id: csid,
                    })
                })
                .then(res => {
                    console.log(inputs.id)
                    async function fetchres(){
                    const test = await res.text();  //接收後端傳來的訊息
                    if (test === "request failed. at_id not found!") //公告不存在
                    {
                        console.log(1);
                        setOpenErr1(true);
                        setOpenErr2(false);
                        setOpenErr3(false);
                        setOpenErr4(false);
                    }
                    else if(test === "request failed. ClassID does not exist!") //教師不屬於該課堂
                    {
                        console.log(2);
                        setOpenErr2(true);
                        setOpenErr1(false);
                        setOpenErr3(false);
                        setOpenErr4(false);
                    }
                    else if(test === "request failed. teacher not in this class!") //教師不屬於該課堂
                    {
                        console.log(3);
                        setOpenErr3(true);
                        setOpenErr1(false);
                        setOpenErr2(false);
                        setOpenErr4(false);
                    }
                    else
                    {
                        setOpenS(true);
                        setOpenErr1(false);
                        setOpenErr2(false);
                        setOpenErr3(false);
                        setOpenErr4(false);
                        console.log(0);         
                    }
                    
                } fetchres() })
                .then(res => console.log(res))
                .catch(err => console.log(`Error with message: ${err}`))
            }
            
            else
            {
                setOpenErr4(true);
            }
            
        }

        const handleOpenButton = () => {
          setOpen(true);
        }
        
        const handleClose= () => {
          setOpen(false);
        }

  return (
    <div>
    <Button
      onClick={handleOpenButton}
      style={{fontFamily: 'Microsoft JhengHei'}} 
      >
      刪除
      </Button>
    <Dialog open={open} onClose={handleClose} >
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            確定要刪除此公告?
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" className={classes.btntext} style={{fontFamily: 'Microsoft JhengHei'}}>關閉視窗</Button>
        <Button  onClick={handleDelete} color="primary" className={classes.btntext} style={{fontFamily: 'Microsoft JhengHei'}}>確認刪除</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            已刪除公告！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} style={{marginBottom:100}}>
          <Alert severity="error">
            公告不存在！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框2 */}
        <Snackbar open={openErr2} style={{marginBottom:100}}>
          <Alert severity="error">
            課堂不存在！
          </Alert>
        </Snackbar>
        {/* 失敗小橘框3 */}
        <Snackbar open={openErr3} style={{marginBottom:100}}>
          <Alert severity="warning">
            教師不存在！
          </Alert>
        </Snackbar>
        {/* 失敗小橘框4 */}
        <Snackbar open={openErr4} style={{marginBottom:100}}>
          <Alert severity="warning">
            請再次確認！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    </div>
  );
};