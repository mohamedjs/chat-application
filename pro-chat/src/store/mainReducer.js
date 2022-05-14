import { combineReducers } from "redux";
import authReducer  from "./auth/auth.slice";
import roomReducer  from "./room/room.slice";
import countriesReducer from "./countries/countries.reducer";
import chatReducer from "./chat/chat.slice";

export default combineReducers({
    countries   : countriesReducer,
    auth        : authReducer,
    rooms       : roomReducer,
    chats       : chatReducer
});
