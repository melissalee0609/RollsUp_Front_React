import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, CardActions } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
  },
  
}));

export default function FunctionButton(props) {
  const classes = useStyles();
  
  return (
   
      <div className={classes.root}>

        <CardContent>
              <CardMedia
              component="img"
              alt={props.title}
              image={props.url}
              title={props.title}
              className={classes.image}
              />
        </CardContent>
        <CardActions>
              
                <Typography className={classes.Cardtext}>{props.title}</Typography>
            
            </CardActions>
    </div>
  );
}
