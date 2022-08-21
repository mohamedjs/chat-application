import React from 'react'
import { makeStyles } from '@mui/styles'
import Cookie from 'js-cookie'
import { Avatar, Grid } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { TextMessage } from './messageType/TextMessage'
import { FileMessage } from './messageType/FileMessage'
import classes from '../../../asset/css/home/leftBar/message_card.module.css'

export const MessageCard= ({message}) => {
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
