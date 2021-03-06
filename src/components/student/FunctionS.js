import React from 'react';
import MyMenu from './MenuS';
import bell from '../../img/bell.jpg'
import leave from '../../img/leave.jpg'
import hands from '../../img/hands.jpg'
import classs from '../../img/class.jpg'
import rollcall from '../../img/rollcall.jpg'
import question from '../../img/question.jpg'
import { Link, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, CardContent, CardActions, CardActionArea, Card, Grid, Typography, ButtonBase } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      root: {
        flexWrap: 'wrap',
        height:'100hv',
        minWidth: 375,
        width: '100%',
        background: 'linear-gradient(0deg,#ffffff  0%,#fff8e5 30%,#fff2d1 50%,  #ffe1c4 100%)',
      },
      
      content: {
        margin:10,
        justifyContent: 'center',
      },
      
      image: {
        height: '150px',
        width: '150px',
      },


      card: {
        width: "100%",
        maxWidth:250,
        height: "100%",
        maxHeight:300,
        zIndex:-1,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
      },

      cardaction: {
        width:'100%',
        height: '100%',
      },

      classbutton: {
        width: '100%',
      },
      Cardtext: {
        fontFamily: 'Microsoft JhengHei',
        fontWeight: 'bold',
      }
    }));


    export default function FunctionS() {

        const classes = useStyles();

        
        
        const [openAddQA, closeAddQA] = React.useState(false);
        const onCloseAddQA = () => {
          closeAddQA(openAddQA ? false : true);

        };
        const params = useParams();
        console.log(params);
        
        
        return (

          <div className={classes.root}>
            <MyMenu />
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >

            <Grid item xs={6} sm={6} md={4} lg={4}>  
            <Card className={classes.card}>
            <CardActionArea className={classes.cardaction}>
              <ButtonBase
               component={Link}
               to={`/rollcallRD/${params.cs_id}`}
               style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center"}}
              >
              <CardContent>
              <CardMedia
              component="img"
              alt="??????"
              image={rollcall}
              title="??????"
              className={classes.image}
              />
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>??????</Typography>
            </CardActions>
              </ButtonBase>
              </CardActionArea>
        </Card>
        </Grid>
        
        <Grid item xs={6} sm={6} md={4} lg={4}>  
        <Card className={classes.card}>
            <CardActionArea className={classes.cardaction}>
              <ButtonBase
              component={Link}
              to ={`/ApplyRecord/${params.cs_id}`}
              style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center"}}
              >
              <CardContent>
              <CardMedia
              component="img"
              alt="????????????"
              image={leave}
              title="????????????"

              className={classes.image}
              />
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>????????????</Typography>
            </CardActions>
              </ButtonBase>
              </CardActionArea>
        </Card>
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={4}>  
        <Card className={classes.card}>
            <CardActionArea className={classes.cardaction}>
              <ButtonBase
              component={Link}
              to ={`/members/${params.cs_id}`}
              style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center"}}
              >
                <CardContent>
              <CardMedia
              component="img"
              alt="????????????"
              image={classs}
              title="????????????"
              className={classes.image}
              />
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>????????????</Typography>
            </CardActions>
              </ButtonBase>
              </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
        <Card className={classes.card}>
            <CardActionArea className={classes.cardaction}>
              <ButtonBase
              component={Link}
              to={`/ViewAnnouncements/${params.cs_id}`}
              style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center"}}
              >
                <CardContent>
              <CardMedia
              component="img"
              alt="??????"
              image={bell}
              title="??????"
              className={classes.image}
              />
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>??????</Typography>
            </CardActions>
              </ButtonBase>
              </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>  
        <Card className={classes.card}>
            <CardActionArea className={classes.cardaction}>
            <ButtonBase
              component={Link}
              to={`/QAlist_S/${params.cs_id}`}
              style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center"}}
              >
                <CardContent>
              <CardMedia
              component="img"
              alt="?????????"
              image={question}
              title="?????????"
              className={classes.image}
              />
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>?????????</Typography>
            </CardActions>
              </ButtonBase>
              </CardActionArea>
        </Card>
        
        </Grid>

        <Grid item xs={6} sm={6} md={4} lg={4}>  
        <Card className={classes.card}>
            <CardActionArea className={classes.cardaction}>
            <ButtonBase 
            component={Link}
            to={`/selectHW_S/${params.cs_id}`}
            style={{
              display:"flex",
              flexDirection:"column",
              justifyContent:"center"}}>
                <CardContent>
              <CardMedia
              component="img"
              alt="????????????"
              image={hands}
              title="????????????"
              className={classes.image}
              >
               </CardMedia>
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>????????????</Typography>
            </CardActions>
              </ButtonBase>
              </CardActionArea>
        </Card>
        </Grid>
      </Grid>
    </div>
        );
      }
        

        
    
