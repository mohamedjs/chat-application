import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useDispatch } from 'react-redux';
import { getChatData } from '../../store/home/home.action';
import ChatIcon from './leftBar/ChatIcon';
import ChatMessage from './leftBar/ChatMessage';
import UserMessage from './leftBar/UserMessage';
import Profile from './rightBar/Profile';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 1rem 1rem",
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: "#141318"
    },
    userMessage: {
        padding: "15px",
        background:" #080715",
        boxShadow: "0px 1px 10px #310141",
    }
}));
const Index = () => {
  const classes = useStyles()
  let dispatch = useDispatch()

  dispatch(getChatData())
  .then(res => console.log(res))

  return (
    <Grid container spacing={0.3}>
        <Grid item md={3} sm={4} xs={12}>
            <Grid item md={2.5} display={{ xs: "none", sm: "none", md:"none", lg: "none" }}>
                <ChatIcon />
            </Grid>
            <Grid className={classes.userMessage} item xs={12}>
                <UserMessage />
            </Grid>
        </Grid>
        <Grid item md={6.5} sm={8} display={{ xs: "none", sm: "block", md:"block"}}>
            <ChatMessage />
        </Grid>
        <Grid style={{ padding: "10px", background: "#080715", boxShadow: "0px 1px 10px #310141" }}
         item md={2.5} display={{ xs: "none", sm: "none", md:"block" }}>
            <Profile />
        </Grid>
    </Grid>
  )
}

export default Index
