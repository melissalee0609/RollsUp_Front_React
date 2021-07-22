import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircle from '@material-ui/icons/CheckCircle';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, RadioGroup, Radio, Grid, Tooltip, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Toolbar } from "@material-ui/core";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
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
  { id: 'time', numeric: true, disablePadding: false, label: '點名時間' },
  { id: 'applytime', numeric: true, disablePadding: false, label: '申請時間' },
  { id: 'number', numeric: true, disablePadding: false, label: '學號' },
  { id: 'name', numeric: true, disablePadding: false, label: '姓名' },
  { id: 'kind', numeric: true, disablePadding: false, label: '假別' },
  { id: 'reason', numeric: true, disablePadding: false, label: '事由' },
  { id: 'pass', numeric: true, disablePadding: false, label: '審核' },
  
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow >
        <TableCell padding='default'/>
        {headCells.map(headCell => (
          <TableCell
          height="30"
            style={{ fontFamily:'微軟正黑體'}}
            key={headCell.id}
            align={headCell.numeric? 'left' : 'right'}
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

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.8),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          請假審核
        </Typography>
      )}

      {numSelected > 0 ? (
        <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Tooltip title="准許">
          <IconButton color="primary" fontSize="large">
            <CheckCircle />
          </IconButton>
        </Tooltip>
        <Tooltip title="不通過">
          <IconButton color="secondary" fontSize="large">
            <CancelIcon />
          </IconButton>
        </Tooltip>
        </Grid>
      ) : (
         <Tooltip title="Filter list">
           <IconButton aria-label="filter list">
             <FilterListIcon />
           </IconButton>
         </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
/*----------------------------------------*/
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
    color:'primary',
  },
}));
/*-------------------------------------------*/

export default function Leavemanagetable(props) {

  /*------------ STATE ------------*/
  const [leaves, setLeaves] = React.useState([]);


  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('number');
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



  const handleSubmit = (leave) =>
   {
     console.log('stdid',leave['std_id'])
     console.log('rc_id',leave['rc_id'])
     console.log('state',leave['tl_state'])
        fetch(`/teacher/takeleave/`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rc_id: leave.rc_id,
              std_id: leave.std_id,
              tl_state: leave.tl_state,
        })
       })
      }
      

  const changeState =(event,id) =>{
    const stuIndex = leaves.findIndex(s=>s.tl_id==id)
    var newlist = [...leaves]
    newlist[stuIndex].tl_state = parseInt(event.target.value)

    setLeaves(newlist)
    handleSubmit(leaves[stuIndex])
    console.log(' newlist[stuIndex]', leaves[stuIndex])
  }

  
  /*=========== Create Table HEAD ===========*/
  const leaveList = [ 'rc_starttime', 'tl_createtime','std_id','std_name','tl_type_name','tl_content','tl_content']

  const csid = props.csid
  
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`/teacher/takeleave/AllStudent/${csid}/`);
      
      console.log(result.data);
      
      setLeaves(result.data);
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
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {
                leaves.map((leave, index) => leave["tl_state"] === 0 ?
                  (
                    <TableRow 
                      hover
                      
                    >
                        <TableCell height="30">
                        </TableCell>
                  {
                    leaveList.map( (list, i) =>   i < 6 ? 
                    <TableCell height="30" key={i} component="th" scope="row" align="left" >
                    {leave[list]}
                 </TableCell>:
                 <TableCell height="30" align="left">
                 <FormControl component="fieldset" onChange={(e)=>changeState(e,leave.tl_id)}>
                   <RadioGroup row value={leave.tl_state+''} >
                     <FormControlLabel value="1" control={<Radio color="primary" size="small"/>} label="通過" />
                     <FormControlLabel value="2" control={<Radio color="secondary" size="small"/>} label="未通過" />
                   </RadioGroup>
                 </FormControl>
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
        
    </div>
  );
}
