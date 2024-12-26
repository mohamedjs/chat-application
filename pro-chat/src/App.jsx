import Index from "./views";
import Cookie from 'js-cookie'
import Echojs from './Echo.js';
import { addMessageToRoom, setCallData, setCallSession, setOpenVideoCall, setShowAccept } from './store/room/room.slice';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { initQB } from "./store/QuickBloxService/QuickBloxQuery";
import QB from "./store/QuickBloxService/QuickBloxQuery";

function App() {
    let dispatch = useDispatch()
    let user = Cookie.get("user") ? JSON.parse(Cookie.get("user")) : {}
    useEffect(() => {

        console.log(Echojs);
        
        Echojs.private(`message-event.${user.id}`)
            .listen('MessageEvent', (data) => {
                dispatch(addMessageToRoom({ message: data.message, scrollableNodeRef: null }))
            })

        QB.webrtc.onCallListener = function (session, extension) {
            var callData = { callerImage: extension.image, meImage: user.image, name: extension.name }
            dispatch(setCallData(callData))
            dispatch(setCallSession(session))
            dispatch(setOpenVideoCall(true))
            dispatch(setShowAccept(true))
        }
        QB.webrtc.onRejectCallListener = function (session, userId, extension) {
            session.stop(extension);
            dispatch(setOpenVideoCall(false))
        }
        QB.webrtc.onRemoteStreamListener = function (session, userID, remoteStream) {
            session.attachMediaStream("remoteOpponentVideoElementId", remoteStream);
        }

    }, [])



    return (
        <div className="App">
            <Index />
        </div>
    );
}

export default App;
