import { 
  GET_SOURCES, 
  CREATE_SOURCE, 
  GET_SOURCE, 
  DELETE_SOURCE, 
  UPDATE_SOURCE, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING
 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_SOURCES:
      return {
        ...state,
        sources: action.payload,
        loading: false, 
        error: null
      };
    case GET_SOURCE:
      return {
        ...state,
        source: action.payload,
        loading: false, 
        error: null
      };
    case CREATE_SOURCE:
      return {
        ...state,
        loading: false, 
        error: null
      };
    case DELETE_SOURCE:
      state.sources = state.sources.filter( source => source._id.toString() !== action.payload.toString())
      return {
        ...state,
        source: null,
        loading: false, 
        error: null
      };
    case UPDATE_SOURCE:
      return {
        ...state,
        source: action.payload,
        loading: false, 
        error: null
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CLEAR_STATE:
      return {
        loading: false,
        error: null
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
        }
    default:
      return state;
  }
};
