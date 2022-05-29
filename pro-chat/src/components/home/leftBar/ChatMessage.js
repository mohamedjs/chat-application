import { Article, AttachFile, Image, KeyboardVoice, MoreHoriz, Phone, PhoneInTalk, Search, Send, TagFaces, VideoCameraBack, WifiCalling3 } from '@mui/icons-material'
import { Avatar, Grid, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState, useEffect, useRef, createRef } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useSelector, useDispatch } from 'react-redux'
import { getRoom } from '../../../store/room/room.slice'
import { sendMessageToUser } from '../../../store/chat/chat.slice'
import { MessageCard } from './MessageCard'
import Cookie from 'js-cookie'
import Echojs from '../../../Echo.js';
import { addMessageToRoom } from '../../../store/room/room.slice';
import useWindowDimensions from '../../helpers/useWindowDimensions'
const useStyles = makeStyles((theme) => ({
    container: {
        padding: "15px 0px",
        borderBottom: "2px solid #000",
        margin: "0px 12px",
        color: "white"
    },
    chatBox: {
        padding: "15px",
        color: "white"
    },
    card: {
        marginBottom: theme.spacing(2)
    },
    item: {

    },
    chatIcons: {
        textAlign: "center"
    },
    icon: {
        display : "inline",
        margin: "0px 10px",
        padding: 0,
        color: "#7d7d7d",
        cursor: "pointer"
    },
    dots: {
        textAlign: "right",
        color: "#7d7d7d",
    },
    online: {
        color: "#008bc2",
    },
    chatDots: {
        textAlign: "center"
    },
    chatMessage: {
        margin: "-16px 54px 0px 54px",
        padding: "12px",
        fontSize: "14px",
        maxWidth: "400px",
        fontWeight: "500",
        lineHeight: "1.5",
        borderRadius: "0px 20px 20px 20px",
        backgroundColor: "#000",
        color: "white",
        boxShadow: "0px 1px 7px 0px #000",
    },
    emojiBox: {
        padding: "7px 60px"
    },
    emoji: {
        marginRight: "10px",
        background: "#9c27b0",
        padding: "5px",
        borderRadius: "24px",
        fontSize: "10px",
        fontWeight: "500",
        color: 'white',
    },
    RightBox: {
        direction: "rtl",
        textAlign: "right"
    },
    rightMessage: {
        borderRadius: "20px 0px 20px 20px",
        backgroundColor: "#831249",
    },
    userName: {
        display: "grid"
    },
    send: {
        color: "#21ca73",
        borderLeft: "1px solid #eee",
        padding: "7px",
        margin: "0"
    }
}))
const CUSTOM_EMOJIS = [
    {
      name: 'Octocat',
      short_names: ['octocat'],
      keywords: ['github'],
      imageUrl: 'https://github.githubassets.com/images/icons/emoji/octocat.png',
    },
    {
      name: 'Squirrel',
      short_names: ['shipit', 'squirrel'],
      keywords: ['github'],
      imageUrl: 'https://github.githubassets.com/images/icons/emoji/shipit.png',
    },
]
const ChatMessage = () => {
  const classes = useStyles()
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("Your Message...");
  const {image} = useSelector(state => state.auth)
  const {loadingRoom, roomId, room} = useSelector(state => state.rooms)
  const { height, width } = useWindowDimensions();
  let scrollableNodeRef = useRef();
  let dispatch = useDispatch()
  let user = JSON.parse(Cookie.get("user"))

  Echojs.private(`message-event.${user.id}`)
  .listen('MessageEvent', (data) => {
      dispatch(addMessageToRoom({message: data.message, scrollableNodeRef: null}))
    })

  const handleMessage = (event) => {
    setMessage(event.target.value)
  }
  const sendMessage = () => {
      let messageData = {room_id: roomId, message: message, type: 1}
      dispatch(sendMessageToUser({data: messageData, scrollableNodeRef: scrollableNodeRef}))
      setMessage("")
  }

  useEffect(() => {
      if(roomId){
          dispatch(getRoom(roomId))
          .then(() => {
            var scrollEl = scrollableNodeRef.current?.getScrollElement()
            scrollEl.scrollTo({top: scrollEl.scrollHeight, behavior: 'smooth'})
          })
        //   scrollEl.addEventListener('scroll', function(){
        //   })
      }

  },[roomId])


  return (
    <>
    <Grid container className={`${classes.container} ${classes.card}`}>
        <Grid className={`${classes.item} ${classes.userName}`} item xs="8">
            {(loadingRoom)? '' : room.user.name}
            <span className={classes.online}>online</span>
        </Grid>
        <Grid className={`${classes.item} ${classes.chatIcons}`} item xs="4">
            <div className={classes.icon}>
                <VideoCameraBack className={classes.iconColor}/>
            </div>
            <div className={classes.icon}>
                <PhoneInTalk className={classes.iconColor}/>
            </div>
            <div className={classes.icon}>
                <Search className={classes.iconColor}/>
            </div>
            <div className={classes.icon}>
                <Image className={classes.iconColor}/>
            </div>
            <div className={classes.icon}>
                <Article className={classes.iconColor}/>
            </div>
        </Grid>
    </Grid>
    <SimpleBar  ref={ scrollableNodeRef } style={{ height: height-160, overflowX: "hidden" }}>
        {(loadingRoom) ?''
                   :room.messages.map((message, index) => (<MessageCard key={index} message={message} /> ))}
    </SimpleBar>
    <Grid style={{ marginTop: "16px" }} container>
        <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            value={message}
            onChange = {handleMessage}
            fullWidth
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Avatar alt="Remy Sharp" src={image? image : user.image} />
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment  position="end">
                    <TagFaces
                    className={classes.icon}
                    onClick={e => {
                        setActive(!active);
                    }}
                    />
                    <KeyboardVoice className={classes.icon} />
                    <AttachFile className={classes.icon} />
                    <Send className={`${classes.send} ${classes.icon}`} onClick={sendMessage}/>
                    <Picker custom={CUSTOM_EMOJIS} theme="dark" set={'apple'} style={{position: 'absolute', bottom: '55px', right: '20px', zIndex: "9999", display: active? "block": "none"}} />
                </InputAdornment>
            ),
            }}
        />
    </Grid>
    </>
  )
}

export default ChatMessage
