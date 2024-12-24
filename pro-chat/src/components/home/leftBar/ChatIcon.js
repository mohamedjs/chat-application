import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {ChatBubble, Dialpad, DriveFileMove, ExitToApp, Home, Phone, Settings} from '@mui/icons-material';
import React from 'react'
import classes from '../../../asset/css/home/leftBar/chat_icon.module.css';

const ChatIcon = () => {
  return (
    <Container className={classes.container_chat_icon}>
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
