import Index from "./views";
import Cookie from 'js-cookie'
import Echojs from './Echo.js';
import { addMessageToRoom, setCallSession, setOpenVideoCall } from './store/room/room.slice';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { initQB } from "./store/QuickBloxService/QuickBloxQuery";
import QB from "./store/QuickBloxService/QuickBloxQuery";
import { callListener, rejectCallListener } from "./store/QuickBloxService/QuickBloxEvent";
function App() {
    let dispatch = useDispatch()
    let user = Cookie.get("user") ? JSON.parse(Cookie.get("user")) : {}
    useEffect(() => {
        Echojs.private(`message-event.${user.id}`)
        .listen('MessageEvent', (data) => {
            dispatch(addMessageToRoom({message: data.message, scrollableNodeRef: null}))
        })
        if(QB.webrtc) {
            QB.webrtc.onCallListener = function(session, extension) {
                dispatch(setCallSession(session))
                dispatch(setOpenVideoCall(true))
            }
            QB.webrtc.onRejectCallListener = function(session, userId, extension) {
                session.stop(extension);
                dispatch(setOpenVideoCall(false))
            }
            QB.webrtc.onRemoteStreamListener = function(session, userID, remoteStream) {
                console.log("ok");
            }
        }
    }, [])



    return (
        <div className = "App">
            <Index />
        </div>
    );
}

export default App;
