import { Grid, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avater from "../../../asset/img/avater.jpg"
import { AccountCircle, Bookmark, DisplaySettings, Edit, EditLocationAlt, Email, KeyboardVoice, MoreHoriz, PinOutlined, Search, VoiceChat } from '@mui/icons-material';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { listRoom } from '../../../store/room/room.slice';
import { UserCard } from './UserCard';
import ChatThreadLoader from '../../helpers/ChatThreadLoader';

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
    headTitle: {
        fontSize: "10px",
        fontBold: "bolder"
    },
    bio: {
        fontSize: "8px",
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

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));


const UserMessage = () => {
  const classes = useStyles()
  const {rooms, loading} = useSelector(state => state.rooms)
  const {image} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listRoom())
  },[])
  return (
    <>
    <Grid container className={classes.container} >
        <Grid className={classes.item} item xs="3">
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                >
                <Avatar alt="Remy Sharp" src={image} />
            </StyledBadge>
        </Grid>
        <Grid className={classes.item}  item xs="8">
            <h3 className={`${classes.userInfo} ${classes.headTitle}`}>
                Mohamed Mahmoud
            </h3>
            <p className={`${classes.userInfo} ${classes.bio}`}>
                php developer
            </p>
        </Grid>
        <Grid className={classes.icon}  item xs="1">
            <MoreHoriz className={`${classes.dots}`} />
        </Grid>
    </Grid>
    <Grid container className={classes.container}>
        <Grid className={classes.item} item xs="11">
            Message <span className={classes.messageNumber}>(29)</span>
        </Grid>
        <Grid className={classes.icon} item xs="1">
            <EditLocationAlt />
        </Grid>
    </Grid>
    <Grid container className={classes.container}>
        <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            fullWidth
            InputProps={{
            startAdornment: (
                <InputAdornment className={classes.icon} position="start">
                <Search /> Search
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment className={classes.icon}  position="end">
                <DisplaySettings />
                </InputAdornment>
            ),
            }}
        />
    </Grid>
    <Grid container className={classes.container}>
        <Grid className={classes.item} container xs="11">
            <div className={`${classes.userInfo} ${classes.icon}`}>
                <Bookmark />
            </div>
            <div className={`${classes.userInfo} ${classes.icon}`}> PINNED </div>
        </Grid>
        <Grid className={classes.icon} item xs="1">
            <MoreHoriz className={`${classes.dots}`} />
        </Grid>
    </Grid>
    <SimpleBar style={{ maxHeight: 200, overflowX: "hidden" }}>
        {
         (loading) ? [1,2,3,4].map((list, index) => (<ChatThreadLoader key={index} />))
                   : rooms.map((room, index) => (<UserCard key={index} image={room.avatar} userName={room.name} message={room.lastMessage.message} time={room.lastMessage.time} />))
        }
    </SimpleBar>
    <Grid container className={`${classes.container}`}>
        <Grid className={classes.item} container xs="11">
            <div className={`${classes.userInfo} ${classes.icon}`}>
                <Email />
            </div>
            <div className={`${classes.userInfo} ${classes.icon}`}> ALL MESSAGE </div>
        </Grid>
        <Grid className={classes.icon} item xs="1">
            <MoreHoriz className={`${classes.dots}`} />
        </Grid>
    </Grid>
    <SimpleBar style={{ maxHeight: 200, overflowX: "hidden" }}>
    {
         (loading) ? [1,2,3,4].map((list, index) => (<ChatThreadLoader key={index} />))
                   : rooms.map((room, index) => (<UserCard key={index} image={room.avatar} userName={room.name} message={room.lastMessage.message} time={room.lastMessage.time} />))
    }
    </SimpleBar>
    </>
  )
}

export default UserMessage
