import React, { useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import Auth from '../components/login';
import Verify from '../components/verify';
import Home from '../components/home';
import { useDispatch, useSelector } from 'react-redux';
import MyAlert from '../components/helpers/MyAlert';
import Echojs from '../Echo.js';
import { openAlert } from '../store/auth/auth.slice';

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
    let next = useSelector(state => state.auth.next)
    let dispatch = useDispatch()

    Echojs.private("sms-channel")
        .listen('SmsEvent', (data) => {
            console.log(data)
            dispatch(openAlert(data))
        })

    return (
        <div className={next === 3 ? classes.rootHome : classes.root}>
            {(next === 1 ? <Auth  /> : (next === 2 ? <Verify  /> : <Home />))}
            <MyAlert />
        </div>

    )
}

export default Chat
