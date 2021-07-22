import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Leavemanagetable from './leavemanagetable';
import MyMenu from '../../teacher/MenuT';
import { useParams } from 'react-router-dom';

/*------------ STYLE ------------*/
const useStyles = makeStyles({

    div:{
        height:'100vh',
        background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
      },  
    Paper:{
        width: '90%',
        margin: 'auto',        
    },
  });

/*--------------------------------*/
export default function Leavemanage() {
    const classes = useStyles();
    const params = useParams();
        return (
            <div className={classes.div}>

        <MyMenu/>
        <br/>
            <Paper className={classes.Paper}>
                <Leavemanagetable csid={params.cs_id}/>
            </Paper>
        </div>


        )
    }
