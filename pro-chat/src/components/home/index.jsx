import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ChatIcon from './leftBar/ChatIcon';
import ChatMessage from './leftBar/ChatMessage';
import UserMessage from './leftBar/UserMessage';
import Profile from './rightBar/Profile';
import { initQB } from '../../store/QuickBloxService/QuickBloxQuery';
import CallVideo from './callVideo/CallVideo';
import classes from '../../asset/css/home/index.module.css';

const Index = () => {
    const { show } = useSelector(state => state.rooms)
    useEffect(() => {
        initQB()
    }, [])

    return (
        <Grid container spacing={0.3}>
            <Grid item md={3} sm={4} xs={12}>
                <Grid item md={2.5} display={{ xs: "none", sm: "none", md: "none", lg: "none" }}>
                    <ChatIcon />
                </Grid>
                <Grid className={`chatMessage ${classes.userMessage}`} display={{ xs: !show ? "block" : "none", sm: "block", md: "block" }} item xs={12}>
                    <UserMessage />
                </Grid>
            </Grid>
            <Grid className="chatBox" item md={6.5} sm={8} display={{ xs: show ? "block" : "none", sm: "block", md: "block" }}>
                <ChatMessage />
            </Grid>
            <Grid style={{ padding: "10px", background: "#080715", boxShadow: "0px 1px 10px #310141" }}
                item md={2.5} display={{ xs: "none", sm: "none", md: "block" }}>
                <Profile />
            </Grid>
        </Grid>
    )
}

export default Index
