import {
  GET_LEADS,
  GET_LEAD,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
} from "../types";
import _ from "lodash";

export default (state, action) => {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: [...state.leads, ...action.payload],
        loading: false,
        error: null,
      };

    case GET_LEAD:
      return {
        ...state,
        lead: action.payload,
        loading: false,
        error: null,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_STATE:
      return {
        lead: {},
        leads: [],
        chart: [],
        loading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
