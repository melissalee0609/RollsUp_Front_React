import React, { useEffect } from 'react';
import axios from 'axios';
import MyMenu from '../MenuOT';
import EditEmail from './editEmail';
import EditPhone from './editPhone';
import UploadImg from './uploadImg';
import EditOffice from './editOffice';
import EditPassword from'./editPassword';
import { makeStyles } from "@material-ui/styles";
import { TableContainer, Paper, Table, TableRow, TableCell, Button } from '@material-ui/core';


const useStyle = makeStyles(theme => ({
  div:{
    height:'100vh',
    background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
  },  
  Paper:{
    width: '90%',
    margin: 'auto', 
    marginTop:'2%',   
    marginBottom:'5%',
    padding:'2%',
    boxShadow:"1px 1px 1px 1px #9E9E9E",    
},
box:{
  width: '80%',
  margin: 'auto', 
  marginTop:'5%',   
  padding:'2%',
  boxShadow:"1px 1px 1px 1px #9E9E9E",   
},
  typo: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold'
  },
  button: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    fontSize:16,
    color:"#f8b62b",
  },
}));


export default function TInformation() {

   const classes = useStyle();
   {/* 教師修改Email */}
   const [openEditEmail, closeEditEmail] = React.useState(false);
   const onCloseEditEmail = () => {
     closeEditEmail(openEditEmail ? false : true);
   };
   {/* 教師修改Phone */}
   const [openEditPhone, closeEditPhone] = React.useState(false);
   const onCloseEditPhone = () => {
     closeEditPhone(openEditPhone ? false : true);
   };
   {/* 教師修改Password */}
   const [openEditPassword, closeEditPassword] = React.useState(false);
   const onCloseEditPassword = () => {
     closeEditPassword(openEditPassword ? false : true);
   };
   {/* 教師修改辦公室位置 */}
   const [openEditOffice, closeEditOffice] = React.useState(false);
   const onCloseEditOffice = () => {
     closeEditOffice(openEditOffice ? false : true);
   };
   {/* 教師上傳圖片 */}
   const [openUploadImg, closeUploadImg] = React.useState(false);
   const onCloseUploadImg = () => {
     closeUploadImg(openUploadImg ? false : true);
   };
   /*------------ STATE ------------*/
   const [information, setInformation] = React.useState([]);
   
  useEffect(() => {
    async function fetchData(){
      const result = await axios.get('/teacher/information/');
      
      setInformation(result.data);

    }
    fetchData();
  },[]);
   console.log(information);

  return (
    
    <div className={classes.div}> 
        <MyMenu/>
    <br/>
            <Paper className={classes.Paper}>
            <TableContainer>
            <Table size="small">
               
                    <TableRow >
                        <TableCell width="40%" align="center" className={classes.typo}>姓名</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information["teacher_name"]}</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>學號</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information["teacher_id"]}</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>系級</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information["teacher_department"]}</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>性別</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information["teacher_gender"]}</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>Email</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information["teacher_mail"]}</TableCell>
                        <TableCell width="20%"><Button onClick={() => closeEditEmail(true)} variant="outlined" className={classes.button}>修改Email</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>手機號碼</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information["teacher_phone"]}</TableCell>
                        <TableCell width="20%"><Button onClick={() => closeEditPhone(true)} variant="outlined" className={classes.button}>修改手機號碼</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>辦公室位置</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information["teacher_office"]}</TableCell>
                        <TableCell width="20%"><Button onClick={() => closeEditOffice(true)} variant="outlined" className={classes.button}>修改辦公室位置</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>密碼</TableCell>
                        <TableCell width="40%">********</TableCell>
                        <TableCell width="20%"><Button onClick={() => closeEditPassword(true)} variant="outlined" className={classes.button}>更改密碼</Button></TableCell>
                    </TableRow>
                </Table>
                </TableContainer>
            </Paper>
            {/* 教師修改Email */}
            <EditEmail open={openEditEmail} handleClose={onCloseEditEmail}/>
            {/* 教師修改Phone */}
            <EditPhone open={openEditPhone} handleClose={onCloseEditPhone}/>
            {/* 教師修改Password */}
            <EditPassword open={openEditPassword} handleClose={onCloseEditPassword}/>
            {/* 教師修改辦公室位置 */}
            <EditOffice open={openEditOffice} handleClose={onCloseEditOffice}/>
            {/* 教師上傳圖片 */}
            <UploadImg open={openUploadImg} handleClose={onCloseUploadImg}/>
    </div>
    


  );
}