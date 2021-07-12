import React, { useReducer } from 'react';
import ListContext from './listContext';
import ListReducer from './listReducer';
import AsyncStorage from "@react-native-community/async-storage";
import api from '../../api/api';
import { 
  GET_LISTS, 
  CREATE_LIST, 
  GET_LIST, 
  DELETE_LIST, 
  UPDATE_LIST, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING,
  GET_LIST_BY_STORE
} from '../types';

const ListState = props => {
  const initialState = {
    lists: [],
    list: {},
    loading: false,
    error: null,
    count: null,

  };

  const [state, dispatch] = useReducer(ListReducer, initialState);

  const AdvancedResults = async (pagination, query) => {
    setLoading();
    try {
      
      const res = await api.get(
        `/lists?page=${pagination.page}&limit=${pagination.limit}${query}&searchType=and`
      );
      dispatch({
        type: GET_LISTS,
        payload: res.data.data,
        count: res.data.pagination.total
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Lists
  const getLists = async () => {
    setLoading();
    try {
      const res = await api.get(`/lists`);

      dispatch({ 
        type: GET_LISTS, 
        payload: res.data.data,
        count: res.data.pagination.total
       });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

   //Get List
   const getList = async (listId) => {
    clearState();
    setLoading();
    try {
      const res = await api.get(`/lists/${listId}`);
      dispatch({ type: GET_LIST, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  const getListsByStore = async (storeId) =>{
    clearState();
    setLoading();
    try {
      const res = await api.get(`/stores/${storeId}/lists`);
      dispatch({ type: GET_LIST_BY_STORE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };
  
  //Delete List
  const deleteList = async (listId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.delete(`/lists/${listId}`, config);
      dispatch({ type: DELETE_LIST, payload: res.data.deletedId })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Create List
  const createList = async (list) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.post(`/lists`, { ...list }, config);
      dispatch({ type: CREATE_LIST, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  }

  //Update List
  const updateList = async (list, listId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      
      const res = await api.put(`/lists/${listId}`, {...list} ,config);
      dispatch({ type: UPDATE_LIST, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ListContext.Provider
      value={{
        loading: state.loading,
        lists: state.lists,
        list: state.list,
        error: state.error,
        getLists,
        createList,
        getList,
        deleteList,
        updateList,
        clearState,
        setLoading,
        getListsByStore,
        AdvancedResults
      }}
    >
      {props.children}
    </ListContext.Provider>
  );
};

export default ListState;
