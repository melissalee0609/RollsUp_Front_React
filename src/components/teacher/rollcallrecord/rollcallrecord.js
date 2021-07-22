import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RollcallRDDp from './rollcallRDDp';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';

/*------------ STYLE ------------*/
const useStyles = makeStyles({

    body:{
        margin:'20px',
        marginTop:'20px',
        background: '#E1E1E1',
    },
    Paper:{
        width: '100%',
        margin: 'auto',        
    },
  });

/*--------------------------------*/
export default function RollcallRecord() {
    const classes = useStyles();
    const params = useParams();
    const csid = params.cs_id;
        return (

                <div>
                <Paper className={classes.Paper}> 
                <RollcallRDDp
                csid={csid}/>
                </Paper>
                </div>




        )
    }
