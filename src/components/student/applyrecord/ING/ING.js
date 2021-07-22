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
import Write from './Write';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import {Paper} from '@material-ui/core';


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
  { id: 'time', label: '點名時間', numeric: false, disablePadding: true },
  { id: 'applytime', label: '申請時間', numeric: false, disablePadding: true },
  { id: 'type', label: '假別', numeric: false, disablePadding: true},
  { id: 'reason',label: '事由', numeric: false, disablePadding: true},
  { id: 'write',label: '修改', numeric: false, disablePadding: true},
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


export default function Ing() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ing,setIng] = React.useState([]);
  const params =useParams();
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


   /*=========== Create Table HEAD ===========*/
   const ingList = [ 'rc_starttime', 'tl_createtime', 'tl_type_name', 'tl_content','tl_content']
  
   useEffect(() => {
     async function fetchData() {
       const result = await axios.get(`/student/takeleave/TakeleaveRecord/${params.cs_id}/0/`);
       
       console.log(result.data);
       
       setIng(result.data);
     }
     fetchData();
   }, []);

  return (
    <div className={classes.root}>  
      <Paper>
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
            <TableBody>
              {stableSort(ing, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map( (ing, index) => ing["tl_state"]===0 ?
                (
                
                
                    <TableRow hover >
                      {/* 碰到的時候後面會反灰 */}
                      <TableCell></TableCell>
                      {
                    ingList.map( (list, i) =>   i < 4 ? 
                    <TableCell height="30"  key={i} component="th" scope="row" align="left" padding="none" >
                    {ing[list]}
                 </TableCell>:
                 <TableCell height="30" key={i} align="left" padding="none" >
                   <Write 
                   id={ing['rc_id']}
                   time={ing['rc_starttime']}
                   applytime={ing['tl_createtime']}
                   type={ing['tl_type_id']}
                   content={ing['tl_content']}
                   />
                 </TableCell>
                    )   
                }
                    </TableRow>
                )
                :
                <div></div>
                 
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={ing.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
    </div>
  );
}
