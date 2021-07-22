import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { brown } from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import { Snackbar, IconButton, Dialog, Button, DialogActions, DialogContent, Typography, TextareaAutosize, Input } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  typo: {
    marginLeft: 10,
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
    padding: 10,
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

export default function Edithw(props)  {
  const classes = useStyle();
  const [open,setOpen] = React.useState(false); 

  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);
  // 失敗小紅3
  const [openErr3, setOpenErr3] = React.useState(false);

  const [inputs, setInputs] = React.useState(
    {name:props.name,content:props.content},
  
  );


  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.name)
    console.log(props.content)
    console.log(props.id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
  console.log(inputs.name);
  console.log(inputs.content);
  console.log(props.id);
    
    fetch('/teacher/updateContent/',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          hw_name: inputs.name,
          hw_content: inputs.content,
          hw_id: props.id
      })
  })
  .then(res => {
      
      async function fetchres(){
      const test = await res.text();  //接收後端傳來的訊息
      if (test === "作業內容與名稱不得為空") 
      {
          // alert("作業名稱與內容不得為空");
          console.log(1);
          setOpenS(false);        
          setOpenErr1(true);
          setOpenErr2(false); 
          setOpenErr3(false); 
          window.location.reload();   
          
      }
      else if(test === "無此作業，請先新增作業") 
      {
         // alert("這堂課已有此作業，請更改作業名稱");
          console.log(2);
          setOpenS(false);        
          setOpenErr1(false);
          setOpenErr2(true); 
          setOpenErr3(false);
          window.location.reload();    
      }
      else if(test === "request failed. teacher not in this class!") 
      {
         // alert("老師不再這堂課");
          console.log(3);
          setOpenS(false);        
          setOpenErr1(false);
          setOpenErr2(false); 
          setOpenErr3(true); 
          window.location.reload();   
      }
      else
      {
          // alert("修改成功");        
          console.log(0);          
          setOpenS(true);        
          setOpenErr1(false);
          setOpenErr2(false); 
          setOpenErr3(false);   
          window.location.reload();     
      }
  } fetchres()}
  
  )
  
};

  const submitClose = (event, reason) => {
 
    handleClose(true);
    setOpenS(false);
  };
    
  const handleChange = fieldname => event => {
    event.persist();
    setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
    
}



  return (
<div>
    <IconButton  variant="outlined"  style={{color:brown[500]}} onClick={handleClickOpen}>
        <CreateIcon/>
    </IconButton>
    
    <Dialog open={open} onClose={submitClose} >
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography className={classes.typoHeading} variant="h5">
            修改作業驗收
          </Typography>

          <Typography className={classes.typo} variant="body1">
            請輸入作業名稱：

            <Typography variant="body2">
            <Input 
            id="name" 
            value={inputs.name}
            onChange={handleChange('name')}
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

          <Typography className={classes.typo} variant="body2">
            <TextareaAutosize 
            id="content" 
            value={inputs.content}
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
        <Button disabled={inputs.name===""|| inputs.content===""} onClick={handleSubmit} color="primary" autoFocus className={classes.button}>確認送出</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            修改成功！
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
            無此作業，請先新增作業！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框3 */}
        <Snackbar open={openErr3} style={{marginBottom:100}}>
          <Alert severity="error">
            修改失敗！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    </div>
  );
};