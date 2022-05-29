import { Bookmark, Description, Folder, Image, KeyboardArrowDownSharp, KeyboardArrowLeftSharp, KeyboardArrowRight, MoreHoriz, OndemandVideo, Settings, Star, VideocamSharp } from '@mui/icons-material'
import { Avatar, Grid, Paper, Box, AvatarGroup, ImageList, ImageListItem, List, ListItem, ListItemAvatar, ListItemText, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import logoImg from "../../../asset/img/logo.png"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useSelector } from 'react-redux'
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    container: {
        color: "white",
        padding: "0",
        fontSize: "19px",
    },
    img:{
        width: "70%"
    },
    userLogo: {
        width: "100%",
        maxWidth: "25.5rem",
        margin: "0 auto",
        textAlign: "center",
        width: "100px !important",
        height: "100px !important",
        boxShadow: "0px 0px 25px #000",
        borderRadius: "50% !important"
    },
    userName: {
        width: "100%",
        maxWidth: "25.5rem",
        margin: "0 auto",
        textAlign: "center",
        color: "white"
    },
    item: {
        color: "white",
        fontWeight: "bolder"
    },
    userInfo: {
        display : "flex",
        margin: 0,
        padding: 0,
        fontSize: "17px",
    },
    list:{
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'transparent',
        color: "white"
    },
    ListItemAvatar: {
        color: "#2594fb !important",
        background: "#1b2f4a !important",
        borderRadius: "8px !important",
        boxShadow: "0px 0px 15px #1b2f4a"
    },
    ListItemArrow: {
        color: "white",
        background: "#3b3b3b  !important",
        borderRadius: "50% !important",
        boxShadow: "0px 0px 15px #000"
    }
}))

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
];

const Profile = () => {
  const classes = useStyles()
  const {image} = useSelector(state => state.auth)
  const user    = JSON.parse(Cookie.get("user"))
  return (
    <>
        <Grid container className={`${classes.container}`}>
                <Grid item xs="2">
                    <img src={logoImg} className={classes.img} alt="" />
                </Grid>
                <Grid item xs="8">
                    Chat Details
                </Grid>
                <Grid style={{ textAlign: "right" }} item xs="2">
                    <Settings  style={{ textAlign: "right" }} />
                </Grid>
        </Grid>
        <Grid container>
            <Avatar className={classes.userLogo} alt={user.name} src={image ? image: user.image} />
        </Grid>
        <div className={classes.userName}>
            <h3 style={{ margin: "11px 0px 0px 0px" }}>
                {user.name}
            </h3>
            <p style={{ margin: "0" }}>
                @moamedlara
            </p>
        </div>
        <Grid container className={classes.container} style={{ paddingBottom: "0" }}>
            <Grid className={classes.item} container xs="11">
                <div className={`${classes.userInfo} ${classes.icon}`}>
                    <Image />
                </div>
                <div className={`${classes.userInfo} ${classes.icon}`}> Media 10</div>
            </Grid>
            <Grid className={classes.icon} item xs="1">
                <KeyboardArrowDownSharp className={`${classes.dots}`} />
            </Grid>
        </Grid>
        <Grid container xs="12">
        <SimpleBar style={{ width: 500, height: 200, overflowX: "hidden" }}>
            <ImageList variant="masonry" cols={3} gap={2}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                        <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                        />
                </ImageListItem>
            ))}
            </ImageList>
        </SimpleBar>
        </Grid>
        <Grid container className={classes.container} style={{ paddingBottom: "0", paddingTop: "5px" }}>
            <Grid className={classes.item} container xs="11">
                <div className={`${classes.userInfo} ${classes.icon}`}>
                    <Star />
                </div>
                <div className={`${classes.userInfo} ${classes.icon}`}> File Type 350</div>
            </Grid>
            <Grid className={classes.icon} item xs="1">
                <MoreHoriz className={`${classes.dots}`} />
            </Grid>
        </Grid>
        <Grid container>
            <List className={classes.list}>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <KeyboardArrowRight className={classes.ListItemArrow}/>
                    </IconButton>
                }
                >
                <ListItemAvatar>
                <Avatar className={classes.ListItemAvatar}>
                    <Description />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Documents" secondary="120 Files. 128m" />
            </ListItem>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <KeyboardArrowRight className={classes.ListItemArrow}/>
                    </IconButton>
                }
                >
                <ListItemAvatar>
                <Avatar className={classes.ListItemAvatar}>
                    <Image />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="2044 Images. 250m" />
            </ListItem>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <KeyboardArrowRight className={classes.ListItemArrow}/>
                    </IconButton>
                }
                >
                <ListItemAvatar>
                <Avatar className={classes.ListItemAvatar}>
                    <OndemandVideo />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Videos" secondary="24 Videos. 2GB" />
            </ListItem>
            </List>
        </Grid>
    </>
  )
}

export default Profile
