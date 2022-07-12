import React from 'react'
import { makeStyles } from '@mui/styles'
import Cookie from 'js-cookie'
import { Avatar, Grid } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { TextMessage } from './messageType/TextMessage'
import { FileMessage } from './messageType/FileMessage'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "15px 0px",
        borderBottom: "2px solid #000",
        margin: "0px 12px",
        color: "white"
    },
    chatBox: {
        padding: "15px",
        [theme.breakpoints.down('sm')]: {
            padding: "15px 0px",
        },
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
        textAlign: "left"
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

export const MessageCard= ({message}) => {
    const classes = useStyles()
    let user  = JSON.parse(Cookie.get("user"))
    return (
        <>
            {message.user.id != user.id ? <div className={classes.leftBox}>
                <Grid spacing={.7} container xs="12" className={`${classes.chatBox}`}>
                    <Grid item xs="1.5">
                        <Avatar alt="Remy Sharp" src={message.user.image} />
                    </Grid>
                    <Grid item xs="3.5">
                        {message.user.name}
                    </Grid>
                    <Grid item xs="3">
                        {message.time}
                    </Grid>
                    <Grid className={`${classes.chatDots}`} item xs="3">
                        <MoreHoriz className={classes.iconColor} />
                    </Grid>
                </Grid>
                <div className={`${classes.chatMessage}`}>
                {parseInt(message.type) === 1 ? <TextMessage messages={message.message} />
                                        : <FileMessage messages={message.message} />}
                </div>

            </div> : <div className={classes.RightBox}>
                <Grid spacing={.7} container xs="12" className={`${classes.chatBox}`}>
                    <Grid item xs="1.5">
                        <Avatar alt="Remy Sharp" src={message.user.image} />
                    </Grid>
                    <Grid item xs="3.5" style={{ direction: "ltr" }}>
                        {message.user.name}
                    </Grid>
                    <Grid item xs="3" style={{ direction: "ltr" }}>
                        {message.time}
                    </Grid>
                    <Grid className={`${classes.chatDots}`} item xs="3">
                        <MoreHoriz className={classes.iconColor} />
                    </Grid>
                </Grid>
                <div className={`${classes.chatMessage} ${classes.rightMessage}`}>
                    {parseInt(message.type) === 1 ? <TextMessage messages={message.message} />
                                        : <FileMessage messages={message.message} />}
                </div>

            </div>}

        </>
    )
}
