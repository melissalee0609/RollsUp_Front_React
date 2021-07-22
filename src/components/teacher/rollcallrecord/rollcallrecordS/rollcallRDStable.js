import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
  { id: 'time', label: '日期與時間', numeric: true, disablePadding: false },
  { id: 'from', label: '來源', numeric: true, disablePadding: false},
  { id: 'score',label: '出席狀況', numeric: true, disablePadding: false },
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
            align={headCell.numeric = 'left'}
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
}));
/*---------------------------------------------*/


export default function RollcallRDS(props) {

  /*------------ STATE ------------*/
  const [rollcalls, setRollcalls] = useState([]);
  const params = useParams();

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
  const handleSubmit = (rollcall) =>
  {
    console.log('stdid',rollcall['std_id'])
    console.log('rcid',rollcall['rc_id'])
    console.log('typeid',rollcall['tl_type_id'])
       fetch(`/teacher/rollcall/updateRollcall/`,{
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             std_id: rollcall.std_id,
             rc_id: rollcall.rc_id,
             tl_type_id: rollcall.tl_type_id
       })
      })
     }
     

 const changeState =(event,id) =>{
   const rcIndex = rollcalls.findIndex(s=>s.rc_id==id)
   var newlist = [...rollcalls]
   newlist[rcIndex].tl_type_id = parseInt(event.target.value)

   setRollcalls(newlist)
   handleSubmit(rollcalls[rcIndex])
   console.log(' newlist[rcIndex]', rollcalls[rcIndex])
 }
/*=========== Create Table HEAD ===========*/
const rollcallsList = [ 'rc_starttime', 'rc_inputsource','tl_type_id']

useEffect(() => {
 async function fetchData() {
     const result = await axios.get(`/teacher/rollcall/personalRecord/${params.cs_id}/`+props.stdid);
     
     console.log(result.data);

     setRollcalls(result.data);
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
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
               order={order}
               orderBy={orderBy}              
               onRequestSort={handleRequestSort}
            />

            {/*===== TableBody =====*/}
            <TableBody>
              {stableSort(rollcalls, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rollcall, index) => {
                  return (
                  <TableRow hover >
                     {/* 碰到的時候後面會反灰 */}
                  <TableCell>{index+1}</TableCell>
                  {
                    rollcallsList.map( (list, i) =>   i < 2 ? 
                    <TableCell key={i} component="th" scope="row" align="left">
                    {rollcall[list]}
                 </TableCell>:
                 rollcall['tl_type_id'] === 8 ?
                 <TableCell align="left">
                 <FormControl component="fieldset" onChange={(e)=>changeState(e,rollcall.rc_id)}>
                   <RadioGroup row  value={rollcall.tl_type_id+''} >
                     <FormControlLabel value="1" control={<Radio color="primary" size="small"/>} label="出席" />
                     <FormControlLabel value="2" control={<Radio color="primary" size="small"/>} label="遠距" />
                     <FormControlLabel value="3" control={<Radio color="primary" size="small"/>} label="遲到" />
                     <FormControlLabel value="4" control={<Radio color="primary" size="small"/>} label="病假" />
                     <FormControlLabel value="5" control={<Radio color="primary" size="small"/>} label="事假" />
                     <FormControlLabel value="6" control={<Radio color="primary" size="small"/>} label="喪假" />
                     <FormControlLabel value="7" control={<Radio color="primary" size="small"/>} label="公假" />
                     <FormControlLabel value="8"  control={<Radio color="primary" size="small"/>} label="缺席" />
                   </RadioGroup>
                 </FormControl>
                 </TableCell>
                 :
                 <TableCell align="left">
                 <FormControl component="fieldset" onChange={(e)=>changeState(e,rollcall.rc_id)}>
                   <RadioGroup row  value={rollcall.tl_type_id+''} >
                     <FormControlLabel value="1" control={<Radio color="primary" size="small"/>} label="出席" />
                     <FormControlLabel value="2" control={<Radio color="primary" size="small"/>} label="遠距" />
                     <FormControlLabel value="3" control={<Radio color="primary" size="small"/>} label="遲到" />
                     <FormControlLabel value="4" control={<Radio color="primary" size="small"/>} label="病假" />
                     <FormControlLabel value="5" control={<Radio color="primary" size="small"/>} label="事假" />
                     <FormControlLabel value="6" control={<Radio color="primary" size="small"/>} label="喪假" />
                     <FormControlLabel value="7" control={<Radio color="primary" size="small"/>} label="公假" />
                     <FormControlLabel value="0"  control={<Radio color="primary" size="small"/>} label="缺席" />
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
          count={rollcalls.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

    </div>
  );
}
