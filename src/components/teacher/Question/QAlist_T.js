import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Grid,
  CardActionArea,
  AppBar,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
  Button,
  Container,
  Tooltip,
  ButtonBase,
  TablePagination,
} from "@material-ui/core";
import MyMenu from "../MenuT";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import { List, Dialog } from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CommentBoxT from "./CommentBoxT";
// import { withStyles } from "@material-ui/core/styles";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Orange from "@material-ui/core/colors/orange";
import Smile from "@material-ui/icons/SentimentVerySatisfied";
import DeleteQuestionT from "./DeleteQuestionT";
import CompleteQuestionT from "./CompleteQuestionT";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddQA from "./AddQA";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

/*------------ STYLE ------------*/
const useStyles = makeStyles({
  div: {
    height: "350vh",
    backgroundColor: "#ffe1c4",
  },
  Paper: {
    width: "100%",
    margin: "auto",
  },
  root: {
    width: "100%",
    textAlign: "center",
  },
  table: {
    minWidth: 750,
  },
  button: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    width: "100px",
    fontFamily: "Microsoft JhengHei",
    color: "white",
    fontSize: 16,
    backgroundColor: "#f8b62b",
    fontWeight: "bold",
  },
 
  card: {
    maxWidth: "100%",
    margin: "auto",
    borderRadius: "20px",
    borderStyle: "solid",
    borderColor: "white",
    border: 1,
    backgroundColor: "white",
    
  },
  tablecell: {
    width: "800pt",
    margin: "auto",
    borderRadius: "25px",
    borderColor: "white",
    fontFamily: "Microsoft JhengHei",
    fontWeight: "bold",
  },
  stdid: {
    width: "800pt",
    margin: "auto",
    borderRadius: "25px",
    borderColor: "white",
    fontFamily: "Microsoft JhengHei",
    fontWeight: "bold",
    fontSize: 20,
  },
  Button: {
    width: '50%',
    height:35,
    backgroundColor:'#f8b62b',
    marginLeft:20,
  },
});

/*--------------------------------*/

