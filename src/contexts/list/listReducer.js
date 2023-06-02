import {
  GET_LISTS,
  CREATE_LIST,
  GET_LIST,
  DELETE_LIST,
  UPDATE_LIST,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  GET_LIST_BY_STORE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_LIST_BY_STORE:
      return {
        ...state,
        lists: action.payload,
        loading: false,
        error: null,
      };
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload,
        loading: false,
        error: null,
      };
    case GET_LIST:
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_LIST:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_LIST:
      state.lists = state.lists.filter(
        (list) => list._id.toString() !== action.payload.toString()
      );
      return {
        ...state,
        list: null,
        loading: false,
        error: null,
      };
    case UPDATE_LIST:
      return {
        ...state,
        list: action.payload,
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
        list: {},
        lists: [],
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
