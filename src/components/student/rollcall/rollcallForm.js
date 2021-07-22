import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import QRcode from "./QRcode/QRcode";
import GPS from "./GPS/GPS";
import { useParams } from "react-router-dom";

/*------------ STYLE ------------*/
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: 150,
    },
    Paper:{
        width: '100%',
        margin: 'auto',
        marginBottom: theme.spacing(2),
    },
    Button:{
        width:'50%',
    },
    inputForm:{
            paddingLeft:65,
            paddingTop:10,
    },
    card: {
      width:220,
      height: 220,
      margin: 'auto',
      borderRadius:20,
    },
    cardaction: {
      width:'100%',
      height: '100%',
    },
    classbutton: {
      width: '100%',
    },
  }));
/*------------------------------*/

export default function RollcallForm(){
        const classes = useStyles();

        const params = useParams();
        const csid = params.cs_id;

        console.log(csid);

        return (
          <div className={classes.root}>
          <Grid     container
                     direction="row"
                     justify="center"
                     alignItems="center"
                     spacing={1}
           >

              <Grid item  xs={12} sm={4}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardaction}>
                <GPS/>
                </CardActionArea>
              </Card>
              </Grid>

              <Grid item  xs={12} sm={4}>
              <Card className={classes.card}>
                <CardActionArea className={classes.cardaction}>
                <QRcode/>
                </CardActionArea>
              </Card>
              </Grid>

          </Grid>
          </div>

        )
    }
