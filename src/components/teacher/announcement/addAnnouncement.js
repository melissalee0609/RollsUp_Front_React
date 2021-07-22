import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { Snackbar, Dialog, Button, DialogActions, DialogContent, Typography, TextareaAutosize, Input } from "@material-ui/core";


const useStyle = makeStyles(theme => ({
  typo: {
    padding: 5,
    flex: 1,
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    color:'#582707'
  },
  typo2: {
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
    padding: 5,
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

export default function AddAnnouncement({ open, handleClose })  {
  const classes = useStyle();
  const params = useParams();
  const csid = params.cs_id;
  const [btnClose,setbtnClose]= React.useState(true);
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);
  // 失敗小橘3
  const [openErr3, setOpenErr3] = React.useState(false);
  // 稍後小橘4
  const [openErr4, setOpenErr4] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    title:'',
    content:'',
    //宣告要接值的變數
});

  

const handleChange = fieldname => event => {
    event.persist();
    setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
}

  const submitClose = () => {
    handleClose(true);
    setOpenS(false);
    inputs.title='';
    inputs.content='';
    window.location.reload();
  };
  const submitClose2 = () => {
    handleClose(true);
    setOpenS(false);
    inputs.title='';
    inputs.content='';
  };

  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
    setOpenErr3(false);
    setOpenErr4(false);

  };
    
  const handleSubmit = () =>
    {
      setbtnClose(false);
      setOpenErr4(true);
        if(inputs.title.length > 0 
            && inputs.content.length > 0) //每個輸入格都不為空值
            {
                fetch('/teacher/announcement/post/',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      at_title: inputs.title,
                      at_content: inputs.content,
                      cs_id: csid
                    })
                })
                .then(res => {
                    
                    async function fetchres(){
                    const test = await res.text();  //接收後端傳來的訊息
                    if (test === "request failed. Class does not exist!") //課堂不存在
                    {
                        console.log(1);
                        setOpenErr1(true);
                        setOpenErr2(false);
                        setOpenErr3(false);
                        setOpenErr4(false);
                        setbtnClose(true);
                    }
                    else if(test === "request failed. teacher not in this class!") //教師不屬於該課堂
                    {
                        console.log(2);
                        setOpenErr2(true);
                        setOpenErr1(false);
                        setOpenErr3(false);
                        setOpenErr4(false);
                        setbtnClose(true);
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
                setOpenErr3(true);
                setOpenErr4(false);
                setbtnClose(true);
            }
            
        }

        
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            發佈公告
          </Typography>

          <Typography className={classes.typo} variant="body1">
            請輸入公告名稱：
          </Typography>
          <Typography className={classes.typo2} variant="body1">
           <Input id="title" value={inputs.title} onChange={handleChange('title')} style={{borderRadius:10, padding:8, width:250, fontSize:14, fontFamily:'微軟正黑體'}} rowsMin={5}/>
          </Typography>
          
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column",marginTop:10}}>
          <Typography className={classes.typo} variant="body1">
            請輸入公告內容：
          </Typography>

          <Typography className={classes.typo2} variant="body1">
            <TextareaAutosize
            id="content" 
            value={inputs.content} 
            onChange={handleChange('content')} 
            style={{borderRadius:10, padding:8, width:250, fontSize:14, fontFamily:'微軟正黑體'}}
            rowsMin={5}
            placeholder="請輸入公告內容"
            />
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitClose2} color="default" className={classes.btntext} style={{fontFamily: 'Microsoft JhengHei'}} >關閉視窗</Button>
        <Button disabled={btnClose===false} onClick={handleSubmit} className={classes.btntext} color="primary" style={{fontFamily: 'Microsoft JhengHei'}}  >確認送出</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            已發佈公告！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} style={{marginBottom:100}}>
          <Alert severity="error">
            課堂不存在！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框2 */}
        <Snackbar open={openErr2} style={{marginBottom:100}}>
          <Alert severity="error">
            這堂課已有此作業，請更改作業名稱！
          </Alert>
        </Snackbar>
        {/* 失敗小橘框3 */}
        <Snackbar open={openErr3} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="warning">
            請再次確認！
          </Alert>
        </Snackbar>
        {/* 稍候小橘框4 */}
        <Snackbar open={openErr4} style={{marginBottom:100}}>
          <Alert severity="warning">
            請稍候，正在發送公告信！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    
  );
};