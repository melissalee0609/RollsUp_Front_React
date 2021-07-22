import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
      
    large: {
      // width: theme.spacing(10),
      // height: theme.spacing(10),
    // marginTop: theme.spacing(3), 
    //  marginLeft: theme.spacing(50), 
    // marginBottom:theme.spacing(3),
    // variant: "middle",
      // alignItems: 'center',
      // justifyContent:　'center',
    
    },
  }));

export default function Logo(){
   const classes = useStyles();
        return (
            <Avatar className={classes.large} 
            variant='circle'
            src='https://image.flaticon.com/icons/svg/1946/1946429.svg'
            >
                
            </Avatar>
        )
    }

