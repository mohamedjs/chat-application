import * as types from "./countries.types";

const initState = {
  countries: [],
  countryCode: 0,
  loading: true,
};

const countriesReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default countriesReducer;
