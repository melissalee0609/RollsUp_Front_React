import React from 'react';
import logo from '../img/Rollsup.jpeg';
import { AppBar, Toolbar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: 57, //會讓menu跟下面東西的距離改變
    
  },

  menuButton: {
    marginRight: theme.spacing(2),
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
    fontSize:18,
    color: "#582707",
    backgroundColor: "#fffaea",
    
  },
  School: {
    minWidth: 100,
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 30
    
  },
  
  Nav: {
    margin: `${theme.spacing(1)}px auto`,
  },
  
  list: {
    marginLeft: 20,
    marginRight: 20,
   },


   toolbar: {
     backgroundColor: '#fffaea',
  
   },

   navbutton: {
    backgroundColor: "#fffaea",
   },

   navbuttext: {
    color: "white",
    fontFamily: 'Microsoft JhengHei',
    fontWeight: 'bold',
   },
 
   arrow: {
     color:'white',
   },

   button: {
    margin: theme.spacing(1),
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    width:'200px',
    fontSize:18,
    fontFamily: 'Microsoft JhengHei',
    color: "#582707",
    backgroundColor: "#fffaea",
    fontWeight:'bold',
    borderStyle: 'none'
}
}));


export default function MylogoutMenu() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
        
        <AppBar
          position="fixed"
          
          >
            <Toolbar className={classes.toolbar}>   
              <img src={logo} width="200px"></img>
              </Toolbar>
          </AppBar>

    </div>    
  )

}