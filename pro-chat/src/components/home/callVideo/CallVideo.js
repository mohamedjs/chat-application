
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Container, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, useMediaQuery } from '@mui/material';
import Image from "../../../asset/img/happy.gif";
import mohamed from "../../../asset/img/happy.gif";
import { makeStyles, useTheme } from '@mui/styles';
import { KeyboardVoice, Audiotrack, AudiotrackOutlined, MessageOutlined, PhoneAndroidOutlined, Settings, VideoCall, VideoCallOutlined, Videocam, CallEnd, Cancel, GraphicEq } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenVideoCall } from '../../../store/room/room.slice';
import { acceptCall, rejectCall } from '../../../store/QuickBloxService/QuickBloxQuery';
import { callListener } from '../../../store/QuickBloxService/QuickBloxEvent';
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
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '99%',
        height: '99%'
    },
    dialogAction: {
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translate(-50%, 0)"
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
        backgroundColor: "#000 !important",
        padding: "7px",
        borderRadius: "50% !important",
        boxShadow: "0px 1px 17px #000",
        position: "relative"
    },
    userPadge: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(2),
        cursor: "pointer",
        width: "100px",
        minWidth: "100px",
        height: "100px",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: "50% !important",
        boxShadow: "rgb(238 232 232 / 16%) 0px 1px 4px, rgb(255 249 249) 0px 0px 0px 3px",
        position: "relative"
    },
    icon: {
        fontSize: "24px",
        [theme.breakpoints.up("sm")]: {
            fontSize: "20px",
        },
        color: "white"
    },
    userPadgeIcon: {
        fontSize: "24px",
        position: "absolute",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        bottom: 0,
        right: 0,
        backgroundColor: "blue",
        padding: "4px",
        [theme.breakpoints.up("sm")]: {
            fontSize: "20px",
        },
        color: "white"
    }
}));
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const CallVideo = () => {
    const {openVideoCall, callSession} = useSelector(state => state.rooms)
    const classes = useStyles()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let dispatch = useDispatch()

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
                <Paper style={{ backgroundImage: `url(${mohamed})` }} className={classes.paper} elevation={21} >
                    <Container className={classes.container}>
                        <div className={classes.userPadge} style={{ backgroundImage: `url(${Image})` }}>
                            <GraphicEq className={classes.userPadgeIcon} />
                        </div>
                        <div className={classes.userPadge} style={{ backgroundImage: `url(${Image})` }}>
                            <GraphicEq className={classes.userPadgeIcon} />
                        </div>
                    </Container>
                    <DialogActions className={classes.dialogAction}>
                        <Button className={classes.item}>
                            <KeyboardVoice className={classes.icon} />
                        </Button>
                        <Button className={classes.item}>
                            <Videocam className={classes.icon} />
                        </Button>
                        <Button className={classes.item} sx={{ backgroundColor: "red !important", minWidth: "50px !important" }} onClick={handleClose}>
                            <Cancel className={classes.icon} />
                        </Button>
                        <Button className={classes.item} sx={{ backgroundColor: "green !important", minWidth: "50px !important" }} onClick={handleAccept}>
                            <CallEnd className={classes.icon} />
                        </Button>
                        <Button className={classes.item}>
                            <MessageOutlined className={classes.icon} />
                        </Button>
                        <Button className={classes.item}>
                            <Settings className={classes.icon} />
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        </div>
    );
}

export default CallVideo
