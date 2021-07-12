import { 
  GET_STORES, 
  CREATE_STORE, 
  GET_STORE, 
  DELETE_STORE, 
  UPDATE_STORE, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  GET_STORES_BY_MAKE
 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_STORES:
      return {
        ...state,
        stores: action.payload,
        loading: false
      };
    case GET_STORES_BY_MAKE:
      return {
        ...state,
        stores: action.payload,
        loading: false
      }
    case GET_STORE:
      return {
        ...state,
        store: action.payload,
        loading: false
      };
    case CREATE_STORE:
      return {
        ...state,
        loading: false
      };
    case DELETE_STORE:
      state.stores = state.stores.filter( store => store._id.toString() !== action.payload.toString())
      return {
        ...state,
        store: null,
        loading: false
      }
    case UPDATE_STORE:
      return {
        ...state,
        store: action.payload,
        loading: false
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CLEAR_STATE:
      return {
        store: {},
        stores: [],
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
