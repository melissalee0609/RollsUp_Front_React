import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


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
            style={{ fontFamily:'微軟正黑體'}}
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
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  word:{
    fontFamily: 'Microsoft JhengHei',
  }
}));
/*---------------------------------------------*/


export default function RollcallRDT( props ) {

  /*------------ STATE ------------*/
  const [students, setStudents] = useState([]);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    setStudents(newlist)
    handleSubmit(students[stuIndex])
    console.log(' newlist[stuIndex]', students[stuIndex])
  }
/*=========== Create Table HEAD ===========*/
const studentList = [ 'std_id', 'std_name', 'std_department','tl_type_id']
useEffect(() => {
 async function fetchData() {
     const result = await axios.get(`/teacher/rollcall/oneRollcall/`+props.id);
     const data = result.data;
     console.log(result.data)
     console.log(data.tl_type_id);

     setStudents(result.data);
 }
 fetchData();
}, []);


  return (
    <div className={classes.root}>

    <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
          >
            <EnhancedTableHead
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
                    studentList.map( (list, i) =>   i < 3 ? 
                    <TableCell key={i} component="th" scope="row" align="left">
                    {student[list]}
                 </TableCell>:
                 student['tl_type_id'] === 8 ?
                <TableCell align="left" >
                    <FormControl component="fieldset" onChange={(e)=>changeState(e,student.std_id)}>
                      <RadioGroup row  value={student.tl_type_id+''}  >
                        <FormControlLabel value="1" control={<Radio color="primary" size="small"/>} label="出席" />
                        <FormControlLabel value="2" control={<Radio color="primary" size="small"/>} label="遠距" />
                        <FormControlLabel value="3" control={<Radio color="primary" size="small"/>} label="遲到" />
                        <FormControlLabel value="4" control={<Radio color="primary" size="small"/>} label="病假" />
                        <FormControlLabel value="5" control={<Radio color="primary" size="small"/>} label="事假" />
                        <FormControlLabel value="6" control={<Radio color="primary" size="small"/>} label="喪假" />
                        <FormControlLabel value="7" control={<Radio color="primary" size="small"/>} label="公假" />
                        <FormControlLabel value="8" control={<Radio color="primary" size="small"/>} label="缺席" />
                        
                      </RadioGroup>
                    </FormControl>
                    </TableCell>
                    :
                    <TableCell align="left" >
                    <FormControl component="fieldset" onChange={(e)=>changeState(e,student.std_id)}>
                      <RadioGroup row  value={student.tl_type_id+''}  >
                        <FormControlLabel value="1" control={<Radio color="primary" size="small"/>} label="出席" />
                        <FormControlLabel value="2" control={<Radio color="primary" size="small"/>} label="遠距" />
                        <FormControlLabel value="3" control={<Radio color="primary" size="small"/>} label="遲到" />
                        <FormControlLabel value="4" control={<Radio color="primary" size="small"/>} label="病假" />
                        <FormControlLabel value="5" control={<Radio color="primary" size="small"/>} label="事假" />
                        <FormControlLabel value="6" control={<Radio color="primary" size="small"/>} label="喪假" />
                        <FormControlLabel value="7" control={<Radio color="primary" size="small"/>} label="公假" />
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
