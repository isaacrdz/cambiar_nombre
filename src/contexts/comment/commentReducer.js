import { 
  GET_COMMENTS_BY_LEAD, 
  CREATE_COMMENT, 
  SET_ERROR, 
  CLEAR_STATE,
  GET_COMMENTS,
  GET_COMMENTS_BY_USER,
  GET_COMMENTS_BY_STORE,
  SET_LOADING,
  GET_COMMENT
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COMMENT: 
      return {
        ...state,
        loading: false,
        comment: action.payload
      }
    case GET_COMMENTS: 
    return {
      ...state,
      comments: action.payload,
      count: action.count,
      loading: false,
      error: null
    }
    case GET_COMMENTS_BY_USER:
    case GET_COMMENTS_BY_STORE:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: null
      }
    case GET_COMMENTS_BY_LEAD:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: null

      };
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        loading: false
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CLEAR_STATE:
      return {
        ...state,
        comments: [],
        comment: {},
        error: null,
        loading: false
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
