import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { Avatar, Container, DialogActions, Paper, useMediaQuery } from '@mui/material';
import Image from "../../../asset/img/happy.gif";
import mohamed from "../../../asset/img/happy.gif";
import { makeStyles, useTheme } from '@mui/styles';
import { KeyboardVoice, MessageOutlined, Settings, Videocam, CallEnd, Cancel, GraphicEq, CallReceived, Call } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenVideoCall } from '../../../store/room/room.slice';
import { acceptCall, rejectCall } from '../../../store/QuickBloxService/QuickBloxQuery';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        color: "#fff",
        position: "absolute",
        top: 0,
        right: 0,
        width: "auto !important",
        paddingLeft: "0px !important",
        paddingRight: "10px !important"
    },
    paper: {
        color: "rgba(0, 0, 0, 0.87)",
        borderRadius: "4px",
        width: '99%',
        height: '99%',
        backgroundColor: "#070511"
    },
    dialogAction: {
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
        bottom: "15px",
        left: "50%",
        transform: "translate(-50%, 0)",
        zIndex: "9999999"
    },
    item: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(6),
        [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(3),
        },
        cursor: "pointer",
        width: "50px",
        minWidth: "50px !important",
        height: "50px",
        backgroundColor: "#ffffff1a !important",
        padding: "7px",
        borderRadius: "50% !important",
        boxShadow: "0px 1px 17px #000",
        position: "relative"
    },
    userPadge: {
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
        bottom: "50%",
        left: "50%",
        transform: "translate(-50%, 0)",
        zIndex: "9999999"
    },
    icon: {
        fontSize: "24px",
        [theme.breakpoints.up("sm")]: {
            fontSize: "20px",
        },
        color: "white"
    },
    userPadgeName: {
        fontSize: "18px",
        fontWeight: "300",
        fontFamily: "cursive",
        color: "white"
    }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const CallVideo = () => {
    const { openVideoCall, callSession, callData } = useSelector(state => state.rooms)
    const classes = useStyles()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let dispatch = useDispatch()
    console.log(callData);
    const handleClose = () => {
        dispatch(setOpenVideoCall(false));
        rejectCall(callSession)
    };
    const handleAccept = () => {
        console.log("ok");
        acceptCall(callSession)
    };
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={openVideoCall}
                TransitionComponent={Transition}
            >
                <video id="remoteOpponentVideoElementId" className={classes.paper}>
                </video>
                <DialogActions className={classes.dialogAction}>
                    <Button className={classes.item}>
                        <Videocam className={classes.icon} />
                    </Button>
                    <Button className={classes.item} sx={{ backgroundColor: "#8e1c1c !important", minWidth: "50px !important" }} onClick={handleClose}>
                        <CallEnd className={classes.icon} />
                    </Button>
                    <Button className={classes.item} sx={{ backgroundColor: "#225b00 !important", minWidth: "50px !important" }} onClick={handleAccept}>
                        <Call className={classes.icon} />
                    </Button>
                    <Button className={classes.item}>
                        <KeyboardVoice className={classes.icon} />
                    </Button>
                </DialogActions>
                <div className={classes.userPadge}>
                    <Avatar alt={callData.name} src={ callData.callerImage } sx={{ width: 130, height: 130 }} />
                    <h3 className={classes.userPadgeName}>{callData.name}</h3>
                    <p className={classes.userPadgeName} style={{ color: "#4a4a4a" }}>ringing... </p>
                </div>
            </Dialog>
        </div>
    );
}

export default CallVideo
