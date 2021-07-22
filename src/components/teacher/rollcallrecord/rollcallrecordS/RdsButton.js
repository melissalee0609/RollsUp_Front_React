import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import RollcallRDS from './rollcallRDStable';
import Grid from '@material-ui/core/Grid';
import {brown} from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor:'#fff8e1',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  inline:{
    color: "#582707",
    fontFamily: 'Microsoft JhengHei',
    fontWeight:'bold',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





export default function RDSB(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  return (
    <div>
     <IconButton variant="outlined"  style={{color:brown[500]}} onClick={handleClickOpen}>
      <AssignmentOutlinedIcon />
      </IconButton>


      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
             
        
      <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
        <Grid item={1}>
        <IconButton edge="start" color="#582707" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton> 
        </Grid>

          <Grid item  sm={8}>
         <ListItem alignItems="flex-start">

         <ListItemText
         primary={
          <Typography
          className={classes.inline}
          >
        學號
        </Typography>}
          secondary={
          <Typography
                component="span"
                variant="body2"
                className={classes.inline}>
                {props.stdid}
          </Typography>
          }

        />

<ListItemText
          primary={
            <Typography
            className={classes.inline}
            >
          姓名
          </Typography>}
          secondary={
          <Typography
                component="span"
                variant="body2"
                className={classes.inline}>
                {props.name}
          </Typography>
          }

        />

<ListItemText
         primary={
          <Typography
          className={classes.inline}
          >
        系級
        </Typography>}
          secondary={
          <Typography
                component="span"
                variant="body2"
                className={classes.inline}>
                {props.department}
          </Typography>
          }

        />

        </ListItem>
          </Grid>


          <Grid item xs={3} >
              
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
                        className={classes.inline}>
                          {props.present}
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
                          {props.otherwise}
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
                          {props.absent}
                  </Typography>
                  }
                />

        </ListItem>
        </Grid>
</Grid>
    </Toolbar>

        </AppBar>

        <List>
          <RollcallRDS stdid={props.stdid}/>
        </List>
      </Dialog>
    </div>
  );
}
