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
import { setOpenVideoCall, setShowAccept } from '../../../store/room/room.slice';
import { acceptCall, rejectCall } from '../../../store/QuickBloxService/QuickBloxQuery';
import classes from '../../../asset/css/home/callVideo/call_video.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const CallVideo = () => {
    const { openVideoCall, callSession, callData, showAccept } = useSelector(state => state.rooms)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setOpenVideoCall(false));
        rejectCall(callSession)
    };
    const handleAccept = () => {
        acceptCall(callSession)
        dispatch(setShowAccept(false))
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
                    <Button className={classes.item} sx={{ backgroundColor: "#225b00 !important", minWidth: "50px !important", display: showAccept? "block" : "none" }} onClick={handleAccept}>
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
