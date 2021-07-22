import React , { useEffect } from 'react';
import axios from 'axios';
import MyMenu from '../MenuS';
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Container, Typography, Box} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  expanded: {},
  root: {
    backgroundColor:'#e8eaf6',
    "&$expanded": {
      margin: 10,
      backgroundColor: '#fff',
    },
    div: {
      height:'100vh',
      background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
    },
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
      <Box border={1} mx="auto" marginTop="8%" marginBottom="5%" width={'80%'} borderRadius={16} boxShadow={3} bgcolor="#fff" borderColor="#0066CC">
            <Typography  variant="h4" component="h2"  gutterBottom style={{ marginBottom:'2%',textAlign:'center',marginTop:'2%',color:'#0066CC'}}>公佈欄</Typography>

            <Container maxWidth="sm">
            {Announcement.reverse(),
            Announcement.map((announce,index) => (
                    <ExpansionPanel key={index} classes={classes} >
                      
                    {
                        AnnouncementList.map( (list, i) =>  
                            <ExpansionPanelSummary key={i} style={{marginLeft:10,fontSize:18}}>
                               <ExpansionPanelDetails>{announce[list]}</ExpansionPanelDetails>
                            </ExpansionPanelSummary>
                            
                        )
                    }
                    
                    </ExpansionPanel>
                    
                ))}
    
            </Container>
            <Box  mx="auto" marginTop="3%" marginBottom="5%" width={'30%'} borderRadius={16} boxShadow={3} bgcolor="#FFF" borderColor="#0066CC"></Box>
      
      </Box>
      
    </div>
    
  );
}