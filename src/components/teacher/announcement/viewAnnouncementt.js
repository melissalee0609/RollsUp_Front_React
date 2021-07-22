import React , { useEffect } from 'react';
import axios from 'axios';
import MyMenu from '../../teacher/MenuT';
import { useParams } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import AddAnnouncement from './addAnnouncement';
import EditAnnouncement from './editAnnouncement';
import { makeStyles } from "@material-ui/core/styles";
import DeleteAnnouncement from './DeleteAnnouncement';
import { Paper, Fab, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Container, Typography, ExpansionPanelActions, Divider } from '@material-ui/core';

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
    backgroundColor: '#582707',
    zIndex:10,
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
    }
  }
}));

export default function ViewAnnouncementt() {

  const classes = useStyles();
  const [Announcement, setAnnouncement] = React.useState([]);
  const AnnouncementList = [ 'at_title', 'at_content', 'at_posttime', '', 'at_id' ]
  const params = useParams();
  const csid = params.cs_id;
  useEffect(() => {
    async function fetchData() {

      const result  = await axios.get(`/teacher/announcement/${csid}/get/`)
      
      setAnnouncement(result.data);
      console.log(result.data);
    }
    
    fetchData();
  }, []);

  console.log(Announcement);

  
   {/* 教師發佈公告 */}
   const [openAddAnnouncement, closeAddAnnouncement] = React.useState(false);
   const onCloseAddAnnouncement = () => {
     closeAddAnnouncement(openAddAnnouncement ? false : true);
   };

  //  教師修改公告
   const [openEditAnnouncement, closeEditAnnouncement] = React.useState(false);
   const onCloseEditAnnouncement = () => {
     closeEditAnnouncement(openEditAnnouncement ? false : true);
   };

   //  教師刪除公告
   const [openDeleteAnnouncement, closeDeleteAnnouncement] = React.useState(false);
   const onCloseDeleteAnnouncement = () => {
     closeDeleteAnnouncement(openDeleteAnnouncement ? false : true);
   };

  return (
   
    
    <div className={classes.div}> 
      <MyMenu/>
       {/* 發佈公告 */}
       <Fab style={{color:'#ffffff'}} aria-label="add" className={classes.fab} onClick={() => closeAddAnnouncement(true)}>
          <AddIcon />
        </Fab>

      <Paper className={classes.Paper}>
      <Typography  variant="h4" component="h2"  gutterBottom style={{ marginBottom:'2%',textAlign:'center',fontFamily:'微軟正黑體',color:"#000000"}}>公佈欄</Typography>


            <Container maxWidth="sm">
            { 
            Announcement.reverse(),
            Announcement.map((announce,index) => (
              <ExpansionPanel key={index} classes={classes} >
                      
                    {
                      AnnouncementList.map( (list, i) =>  i < 4 ? 
                        <ExpansionPanelSummary key={i} style={{marginLeft:10,fontSize:18}}>
                               <ExpansionPanelDetails>
                                  <Typography variant="inherit">{announce[list]}</Typography>
                               </ExpansionPanelDetails>
                        </ExpansionPanelSummary>
                               
                               :
                               <div>

                                <Divider />

                                <ExpansionPanelActions>
                                  <EditAnnouncement
                                  atid={announce['at_id']}
                                  attitle={announce['at_title']}
                                  atcontent={announce['at_content']}
                                  />
                                  <DeleteAnnouncement
                                  atid={announce['at_id']}
                                  />

                                </ExpansionPanelActions>
                                        
                            
                      </div>
                      )
                    
                      }          
                    </ExpansionPanel>
            
            ))}
            
            </Container>
           </Paper>
      {/* 教師發佈公告 */}
      <AddAnnouncement open={openAddAnnouncement} handleClose={onCloseAddAnnouncement}/>
      
    </div>
    
  );
}
