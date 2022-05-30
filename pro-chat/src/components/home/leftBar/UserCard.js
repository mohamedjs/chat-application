import React from 'react'
import { Grid} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomId } from '../../../store/room/room.slice';
const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(2),
        cursor : "pointer"
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

export const UserCard = ({roomID, index, image, userName, message, user_name, time}) => {
  const classes = useStyles()
  const {roomId} = useSelector(state => state.rooms)
  let dispatch = useDispatch()

  return (
    <div onClick={() => dispatch(setRoomId(roomID))}>
        <Grid spacing={.5} container className={`${classes.container} ${classes.userMessage} ${roomID === roomId ? classes.userMessageActive: ''}`} >
            <Grid className={classes.item} item xs="3">
                    <Avatar alt={userName} src={image} />
            </Grid>
            <Grid className={classes.item}  item xs="6">
                <h3 className={`${classes.userInfo} ${classes.userName}`}>
                    {userName}
                </h3>
                <p className={`${classes.userInfo} ${classes.message}`}>
                    {user_name+': '} {message}
                </p>
            </Grid>
            <Grid className={`${classes.icon} ${classes.time}`}  item xs="3">
                {time}
            </Grid>
        </Grid>
    </div>
  )
}
