import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  Typography,
  TextareaAutosize,
  List,
  TableCell,
  Snackbar,
  TablePagination,
  Paper,
  Container,
  TableContainer,
} from "@material-ui/core";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { brown } from "@material-ui/core/colors";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Orange from "@material-ui/core/colors/orange";
import Smile from "@material-ui/icons/SentimentVerySatisfied";
import MyMenu from "../MenuT";
import axios from "axios";
import { useParams } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";


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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

/*------------ STYLE ------------*/
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  Paper: {
    width: '85%',
    margin: 'auto',
    //marginTop:'5%',   
    marginBottom: '5%',
    padding: '2%',
    backgroundColor:'#ffffff',
    borderRadius: "20px",

  },
  div: {
    height: "250vh",
    // background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
    backgroundColor: "#ffe1c4",
    overflowX: 'auto',

  },

  title: {
    // color: "#582707",
    fontFamily: "Microsoft JhengHei",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 1,
    // width: '80%',
    // marginLeft: '45%',
    // marginRight: '45%',
  },
  title2: {
    fontFamily: "Microsoft JhengHei",
    fontSize: 12,
    lineHeight: 1,
  },
  button: {
    width: "5%",
    height: 40,
    marginLeft: 20,
    //marginTop: 30,
    fontFamily: "Microsoft JhengHei",
    fontWeight: "bold",
    color: 'white',
    backgroundColor: "#f8b62b",

  },
  Avatar: {
    backgroundColor: Orange[500],
  },
}));
/*------------------------------*/

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CommentBoxT() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openS, setOpenS] = React.useState(false);
  const [openError, setError] = React.useState(false);
  const [openError2, setError2] = React.useState(false);



  const [inputs, setInputs] = React.useState({
    // typeid:'',
    cb_content: "",
  });

  const handleChange = (fieldname) => (event) => {
    event.persist();
    setInputs((inputs) => ({ ...inputs, [fieldname]: event.target.value }));
  };

  const params = useParams();
  const csid = params.cs_id;
  const qid = params.q_id;
  const qcontent = params.q_content;

  const [comment, setComment] = React.useState([]);

  const commentList = ["cb_content"];

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `/teacher/findAllmessageIntheQuestion/${csid}/${qid}`
      );
      setComment(result.data);
      console.log(result.data);
    }

    fetchData();
  
  }, []);


  const ErrClose = () => {
    setOpenS(false);
    setError(false);
    setError2(false);
  };

  const handleSubmit = () => {
    // setOpen(false);
    // console.log(props.id);
    // console.log(inputs.tl_content);
    // console.log(inputs.typeid);
    fetch("/teacher/AddNewMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q_id: qid,
        cb_content: inputs.cb_content,
        cs_id: csid,
      })
    })
      .then(res => {

        async function fetchres() {
          const test = await res.text();
          if (test === "request failed. input content is null!") {

            setOpenS(false);
            setError(true);
            setError2(false);

            console.log(1);

          }
          else if (test === "request failed. this question has been solved can't add new messages!") {
            setOpenS(false);
            setError(false);
            setError2(true);
            console.log(2);
          }
          else {

            setOpenS(true);
            setError(false);
            setError2(false);

            console.log(0);
            window.location.reload();
          }

        } fetchres()
      })

  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 20));
    setPage(0);
  };


  return (
    <div className={classes.div}>
      <MyMenu />

      <Paper className={classes.Paper}>
        <Typography variant="h5" compfonent="h5" gutterBottom style={{ marginBottom: '2%', textAlign: 'center', fontFamily: "Microsoft JhengHei", fontWeight: "bold", color: "#000000" }}> {qcontent}</Typography>




          <TableContainer  >
            {comment
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((Com, index) => (
                <List>
                  {commentList.map((list, i) => (

              <ListItem alignItems="flex-start">
                      {
                      Com['std_id'] === 0 ?
                      <ListItemAvatar>
                        <Avatar src="https://image.flaticon.com/icons/svg/1915/1915932.svg" />
                      </ListItemAvatar>
                      :
                      <ListItemAvatar>
                        <Avatar src="https://image.flaticon.com/icons/png/512/1046/1046270.png" />
                      </ListItemAvatar>
                      
                      }

                      {
                      Com['std_id'] === 0 ?
                        <ListItemAvatar style={{
                          marginLeft: 10,
                          marginRight: 30,
                          width: 70,
                        }}>
                        教師
                      </ListItemAvatar>
                      :
                      <ListItemAvatar style={{
                        marginLeft: 10,
                        marginRight: 30,
                        width: 70,
                      }}>
                      {Com["std_id"]}
                    </ListItemAvatar>

                      }
                      <ListItemText>
                        <Typography style={{
                          borderRadius: 10,
                          // minWidth: "80%",
                          width: "90%",
                          fontFamily: "Microsoft JhengHei",
                          backgroundColor: "#eeeeee",
                          padding: 10,
                          // marginLeft: 20,
                        }}>
                          {Com["cb_content"]}

                        </Typography>
                      </ListItemText>
                    </ListItem>


                  ))}
                </List>
              ))}

            
      <ListItem alignItems="flex-start">
          <TextField
            id="cb_content"
            label="請輸入內文"
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fafafa", width: "85%" }}
            onChange={handleChange("cb_content")}
          />

          <Button
            className={classes.button}
            onClick={handleSubmit}
            color="default"
            autoFocus
          >
            留言
          </Button>
        </ListItem>
                <TablePagination
              rowsPerPageOptions={[20, 50]}
              component="div"
              count={comment.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
      </Paper>

      <Snackbar open={openS} autoHideDuration={2000} onClose={handleSubmit} style={{ marginBottom: 100 }}>
        <Alert severity="success">
          留言成功！
                </Alert>
      </Snackbar>
      {/* 失敗小紅框1 */}
      <Snackbar open={openError} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
        <Alert severity="error">
          請勿為空值!
                </Alert>
      </Snackbar>
      <Snackbar open={openError2} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
        <Alert severity="error">
          此問題已被解決!
                </Alert>
      </Snackbar>
    </div>
  );
}
