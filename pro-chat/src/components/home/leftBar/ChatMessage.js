import { Article, AttachFile, Collections, Image, KeyboardVoice, MoreHoriz, Phone, PhoneInTalk, Search, Send, TagFaces, VideoCameraBack, WifiCalling3 } from '@mui/icons-material'
import { Avatar, Grid, InputAdornment, Paper, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import avater from "../../../asset/img/avater.jpg"
import React, { useState } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import 'emoji-mart/css/emoji-mart.css'
import { Emoji, Picker } from 'emoji-mart'
import { useSelector } from 'react-redux'

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
  const {image} = useSelector(state => state.auth)
  return (
    <>
    <Grid container className={`${classes.container} ${classes.card}`}>
        <Grid className={`${classes.item} ${classes.userName}`} item xs="8">
            Mohamed Mahmoud
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
    <SimpleBar style={{ maxHeight: 548, overflowX: "hidden" }}>
        <div className={classes.leftBox}>
            <Grid container xs="12" className={`${classes.chatBox}`}>
                <Grid item xs="1">
                    <Avatar alt="Remy Sharp" src={avater} />
                </Grid>
                <Grid item xs="3">
                    Mohamed Mahmoud
                </Grid>
                <Grid item xs="1">
                    14:02
                </Grid>
                <Grid className={`${classes.chatDots}`} item xs="6">
                    <MoreHoriz className={classes.iconColor} />
                </Grid>
            </Grid>
            <div className={`${classes.chatMessage}`}>
                السلام عليكم ورحمه الله ازيكم يا جماعه الخير كلكم كويسين
                السلام عليكم ورحمه الله ازيكم يا جماعه الخير كلكم كويسين
                السلام عليكم ورحمه الله ازيكم يا جماعه الخير كلكم كويسين
            </div>

        </div>
        <div className={classes.RightBox}>
            <Grid container xs="12" className={`${classes.chatBox}`}>
                <Grid item xs="1">
                    <Avatar alt="Remy Sharp" src={avater} />
                </Grid>
                <Grid item xs="3">
                    Mohamed Mahmoud
                </Grid>
                <Grid item xs="1">
                    14:02
                </Grid>
                <Grid className={`${classes.chatDots}`} item xs="6">
                    <MoreHoriz className={classes.iconColor} />
                </Grid>
            </Grid>
            <div className={`${classes.chatMessage} ${classes.rightMessage}`}>
            السلام عليكم ورحمه الله ازيكم يا جماعه الخير كلكم كويسين
            السلام عليكم ورحمه الله ازيكم يا جماعه الخير كلكم كويسين
            السلام عليكم ورحمه الله ازيكم يا جماعه الخير كلكم كويسين
            </div>

        </div>
        <div className={classes.leftBox}>
            <Grid container xs="12" className={`${classes.chatBox}`}>
                <Grid item xs="1">
                    <Avatar alt="Remy Sharp" src={avater} />
                </Grid>
                <Grid item xs="3">
                    Mohamed Mahmoud
                </Grid>
                <Grid item xs="1">
                    14:02
                </Grid>
                <Grid className={`${classes.chatDots}`} item xs="6">
                    <MoreHoriz className={classes.iconColor} />
                </Grid>
            </Grid>
            <div className={`${classes.chatMessage}`}>
                hello my mom are you okay when i call you
                hello my mom are you okay when i call you
                hello my mom are you okay when i call you
            </div>

        </div>
        <div className={classes.RightBox}>
            <Grid container xs="12" className={`${classes.chatBox}`}>
                <Grid item xs="1">
                    <Avatar alt="Remy Sharp" src={avater} />
                </Grid>
                <Grid item xs="3">
                    Mohamed Mahmoud
                </Grid>
                <Grid item xs="1">
                    14:02
                </Grid>
                <Grid className={`${classes.chatDots}`} item xs="6">
                    <MoreHoriz className={classes.iconColor} />
                </Grid>
            </Grid>
            <div className={`${classes.chatMessage} ${classes.rightMessage}`}>
                hello my mom are you okay when i call you
                hello my mom are you okay when i call you
                hello my mom are you okay when i call you
            </div>

        </div>
        <div className={classes.leftBox}>
            <Grid container xs="12" className={`${classes.chatBox}`}>
                <Grid item xs="1">
                    <Avatar alt="Remy Sharp" src={avater} />
                </Grid>
                <Grid item xs="3">
                    Mohamed Mahmoud
                </Grid>
                <Grid item xs="1">
                    14:02
                </Grid>
                <Grid className={`${classes.chatDots}`} item xs="6">
                    <MoreHoriz className={classes.iconColor} />
                </Grid>
            </Grid>
            <div className={`${classes.chatMessage}`}>
                hello my mom are you okay when i call you
                hello my mom are you okay when i call you
                hello my mom are you okay when i call you
            </div>

        </div>
        <div className={classes.RightBox}>
            <Grid container xs="12" className={`${classes.chatBox}`}>
                <Grid item xs="1">
                    <Avatar alt="Remy Sharp" src={avater} />
                </Grid>
                <Grid item xs="3">
                    Mohamed Mahmoud
                </Grid>
                <Grid item xs="1">
                    14:02
                </Grid>
                <Grid className={`${classes.chatDots}`} item xs="6">
                    <MoreHoriz className={classes.iconColor} />
                </Grid>
            </Grid>
            <div className={`${classes.chatMessage} ${classes.rightMessage}`}>
                hello my mom are you okay when i call you
                hello my mom are you okay when i call you
                hello my mom are you okay when i call you
            </div>

        </div>
    </SimpleBar>
    <Grid container>
        <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            defaultValue="Your Message..."
            fullWidth
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Avatar alt="Remy Sharp" src={image} />
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
                    <Send className={`${classes.send} ${classes.icon}`} />
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
