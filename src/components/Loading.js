import React , { useEffect } from 'react';
import axios from 'axios';
import gifloading from '../img/Spinner-1s-200px.gif';
import Grid from '@material-ui/core/Grid';

export default function Loading() {
  
    
  useEffect(() => {
    async function fetchData() {
        const result = await axios.get(`/CheckUserRoleInJSONReturn/`);
   
        console.log(result.data);
        Jump(result.data);
    }
    fetchData();
    
}, []);

  function Jump(data){
    console.log(data)
        if( data["user_role"] === 0){
            window.location.href = "/homepages";
        }
        else if( data["user_role"] === 1){
          console.log(data["user_role"]);
            window.location.href = "/homepaget";            
        }
        else{
          window.location.href ="/";
        }
  }
 

  return (
    <div>   
        <Grid
         container
         direction="row"
         justify="center"
         alignItems="center"
        >
        <img src={gifloading}/>
        LOADING....
        </Grid>
    </div>
  );
}