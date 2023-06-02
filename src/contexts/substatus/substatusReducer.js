import {
  GET_SUBSTATUSES,
  CREATE_SUBSTATUS,
  GET_SUBSTATUS,
  DELETE_SUBSTATUS,
  UPDATE_SUBSTATUS,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_SUBSTATUSES:
      return {
        ...state,
        substatuses: action.payload,
        loading: false,
        error: null,
      };
    case GET_SUBSTATUS:
      return {
        ...state,
        substatus: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_SUBSTATUS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_SUBSTATUS:
      state.substatuses = state.substatuses.filter(
        (substatus) => substatus._id.toString() !== action.payload.toString()
      );
      return {
        ...state,
        substatus: null,
        loading: false,
        error: null,
      };
    case UPDATE_SUBSTATUS:
      return {
        ...state,
        substatus: action.payload,
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
        substatus: {},
        substatuses: [],
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
