import React from 'react';
import MyMenu from './MenuT';
import bell from '../../img/bell.jpg'
import leave from '../../img/leave.jpg'
import classs from '../../img/class.jpg'
import hands from '../../img/hands.jpg'
import OpenJoinClass from './OpenJoinClass';
import rollcall from '../../img/rollcall.jpg'
import question from '../../img/question.jpg'
import { Link, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, ButtonBase, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core";

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
      },
    }));


    export default function FunctionT() {

        const classes = useStyles();

        const params = useParams();
       
        return (

          <div className={classes.root}>
            <MyMenu />
            <OpenJoinClass/>
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
               to={`/RollcallBlockT/${params.cs_id}`}
               style={{
                 display:"flex",
                 flexDirection:"column",
                 justifyContent:"center"}}
              >
              <CardContent>
              <CardMedia
              component="img"
              alt="點名"
              image={rollcall}
              title="點名"
              className={classes.image}
              />
            
              </CardContent>
            <CardActions>
              
                <Typography className={classes.Cardtext}>點名</Typography>
            
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
              to ={`/leavemanage/${params.cs_id}`}
               style={{
                 display:"flex",
                 flexDirection:"column",
                 justifyContent:"center"}}
              >
              <CardContent>
              <CardMedia
              component="img"
              alt="請假審核"
              image={leave}
              title="請假審核"
              className={classes.image}
              />
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>請假審核</Typography>
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
              to ={`/membert/${params.cs_id}`}
              style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center"}}
              >
                <CardContent>
              <CardMedia
              component="img"
              alt="課程資訊"
              image={classs}
              title="課程資訊"
              className={classes.image}
              />
                
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>課程資訊</Typography>
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
              to ={`/ViewAnnouncementt/${params.cs_id}`}
              style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center"}}
              >
                <CardContent>
              <CardMedia
              component="img"
              alt="公告"
              image={bell}
              title="公告"
              className={classes.image}
              />
                
              </CardContent>
            <CardActions>

                <Typography className={classes.Cardtext}>公告</Typography>
            
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
               to={`/QAlist_T/${params.cs_id}`}
               style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center"}}
              >
                <CardContent>
              <CardMedia
              component="img"
              alt="討論區"
              image={question}
              title="討論區"
              className={classes.image}
              />
                
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>討論區</Typography>
              
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
            to={`/selectHW_T/${params.cs_id}`}
            style={{
                 display:"flex",
                 flexDirection:"column",
                 justifyContent:"center"}}>
                <CardContent>
              <CardMedia
              component="img"
              alt="課堂舉手"
              image={hands}
              title="課堂舉手"
              className={classes.image}
              >
               </CardMedia>
              </CardContent>
            <CardActions>
                <Typography className={classes.Cardtext}>課堂舉手</Typography>
            </CardActions>
              </ButtonBase>
              </CardActionArea>
        </Card>
        </Grid>
      </Grid>

    </div>
        );
      }
        

        
    
