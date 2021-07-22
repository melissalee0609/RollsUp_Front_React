import React, {useEffect} from 'react';
import axios from 'axios';
import MyMenu from './MenuOS';
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import JoinClass from '../student/joinClass';
import { makeStyles } from '@material-ui/core/styles';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { CardActionArea, Fab, Grid} from '@material-ui/core';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
// core components
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";

const useStyles = makeStyles((theme) => ({
  div: {
    height:'100hv',
    background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    backgroundColor:'#582707',
    zIndex:10,
  },

  gridbox:{
    margin:theme.spacing(0),
  },

  grid: {
    padding: "0 15px !important",
  },
  cardTitle: {
    color: "#777",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontSize:16,
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
     color: "#999",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: "#FFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
    fontSize:20,
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#999",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  Cardtext: {
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
  },
}));

export default function HomepageS() {
  const classes = useStyles();
  const [Sclass, setClass] = React.useState([]);
  const classList = ['cs_id','cs_name','teacher_name'];
  
  useEffect(() => {
    async function fetchData() {
      const result  = await axios.get(`/student/HomePage1_s/one/`)
      setClass(result.data);
    }
    
    fetchData();
  }, []);

     {/* 加入課程 */}
     const [openJoinClass, closeJoinClass] = React.useState(false);
     const onCloseJoinClass = () => {
       closeJoinClass(openJoinClass ? false : true);

     };

  return (
    <div className={classes.div}>
    <MyMenu />

     {/* 加入課程 */}
     <Fab style={{color:'#ffffff'}} aria-label="add" className={classes.fab} 
          onClick={() => closeJoinClass(true)}>
          <AddIcon />
        </Fab>
         
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.gridbox}
       >
         
         {Sclass.map((classs, index) => (
        <Grid item xs={12} sm={12} md={4} className={classes.grid}>
          <Card>
            <CardActionArea component={Link}
              to={`/functions/${classs["cs_id"]}`}>
            <CardHeader color="warning" >
            <h1 className={classes.cardTitleWhite}>
              {index % 2 === 0 ? <MenuBookIcon style={{ fontSize: 30,paddingRight:20 }} /> : <ImportContactsIcon style={{ fontSize: 30,paddingRight:20 }} />}
              {classs["cs_name"]}
            </h1>
            </CardHeader>

            <CardBody>
              <h5 className={classes.cardTitle}>教師：{classs["teacher_name"]}</h5>
              <h3 className={classes.cardTitle}>課程代碼：{classs["cs_id"]}</h3>
            </CardBody>
            </CardActionArea>
          </Card>
        </Grid>
        ))}
        </Grid>
      {/* 學生加入課程 */}
      <JoinClass open={openJoinClass} handleClose={onCloseJoinClass}/>

    </div>
    
  )


}

