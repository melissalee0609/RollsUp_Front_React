import React, { useEffect } from "react";
import axios from "axios";
import OffClass from './OffClass';
import MyMenu from "../teacher/MenuOT";
import CreateClass from "./createClass";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { CardActionArea, Fab, Grid } from "@material-ui/core";
// core components
import Card from "../Card/Card.js";
import CardBody from "../Card/CardBody.js";
import CardHeader from "../Card/CardHeader.js";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

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
  ibtn: {
    zIndex:10,
  },

  gridbox:{
    margin:theme.spacing(0),
    zIndex:2,

  },

  grid: {
    padding: "0 15px !important",
    zIndex:2,
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
    zIndex:2,
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
    zIndex:11,
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
    zIndex:2,

  },
}));

export default function HomepageT() {
  const classes = useStyles();
  const [Sclass, setClass] = React.useState([]);
  const [openCreateClass, closeCreateClass] = React.useState(false);
  const onCloseCreateClass = () => {
    closeCreateClass(openCreateClass ? false : true);
  };
  
  {/* 下架課程 */}
  const [openOffClass, closeOffClass] = React.useState(false);
  const onCloseOffClass = () => {
    closeOffClass(openOffClass ? false : true);
  };
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`/teacher/HomePage1_s/one/`);
      setClass(result.data);
      console.log(result.data);
    }

    fetchData();
  }, []);

  function Jump(classs){
     window.location.href = `/functiont/${classs["cs_id"]}`;        
  }
  return (
    
    <div className={classes.div}>
       {/* 下架課程 */}
       <OffClass open={openOffClass} handleClose={onCloseOffClass}/>
      <MyMenu />
      {/* 新建課程 */}
      <Fab
        style={{color:'#ffffff'}} aria-label="add" className={classes.fab}
        onClick={() => closeCreateClass(true)}
      >
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
            <CardActionArea  
            >
            <CardHeader color="warning">
            <h1 className={classes.cardTitleWhite}  onClick={() =>Jump(classs)}>
              {index % 2 === 0 ? <MenuBookIcon style={{ fontSize: 30,paddingRight:20 }} /> : <ImportContactsIcon style={{ fontSize: 30,paddingRight:20 }} />}
              {classs["cs_name"]} 
            </h1>
              <OffClass cs_id={classs['cs_id']}/>
            </CardHeader>

            <CardBody  onClick={() =>Jump(classs)}>
              <h5 className={classes.cardTitle}>教師：{classs["teacher_name"]}</h5>
              <h5 className={classes.cardTitle}>課程人數：{classs["std_count"]}</h5>
              <h3 className={classes.cardTitle}>課程代碼：{classs["cs_id"]}</h3>
            </CardBody>
            </CardActionArea>
          </Card>
        </Grid>
        ))}
        </Grid>
      {/* 教師新建課程 */}
      <CreateClass open={openCreateClass} handleClose={onCloseCreateClass} />
    </div>
  );
}