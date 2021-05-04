
import { 
    GET_VERSIONS, 
    CREATE_VERSION, 
    GET_VERSION, 
    DELETE_VERSION, 
    UPDATE_VERSION,
    SET_ERROR, 
    CLEAR_STATE, 
    SET_LOADING,
    GET_VERSIONS_BY_MODEL
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_VERSIONS:
    case GET_VERSIONS_BY_MODEL:
      return {
        ...state,
        makes: action.payload,
        loading: false,
        error: null
      };
    case GET_VERSION:
      return {
        ...state,
        make: action.payload,
        loading: false,
        error: null
      };
    case CREATE_VERSION:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_VERSION:
      return {
        ...state,
        make: null,
        loading: false,
        error: null
      };
    case UPDATE_VERSION:
        return {
          ...state,
          make: action.payload,
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
        make: {},
        makes: [],
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
