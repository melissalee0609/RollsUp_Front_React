import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './index.css';

//import App from './App';
// import ReactApp from './components/React-app.js';
import homepages from './components/student/HomepageS';
import functions from './components/student/FunctionS';
import homepaget from './components/teacher/HomepageT';
import functiont from './components/teacher/FunctionT';
import AcceptanceList from './components/student/Acceptance/student_acceptance';
import TAcceptanceList from './components/teacher/Acceptance/teacher_acceptance';
import Rollcall from './components/teacher/rollcall/Rollcall';
import RollcallRecord from './components/teacher/rollcallrecord/rollcallrecord';
import Leavemanage from './components/teacher/leaveMN/leavemanage';
import Login from './components/login.js';
import TInformation from './components/teacher/information/TInformation';
import SInformation from './components/student/information/stuInformation';
import QAlist_T from './components/teacher/Question/QAlist_T';
import QAlist_S from './components/student/Question/QAlist_S';
import Loading from './components/Loading';
import RollcallRD from './components/student/rollcall/rollcallRD';
import RegisterBlock from './components/RegisterBlock';

import ViewAnnouncements from './components/student/announcement/viewAnnouncements';
import ViewAnnouncementt from './components/teacher/announcement/viewAnnouncementt';


import selectHWs from'./components/student/Acceptance/SelectHW_S.js';
import selectHWt from'./components/teacher/Acceptance/SelectHW_T.js';

import ReactApp from './components/React-app.js';

import * as serviceWorker from './serviceWorker';

import post from './components/Post';

import MemberT from './components/teacher/member/member';
import MemberS from './components/student/member/member';

import RollcallBlockT from './components/teacher/rollcall/RollcallBlockT';
import ApplyRecord from './components/student/applyrecord/applyrecord';
//import LeaveBlockS from './components/student/leave/LeaveBlockS';
import QRcode from './components/teacher/rollcall/QRcode/QRcode';
import Hand from './components/teacher/rollcall/Hand/Hand';

// import ForumS from './components/student/Question/viewQAlist_S';
import CommentBoxS from './components/student/Question/CommentBoxS';
import CommentBoxT from './components/teacher/Question/CommentBoxT';

// import Loading from './components/Loading';
// import gps from './components/teacher/rollcall/GPS/Gps';
// import findgeo from './components/teacher/rollcall/GPS/FindGeo';


ReactDOM.render(
    <BrowserRouter>
        <Switch>

            {/* <Route path="/" component={homepage1}/> */}
            {/* <Route path="/question" component={QuestionList}/> */}
            {/* <Route path="/acceptance" component={AcceptanceList}/> */}
            
            <Route path="/login" component={Login}/>
            <Route path="/register" component={RegisterBlock}/>
            {/* <Route path="/rollcall/:cs_id" component={Rollcall}/> */}
            <Route path="/leavemanage/:cs_id" component={Leavemanage}/>
            {/* <Route path="/rollcallrecord" component={RollcallRecord}/>  */}
            <Route path="/homepages" component={homepages}/>
            <Route path="/functions/:cs_id" component={functions}/>
            <Route path="/loading" component={Loading}/>
            <Route path="/homepaget" component={homepaget}/>
            <Route path="/functiont/:cs_id" component={functiont}/>
            <Route path="/acceptance/:cs_id/:hw_name/:std_id" component={AcceptanceList}/>
            <Route path="/acceptancet/:cs_id/:hw_name" component={TAcceptanceList}/>

            <Route path="/ViewAnnouncements/:cs_id" component={ViewAnnouncements}/>
            <Route path="/ViewAnnouncementt/:cs_id" component={ViewAnnouncementt}/>
            <Route path="/tacceptance" component={TAcceptanceList}/>
            <Route path="/SInformation" component={SInformation}/>
            <Route path="/TInformation" component={TInformation}/>
            <Route path="/QAlist_T/:cs_id" component={QAlist_T}/>
            <Route path="/QAlist_S/:cs_id" component={QAlist_S}/>
            



            <Route path="/post" component={post}/>
  
            <Route path="/membert/:cs_id" component={MemberT}/>
            <Route path="/members/:cs_id" component={MemberS}/>

            <Route path="/RollcallBlockT/:cs_id" component={RollcallBlockT}/>
            <Route path="/QRcode" component={QRcode}/> 
            <Route path="/Hand" component={Hand}/>
            <Route path="/ApplyRecord/:cs_id" component={ApplyRecord}/>
            {/* <Route path="/LeaveBlockS/:cs_id" component={LeaveBlockS}/> */}
            <Route path="/RollcallRD/:cs_id" component={RollcallRD}/>
            <Route path="/selectHW_S/:cs_id" component={selectHWs}/>

            <Route path="/selectHW_T/:cs_id" component={selectHWt}/>

            {/* <Route path="/Forums" component={ForumS}/> */}
            
            
            <Route path="/CommentBoxS/:cs_id/:q_id/:q_content" component={CommentBoxS}/>
            <Route path="/CommentBoxT/:cs_id/:q_id/:q_content" component={CommentBoxT}/>
            {/* <Route path="/Gps" component={gps}/>
            <Route path="/FindGeo" component={findgeo}/> */}

            {/* <Route path="/loading" component={Loading}/> */}

            <Route exact path="/" component={Login}/>

        </Switch>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();




// import React from 'react';
// import ReactDOM from 'react-dom';
// import ProductList from './components/product-list';

// ReactDOM.render(<ProductList />,document.getElementById('root'));





// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import PersonList from './PersonList';
// import QuestionList from './student_question_list';
// //import App from './App';
// //import registerServiceWorker from './registerServiceWorker'; //react 2.0
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<QuestionList/>, document.getElementById('root'));
// //registerServiceWorker(); //react 2.0
// serviceWorker.unregister();


