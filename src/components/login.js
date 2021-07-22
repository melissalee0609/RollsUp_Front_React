import React from 'react';
import clsx from 'clsx';
import ForgetPw from './forgetpw';
import MyMenu from './MenuisLogouted';
import { WingBlank } from 'antd-mobile';
import { Link } from "react-router-dom";
import logo from '../../src/img/Rollsuplogo.jpeg';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, List, Paper, FormControl, TextField } from '@material-ui/core/';

/*------------ STYLE ------------*/
const useStyles = makeStyles(theme =>({
    
        button: {
            margin: theme.spacing(1),
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
            width:'100px',
            fontFamily: 'Microsoft JhengHei',
            color: "white",
            backgroundColor: "#f8b62b",
            fontWeight:'bold',
        },

        margin: {
            margin: theme.spacing(1),
            fontFamily: 'Microsoft JhengHei',
          },

        root:{
            width: '80%',
            height:'60vh',
            marginTop: theme.spacing(12),
            marginBottom: theme.spacing(12),
            overflow: 'auto',
            textAlign: 'center',
            fontFamily: 'Microsoft JhengHei',
            color: '#003060',
            backgroundColor: 'white',
        },

        div: {
            flexWrap: 'wrap',
            height: '100vh',
            width: '100%',
            background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',

        },

        TextField:{
            textAlign:'center',
            backgroundColor:'#BEBEBE',
          },
                 
    }
    ));
/*--------------------------------*/



export default function Login(){

        const classes = useStyles();
        const [inputs, setInputs] = React.useState({
            Userid: '',
            Userpassword: ''
          });

          const handleChange = fieldname => event => {
            event.persist();
            setInputs(inputs => ({...inputs, [fieldname]: event.target.value }));
          }
     
        return (
            <div className={classes.div}>
                <MyMenu/>
                
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
                
                >
                <Paper className={classes.root}>
                    <img src={logo} width="100px"></img>

        <WingBlank>

        <form action="/login" method="POST"> 

        <List>     
        <FormControl className={clsx(classes.margin)}>

          <TextField 
            id="username"
            label="學號"
            name="username"
            value={inputs.Userid}
            onChange={handleChange('Userid')}
            size="small"
            variant="outlined"
            />
        </FormControl>
        </List>

        <List>          
        <FormControl className={clsx(classes.margin)} >
            <TextField 
                id="password"
                label="密碼"
                type="password"
                name="password"
                value={inputs.Userpassword}
                onChange={handleChange('Userpassword')}
                size="small"
                variant="outlined"
            />
        </FormControl>
        </List>
            
        <List>
                    <Button
                    variant="contained"
                    component={Link}
                    to='/register'
                    className={classes.button}
                    >
                    註冊
                    </Button>
                
                    <Button 
                    type="submit"
                    variant="contained" 
                    className={classes.button}
                    >
                    登入
                    </Button>
                    <ForgetPw className={classes.button}/>
    </List>
    </form> 
    </WingBlank>
                </Paper>
                </Grid>
            </div>
        )
    }



