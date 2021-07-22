import React from "react"
import { Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

/*------------ STYLE ------------*/
const useStyles = makeStyles({
    bookMark:{
        background: '#4A90E2',    /*背景顏色#4A90E2*/
        color: '#ffffff',         /*字體顏色*/
        textAlign: 'center',     /*置中*/
        fontSize: '18px',        /*字體大小*/
        height: '40px',           /*按鈕高度*/
        width: '220px',           /*按鈕寬度*/
        border:'none',            /*取消框線*/
        borderBottom:'solid 0px #00408B',
    },

    select_bookMark: {
        background: '#4A90E2',    /*背景顏色#4A90E2*/
        color: '#ffffff',         /*字體顏色*/
        textAlign: 'center',     /*置中*/
        fontSize: '18px',        /*字體大小*/
        width: '220px',           /*按鈕寬度*/
        border:'none',            /*取消框線*/
        height: '38px',                         /*改變高度因為要扣底線的粗2px不然會凸出來*/
        borderBottom:'solid 5px #00408B',      /*設定下底線的樣式、粗細、顏色*/
    }

  });
/*------------------------------*/



export default function BookMark(props) {
    //console.log(props);
    const classes = useStyles();
        return (
            <Route exact path={props.to}
                children={p => {
                    console.log(p);
                    //console.log(classes);

                let cName = p.match?classes.select_bookMark:classes.bookMark;
              
                return (                   
                    <Link to={props.to}>
                        
                        <Button className={cName}>{props.name}</Button>

                    </Link>
                    
                )  
            }} />
        )
    }


//export { BookMark }