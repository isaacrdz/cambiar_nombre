import { 
  CREATE_MAIL, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  CREATE_MAIL_ATTACHMENT
 } from '../types';

export default (state, action) => {
  switch (action.type) {
   
    case CREATE_MAIL_ATTACHMENT:
      return {
        ...state,
        mail: null,
        loading: false,
        error: null
      }
    case CREATE_MAIL:
      return {
        ...state,
        mails: [action.payload, ...state.mails],
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
        mail: {},
        mails: [],
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
