import React, { useReducer } from 'react';
import CommentContext from './commentContext';
import CommentReducer from './commentReducer';
import api from '../../api/api';
import AsyncStorage from "@react-native-community/async-storage";
import { 
  GET_COMMENTS_BY_LEAD, 
  CREATE_COMMENT, 
  SET_ERROR, 
  CLEAR_STATE,
  GET_COMMENTS,
  GET_COMMENTS_BY_USER,
  GET_COMMENTS_BY_STORE,
  SET_LOADING,
  GET_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from '../types';

const CommentState = props => {
  const initialState = {
    comments: [],
    comment: {},
    loading: false,
    error: null,
    count: 0
  };

  const [state, dispatch] = useReducer(CommentReducer, initialState);

  //Get Comments
  const getCommentsByLead = async (leadId) => {
    try {
      const res = await api.get(`/leads/${leadId}/comments?sort=-createdAt`);
      dispatch({ type: GET_COMMENTS_BY_LEAD, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error})

    }
  };

  //Create Comment
  const createComment = async (comment, leadId) => {
    console.log('id', leadId)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };

    try {
     
      const res = await api.post(`/leads/${leadId}/comments`, { ...comment }, config);
      
      dispatch({ type: CREATE_COMMENT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error})

    }
  }

  //Create Comment
  const createCommentFromCalendar = async (comment) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };

    try {
     
      const res = await api.post(`/leads/${comment.lead}/comments`, { ...comment, calendar: true }, config);
      
      dispatch({ type: CREATE_COMMENT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  }

  //Update Commment
  const updateComment = async (comment, commentId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.put(`/comments/${commentId}`, {...comment} ,config);
      dispatch({ type: UPDATE_COMMENT, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Gt comments to ListView
  const getCommentsAR = async (data) => {
    setLoading();
    try {
      let res;

      if(data.role === 'rockstar'){
        
        res = await api.get(`/comments?page=${data.page}&searchIndex=store-user&limit=${data.limit}&searchText=${data.query}&searchType=or&validation=1`);
      }else{
        res = await api.get(`/comments?page=${data.page}&store=${data.store}&searchIndex=store-user&limit=${data.limit}&searchText=${data.query}&searchType=or&validation=1`);
      }

      dispatch({ 
        type: GET_COMMENTS, 
        payload: res.data.data,
        count: res.data.pagination.total
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Comments
  const getComments = async () => {
    setLoading();
    try {
      const res = await api.get(`/comments?pending=true`);
      dispatch({ type: GET_COMMENTS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error})
    }
  };

  //Get Comment
  const getComment = async (commentId) => {
    setLoading();
    try {
      const res = await api.get(`/comments/${commentId}`);
      dispatch({ type: GET_COMMENT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Get Comments By User
  const getCommentsByUser = async (userId) => {
    setLoading();
    try {
      const res = await api.get(`users/${userId}/comments?pending=true`);
      dispatch({ type: GET_COMMENTS_BY_USER, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error})

    }
  };

  //Get Comments By Store
  const getCommentsByStore = async (storeId) => {
    setLoading();
    try {
      const res = await api.get(`stores/${storeId}/comments?pending=true`);
      dispatch({ type: GET_COMMENTS_BY_STORE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error})

    }
  };

  //Delete Comment
  const deleteComment = async (commentId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      
      const res = await api.delete(`/comments/${commentId}`, config);
      dispatch({ type: DELETE_COMMENT, payload: res.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <CommentContext.Provider
      value={{
        loading: state.loading,
        comments: state.comments,
        comment: state.comment,
        error: state.error,
        count: state.count,
        getCommentsByStore,
        getCommentsByUser,
        getComments,
        getCommentsByLead,
        createComment,
        clearState,
        getComment,
        deleteComment,
        updateComment,
        createCommentFromCalendar,
        getCommentsAR
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentState;

