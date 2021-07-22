import React from "react";
import { useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { Snackbar, Dialog, Button, DialogActions, DialogContent, Typography, TextareaAutosize, Input} from "@material-ui/core";


const useStyle = makeStyles(theme => ({
  typo: {
    // marginLeft: 10,
    padding: 5,
    flex: 1,
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    color:'#582707'
  },
  description: {
    marginLeft: 10,
    padding: 5,
    flex: 1
  },
  typoHeading: {
    color: "#582707",
    padding: 3,
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold'
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

export default function AddAccept({ open, handleClose })  {
  const classes = useStyle();
  const params = useParams();
  const csid = params.cs_id

  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);

  const [inputs, setInputs] = React.useState(1);
  const [addHw, setAddHw] = React.useState({
      name: '',
      content: '',
  });

  const submitClick = () => {
  
    
    fetch('/teacher/acceptance/homework',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          hw_name: addHw.name,
          hw_content: addHw.content,
          hw_cs_id: csid 
      })
  })
  .then(res => {
      
      async function fetchres(){
      const test = await res.text();  //接收後端傳來的訊息
      if (test === "作業名稱與內容不得為空") 
      {
        
          console.log(1);
          setOpenErr1(true);
          setOpenErr2(false);
          
      }
      else if(test === "這堂課已有此作業，請更改作業名稱") 
      {
        
          console.log(2);
           setOpenErr2(true);
           setOpenErr1(false);

      }
      else
      {
            
          console.log(0);          
          setOpenS(true);        
          setOpenErr1(false);
          setOpenErr2(false);         
      }
  } fetchres()}
  )};

  const submitClose = (event, reason) => {
 
    handleClose(true);
    setOpenS(false);
    setInputs(1);
    addHw.content='';
    addHw.name='';
    window.location.reload();
  };
    
  const handleChange = fieldname => event => {
    event.persist();
    setAddHw(addHw => ({...addHw, [fieldname]: event.target.value}));
    setInputs(2)
}

  return (
    <Dialog open={open} onClose={submitClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            開啟作業驗收
          </Typography>

          <Typography className={classes.typo} variant="body1">
            請輸入作業名稱：

            <Typography>
              <Input
              id="name"
              onChange={handleChange('name')}
              value={addHw.name}
              style={{borderRadius:10, padding:8, width:250, height:30, fontSize:14, fontFamily:'微軟正黑體'}} 
              rowsMin={5}
              />
            </Typography>
            </Typography>
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column"}}>
          <Typography className={classes.typo} variant="body1" >
            請輸入作業內容：
          </Typography>

          <Typography className={classes.typo} variant="body1">
            <TextareaAutosize 
            id="content" 
            value={addHw.content}
            onChange={handleChange('content')}
            style={{borderRadius:10, padding:8, width:250, height:30, fontSize:14, fontFamily:'微軟正黑體'}}    
            rowsMin={5} 
            // placeholder="請輸入作業內容"
            />
          </Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitClose} color="default" autoFocus className={classes.button}>關閉視窗</Button>
        <Button disabled={inputs===2 ? false : true} onClick={submitClick} color="primary" autoFocus className={classes.button}>確認送出</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            新增作業成功！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} style={{marginBottom:100}}>
          <Alert severity="error">
            作業名稱與內容不得為空！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框2 */}
        <Snackbar open={openErr2} style={{marginBottom:100}}>
          <Alert severity="error">
            這堂課已有此作業，請更改作業名稱！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    
  );
};