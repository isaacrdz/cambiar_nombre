import { 
  GET_DOCUMENTS, 
  CREATE_DOCUMENT, 
  GET_DOCUMENT, 
  DELETE_DOCUMENT, 
  UPDATE_DOCUMENT, 
  SET_ERROR,
  GET_DOCUMENTS_BY_STORE,
  CLEAR_STATE,
  SET_LOADING,
  GET_DOCUMENTS_BY_LEAD,
 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DOCUMENTS_BY_LEAD:
    case GET_DOCUMENTS_BY_STORE: 
      return {
        ...state,
        documents: action.payload,
        loading: false,
        error: null
      }
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
        loading: false,
        error: null

      };
    case GET_DOCUMENT:
      return {
        ...state,
        document: action.payload,
        loading: false,
        error: null

      };
    case CREATE_DOCUMENT:
      return {
        ...state,
        documents: [action.payload, ...state.documents],
        loading: false,
        error: null

      };
    case DELETE_DOCUMENT:
      state.documents = state.documents.filter(document => document._id.toString() !== action.payload.toString())
      return {
        ...state,
        document: null,
        loading: false,
        error: null

      }
    case UPDATE_DOCUMENT:
      return {
        ...state,
        document: action.payload,
        loading: false,
        error: null

      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        
      }
    case CLEAR_STATE:
      return {
        document: {},
        documents: [],
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
