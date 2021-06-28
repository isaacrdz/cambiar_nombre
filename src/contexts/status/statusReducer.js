import { 
  GET_STATUSES, 
  GET_STATUS, 
  CREATE_STATUS, 
  DELETE_STATUS, 
  UPDATE_STATUS, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING
 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_STATUSES:
      const order = ['lead', 'appointment', 'visit', 'sold']
      let aux = []
      order.map(o => {
        return action.payload.map(item => {
          if(o === item.name){
            return aux.push(item)
          }
          return false;
        });
         
      })
      return {
        ...state,
        statuses:aux,
        loading: false,
        error: null
      };
    case GET_STATUS:
      return {
        ...state,
        status: action.payload,
        loading: false,
        error: null
      };
    case CREATE_STATUS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case DELETE_STATUS:
      state.statuses = state.statuses.filter( status => status._id.toString() !== action.payload.toString())
      return {
        ...state,
        status: null,
        loading: false,
        error: null
      };
    case UPDATE_STATUS:
        return {
          ...state,
          status: action.payload,
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
        statuses: [],
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
