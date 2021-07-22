import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useState,useEffect} from 'react';
import axios from 'axios';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';


/*----------------------------------------------*/
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  inline:{
    color: "#582707",
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
  }
}));
/*---------------------------------------------*/


export default function Ttable( props ) {

  /*------------ STATE ------------*/
  const [attend, setAttend] = React.useState([]);
  const classes = useStyles();


  /*=========== Create Table HEAD ===========*/
  
  console.log(props.id);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`/teacher/rollcall/oneRollcall/Summary/${props.id}/`);
      
      console.log(result.data);
      
      setAttend(result.data);
    }
     
    fetchData();
  }, [props.id]);
  

  return (
      <div className={classes.root}>  
        <ListItem>
              <ListItemText
                  primary={
                    <Typography
                    className={classes.inline}
                    >
                  出席
                  </Typography>}
                  secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    >
                    {attend["present"]}
                  </Typography>
                  }
                />

                <ListItemText
                  primary={
                    <Typography
                    className={classes.inline}
                    >
                  遠距
                  </Typography>}
                  secondary={
                  <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}>
                          {attend.long_distance}
                  </Typography>
                  }
                />

              <ListItemText
                  primary={
                    <Typography
                    className={classes.inline}
                    >
                  請假
                  </Typography>}
                  secondary={
                  <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}>
                          {attend.takeleave}
                  </Typography>
                  }
                />

              <ListItemText
                  primary={
                    <Typography
                    className={classes.inline}
                    >
                  缺席
                  </Typography>}
                  secondary={
                  <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}>
                          {attend.otherwise}
                  </Typography>
                  }
                />

        </ListItem>
        
    </div>
  );
}
