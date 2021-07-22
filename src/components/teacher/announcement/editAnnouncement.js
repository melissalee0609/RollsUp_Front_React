import React, { useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
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
export default function EditAnnouncement( props )  {
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
  // 失敗小橘5
  const [openErr5, setOpenErr5] = React.useState(false);
  const [Announcement, setAnnouncement] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [changes, setChanges] = React.useState(1);
  const [inputs, setInputs] = React.useState({
    id: props.atid,
    title: props.attitle,
    content: props.atcontent,
    //宣告要接值的變數
});

useEffect(() => {
    async function fetchData() {
      const result  = await axios.get(`/teacher/announcement/${csid}/get/`)
      setAnnouncement(result.data);
      console.log(result.data);
    }
    
    fetchData();
  }, []);

const handleChange = fieldname => event => {
    event.persist();
    setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
}

  const submitClose = (event, reason) => {
    setOpen(false);
    setOpenS(false);
    setChanges(1);
    inputs.title='';
    inputs.content='';
    window.location.reload();
  };
    
  const handleEdit = () =>
    {
      setOpenErr5(true);
        if(inputs.title.length > 0 
            && inputs.content.length > 0) //每個輸入格都不為空值
            {
                fetch('/teacher/announcement/update/',{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      at_id: inputs.id,
                      at_title: inputs.title,
                      at_content: inputs.content,
                      cs_id: csid,
                    })
                })
                .then(res => {
                    
                    async function fetchres(){
                    const test = await res.text();  //接收後端傳來的訊息
                    if (test === "request failed. at_id not found!") //課堂不存在
                    {
                        console.log(1);
                        setOpenErr1(true);
                        setOpenErr2(false);
                        setOpenErr3(false);
                    }
                    else if(test === "request failed. ClassID not found!") //教師不屬於該課堂
                    {
                        console.log(2);
                        setOpenErr2(true);
                        setOpenErr1(false);
                        setOpenErr3(false);
                        setOpenErr4(false);
                    }
                    else if(test === "request failed. teacher not in this class!")
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
                        setOpenErr5(false);
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
      <Button onClick={handleOpenButton} style={{fontFamily: 'Microsoft JhengHei'}} >修改</Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            更改公告
          </Typography>

        <Typography className={classes.typo} variant="body1">
          該公告ID為：{props.atid}
        </Typography>
        <Typography className={classes.typo} variant="body1">
          更改公告名稱為：
        </Typography>
          <Typography className={classes.typo2} variant="body1">
            <Input 
            id="title" 
            value={inputs.title} 
            onChange={handleChange('title')}
            style={{borderRadius:10, padding:8, width:250, height:30, fontSize:14, fontFamily:'微軟正黑體'}} 
            rowsMin={5}
            
            />

          </Typography>
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column"}}>
          <Typography className={classes.typo} variant="body1">
            更改公告內容為：
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
        <Button onClick={handleClose} color="default" className={classes.btntext} style={{fontFamily: 'Microsoft JhengHei'}}>關閉視窗</Button>
        <Button disabled={inputs.title === '' && inputs.content=== ''} onClick={handleEdit} className={classes.btntext} color="primary" style={{fontFamily: 'Microsoft JhengHei'}}>確認送出</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            已修改公告！
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
            老師不存在！
          </Alert>
        </Snackbar>
        {/* 失敗小橘框4 */}
        <Snackbar open={openErr4} style={{marginBottom:100}}>
          <Alert severity="warning">
            請再次確認！
          </Alert>
        </Snackbar>
        {/* 稍候小橘框5 */}
        <Snackbar open={openErr5} style={{marginBottom:100}}>
          <Alert severity="warning">
            請稍候，正在發送公告信！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    </div>
    
  );
};
