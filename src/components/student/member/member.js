import React, {useEffect} from 'react';
import axios from 'axios';
import MyMenu from '../MenuS';
import MMTable from './MMtableS';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Paper, Table, TableRow, TableCell } from '@material-ui/core';

/*------------ STYLE ------------*/
const useStyles = makeStyles({

  div:{
    height:'100vh',
    background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
  },  
    Paper:{
        width: '90%',
        margin: 'auto', 
        marginTop:'3%',   
        boxShadow:"1px 1px 1px 1px #9E9E9E",    
    },
    Paper2:{
      width: '80%',
      margin: 'auto', 
      marginTop:'3%',   
      boxShadow:"1px 1px 1px 1px #9E9E9E",    
  },
    typo: {
      fontFamily: 'Microsoft JhengHei',
      fontWeight:'bold'
    },
  });

/*--------------------------------*/
export default function Member() {
    const classes = useStyles();
    const params = useParams();
    const csid = params.cs_id;
    const [teacherInformation, setTeacherInformation] = React.useState([]);
 useEffect(() => {
  async function fetchData() {

      const result = await axios.get(`/student/Course/studentList/TeacherInformation/${csid}`);
      console.log(result.data);
      setTeacherInformation(result.data);
  }
  fetchData();
}, []);
    // const csid = params.cs_id;
        return (
          <div className={classes.div}>
                <MyMenu/>
          <br/>
          <Paper className={classes.Paper2}>
            <TableContainer>
            <Table size="small">
                    <TableRow >
                        <TableCell height="30" width="40%" align="center" className={classes.typo}>教師姓名</TableCell>
                        <TableCell height="30" width="40%" align="center" className={classes.typo}>{teacherInformation.teacher_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell height="30" align="center" className={classes.typo}>系所</TableCell>
                        <TableCell height="30" align="center" width="40%" className={classes.typo}>{teacherInformation.teacher_department}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell height="30" align="center" className={classes.typo}>電話</TableCell>
                        <TableCell height="30" align="center" width="40%" className={classes.typo}>{teacherInformation.teacher_phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell height="30" align="center" className={classes.typo}>Email</TableCell>
                        <TableCell height="30" align="center" width="40%" className={classes.typo}>{teacherInformation.teacher_mail}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell height="30" align="center" className={classes.typo}>辦公室位置</TableCell>
                        <TableCell height="30" align="center" width="40%" className={classes.typo}>{teacherInformation.teacher_office}</TableCell>
                    </TableRow>
                </Table>
                </TableContainer>
            </Paper>
                <Paper className={classes.Paper}>
                  <MMTable
                    csid={params.cs_id}
                  />
                </Paper>
             </div>
        )
    }
