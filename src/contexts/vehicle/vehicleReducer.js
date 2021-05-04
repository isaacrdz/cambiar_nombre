import {
  GET_VEHICLES,
  GET_VEHICLES_BY_MAKE,
  GET_VEHICLE,
  CREATE_VEHICLE,
  DELETE_VEHICLE,
  UPDATE_VEHICLE,
  GET_VEHICLES_BY_CAT,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_VEHICLES_BY_MAKE:
      return {
        ...state,
        vehicles: action.payload,
        loading: false,
        error: null,
      };
    case GET_VEHICLES_BY_CAT:
      return {
        ...state,
        vehicles: action.payload,
        loading: false,
        error: null,
      };
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
        loading: false,
        error: null,
      };
    case GET_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_VEHICLE:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_VEHICLE:
      return {
        ...state,
        vehicle: null,
        loading: false,
        error: null,
      };
    case UPDATE_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
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
        vehicle: {},
        vehicles: [],
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
