import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {ChatBubble, Dialpad, DriveFileMove, ExitToApp, Home, Phone, Settings} from '@mui/icons-material';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(2),
      color: "#fff",
      height: "100vh",
      position: "sticky",
      top: 0,
      color: "#555",
      paddingLeft: "10px !important",
      paddingRight: "0px !important"
    },
    item: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(6),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(3),
      },
      cursor: "pointer",
      width: "24px",
      background: "#000",
      padding: "7px",
      borderRadius: "4px",
      boxShadow: "0px 1px 17px #000",
      position: "relative"
    },
    padgeNumber: {
        top: "-10px",
        right: "-10px",
        padding: "3px 8px",
        position: "absolute",
        background: "#9c27b0",
        borderRadius: "4px",
        color: "white",
        fontSize: "12px",
        fontWeight: "bolder",
    },
    icon: {
      fontSize: "24px",
      [theme.breakpoints.up("sm")]: {
        marginRight: theme.spacing(1),
        fontSize: "20px",
      },
      color: "white"
    },
    logout: {
        bottom: 0,
        position: "absolute"

    },
    active: {
        boxShadow: "0px 1px 17px #ac3dff",
    }
  }));
const ChatIcon = () => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <div className={classes.item}>
        <Dialpad className={classes.icon} />
        <span className={classes.padgeNumber} >1</span>
      </div>
      <div className={classes.item}>
        <Home className={classes.icon} />
      </div>
      <div className={`${classes.item} ${classes.active}`}>
        <ChatBubble className={`${classes.icon}`} />
        <span className={classes.padgeNumber} >1</span>
      </div>
      <div className={classes.item}>
        <Phone className={classes.icon} />
      </div>
      <div className={classes.item}>
        <DriveFileMove className={classes.icon} />
      </div>
      <div className={classes.item}>
        <Settings className={classes.icon} />
      </div>
      <div className={`${classes.item} ${classes.logout}`}>
        <ExitToApp className={`${classes.icon}`} />
      </div>
    </Container>
  )
}

export default ChatIcon
