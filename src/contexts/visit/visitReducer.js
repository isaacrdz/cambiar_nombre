import { 
  GET_VISITS, 
  CREATE_VISIT, 
  GET_VISIT, 
  DELETE_VISIT, 
  UPDATE_VISIT, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING
 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_VISITS:
      return {
        ...state,
        visits: action.payload,
        loading: false, 
        error: null
      };
    case GET_VISIT:
      return {
        ...state,
        visit: action.payload,
        loading: false, 
        error: null
      };
    case CREATE_VISIT:
      return {
        ...state,
        loading: false, 
        error: null
      };
    case DELETE_VISIT:
      state.visits = state.visits.filter( visit => visit._id.toString() !== action.payload.toString())
      return {
        ...state,
        visit: null,
        loading: false, 
        error: null
      };
    case UPDATE_VISIT:
      return {
        ...state,
        visit: action.payload,
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
