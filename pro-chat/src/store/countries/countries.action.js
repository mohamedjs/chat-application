import axios from "axios"
import * as types from "./countries.types"

const getCountries = (countries) => ({
    type: types.GET_COUNTRIES,
    payload: countries
})


export const loadCountries = () => {
    return (dispatch) => {
        axios.get("https://restcountries.com/v3.1/all")
        .then((res) => {
            dispatch(getCountries(res.data))
            localStorage.setItem('countries', JSON.stringify(res.data))
        })
        .catch((err) => {
            console.log(err);
        })
    };
}
