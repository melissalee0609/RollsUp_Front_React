import React , { useEffect } from 'react';
import axios from 'axios';
import MyMenu from '../MenuS';
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Container, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  Paper:{
    width: '85%',
    margin: 'auto', 
    marginTop:'5%',   
    marginBottom:'5%',
    padding:'2%',
},
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  div: {
    height:'100vh',
    background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
  },
  root: {
    background: 'linear-gradient(0deg,#ffffff  0%,#fffaea 30%, #fff2d1 100%)',
    fontFamily: 'Microsoft JhengHei',
    "&$expanded": {
      margin: 10,
      backgroundColor: '#fffaea',
      fontFamily: 'Microsoft JhengHei',
    },
    summary:{
      fontFamily: 'Microsoft JhengHei',
      fontSize:18,
      margin:10,
    },
    detail:{
      fontFamily: 'Microsoft JhengHei',
      fontSize:12,
      margin:10,
    }
  }
}));

export default function ViewAnnouncements() {

  const classes = useStyles();
  
  const [Announcement, setAnnouncement] = React.useState([]);

  const AnnouncementList = [ 'at_title', 'at_content', 'at_posttime' ]

  const params = useParams();
  const csid = params.cs_id;

  
  useEffect(() => {
    async function fetchData() {

      const result  = await axios.get(`/student/announcement/${csid}/get/`)
      
      setAnnouncement(result.data);
      console.log(result.data);

    }
    
    fetchData();
  }, []);

  console.log(Announcement);


  return (
   
    
    <div className={classes.div}>  
      <MyMenu/>
      <Paper className={classes.Paper}>
            <Typography  variant="h4" component="h2"  gutterBottom style={{ marginBottom:'2%',textAlign:'center',fontFamily:'微軟正黑體',color:"#000000"}}>公佈欄</Typography>

            <Container maxWidth="sm">
            {Announcement.reverse(),
            Announcement.map((announce,index) => (
                    <ExpansionPanel key={index} classes={classes} >
                      
                    {
                        AnnouncementList.map( (list, i) =>  i < 1 ?
                            <ExpansionPanelSummary key={i} style={{fontSize:18,fontFamily:'微軟正黑體',fontWeight:'bold'}}>
                               <ExpansionPanelDetails><Typography variant="inherit">{announce[list]}</Typography></ExpansionPanelDetails>
                            </ExpansionPanelSummary>
                            :
                            <ExpansionPanelSummary key={i} style={{fontSize:14,fontFamily:'微軟正黑體'}}>
                               <ExpansionPanelDetails><Typography variant="inherit">{announce[list]}</Typography></ExpansionPanelDetails>
                            </ExpansionPanelSummary>
                        )
                    }
                    
                    </ExpansionPanel>
                    
                ))}
         
            </Container>
      </Paper>
    </div>
    
  );
}