export default function QAlist_S() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const params = useParams();
  const csid = params.cs_id;

  const [question, setQuestion] = React.useState([]);
  const [solvedquestion, setSolvedQuestion] = React.useState([]);

  const questionlist = ["q_asktime", "q_content"];
  const stdidlist = ["q_std_id", "q_content", "q_asktime"];
  const solved_qlist = ["q_std_id", "q_content", "q_replytime", "q_reply"];

  const [stdid, setStdid] = React.useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`/teacher/unresolvedquestion/all/${csid}/`);
      setQuestion(result.data);
      console.log(result.data);
    }

    async function fetchData2() {
      const result = await axios.get(`/teacher/solvedquestion/all/${csid}/`);
      setSolvedQuestion(result.data);
      console.log(result.data);
    }


    fetchData();
    fetchData2();

  }, []);

  const [open, setOpen] = React.useState(false);
  const [forum, setForum] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const forumOpen = () => {
    setForum(true);
  };

  const forumClose = () => {
    setForum(false);
  };

  {
    /* 學生新增問題 */
  }
  const [openAddQa, closeAddQa] = React.useState(false);
  const onCloseAddQa = () => {
    closeAddQa(openAddQa ? false : true);
  };

  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <div className={classes.div}>
      <MyMenu />
      <AddQA />
      <AppBar
        position="static"
        color="default"
        style={{ maxWidth: "96%", margin: "auto" }}
      >
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab
            label="未解決"
            href="/drafts"
            {...a11yProps(0)}
            style={{ fontFamily: "微軟正黑體" }}
          />
          <LinkTab
            label="已解決"
            href="/trash"
            {...a11yProps(1)}
            style={{ fontFamily: "微軟正黑體" }}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            {question
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((Ques, index) =>
              Ques["q_solved"] === "0"
              ? 
              (
                Ques["q_std_id"] === 0
                ?
                (
                  <TableCell style={{ border: 0 }}>
                    <Card className={classes.card}>
                    <Tooltip 
                    title="點擊進入留言板!" 
                    >
                    <CardActionArea
                      component={Link}
                      to={`/CommentBoxT/${Ques["cs_id"]}/${Ques["q_id"]}/${Ques["q_content"]}`}
                      className={classes.card}
                    >
                      
                      {questionlist.map((list, i) =>
                        i < 1 ? (
                          <div>
                            <Container maxWidth="sm">
  
                              <TableCell
                                key={i}
                                component="th"
                                scope="row"
                                align="center"
                                variant="body"
                                className={classes.stdid}
                              >
                                
                                {Ques["q_content"]}
                                
                              </TableCell>
                            </Container>
                          </div>
                        ) : 
                          <div>
                           <TableCell
                              key={i}
                              component="th"
                              scope="row"
                              align="center"
                              variant="body"
                              className={classes.tablecell}
                            >
                              {Ques["q_asktime"]}
                            
                            </TableCell>
                          </div>
                        )}
                    </CardActionArea>
                      </Tooltip>
                      <List >
                        <ListItem button>
                         
                          <Button variant="contained" color="#f8b62b" className={classes.Button}>
                            <DeleteQuestionT
                            time={Ques["q_asktime"]}
                            />
                          </Button>


                        <Button variant="contained" color="#f8b62b" className={classes.Button}>
                       
                          <CompleteQuestionT
                          time={Ques["q_asktime"]}
                          />
                          </Button>
                        </ListItem>

                        </List>
                    </Card>
                  </TableCell>
                  )
                :
                (
                <TableCell style={{ border: 0 }}>
                  <Card className={classes.card}>
                  <Tooltip 
                  title="點擊進入留言板!" 
                  >
                  <CardActionArea
                    component={Link}
                    to={`/CommentBoxT/${Ques["cs_id"]}/${Ques["q_id"]}/${Ques["q_content"]}`}
                    className={classes.card}
                  >
                    
                    {stdidlist.map((list, i) =>
                      i < 2 ? (
                        <div>
                          <Container maxWidth="sm">

                            <TableCell
                              key={i}
                              component="th"
                              scope="row"
                              align="center"
                              variant="body"
                              className={classes.stdid}
                            >
                              {Ques[list]}
                              
                            </TableCell>
                          </Container>
                        </div>
                      ) : 
                        <div>
                         <TableCell
                            key={i}
                            component="th"
                            scope="row"
                            align="center"
                            variant="body"
                            className={classes.tablecell}
                          >
                            {Ques["q_asktime"]}
                          
                          </TableCell>
                        </div>
                      // )
                      )}
                  </CardActionArea>
                    </Tooltip>
                    </Card>
                </TableCell>
                )
              ) 
              : 
              (
                <div></div>
              )
              )
              }
          </Grid>
              <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={question.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
   
        </div>
      </TabPanel>

   


      <TabPanel value={value} index={1}>
        <div className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            {solvedquestion
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((Ques, index) =>
              Ques["q_solved"] === "1"
              ? 
              (
                Ques["q_std_id"] === 0
                ?
                (
                  <TableCell style={{ border: 0 }}>
                    <Card className={classes.card}>
                    <Tooltip 
                    title="點擊進入留言板!" 
                    >
                    <CardActionArea
                      component={Link}
                      to={`/CommentBoxT/${Ques["cs_id"]}/${Ques["q_id"]}/${Ques["q_content"]}`}
                      className={classes.card}
                    >
                      
                      {questionlist.map((list, i) =>
                        i < 1 ? (
                          <div>
                            <Container maxWidth="sm">
  
                              <TableCell
                                key={i}
                                component="th"
                                scope="row"
                                align="center"
                                variant="body"
                                className={classes.stdid}
                              >
                                {Ques["q_content"]}
                                
                              </TableCell>
                            </Container>
                          </div>
                        ) : 
                          <div>
                           <TableCell
                              key={i}
                              component="th"
                              scope="row"
                              align="center"
                              variant="body"
                              className={classes.tablecell}
                            >
                              {Ques["q_asktime"]}
                            
                            </TableCell>
                          </div>
                        )}
                    </CardActionArea>
                      </Tooltip>
                      <List >
                        <ListItem button>
                          
                          
                          <Button variant="contained" color="#f8b62b" style={{width:'100%',height:35}}>
                            <DeleteQuestionT
                            time={Ques["q_asktime"]}
                            />
                          </Button>

                        </ListItem>

                        </List>
                    </Card>
                  </TableCell>
                  )
                :
                (
                <TableCell style={{ border: 0 }}>
                  <Card className={classes.card}>
                  <Tooltip 
                  title="點擊進入留言板!" 
                  >
                  <CardActionArea
                    component={Link}
                    to={`/CommentBoxT/${Ques["cs_id"]}/${Ques["q_id"]}/${Ques["q_content"]}`}
                    className={classes.card}
                  >
                    
                    {stdidlist.map((list, i) =>
                      i < 2 ? (
                        <div>
                          <Container maxWidth="sm">

                            <TableCell
                              key={i}
                              component="th"
                              scope="row"
                              align="center"
                              variant="body"
                              className={classes.stdid}
                            >
                              {Ques[list]}
                              
                            </TableCell>
                          </Container>
                        </div>
                      ) : 
                        <div>
                         <TableCell
                            key={i}
                            component="th"
                            scope="row"
                            align="center"
                            variant="body"
                            className={classes.tablecell}
                          >
                            {Ques["q_asktime"]}
                          
                          </TableCell>
                        </div>
                   
                      )}
                  </CardActionArea>
                    </Tooltip>
                    </Card>
                </TableCell>
                )
              ) 
              : 
              (
                <div></div>
              )
              )
              }
          </Grid>
              <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={solvedquestion.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
   
        </div>
      </TabPanel>
    </div>
  );
}
