import { combineReducers } from "redux";
import authReducer  from "./auth/auth.slice";
import roomReducer  from "./room/room.slice";
import countriesReducer from "./countries/countries.reducer";

export default combineReducers({
    countries   : countriesReducer,
    auth        : authReducer,
    rooms       : roomReducer
});
