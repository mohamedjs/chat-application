import React, { useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import Auth from '../components/login';
import Verify from '../components/verify';
import Home from '../components/home';
import Profile from '../components/profile';
import { useDispatch, useSelector } from 'react-redux';
import MyAlert from '../components/helpers/MyAlert';
import Echojs from '../Echo.js';
import { openAlert } from '../store/auth/auth.slice';
import Cookie from 'js-cookie'
import { addMessageToRoom } from '../store/room/room.slice';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "25.5rem",
        margin: "0 auto",
        padding: "2rem 1rem 1rem",
        textAlign: "center"
    },
    rootHome: {
        width: "100%",
    }
}))

const Chat = () => {
    const classes = useStyles()
    let selectorNext = useSelector(state => state.auth.next)
    let next = Cookie.get('next') ? parseInt(Cookie.get('next')) : selectorNext
    let dispatch = useDispatch()

    Echojs.private("sms-channel")
        .listen('SmsEvent', (data) => {
            dispatch(openAlert(data))
    })

    return (
        <div className={next === 4 ? classes.rootHome : classes.root}>
            {(next === 1 ? <Auth  /> : (next === 2 ? <Verify  /> : (next === 3 ? <Profile /> : <Home />)))}
            <MyAlert />
        </div>

    )
}

export default Chat
