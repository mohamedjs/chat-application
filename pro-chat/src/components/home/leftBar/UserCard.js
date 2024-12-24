import React from 'react'
import { Grid} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomId } from '../../../store/room/room.slice';
import classes from '../../../asset/css/home/leftBar/user_card.module.css';

export const UserCard = ({roomID, index, image, userName, message}) => {
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
                    {message.user.name+': '} {parseInt(message.type) === 1 ? message.message : "image"}
                </p>
            </Grid>
            <Grid className={`${classes.icon} ${classes.time}`}  item xs="3">
                {message.time}
            </Grid>
        </Grid>
    </div>
  )
}
