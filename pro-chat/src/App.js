import Index from "./views";
import Cookie from 'js-cookie'
import Echojs from './Echo.js';
import { addMessageToRoom } from './store/room/room.slice';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";

function App() {
    let dispatch = useDispatch()
    let user = Cookie.get("user") ? JSON.parse(Cookie.get("user")) : {}
    useEffect(() => {
        Echojs.private(`message-event.${user.id}`)
        .listen('MessageEvent', (data) => {
            console.log("ok");
            dispatch(addMessageToRoom({message: data.message, scrollableNodeRef: null}))
            })
    }, [])


    return (
        <div className = "App">
            <Index />
        </div>
    );
}

export default App;
