import React, { useEffect } from 'react';
import axios from 'axios';
import MyMenu from '../MenuOS';
import EditEmail from './editEmail';
import EditPhone from './editPhone';
import UploadImg from './uploadImg';
import EditPassword from'./editPassword';
import { makeStyles } from "@material-ui/styles";
import { Paper, TableContainer, Table, TableRow, TableCell, Button } from '@material-ui/core';

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
    fontWeight:'bold',
    fontSize:16,
  },
  button: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
    fontSize:16,
    color:"#f8b62b",
  },
}));


export default function StuInformation() {
   {/* 學生修改Email */}
   const classes = useStyle();
   const [openEditEmail, closeEditEmail] = React.useState(false);
   const onCloseEditEmail = () => {
     closeEditEmail(openEditEmail ? false : true);
   };
   {/* 學生修改Phone */}
   const [openEditPhone, closeEditPhone] = React.useState(false);
   const onCloseEditPhone = () => {
     closeEditPhone(openEditPhone ? false : true);
   };
   {/* 學生修改Password */}
   const [openEditPassword, closeEditPassword] = React.useState(false);
   const onCloseEditPassword = () => {
     closeEditPassword(openEditPassword ? false : true);
   };
   {/* 學生上傳圖片 */}
   const [openUploadImg, closeUploadImg] = React.useState(false);
   const onCloseUploadImg = () => {
     closeUploadImg(openUploadImg ? false : true);
   };
   /*------------ STATE ------------*/
   const [information, setInformation] = React.useState([]);
   const informationList = [ 'std_image', 'std_name', 'std_id', 'std_department', 'std_gender', 'std_mail', 'std_phone', 'std_password'];
   
  useEffect(() => {
    async function fetchData(){
      const result = await axios.get('/student/information/');
      
      setInformation(result.data);

    }
    fetchData();
  },[]);

  return (
    
    <div className={classes.div}> 
        <MyMenu/>
            <br/>
      <Paper className={classes.Paper}>
        <TableContainer>
            <Table size="small">
                    <TableRow >
                        <TableCell width="40%" align="center" className={classes.typo}>姓名</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information.std_name}</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>學號</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information.std_id}</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                    <TableRow> 
                        <TableCell align="center" className={classes.typo}>系級</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information.std_department}</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>性別</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information.std_gender}</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>Email</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information.std_mail}</TableCell>
                        <TableCell width="20%"><Button onClick={() => closeEditEmail(true)} variant="outlined" className={classes.button}>修改Email</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>手機號碼</TableCell>
                        <TableCell width="40%" className={classes.typo}>{information.std_phone}</TableCell>
                        <TableCell width="20%"><Button onClick={() => closeEditPhone(true)} variant="outlined" className={classes.button}>修改手機號碼</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.typo}>密碼</TableCell>
                        <TableCell width="40%">********</TableCell>
                        <TableCell width="20%"><Button onClick={() => closeEditPassword(true)} variant="outlined" className={classes.button}>更改密碼</Button></TableCell>
                    </TableRow>
                </Table>
</TableContainer>
            </Paper>
            {/* 學生修改Email */}
            <EditEmail open={openEditEmail} handleClose={onCloseEditEmail}/>
            {/* 學生修改Phone */}
            <EditPhone open={openEditPhone} handleClose={onCloseEditPhone}/>
            {/* 學生修改Password */}
            <EditPassword open={openEditPassword} handleClose={onCloseEditPassword}/>
            {/* 學生上傳圖片 */}
            <UploadImg open={openUploadImg} handleClose={onCloseUploadImg}/>
    </div>
  );
}