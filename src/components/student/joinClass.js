import React,{useState} from "react";
import QrReader from 'react-qr-reader'
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Dialog, Button, DialogActions, DialogContent, Typography, Input, Snackbar } from "@material-ui/core";

const ExpansionPanel = withStyles({
    root: {
      border: "1px solid rgba(0, 0, 0, .125)",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0
      },
      "&:before": {
        display: "none"
      },
      "&$expanded": {
        margin: "auto"
      }
    },
    expanded: {}
  })(MuiExpansionPanel);
  
  const ExpansionPanelSummary = withStyles({
    root: {
      backgroundColor: "rgba(0, 0, 0, .03)",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56
      }
    },
    content: {
      "&$expanded": {
        margin: "12px 0"
      }
    },
    expanded: {}
  })(MuiExpansionPanelSummary);
  
  const ExpansionPanelDetails = withStyles(theme => ({
    root: {
      padding: theme.spacing(2)
    }
  }))(MuiExpansionPanelDetails);

const useStyle = makeStyles(theme => ({
  typo: {
    fontFamily: 'Microsoft JhengHei',
    marginLeft: 10,
    padding: 5,
    flex: 1,
    fontSize:16,
  },
  description: {
    marginLeft: 10,
    padding: 5,
    flex: 1
  },
  typoHeading: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    color: "#582707",
    padding: 10
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

export default function JoinClass({ open, handleClose })  {
  
   const [expanded, setExpanded] = React.useState();

   const blockClick = panel => (event, newExpanded) => {
     setExpanded(newExpanded ? panel : false);
   };

   //QRcode
  const [scan, setScan] = useState('');

  function handleScan (scan) {
    if(scan){
      setScan(scan)
    }
  }

  function handleError (err) {
    console.error(err);
  }

  const classes = useStyle();
  // 成功小綠綠
  const [openS, setOpenS] = React.useState(false);
  // 失敗小紅1
  const [openErr1, setOpenErr1] = React.useState(false);
  // 失敗小紅2
  const [openErr2, setOpenErr2] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    cs_qrcode:'',
    //宣告要接值的變數
});
    const handleChange = cs_qrcode => event => {
        event.persist();
        setInputs(inputs => ({...inputs, [cs_qrcode]: event.target.value}));
    }   

  const submitClose = () => {
    handleClose(true);
    setOpenS(false);
    setOpenErr1(false);
    inputs.cs_qrcode='';
  };

  const ErrClose = () => {
    setOpenS(false);
    setOpenErr1(false);
    setOpenErr2(false);
    inputs.cs_qrcode='';
  };

  const previewStyle = {
    height: 240,
    width: 320,
  }

const handleSubmit = () =>
{
    if(inputs.cs_qrcode.length > 0 || scan.length > 0) //每個輸入格都不為空值
        {
            fetch('/student/course/joinclass/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  cs_qrcode: inputs.cs_qrcode||scan,
                 
                })
            })
            .then(res => {
                
                async function fetchres(){
                const test = await res.text();  //接收後端傳來的訊息
                if (test === "request failed! this class QRcode not exist!") //課堂不存在
                {
                    console.log(1);
                    setOpenErr1(true);
                    setOpenErr2(false);
                }
                else
                {
                    setOpenS(true);
                    setOpenErr1(false);
                    setOpenErr2(false);
                    console.log(0);
                    window.location.reload();                                         
                }
                
            } fetchres() })
            .then(res => console.log(res))
            .catch(err => console.log(`Error with message: ${err}`))
        }
        
        else
        {
            setOpenErr2(true);
            setOpenErr1(false);
        }
        console.log(inputs.cs_qrcode);
        console.log(scan);
    }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <Typography className={classes.typoHeading} variant="h5">加入課程</Typography>
        <Typography className={classes.typo} variant="body1">請選擇以下方式加入：</Typography>
            <ExpansionPanel square expanded={expanded === "panel1"} onChange={blockClick("panel1")}>
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" >
                    <Typography >輸入加課代碼</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>請輸入加課代碼：<Input value={inputs.cs_qrcode} onChange={handleChange('cs_qrcode')} style={{borderRadius:10, padding:8, width:250, height:30, fontSize:14, fontFamily:'微軟正黑體'}} rowsMin={5}/></Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel square expanded={expanded === "panel2"} onChange={blockClick("panel2")}>
                <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>掃描QRcode</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                      <QrReader
                        facingMode="environment"
                        delay={300}
                        style={{width:250}}
                        onError={handleError}
                        onScan={handleScan}
                      />
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>

      </DialogContent>
      <DialogActions>
        <Button onClick={submitClose} className={classes.button} color="default" >關閉視窗</Button>
        <Button onClick={handleSubmit} disabled={inputs.cs_qrcode.length || scan.length !== 0 ? false : true} className={classes.button} color="primary" >加入課程</Button>
        {/* 成功小綠框 */}
        <Snackbar open={openS} autoHideDuration={2000} onClose={submitClose} style={{marginBottom:100}}>
          <Alert severity="success">
            已加入課程！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框1 */}
        <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            該加課代碼不存在！
          </Alert>
        </Snackbar>
        {/* 失敗小紅框2 */}
        <Snackbar open={openErr2} autoHideDuration={2000} onClose={ErrClose} style={{marginBottom:100}}>
          <Alert severity="error">
            加課代碼不能為空！
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
    
  );
};