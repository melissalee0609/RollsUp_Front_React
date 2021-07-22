import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    //minWidth:375,
    width: '100%',
  },
  image: {
    position: 'flex',
    width:200,
    height: 200,
    alignItems:'center',
    justifyContent:'center',
    border:'0px',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.009,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '0px solid currentColor',
      },
    },
  },
  imageButton: {
    position: 'absolute',
    height:'100%',
    width:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    
  },
  imageSrc: {
    position: 'absolute',
    maxHeight:'60%',
    maxWidth:'60%',
    display:'block',
    margin:'auto',
  },
  imageBackdrop: {//最上面灰灰那部分
    position: 'absolute',
    height:'100%',
    width:'100%',
    margin:'auto',
    display:'block',
    backgroundColor: theme.palette.common.black,
    opacity: 0.09,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    marginTop: 150,
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    color: '#582707',
    fontweight: 'bold',
    fontFamily: 'Microsoft JhengHei',
    fontSize:20,

  },
  
}));

export default function ComButton(props) {
  const classes = useStyles();
  
  return (
    // <Grid item xs sm>
      <div >

      {/* {images.map(image => ( */}
      
        <ButtonBase
          focusRipple
          key={props.title}
          className={classes.image}
        >
          <img
                className={classes.imageSrc}
                alt="complex"
                src={props.url}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            {props.value}
            
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {props.title}
            </Typography>

          </span>
        </ButtonBase>
        {/* </Grid> */}
       {/* ))} */}

    </div>
    // </Grid>
  );
}
