import { 
  GET_USERS, 
  GET_AGENTS, 
  GET_USER, 
  UPDATE_USER, 
  DELETE_USER, 
  CREATE_USER, 
  SET_ERROR,
  SET_LOADING,
  CLEAR_STATE,
  GET_USERS_BY_STORE,
  SET_AGENT
 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_AGENT: 
    return {
      ...state,
      agents: [action.payload],
      loading: false,
      error: null
    }
    case GET_AGENTS: 
    return {
      ...state,
      agents: action.payload,
      loading: false,
      error: null
    }
    case GET_USERS_BY_STORE:
      return {
        ...state,
        users: action.payload,
        count: action.count,
        loading: false,
        error: null
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        count: action.count,
        error: null
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        error: null
      };
    
    case DELETE_USER:
      state.users = state.users.filter( user => user._id.toString() !== action.payload.toString())
      return {
        ...state,
        user: null,
        loading: false,
        error: null
      };
    case CREATE_USER:
      return {
        ...state,
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
        user: {},
        users: [],
        loading: false,
        error: null,
        agents: []
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
