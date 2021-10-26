import React, { useReducer } from 'react';
import StoreContext from './storeContext';
import StoreReducer from './storeReducer';
import api from '../../api/api';
import AsyncStorage from "@react-native-community/async-storage";
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

const StoreState = props => {
  const initialState = {
    stores: [],
    store: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(StoreReducer, initialState);

  //Get Stores
  const getStores = async (all) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearStoreState();
    setLoading();
    try {

      
      let actives = '';
      if(!all){
        actives = 'isActive=true';
      }
      const res = await api.get(`/stores?sort=make&${actives}`,config);
      dispatch({ type: GET_STORES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Get Stores By User
  const getStoresByUser = async (userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearStoreState();
    setLoading();
    try {
      const res = await api.get(`/users/stores/${userId}`,config);
      dispatch({ type: GET_STORES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

    //Get Stores By Group
    const getStoresByGroup = async (groupId) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      clearStoreState();
      setLoading();
      try {
        const res = await api.get(`/groups/${groupId}/stores`,config);
        dispatch({ type: GET_STORES, payload: res.data.data });
      } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.response.data})
  
      }
    };

  //Get Stores By Make
  const getStoresByMake = async (makeId, all) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearStoreState();
    setLoading();
    try {

      let actives = '';
      if(!all){
        actives = '&isActive=true';
      }
      
      const res = await api.get(`/makes/${makeId}/stores?${actives}`,config);
      dispatch({ type: GET_STORES_BY_MAKE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  const getStoreByConversation = async (credentials) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/stores/conversation/${credentials}`,config);
      dispatch({ type: GET_STORE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

   //Get Store
   const getStore = async (storeId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      const res = await api.get(`/stores/${storeId}`,config);
      dispatch({ type: GET_STORE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Create Store
  const createStore = async (store) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    clearStoreState();
    setLoading();
    try {
      const res = await api.post(`makes/${store.make}/stores`, { ...store }, config);
      dispatch({ type: CREATE_STORE, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  }

   //Delete Store
   const deleteStore = async (storeId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.delete(`/stores/${storeId}`, config);
      dispatch({ type: DELETE_STORE, payload: res.data.deletedId })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Update Store
  const updateStore = async (store, storeId, file) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };

    if(file){
      let uploadConfig = await api.post("/uploads/image", { type: file.type, fileName: file.name },config);

      await api.put(uploadConfig.data.url, file, { headers: { "Content-Type": file ? file.type : null,Authorization:config.headers.Authorization} });

      const dataKey = uploadConfig.data.key;

      store.image = "https://automotive-api.s3.us-east-2.amazonaws.com/" + dataKey;
    }

    setLoading();
    try {
      const res = await api.put(`/stores/${storeId}`, {...store} ,config);
      dispatch({ type: UPDATE_STORE, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Clear State
  const clearStoreState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <StoreContext.Provider
      value={{
        loading: state.loading,
        stores: state.stores,
        store: state.store,
        error: state.error,
        getStores,
        getStore,
        createStore,
        deleteStore,
        updateStore,
        clearStoreState,
        setLoading,
        getStoresByMake,
        getStoreByConversation,
        getStoresByUser,
        getStoresByGroup
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreState;
