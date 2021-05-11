import { 
  GET_ACTIVITIES, 
  CREATE_ACTIVITY, 
  GET_ACTIVITY, 
  DELETE_ACTIVITY, 
  UPDATE_ACTIVITY, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  GET_ACTIVITIES_BY_USER,
  GET_ACTIVITIES_BY_LEAD,
  GET_ACTIVITIES_AR,
 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_AR:
      return {
        ...state,
        loading: false,
        error: null,
        activities: action.payload
      }
    case GET_ACTIVITIES_BY_USER:
      return {
        ...state,
        activities: action.payload,
        loading: false,
        error: null
      }
    case GET_ACTIVITIES_BY_LEAD:
      return {
        ...state,
        activities: action.payload,
        loading: false,
        error: null
      }
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        loading: false, 
        error: null
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
        loading: false, 
        error: null
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [action.payload, ...state.activities],
        loading: false, 
        error: null
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        activity: null,
        loading: false, 
        error: null
      };
    case UPDATE_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
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
        activity: {},
        activities: [],
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
