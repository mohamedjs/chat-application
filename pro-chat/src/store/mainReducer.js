import { combineReducers } from "redux";
import authReducer  from "./auth/auth.slice";
import countriesReducer from "./countries/countries.reducer";

export default combineReducers({
    countries   : countriesReducer,
    auth        : authReducer
});
