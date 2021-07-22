import React from 'react';
import clsx from 'clsx';
import { List } from 'antd-mobile';
import Select from '@material-ui/core/Select';
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Button, TextField, Paper, Snackbar, Radio, Typography, InputLabel } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({

    div: {
        background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
        height: 800,
    },

    button: {
        width: 'auto',
        fontFamily: 'Microsoft JhengHei',
        margin: 'auto',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: "white",
        backgroundColor: "#f8b62b",
        fontWeight: 'bold',
    },

    margin: {
        fontFamily: 'Microsoft JhengHei',

    },

    textfield: {
        marginBottom: 10,
        fontFamily: 'Microsoft JhengHei', 

    },

    root: {
        width: '70%',
        margin: 'auto',
        marginBottom: 100,
        overflowX: 'auto',
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Microsoft JhengHei',
        fontWeight: 'bold',
        color: '#582707',

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },

    radio: {
        color: 'orange',
    },  
    dpart: {
        width: 'auto',
        padding: 'auto',
        marginBottom: 10
    }
}
));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function RegisterT() {
    const classes = useStyles();
    // 成功小綠綠
    const [openS, setOpenS] = React.useState(false);
    // 失敗小紅1
    const [openErr1, setOpenErr1] = React.useState(false);
    // 失敗小紅2
    const [openErr2, setOpenErr2] = React.useState(false);
    // 失敗小紅3
    const [openErr3, setOpenErr3] = React.useState(false);
    // 失敗小紅4
    const [openErr4, setOpenErr4] = React.useState(false);
    const [inputs, setInputs] = React.useState({
        user: '',
        pwd: '',
        repeatpwd: '',
        name: '',
        phone: '',
        mail: '',
        office:''
        //宣告要接值的變數
    });

    const ErrClose = () => {
        setOpenS(false);
        setOpenErr1(false);
        setOpenErr2(false);
        setOpenErr3(false);
        setOpenErr4(false);
    };

    const handleChange = fieldname => event => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [fieldname]: event.target.value }));
    }
    
    const handleSubmit = () => {
        if (inputs.user.length > 0
            && inputs.pwd.length > 0
            && inputs.repeatpwd.length > 0
            && inputs.name.length > 0
            && selectedvalue !== null
            && dpart.dpart.length > 0
            && inputs.office.length > 0
            && inputs.phone.length > 0
            && inputs.mail.length > 0
            && inputs.repeatpwd === inputs.pwd) //每個輸入格都不為空值、驗證密碼等於密碼
            {
                fetch('/teacher_re/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        teacher_id: inputs.user,
                        teacher_password: inputs.pwd,
                        teacher_name: inputs.name,
                        teacher_gender: selectedvalue,
                        teacher_department: dpart.dpart,
                        teacher_phone: inputs.phone,
                        teacher_mail: inputs.mail,
                        teacher_office: inputs.office,
                    })
                })
                .then(res => {
                    
                    async function fetchres() {
                        const test = await res.text();  //接收後端傳來的訊息
                        if (test === "此帳號已存在") //帳號已註冊過
                        {
                            setOpenS(false);
                            setOpenErr1(true);
                            setOpenErr2(false);
                            setOpenErr3(false);
                            setOpenErr4(false);
                            console.log(1);
                        }
                        else if (test === "帳號長度不符") //帳號長度不符
                        {
                            setOpenS(false);
                            setOpenErr1(false);
                            setOpenErr2(true);
                            setOpenErr3(false);
                            setOpenErr4(false);
                            console.log(2);
                        }
                        else if (test === "email格式錯誤") //email格式錯誤
                        {
                            setOpenS(false);
                            setOpenErr1(false);
                            setOpenErr2(false);
                            setOpenErr3(true);
                            setOpenErr4(false);
                            console.log(3);
                        }
                        else if (res.status === 500)
                        {
                            setOpenS(false);
                            setOpenErr1(false);
                            setOpenErr2(false);
                            setOpenErr3(false);
                            setOpenErr4(true);
                            console.log(1233);
                        }
                        else {
                            setOpenS(true);
                            setOpenErr1(false);
                            setOpenErr2(false);
                            setOpenErr3(false);
                            setOpenErr4(false);
                            console.log(0);
                            window.location.href = "/login";
                        }
                        
                    } fetchres()
                })
                .then(res => console.log(res))
                .catch(err => console.log(`Error with message: ${err}`))
            }

            else {
            setOpenS(false);
            setOpenErr1(false);
            setOpenErr2(false);
            setOpenErr3(false);
            setOpenErr4(true);
        }

        
    }
    
    //用在選性別的state跟handlechange
    const [selectedvalue, setSelectedValue] = React.useState('');

    const handleChangeGender = (event) => {
        setSelectedValue(event.target.value);
    };
    
    //用在選系級的state跟handlechange
    const [dpart, setDpart] = React.useState({
        dpart: '',
    });
    
    const handleChangeDpart = (event) => {
       
        const name = event.target.name;
        setDpart({
          ...dpart,
          [name]: event.target.value,
        });
    };
    
    return (
        <div className={classes.div}>

            <Paper className={classes.root}>
                <h2>註冊</h2>
                <List>
                    <FormControl className={clsx(classes.margin)} variant="outlined" size="small">


                        <TextField
                            required
                            id="user"
                            label="教師帳號"
                            value={inputs.user}
                            onChange={handleChange('user')}
                            className={classes.textfield}
                            size="small"
                            variant="outlined"
                        />

                        <TextField
                            required
                            id="pwd"
                            label="密碼"
                            type="password"
                            value={inputs.pwd}
                            onChange={handleChange('pwd')}
                            className={classes.textfield}
                            size="small"
                            variant="outlined"
                        />

                        <TextField
                            required
                            id="repeatpwd"
                            label="請再次輸入密碼"
                            type="password"
                            value={inputs.repeatpwd}
                            onChange={handleChange('repeatpwd')}
                            size="small"
                            variant="outlined"
                            className={classes.textfield}
                        />



                        <TextField
                            required
                            id="name"
                            label="姓名"
                            value={inputs.name}
                            onChange={handleChange('name')}
                            size="small"
                            variant="outlined"
                            className={classes.textfield}
                        />

                        <Typography>

                        性別: 
                        男
                        <Radio
                            checked={selectedvalue === '男'}
                            onChange={handleChangeGender}
                            value="男"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                            className={classes.radio}
                            color="orange"
                        />
                        女
                        <Radio
                            checked={selectedvalue === '女'}
                            onChange={handleChangeGender}
                            value="女"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'B' }}
                            className={classes.radio}
                            color="orange"
                            
                            />
                        </Typography>
                        
                        <FormControl variant="outlined" className={classes.dpart}>
                            <InputLabel htmlFor="outlined-age-native-simple">授課系所</InputLabel>
                            <Select
                                native
                                value={dpart.dpart}
                                onChange={handleChangeDpart}
                                label="dpart"
                                inputProps={{
                                    name: 'dpart',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={'資訊管理學系'}>資訊管理學系</option>
                                <option value={'企業管理學系'}>企業管理學系</option>
                                <option value={'公共衛生學系'}>公共衛生學系</option>
                                <option value={'會計學系'}>會計學系</option>
                                <option value={'應用美術學系'}>應用美術學系</option>
                                <option value={'護理學系'}>護理學系</option>
                                <option value={'營養學系'}>營養學系</option>
                                <option value={'金融與國際企業學系'}>金融與國際企業學系</option>
                                <option value={'化學系'}>化學系</option>
                            </Select>
                        </FormControl>
                        

                        <TextField
                            required
                            id="office"
                            label="辦公室位置"
                            value={inputs.office}
                            onChange={handleChange('office')}
                            size="small"
                            variant="outlined"
                            className={classes.textfield}
                        />
                        <TextField
                            required
                            id="phone"
                            label="電話號碼"
                            value={inputs.phone}
                            onChange={handleChange('phone')}
                            size="small"
                            variant="outlined"
                            className={classes.textfield}
                        />

                        <TextField
                            required
                            id="mail"
                            label="電子郵件"
                            value={inputs.mail}
                            onChange={handleChange('mail')}
                            size="small"
                            variant="outlined"
                            className={classes.textfield}
                        />
                    </FormControl>
                </List>

                <Button
                    className={classes.button}
                    onClick={handleSubmit}
                    variant="contained"
   
                >確認送出
              </Button>

                <Button
                    className={classes.button}
                    variant="contained"
                    component={Link}
                    to='/login'
                >返回
              </Button>

            </Paper>
            {/* 成功小綠框 */}
            <Snackbar open={openS} autoHideDuration={2000} onClose={handleSubmit} style={{ marginBottom: 100 }}>
                <Alert severity="success">
                    註冊成功！
                </Alert>
            </Snackbar>
            {/* 失敗小紅框1 */}
            <Snackbar open={openErr1} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
                <Alert severity="error">
                    該帳號已存在！
                </Alert>
            </Snackbar>
            {/* 失敗小紅框2 */}
            <Snackbar open={openErr2} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
                <Alert severity="error">
                    帳號長度有誤！請再次確認！
                </Alert>
            </Snackbar>
            {/* 失敗小紅框3 */}
            <Snackbar open={openErr3} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
                <Alert severity="error">
                    Email格式錯誤！
                </Alert>
            </Snackbar>
            {/* 失敗小紅框4 */}
            <Snackbar open={openErr4} autoHideDuration={2000} onClose={ErrClose} style={{ marginBottom: 100 }}>
                <Alert severity="error">
                    請再次確認！
                </Alert>
            </Snackbar>
        </div>

    );

}
