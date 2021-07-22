
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



    const Post = () => {

     
        const [inputs, setInputs] = React.useState({
            Userid: '',
            Userpassword: ''
        });
        

        const handleChange = user => event => {
          event.persist();
          setInputs(inputs => ({...inputs, [user]: event.target.value}));
        }
        return (
        <div>

          <form action="/login" method="POST"> 
          
          <TextField 
            id="username"
            label="Userid"
            name="username"
            value={inputs.Userid}
            onChange={handleChange('Userid')}
            />
          <TextField 
            id="password"
            label="Userpassword"
            type="password"
            name="password"
            value={inputs.Userpassword}
            onChange={handleChange('Userpassword')}
            />
          
          <Button            
            type="submit"
            variant="contained">Submit</Button>
            
          </form>

        </div>
            );
      }

    export default Post