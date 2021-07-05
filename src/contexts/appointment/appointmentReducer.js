import { 
  GET_APPOINTMENTS, 
  CREATE_APPOINTMENT, 
  GET_APPOINTMENT, 
  DELETE_APPOINTMENT, 
  UPDATE_APPOINTMENT, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  GET_APPOINTMENTS_BY_USER,
  GET_APPOINTMENTS_BY_STORE,
  GET_APPOINTMENTS_AR
 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS_AR:
      return {
        ...state,
        loading: false,
        error: null,
        appointments: action.payload
      }
    case GET_APPOINTMENTS_BY_USER:
      return {
        ...state,
        appointments: action.payload,
        loading: false,
        error: null
      }
    case GET_APPOINTMENTS_BY_STORE:
      return {
        ...state,
        appointments: action.payload,
        loading: false,
        error: null
      }
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
        loading: false, 
        error: null
      };
    case GET_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload,
        loading: false, 
        error: null
      };
    case CREATE_APPOINTMENT:
      return {
        ...state,
        appointments: [action.payload, ...state.appointments],
        loading: false, 
        error: null
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointment: null,
        loading: false, 
        error: null
      };
    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload,
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
        appointment: {},
        appointments: [],
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
