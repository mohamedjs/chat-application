import { Grid, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { AccountCircle, Bookmark, DisplaySettings, Edit, EditLocationAlt, Email, KeyboardVoice, MoreHoriz, PinOutlined, Search, VoiceChat } from '@mui/icons-material';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { listRoom, setRoomId, setSearch } from '../../../store/room/room.slice';
import { UserCard } from './UserCard';
import ChatThreadLoader from '../../helpers/ChatThreadLoader';
import Cookie from 'js-cookie';
import useWindowDimensions from '../../helpers/useWindowDimensions';
import classes from '../../../asset/css/home/leftBar/user_message.module.css'

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
  const {rooms, loading, search} = useSelector(state => state.rooms)
  const {image} = useSelector(state => state.auth)
  const user    = JSON.parse(Cookie.get("user"))
  const { height, width } = useWindowDimensions()

  const dispatch = useDispatch()

  const handleSearchRoom = (event) => {
    dispatch(setSearch(event.target.value))
    dispatch(listRoom(event.target.value))
  }
  useEffect(() => {
    dispatch(listRoom(search))
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
                <Avatar alt={user.name} src={image ? image : user.image} />
            </StyledBadge>
        </Grid>
        <Grid className={classes.item}  item xs="8">
            <h3 className={`${classes.userInfo} ${classes.headTitle}`}>
                {user.name}
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
            value={search}
            onChange = {handleSearchRoom}
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
    <SimpleBar style={{ height: parseInt(height-(height/2))-145, overflowX: "hidden" }}>
        {
         (loading) ? [1,2,3,4].map((list, index) => (<ChatThreadLoader key={index} />))
                   : rooms.map((room, index) => (<UserCard roomID={room.id} key={index} index={index} image={room.user.image} userName={room.user.name} message={room.lastMessage}  />))
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
    <SimpleBar style={{ height: parseInt((height/2))-145, overflowX: "hidden" }}>
    {
         (loading) ? [1,2,3,4].map((list, index) => (<ChatThreadLoader key={index} />))
                   : rooms.map((room, index) => (<UserCard roomID={room.id} key={index} index={index} image={room.user.image} userName={room.user.name} message={room.lastMessage} />))
    }
    </SimpleBar>
    </>
  )
}

export default UserMessage
