import {
  GET_COMPANIES,
  CREATE_COMPANY,
  GET_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
        loading: false,
        error: null
      };
    case GET_COMPANY:
      return {
        ...state,
        company: action.payload,
        loading: false,
        error: null
      };
    case CREATE_COMPANY:
      return {
        ...state,
        companies: [action.payload, ...state.companies],
        loading: false,
        error: null
      };
    case DELETE_COMPANY:
      state.companies = state.companies.filter( company => company._id.toString() !== action.payload.toString())
      return {
        ...state,
        company: null,
        loading: false,
        error: null
      };
    case UPDATE_COMPANY:
      return {
        ...state,
        company: action.payload,
        loading: false,
        error: null
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_STATE:
      return {
        company: {},
        companies: [],
        loading: false,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
