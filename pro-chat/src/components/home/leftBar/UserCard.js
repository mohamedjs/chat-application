import React from 'react'
import { Grid} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(2)
    },
    item: {
        color: "white",
        fontWeight: "bolder"
    },
    userInfo: {
        display : "flex",
        margin: 0,
        padding: 0
    },
    messageNumber: {
        color: "#9c27b0"
    },
    icon: {
        color:"#3b3b3b !important"
    },
    userName: {
        fontSize: "13px",
        fontWeight: "500"
    },
    message: {
        fontSize: "9px",
        color: "#8e68b4",
        fontWeight: "500"
    },
    time: {
        fontSize: "12px !important",
    },
    userMessage: {
        borderBottom: "1px solid #000",
        padding: "0px 10px 10px 10px",
    },
    userMessageActive: {
        background: "#000",
        boxShadow: "0px 1px 12px #000",
        padding: "8px 10px 10px 10px",
        borderRadius: "6px",
    }
}))

export const UserCard = ({image, userName, message, time}) => {
  const classes = useStyles()
  console.log(image, userName);
  return (
    <>
        <Grid container className={`${classes.container} ${classes.userMessage} ${classes.userMessageActive}`} >
            <Grid className={classes.item} item xs="3">
                    <Avatar alt={userName} src={image} />
            </Grid>
            <Grid className={classes.item}  item xs="8">
                <h3 className={`${classes.userInfo} ${classes.userName}`}>
                    {userName}
                </h3>
                <p className={`${classes.userInfo} ${classes.message}`}>
                    {message}
                </p>
            </Grid>
            <Grid className={`${classes.icon} ${classes.time}`}  item xs="1">
                {time}
            </Grid>
        </Grid>
    </>
  )
}
