import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import {Save,Delete} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import {useHistory} from "react-router-dom";

function descendingComparator(a, b, orderBy) {//順序升降
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator(order, orderBy) {//搜尋
  return order === 'desc'//按照筆畫多到少
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: 'number', numeric: true, disablePadding: false, label: '學號' },
    { id: 'name', numeric: true, disablePadding: false, label: '姓名' },
    { id: 'grade', numeric: true, disablePadding: false, label: '系級' },
    { id: 'absence', numeric: true, disablePadding: false, label: '出席狀況' },
  ];



  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };

    return (
    <TableHead>
      <TableRow>
        <TableCell padding="none" />
          
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ='left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
          <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};


/*----------------------------------------------*/
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  button:{
    margin: theme.spacing(2),
    
  },
}));
/*---------------------------------------------*/


export default function Handtable( props ) {

  /*------------ STATE ------------*/
  const [students, setMembers] = useState([]);
  const [rcid, setRcid] = useState();
const params = useParams();
 

const classes = useStyles();
const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);


/*-------------------------------------------------------------------*/
const [inputs, setInputs] = React.useState({
  tl_type_name:'0',
  //宣告要接值的變數
});


let post; //宣告一個布林值變數
let history = useHistory(); //傳值跳頁的方法

const handleChange = fieldname => event => {
  event.persist();
  setInputs(inputs => ({...inputs, [fieldname]: event.target.value}));
  //
}
/*-------------------------------------------------------------------*/

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = event => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};


const handleSubmit = (student) =>
   {
     console.log('student',student['std_id'])
     console.log(props.id)
        fetch(`/teacher/rollcall/updateRollcall/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              std_id: student.std_id,
              rc_id: props.id,
              tl_type_id: student.tl_type_id
        })
       })
      }
      

  const changeState =(event,id) =>{
    const stuIndex = students.findIndex(s=>s.std_id==id)
    var newlist = [...students]
    newlist[stuIndex].tl_type_id = parseInt(event.target.value)

    setMembers(newlist)
    handleSubmit(students[stuIndex])
    console.log(' newlist[stuIndex]', students[stuIndex])
  }
/*=========== Create Table HEAD ===========*/
const studentList = [ 'std_id', 'std_name', 'std_department','tl_type_id']
console.log(props.id)

useEffect(() => {
 async function fetchData() {
     const result = await axios.get(`/teacher/rollcall/oneRollcall/${props.id}`);
     
     console.log(result.data);

     setMembers(result.data);
 }
 fetchData();
}, [props.id]);




  return (
    <div className={classes.root}>

    <TableContainer>
          <Table
            className={classes.table}
            size='small'
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}              
              onRequestSort={handleRequestSort}       
            />

            {/*===== TableBody =====*/}
            <TableBody>
            {stableSort(students, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student, index) => {
                  return (
                  <TableRow hover >
                     {/* 碰到的時候後面會反灰 */}
                  <TableCell>{index+1}</TableCell>

                  {
                    studentList.map( (list, i) =>    i < 3 ? 
                    <TableCell key={i} component="th" scope="row" align="left"  >
                    {student[list]}
                 </TableCell>:
                   
                       
                    <TableCell align="left">
                    <FormControl component="fieldset" onChange={(e)=>changeState(e,student.std_id)}>
                      <RadioGroup row  value={student.tl_type_id+''}>
                        <FormControlLabel value="1" control={<Radio color="primary" size="small"/>} label="出席" />
                        <FormControlLabel value="2" control={<Radio color="primary" size="small"/>} label="遠距" />
                        <FormControlLabel value="0" control={<Radio color="primary" size="small"/>} label="缺席" />

                      </RadioGroup>
                    </FormControl>
                    </TableCell>
                        )
                  }
                </TableRow>
                );
              })}
            </TableBody>
            </Table>
           
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        

    </div>
  );
}
