import React, {useEffect} from 'react';
import axios from 'axios';

export default function UserRole() {

//     const Auth = () = {
//     isAuthenticated: false,
//     authenticated(cb){
//         Auth.isAuthenticated = true;
//         setTimeout(cb, 100);
//     },
//     signout(cb) {
//         Auth.isAuthenticated = false;
//         setTimeout(cb, 100);
//     }
// };
    
    const [tcher, setTcher] = React.useState(false);
    const [std, setStd] = React.useState(false);


    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(`/CheckUserRoleInJSONReturn/`);
            // setAcceptances(result.data);
          //   console.log(result.data);
          Auth(result.data)
        }
        fetchData();

    }, [])
        

    function Auth(data) {
        console.log(data)
        if( data["user_role"] === 0){
            setStd(true);
            // return(history.push("/homepages"));
        }
        else{

            console.log(data["user_role"]);
            setTcher(true);
            ;
            
            // return(history.push("/homepaget"));
        }
    }

    return(
        <div></div>
    )

} 