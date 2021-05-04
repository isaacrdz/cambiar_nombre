
import { 
    GET_MAKES, 
    CREATE_MAKE, 
    GET_MAKE, 
    DELETE_MAKE, 
    UPDATE_MAKE,
    SET_ERROR, 
    CLEAR_STATE, 
    SET_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MAKES:
      return {
        ...state,
        makes: action.payload,
        loading: false,
        error: null
      };
    case GET_MAKE:
      return {
        ...state,
        make: action.payload,
        loading: false,
        error: null
      };
    case CREATE_MAKE:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_MAKE:
      return {
        ...state,
        make: null,
        loading: false,
        error: null
      };
    case UPDATE_MAKE:
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
