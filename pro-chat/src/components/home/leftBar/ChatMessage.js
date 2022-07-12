import { ArrowBack, Article, AttachFile, Bookmark, EditLocationAlt, Image, KeyboardVoice, MoreHoriz, Phone, PhoneInTalk, Search, Send, TagFaces, VideoCameraBack, WifiCalling3 } from '@mui/icons-material'
import { Avatar, Grid, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState, useEffect, useRef, createRef } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useSelector, useDispatch } from 'react-redux'
import { getRoom, setCallData, setCallSession, setOpenVideoCall, setPage, setShow, loadMessages } from '../../../store/room/room.slice'
import { sendMessageToUser, setFileMessage } from '../../../store/chat/chat.slice'
import { MessageCard } from './MessageCard'
import Cookie from 'js-cookie'
import Echojs from '../../../Echo.js';
import { addMessageToRoom } from '../../../store/room/room.slice';
import useWindowDimensions from '../../helpers/useWindowDimensions'
import { makeCall } from '../../../store/QuickBloxService/QuickBloxQuery';
import QB from '../../../store/QuickBloxService/QuickBlox';
import CallVideo from '../callVideo/CallVideo';
import ReactFileReader from 'react-file-reader';
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
        textAlign: "right"
    },
    icon: {
        display : "inline",
        margin: "0px 2px",
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
        width: "fit-content"
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
  const {fileMessages} = useSelector(state => state.chats)
  const {loadingRoom, roomId, room, show, page, messages} = useSelector(state => state.rooms)
  const { height, width } = useWindowDimensions();
  let fileInput = useRef()
  let dispatch = useDispatch()
  let user = JSON.parse(Cookie.get("user"))

  const handleMessage = (event) => {
    setMessage(event.target.value)
  }
  const sendMessage = () => {
        const messageData = new FormData()
        messageData.append("room_id", roomId)
        messageData.append("type", 1)
        messageData.append("message", message)
        dispatch(sendMessageToUser({data: messageData, scrollableNodeRef: null}))
        setMessage("")
  }
  const sendFileMessage = (files) => {
        const messageData = new FormData()
        messageData.append("room_id", roomId)
        messageData.append("type", 2)
        dispatch(setFileMessage(files.base64));
        for (let i = 0; i < files.fileList.length; i++) {
            messageData.append("message[]", files.fileList[i]);
        }
        dispatch(sendMessageToUser({data: messageData, scrollableNodeRef: null}))
  }

  const callUser = (callType) => {
    var callData = {callerImage: room.user.image, meImage: user.image, name:room.user.name}
    makeCall(room.user.id, user, callType)
    .then((res) => {
        dispatch(setCallData(callData))
        dispatch(setOpenVideoCall(true))
    })
  }

  const onScroll = (e) => {
    const currentScrollY = e.target.scrollTop;
    if (currentScrollY === 0) {
        dispatch(setPage(page+1))
        dispatch(getRoom(roomId))
    }
  };

  useEffect(() => {
      dispatch(setPage(1))
      if(roomId){
          dispatch(getRoom(roomId))
          .then(() => {
            var container = document.getElementById('chatBox');
            container.scrollBy({ top: 500, behavior: "smooth" });
          })
      }
  },[roomId])


  return (
    <>
    <Grid spacing={.5} container className={`${classes.container} ${classes.card}`}>
        <Grid className={`${classes.item}`} item xs={show ? 2 : 0} display={{ xs: show ? "block" : "none", sm: "none", md: "none" }}>
            <div onClick={() => {dispatch(setShow())}} className={classes.icon}>
                <ArrowBack className={classes.iconColor}/>
            </div>
        </Grid>
        <Grid className={`${classes.item} ${classes.userName}`} item xs={show ? 5 : 6}>
            {(loadingRoom)? '' : room.user.name}
            <span className={classes.online}>online</span>
        </Grid>
        <Grid className={`${classes.item} ${classes.chatIcons}`} item xs={show ? 5 : 6}>
            <div className={classes.icon}>
                <VideoCameraBack onClick={() => callUser(true)} className={classes.iconColor}/>
            </div>
            <div className={classes.icon}>
                <PhoneInTalk onClick={() => callUser(false)} className={classes.iconColor}/>
            </div>
            <div className={classes.icon}>
                <Search className={classes.iconColor}/>
            </div>
            <div className={classes.icon}>
                <Bookmark className={classes.iconColor}/>
            </div>
        </Grid>
    </Grid>
    <div onScroll={onScroll} id="chatBox" style={{ height: height-170, overflow: "hidden", transition: "0.3s" }}>
        {(loadingRoom) ?''
                   :messages.map((message, index) => (<MessageCard key={index} message={message} /> ))}
    </div>
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
                    <ReactFileReader fileTypes={["*"]} base64={true} multipleFiles={true} handleFiles={sendFileMessage}>
                    <AttachFile className={classes.icon}  />
                    </ReactFileReader>

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
